import { COMBAT_WEAPONS, RANGED_WEAPONS } from "../data/weapons.js";
import { CORE_MAGIC_ITEMS } from "../data/magic-items.js";
import { CORE_RULES } from "../data/special-rules.js";
import { findSupplementVersion } from "../data/supplements/index.js";
import { ARMY_COMPOSITIONS } from "../data/army-compositions.js";
import { UNIT_STATS } from "../data/units.js";

// Index: lowercased id/alias → rule object. O(1) lookup in resolveSpecialRules.
function buildRuleIndex(rules) {
  const map = new Map();
  for (const rule of rules) {
    map.set(rule.id.toLowerCase(), rule);
    if (rule.aliases) {
      for (const alias of rule.aliases) map.set(alias.toLowerCase(), rule);
    }
  }
  return map;
}

/** Item lookup key: lowercase, no accents. */
const itemKey = (name) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/**
 * Add items to a name → item map, keeping the first item for each name.
 * Callers add higher-priority items first.
 */
function addItems(map, items) {
  for (const item of items) {
    const key = itemKey(item.name);
    if (!map[key]) map[key] = item;
  }
  return map;
}

/**
 * The data an army's lookups use: the core rules, items, weapons and units,
 * with the chosen supplement version's layers over them. Standard armies
 * (and compositions without supplements) get the core data alone, so
 * supplement rules can never leak into them.
 *
 * @typedef {object} Ruleset
 * @property {string} composition - "" for the core ruleset
 * @property {string | null} version - supplement version id, null if none
 * @property {Map<string, any>} ruleIndex - lowercased id/alias → rule
 * @property {Record<string, any>} items - item key → magic item
 * @property {Record<string, any>} combatWeapons
 * @property {Record<string, any>} rangedWeapons
 * @property {Record<string, import("../types").UnitEntry>} units -
 *   supplement unit entries, checked before UNIT_STATS
 * @property {Record<string, string>} loreRemaps
 */

/** @type {Map<string, Ruleset>} */
const rulesets = new Map();

/**
 * @param {string | null} [composition] - the army's armyComposition
 * @param {string | null} [versionId] - the chosen supplement version;
 *   unknown or missing means the composition's default
 * @returns {Ruleset}
 */
export function getRuleset(composition = "", versionId = null) {
  const comp = composition || "";
  const version = findSupplementVersion(comp, versionId);
  // Every army without a supplement version shares the core ruleset
  const cacheKey = version ? `${comp}|${version.id}` : "";
  const cached = rulesets.get(cacheKey);
  if (cached) return cached;

  const layers = version?.layers ?? []; // highest priority first
  const lowestFirst = [...layers].reverse();
  /** @type {Partial<import("../types").ArmyComposition>} */
  const compConfig = ARMY_COMPOSITIONS[comp] || {};

  /** @type {Ruleset} */
  const ruleset = {
    composition: version ? comp : "",
    version: version?.id ?? null,
    // Later entries win, so supplement rules replace core rules of the same id
    ruleIndex: buildRuleIndex([
      ...CORE_RULES,
      ...lowestFirst.flatMap((l) => l.specialRules || []),
    ]),
    items: addItems(
      addItems(
        {},
        layers.flatMap((l) => l.magicItems || []),
      ),
      CORE_MAGIC_ITEMS,
    ),
    combatWeapons: Object.assign(
      {},
      COMBAT_WEAPONS,
      ...lowestFirst.map((l) => l.combat_weapons || {}),
    ),
    rangedWeapons: Object.assign(
      {},
      RANGED_WEAPONS,
      ...lowestFirst.map((l) => l.ranged_weapons || {}),
    ),
    units: Object.assign({}, ...lowestFirst.map((l) => l.units || {})),
    loreRemaps: version?.loreRemaps ?? compConfig.loreRemaps ?? {},
  };
  rulesets.set(cacheKey, ruleset);
  return ruleset;
}

/** Core data only: what every standard army uses. */
export const CORE_RULESET = getRuleset();

// Maps canonical mount name (lowercase) → units.js key.
// Used for mounts whose slug doesn't directly match a units.js key.
const MOUNT_KEY_OVERRIDES = {
  griffon: "griffon-empire",
  manticore: "manticore-dark-elves",
  "skeletal steed": "skeletal-steed-vampire-counts",
};

/**
 * What a mount is, from its troop type: it decides how the rider's
 * characteristics change (rulebook, Characters: split profiles).
 * - cavalry (incl. monstrous cavalry): add the (+N) printed on the mount;
 *   armour value is the rider's
 * - monster (ridden monster): add the (+N) printed on the mount; better
 *   armour value of the two
 * - chariot, and howdah (a behemoth with Howdah follows the chariot split
 *   profile): Wounds = rider's + chariot's, Toughness = the higher, better
 *   armour value of the two
 * @returns {import("../types").MountKind}
 */
function mountKindOf(troopType, rules) {
  if (troopType === "LCh" || troopType === "HCh") return "chariot";
  if ((rules || []).some((r) => /^howdah\b/i.test(r))) return "howdah";
  if (troopType === "MCr" || troopType === "Be") return "monster";
  return "cavalry";
}

/**
 * The rider's Toughness and Wounds once mounted.
 * @param {number} riderT
 * @param {number} riderW
 * @param {import("../types").Mount | null | undefined} mount
 */
export function mountedTW(riderT, riderW, mount) {
  if (!mount) return { t: riderT, w: riderW };
  const kind = mount.kind ?? mountKindOf(mount.troopType, mount.rules);
  if (kind === "chariot" || kind === "howdah")
    return { t: Math.max(riderT, mount.t ?? 0), w: riderW + (mount.w ?? 0) };
  return { t: riderT + (mount.tBonus || 0), w: riderW + (mount.wBonus || 0) };
}

/**
 * A mount that is its own fighting model (monster, chariot, howdah) or that
 * improves the rider's characteristics: the rider and mount are shown as one
 * big model with the mount's attacks and crew.
 * @param {import("../types").Mount | null | undefined} mount
 */
export function isBigMount(mount) {
  if (!mount) return false;
  const kind = mount.kind ?? mountKindOf(mount.troopType, mount.rules);
  return kind !== "cavalry" || mount.wBonus > 0 || mount.tBonus > 0;
}

// Unit Strength per model, from the Troop Type table (rulebook p. 105).
// "W" = as the model's starting Wounds.
const TROOP_STRENGTH_PER_MODEL = {
  RI: 1, // Regular Infantry
  HI: 1, // Heavy Infantry
  MI: 3, // Monstrous Infantry
  Sw: 3, // Swarms
  LC: 2, // Light Cavalry
  HC: 2, // Heavy Cavalry
  MCa: 3, // Monstrous Cavalry
  WB: 1, // War Beasts
  LCh: 3, // Light Chariots
  HCh: 5, // Heavy Chariots
  MCr: "W", // Monstrous Creatures
  Be: "W", // Behemoths
  WM: "W", // War Machines
};

/** Unit Strength per model for a troop type and the model's profile. */
function usPerModelFor(troopType, profile) {
  const us = TROOP_STRENGTH_PER_MODEL[troopType] ?? 1;
  if (us !== "W") return us;
  return parseInt(profile?.W, 10) || 1;
}

const TROOP_TYPE_MARKERS = new Set(["Ch", "NCh"]);

/**
 * Compute unit strength for a canonical unit.
 * For a character on a monster mount (mount.wBonus > 0), returns mount US + 1.
 * Otherwise derives US per model from the unit's primary troop type × model count.
 */
/** @param {Pick<import("../types").Unit, "mount" | "stats" | "strength" | "detachments">} unit */
export function computeUnitStrength(unit) {
  const mount = unit.mount;

  // A mounted character takes the mount's troop type. A ridden monster or a
  // howdah behemoth has Unit Strength as its starting Wounds (rider and mount
  // combined); a chariot uses the Troop Type table.
  if (mount) {
    const kind = mount.kind ?? mountKindOf(mount.troopType, mount.rules);
    const baseW = parseInt(unit.stats?.[0]?.W) || 1;
    if (kind === "monster" || kind === "howdah")
      return mountedTW(0, baseW, { ...mount, kind }).w;
    if (kind === "chariot")
      return usPerModelFor(mount.troopType ?? "HCh", null);
  }

  const typeArr = unit.stats?.[0]?.troopType ?? [];
  const primaryType = typeArr.find((t) => !TROOP_TYPE_MARKERS.has(t));
  const isCharacter = typeArr.some((t) => TROOP_TYPE_MARKERS.has(t));

  // Character on a cavalry mount (wBonus = 0): use mount's troop type US
  if (mount?.troopType && isCharacter) {
    const mountUS = usPerModelFor(mount.troopType, null);
    return mountUS * (unit.strength || 1);
  }

  const usPerModel =
    primaryType !== undefined ? usPerModelFor(primaryType, unit.stats?.[0]) : 1;

  let baseUS = usPerModel * (unit.strength || 1);

  // Add detachment US contributions (e.g. Beast Pack animals)
  for (const d of unit.detachments || []) {
    const dTypeArr = d.stats?.[0]?.troopType ?? [];
    const dPrimary = dTypeArr.find((t) => !TROOP_TYPE_MARKERS.has(t));
    const dUsPerModel =
      dPrimary !== undefined ? usPerModelFor(dPrimary, d.stats?.[0]) : 1;
    baseUS += dUsPerModel * (d.strength || 1);
  }

  return baseUS;
}

/**
 * @param {import("../types").UnitEntry} entry
 * @returns {import("../types").UnitProfile[]}
 */
export function resolveUnitEntry(entry) {
  return Array.isArray(entry)
    ? entry
    : entry.stats.map(
        // shared + per-line fields together form a full profile
        // (checked by "every unit profile is complete" in data-validity.test.js)
        (s) =>
          /** @type {import("../types").UnitProfile} */ ({
            ...entry.shared,
            ...s,
          }),
      );
}

/**
 * @param {Ruleset} [ruleset]
 * @returns {import("../types").UnitProfile[]}
 */
export function resolveStats(id, name, ruleset = CORE_RULESET) {
  const baseId = (id || "").split(".")[0];
  const slug = name?.replace(/[{}]/g, "").toLowerCase().replace(/\s+/g, "-");
  const keys = [
    baseId,
    baseId.replace(/s$/, ""),
    baseId + "s",
    slug,
    slug?.replace(/s$/, ""),
  ];
  // The supplement version's own unit entries come first ("war-hydra" →
  // "war-hydra-renegade"), then the core units.
  for (const key of keys) {
    if (!key) continue;
    const entry = ruleset.units[key] ?? ruleset.units[key + "-renegade"];
    if (entry) return resolveUnitEntry(entry);
  }
  for (const key of keys) {
    if (key && UNIT_STATS[key]) return resolveUnitEntry(UNIT_STATS[key]);
  }
  // Army lists sometimes give a Renegade unit its own id
  // ("repeater-crossbowmen-renegade") with no profile of its own: use the
  // version's entry or the plain unit.
  const plain = keys
    .filter((k) => k?.endsWith("-renegade"))
    .map((k) => k.replace(/-renegade$/, ""));
  // e.g. "war-hydra-special-renegade" / "War Hydra {renegade}" → "war-hydra"
  for (const k of plain) {
    const found = resolveStats(k, undefined, ruleset);
    if (found.length) return found;
  }
  return [];
}

function parseBonusInt(val) {
  return parseInt(String(val ?? "").match(/\(\+(\d+)\)/)?.[1] ?? "0", 10);
}

/** Whether an M value is a dice roll (Random Movement): "3D6", "2D6+1" */
export function isDiceMovement(m) {
  return /^\d*D\d+(?:\s*[+-]\s*\d+)?$/i.test(String(m ?? "").trim());
}

/**
 * @param {string | import("../types").Mount | null | undefined} name
 * @param {Ruleset} [ruleset]
 * @returns {import("../types").Mount | null}
 */
export function findMount(name, ruleset = CORE_RULESET) {
  if (!name) return null;
  if (typeof name === "object") return name;

  const lower = name.toLowerCase();
  const normalised = lower.replace(/[{}]/g, "");
  const key = MOUNT_KEY_OVERRIDES[lower] ?? normalised.replace(/\s+/g, "-");
  // "Flamespyre Phoenix {mount}" → the Flamespyre Phoenix entry, whose
  // mountT/mountW give the ridden bonus; "Cauldron of Blood {renegade}" → the
  // version's own entry, else the plain one. A version's variant of a mount
  // ("carnosaur-renegade") comes before the core entry.
  const candidates = [
    ...new Set([
      key,
      key.replace(/-mount$/, ""),
      key.replace(/-renegade$/, ""),
    ]),
  ];
  let entry = null;
  for (const c of candidates) {
    entry = ruleset.units[c + "-renegade"] ?? ruleset.units[c] ?? UNIT_STATS[c];
    if (entry) break;
  }
  if (!entry) return null;

  const profiles = resolveUnitEntry(entry);
  const profile = profiles[0];
  if (!profile) return null;

  // For crewed units (chariots), the first profile is the vehicle body (M: "-").
  // Find the motive power profile — the first profile with a valid M value.
  const motiveProfile =
    profiles.find((p) => p.M && p.M !== "-" && !isNaN(parseInt(p.M, 10))) ??
    profile;

  const armourBaneRule = profile.rules?.find((r) => /^Armour Bane/i.test(r));
  const armourBane = armourBaneRule
    ? parseInt(armourBaneRule.match(/\((\d+)/)?.[1] ?? "0", 10)
    : null;

  const equipment = (profile.equipment ?? []).map((e) => e.toLowerCase());

  // Crew profiles: subsequent stat lines with actual attacks (A != "-")
  const crewProfiles = profiles
    .slice(1)
    .filter((p) => p.A && p.A !== "-" && p.Name)
    .map((p) => ({
      name: p.Name,
      i: p.I,
      ws: p.WS,
      bs: p.BS,
      s: p.S,
      a: p.A,
      equipment: p.equipment || [],
    }));

  return {
    // The army list's name ("Scourgerunner Chariot", not the profile line's
    // "Chariot"; "Flamespyre Phoenix", not "Flamespyre Phoenix (Mount)")
    name: name.replace(/\s*\{[^}]*\}/g, "").trim(),
    // A random mover's M is dice ("3D6"): no fixed Movement
    m: isDiceMovement(motiveProfile.M) ? null : parseInt(motiveProfile.M, 10),
    mDice: isDiceMovement(motiveProfile.M) ? motiveProfile.M : null,
    stomp: profile.Stomps ?? null,
    impactHits: profile["Impact-Hits"] ?? null,
    tBonus: parseBonusInt(profile.mountT ?? profile.T),
    wBonus: parseBonusInt(profile.mountW ?? profile.W),
    // The mount's own Toughness and Wounds (chariots and howdahs)
    t: /^\d+$/.test(String(profile.T)) ? parseInt(profile.T, 10) : null,
    w: /^\d+$/.test(String(profile.W)) ? parseInt(profile.W, 10) : null,
    kind: mountKindOf(
      profile.troopType?.find((t) => !TROOP_TYPE_MARKERS.has(t)),
      profile.rules,
    ),
    ws: profile.WS,
    s: profile.S,
    i: profile.I,
    a: profile.A,
    as: profile.as ?? (profile.AS ? parseInt(profile.AS, 10) : null),
    weapons: equipment,
    crew: crewProfiles.length > 0 ? crewProfiles : null,
    troopType: profile.troopType?.[0] ?? null,
    armourBane,
    f: profile.Fly ? parseInt(profile.Fly, 10) : null,
    breath: equipment.find((e) => ruleset.rangedWeapons[e]) ?? null,
    rules: profile.rules,
  };
}

/**
 * Normalize an item name for lookup in MAGIC_ITEM_MAP
 */
function normaliseItemName(name) {
  return name
    .replace(/\s*\(.*$/, "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\*$/, "");
}

/** @param {Ruleset} ruleset */
function lookupItem(name, ruleset) {
  return ruleset.items[normaliseItemName(name)] ?? null;
}

/**
 * Resolve combat weapons from equipment strings
 * @param {string[]} equipmentStrings - e.g. ["Hand weapon", "Lance", "Shield"]
 * @param {string[]} magicItemNames - magic item names that may include weapons
 * @param {Ruleset} [ruleset] - the army's rules data (supplement-aware)
 * @returns {object[]} - array of resolved weapon objects
 */
export function resolveWeapons(
  equipmentStrings,
  magicItemNames,
  ruleset = CORE_RULESET,
) {
  const weaponMap = ruleset.combatWeapons;
  const weapons = [];
  const seen = new Set();

  // Check for magic weapons first (skip champion-only items)
  for (const itemName of magicItemNames) {
    if (itemName.toLowerCase().includes("(champion)")) continue;
    const mi = lookupItem(itemName, ruleset);
    if (mi?.type === "weapon" && mi.s && mi.phases?.includes("combat")) {
      const weapon = {
        name: mi.name,
        s: mi.s,
        ap: mi.ap || "—",
        rules: mi.effect ? [mi.effect] : [],
        magical: true,
        attacks: mi.attacks || null,
        reservedAttacks: mi.reservedAttacks || null,
      };
      weapons.push(weapon);
      seen.add(mi.name);
      return weapons; // Magic weapon replaces mundane weapons
    }
  }

  // Then check equipment strings for mundane weapons
  for (const equipStr of equipmentStrings) {
    const lower = equipStr.toLowerCase();
    // A key inside a longer matching key is the same weapon named more
    // fully ("bloodflail" also contains "flail"): keep only the longest.
    const matched = Object.keys(weaponMap).filter((key) => lower.includes(key));
    const longest = matched.filter(
      (key) => !matched.some((other) => other !== key && other.includes(key)),
    );
    for (const key of longest) {
      const weapon = weaponMap[key];
      if (!seen.has(weapon.name)) {
        seen.add(weapon.name);
        weapons.push({
          name: weapon.name,
          s: weapon.s,
          ap: weapon.ap || "—",
          rules: weapon.rules || [],
          magical: false,
          attacks: weapon.attacks || null,
          reservedAttacks: weapon.reservedAttacks || null,
        });
      }
    }
  }

  // Default to hand weapon if nothing matched
  if (weapons.length === 0) {
    weapons.push({
      name: "Hand Weapon",
      s: "S",
      ap: "—",
      rules: [],
      magical: false,
      attacks: null,
      reservedAttacks: null,
    });
  }

  return weapons;
}

/**
 * Resolve shooting weapons from equipment strings
 * @param {string[]} equipmentStrings
 * @param {Ruleset} [ruleset] - the army's rules data (supplement-aware)
 * @returns {object[]} - array of resolved ranged weapon objects
 */
export function resolveShootingWeapons(
  equipmentStrings,
  ruleset = CORE_RULESET,
) {
  const weaponMap = ruleset.rangedWeapons;
  const weapons = [];
  const seen = new Set();

  for (const equipStr of equipmentStrings) {
    const parts = equipStr.split(",").map((s) => s.trim().toLowerCase());
    for (const part of parts) {
      // Use longest-key matching to avoid substring false positives
      // e.g. "repeater crossbow" must not also match "crossbow"
      let bestKey = null;
      let bestWeapon = null;
      for (const [key, weapon] of Object.entries(weaponMap)) {
        if (part.includes(key) && (!bestKey || key.length > bestKey.length)) {
          bestKey = key;
          bestWeapon = weapon;
        }
      }
      if (bestWeapon && !seen.has(bestWeapon.name)) {
        seen.add(bestWeapon.name);
        weapons.push({
          ...bestWeapon,
          ap: bestWeapon.ap || "—",
          rules: bestWeapon.rules || [],
          magical: false,
          attacks: bestWeapon.attacks || null,
        });
      }
    }
  }

  return weapons;
}

/**
 * Shooting profiles for magic weapons used in the Shooting phase (e.g.
 * Hunter's Scorn, the Dragon Bow). Uses the weapon profile the app has for
 * the item where there is one, otherwise the item's own range, S and AP.
 * @param {import("../types").ResolvedMagicItem[]} magicItems
 * @param {Ruleset} [ruleset]
 */
export function resolveMagicShootingWeapons(
  magicItems,
  ruleset = CORE_RULESET,
) {
  const weapons = [];
  for (const item of magicItems) {
    if (item.type !== "weapon" || !item.phases?.includes("shooting")) continue;
    const profile = ruleset.rangedWeapons[normaliseItemName(item.name)];
    const range =
      profile?.range ?? item.effect?.match(/Range (\d+)"/)?.[1] ?? null;
    weapons.push({
      ...(profile ?? {}),
      name: item.name,
      range: profile?.range ?? (range ? `${range}"` : "—"),
      s: profile?.s ?? item.s ?? "S",
      ap: profile?.ap ?? item.ap ?? "—",
      rules: profile
        ? [...(profile.rules || []), item.effect].filter(Boolean)
        : [item.effect],
      magical: true,
      attacks: profile?.attacks ?? null,
    });
  }
  return weapons;
}

/**
 * Resolve magic items by name
 * @param {string[]} itemNames - magic item names
 * @param {Ruleset} [ruleset] - the army's rules data (supplement-aware)
 * @returns {object[]} - array of full magic item objects
 */
/** @returns {import("../types").ResolvedMagicItem[]} */
export function resolveMagicItems(itemNames, ruleset = CORE_RULESET) {
  const items = [];

  for (const name of itemNames) {
    const mi = lookupItem(name, ruleset);
    if (mi) {
      items.push(mi);
    }
  }

  return items;
}

/**
 * Resolve special rules from a comma-separated rules string
 * @param {string} rulesString - e.g. "Killing Blow, Hatred (Elves), Armoured Hide (1)"
 * @param {Ruleset} [ruleset] - the army's rules data (supplement-aware)
 * @returns {object[]} - array of resolved rule objects
 */
/** @returns {import("../types").ResolvedRule[]} */
export function resolveSpecialRules(rulesString, ruleset = CORE_RULESET) {
  if (!rulesString || !rulesString.trim()) return [];

  const index = ruleset.ruleIndex;
  const rules = [];
  const parts = rulesString.split(",").map((s) => s.trim());

  for (const rawPart of parts) {
    // Strip trailing * — OWB uses it as a footnote marker for conditional rules
    const part = rawPart.replace(/\*$/, "").trim();
    // Strip {annotation} (e.g. "{renegade}", "{dark elves}") for fallback lookup
    const cleanPart = part.replace(/\s*\{[^}]*\}/g, "").trim();

    // Look up in rule index. Check annotated form first (so variant-specific
    // aliases like "Murderous {renegade}" resolve before falling back to the standard
    // "Murderous" entry), then clean form.
    const found =
      index.get(part.toLowerCase()) ||
      (cleanPart !== part ? index.get(cleanPart.toLowerCase()) : null) ||
      null;

    if (found) {
      rules.push(found);
    } else {
      // Keep unrecognised rules as bare entries (use clean name for display)
      rules.push({
        id: null,
        displayName: cleanPart || part,
        phases: [],
      });
    }
  }

  return rules;
}

/**
 * Resolve a mount by name
 * @param {string} mountName
 * @returns {object|null} - full mount object or null
 */
/** @returns {import("../types").Mount | null} */
/** @param {Ruleset} [ruleset] */
export function resolveMount(mountName, ruleset = CORE_RULESET) {
  if (!mountName) return null;
  return findMount(mountName, ruleset);
}

/**
 * Compute armour save from equipment, armour, magic items, mount, special rules, and stats
 * Based on calculateArmourSave from combat-weapons.js
 */
export function computeArmourSave(
  equipmentStrings,
  armourStrings,
  magicItems,
  mount,
  specialRules,
  stats,
) {
  let baseAS = null;

  // Natural armour save from the unit's stat line — the "Armour Value" field for
  // vehicles, monsters, and crewed units (e.g. Thundertusk AS:"5", Bastiladon AS:"3").
  // This is distinct from lowercase `as` which stores the equipment-derived save
  // pre-computed by OWB (e.g. as:6 for light armour).
  if (stats && stats[0]?.AS) {
    baseAS = parseInt(stats[0].AS);
  }

  // Equipment from units.js stat profile — fallback source for armour/barding when OWB
  // export omits armor[] entries (e.g. Knights of the Realm on Foot have heavy armour in
  // units.js but no armor[] array in the OWB export).
  const statsEquipment = (stats?.[0]?.equipment ?? []).map((e) =>
    e.toLowerCase(),
  );

  // Check armour base from armour strings and units.js stat profile equipment
  const allArmourSources = [
    ...armourStrings.map((s) => s.toLowerCase()),
    ...statsEquipment,
  ];
  for (const lower of allArmourSources) {
    if (lower.includes("gromril")) {
      if (baseAS === null || 4 < baseAS) baseAS = 4;
      break;
    }
    if (lower.includes("full plate") || lower.includes("chaos armour")) {
      if (baseAS === null || 4 < baseAS) baseAS = 4;
      break;
    }
    if (lower.includes("heavy")) {
      if (baseAS === null || 5 < baseAS) baseAS = 5;
      break;
    }
    if (lower.includes("light")) {
      if (baseAS === null || 6 < baseAS) baseAS = 6;
      break;
    }
  }

  // Apply magic item modifiers
  let modifier = 0;
  for (const item of magicItems) {
    if (item.armourBase !== undefined) {
      if (baseAS === null || item.armourBase < baseAS) baseAS = item.armourBase;
    }
    if (item.armourMod) modifier += item.armourMod;
  }

  // Shield bonus (magic shield, equipment, or armour strings — at most once).
  // A magic shield (e.g. Charmed Shield, Enchanted Shield) and a mundane shield are
  // mutually exclusive; only one -1 applies regardless of how many sources detect a shield.
  const hasMagicShield = magicItems.some(
    (item) => item.type === "armour" && item.effect?.startsWith("Shield."),
  );
  const hasShield =
    hasMagicShield ||
    equipmentStrings.some((e) => e.toLowerCase().includes("shield")) ||
    armourStrings.some((a) => a.toLowerCase().includes("shield")) ||
    statsEquipment.some((e) => e.includes("shield"));
  if (hasShield) modifier -= 1;
  if (
    armourStrings.some((a) => a.toLowerCase().includes("barding")) ||
    equipmentStrings.some((e) => e.toLowerCase().includes("barding")) ||
    mount?.weapons?.includes("barding") ||
    statsEquipment.some((e) => e.includes("barding"))
  ) {
    modifier -= 1;
  }

  // Rules that always change the armour value (e.g. the Chaos Dwarf draft's
  // Blackshard Armour: "improves their armour value by 1"). Conditional
  // bonuses (Lion Cloak vs shooting) stay in the rule text instead.
  for (const rule of specialRules) {
    if (rule.armourMod && baseAS !== null) modifier += rule.armourMod;
  }

  // Armoured Hide from special rules — use displayName regex (rule may be unrecognised)
  for (const rule of specialRules) {
    const match = (rule.displayName || "").match(/Armoured Hide\s*\((\d+)\)/i);
    if (match) {
      if (baseAS === null) {
        // No armour: Armoured Hide alone gives a base save of 7-X
        baseAS = 7 - parseInt(match[1]);
      } else {
        modifier -= parseInt(match[1]);
      }
    }
  }

  // Ridden monster, chariot or howdah: use the mount's armour value if it's
  // better than the rider's (including any shield or equipment bonus already
  // accumulated in modifier). A cavalry mount uses the rider's armour value.
  // Exception: magic armour items provide a specific save that takes precedence.
  const mountKind =
    mount && (mount.kind ?? mountKindOf(mount.troopType, mount.rules));
  if (mount?.as && mountKind !== "cavalry") {
    const hasMagicArmourItem = magicItems.some(
      (item) => item.armourBase !== undefined,
    );
    if (!hasMagicArmourItem) {
      const riderFinalAS = baseAS !== null ? baseAS + modifier : null;
      if (riderFinalAS === null || mount.as < riderFinalAS) {
        const clamped = Math.max(2, Math.min(6, mount.as));
        return `${clamped}+`;
      }
    }
  }

  if (baseAS === null) return null;
  const finalAS = baseAS + modifier;
  if (finalAS > 6) return "6+";
  if (finalAS < 2) return "2+";
  return `${finalAS}+`;
}

// Helper to extract a number from a rule string like "Magic Resistance (-1)"
const extractNumber = (str) => {
  if (str === null) return;
  const match = str.match(/\(([-+]?\d+(?:\.\d+)?)\)/);
  return match ? parseInt(match[1], 10) : null;
};

// Base value of a ward string: "5+" → 5, "5+ (4+ vs S5+)" → 5. Lower is better.
function wardValue(ward) {
  const match = String(ward).match(/(\d)\+/);
  return match ? parseInt(match[1], 10) : Infinity;
}

/**
 * Compute ward save from magic items and special rules. Wards don't stack —
 * the model uses the single best one available.
 */
export function computeWard(magicItems, specialRules) {
  let best = null;
  for (const source of [...magicItems, ...specialRules]) {
    const ward = source.ward ?? wardFromRuleName(source.displayName);
    if (ward && (best === null || wardValue(ward) < wardValue(best))) {
      best = ward;
    }
  }
  return best;
}

/**
 * Rules whose Ward save is given in brackets in the army list, e.g.
 * "Chaos Armour (5+)". These resolve as bare entries (the bracket isn't part
 * of the rule id), so the value is read from the name.
 */
function wardFromRuleName(name) {
  return name?.match(/^Chaos Armour\s*\((\d\+)\)/i)?.[1] ?? null;
}

/**
 * Compute regeneration from magic items and special rules
 */
export function computeRegen(magicItems, specialRules) {
  // Check magic items
  for (const item of magicItems) {
    if (item.regen) return item.regen;
  }

  // Check special rules
  for (const rule of specialRules) {
    const match = rule.displayName?.match(/Regeneration\s*\((\d\+)\)/i);
    if (match) return match[1];
  }

  return null;
}

/**
 * Compute magic resistance from stats, magic items, special rules, and mount.
 *
 * @param {Array}  magicItems   - List of resolved magic item objects.
 * @param {Array}  specialRules - List of resolved special rule objects.
 * @param {Object} mount        - Resolved mount object (may have .rules array).
 * @returns {string|null} The strongest Magic Resistance, e.g. "-2", or null.
 */
export function computeMR(magicItems, specialRules, mount) {
  // 1. From mount rules (if a mount is present)
  let mountMR = null;
  if (mount && Array.isArray(mount.rules)) {
    for (const rule of mount.rules) {
      if (
        rule &&
        typeof rule === "string" &&
        rule.includes("Magic Resistance")
      ) {
        const val = extractNumber(rule);
        if (val !== null) mountMR = Math.max(mountMR ?? val, val);
      }
    }
  }

  // 2. From special rules
  let specialMR = null;
  if (Array.isArray(specialRules)) {
    for (const rule of specialRules) {
      const name = rule.displayName || rule.id || "";
      if (name.includes("Magic Resistance")) {
        const val = extractNumber(name);
        if (val !== null) specialMR = Math.max(specialMR ?? val, val);
      }
    }
  }

  // 3. From magic items
  let itemsMR = null;
  if (Array.isArray(magicItems)) {
    for (const item of magicItems) {
      if (item && item.mr) {
        const val = parseInt(item.mr, 10);
        if (!isNaN(val)) itemsMR = Math.max(itemsMR ?? val, val);
      }
    }
  }
  // Determine the highest of the three sources
  const maxMR = Math.max(
    mountMR ?? -Infinity,
    specialMR ?? -Infinity,
    itemsMR ?? -Infinity,
  );
  return maxMR === -Infinity ? null : `${maxMR}`;
}

/**
 * Whether a weapon name ("javelins", "shortbows") is a ranged weapon,
 * judged by the ruleset's own weapon tables: the longest key it contains,
 * across ranged and combat weapons, decides (as in resolveShootingWeapons,
 * so "throwing spear" counts as combat and "great throwing spear" as ranged).
 * @param {string} part - lower-case
 * @param {Ruleset} ruleset
 */
function isRangedWeaponName(part, ruleset) {
  const longest = (table) =>
    Object.keys(table)
      .filter((key) => part.includes(key))
      .reduce((a, b) => (b.length > a.length ? b : a), "");
  const ranged = longest(ruleset.rangedWeapons);
  return (
    ranged !== "" && ranged.length >= longest(ruleset.combatWeapons).length
  );
}

/**
 * Whether a unit has Poisoned Attacks in combat. A qualifier naming only
 * ranged weapons — "Poisoned Attacks (javelins and shortbows only)" — means
 * it doesn't; one naming models ("Necroserpent only") still counts.
 * @param {Ruleset} [ruleset]
 */
export function computePoisonedAttacks(specialRules, ruleset = CORE_RULESET) {
  for (const rule of specialRules) {
    const match = rule.displayName?.match(
      /Poisoned Attacks(?:\s*\(([^)]+)\))?/i,
    );
    if (!match) continue;
    if (!match[1]) return true;
    const parts = match[1]
      .toLowerCase()
      .replace(/\s+only$/, "")
      .split(/,|\band\b/)
      .map((p) => p.trim())
      .filter(Boolean);
    return !parts.every((p) => isRangedWeaponName(p, ruleset));
  }
  return false;
}

/**
 * Compute stomp attacks from mount or special rules
 */
export function computeStomp(mount, specialRules) {
  if (mount?.stomp) return mount.stomp;
  for (const rule of specialRules) {
    const match = rule.displayName?.match(/Stomp Attacks\s*\(([^)]+)\)/i);
    if (match) return match[1];
  }
  return null;
}

/**
 * Compute impact hits from mount or special rules
 */
export function computeImpactHits(mount, specialRules) {
  if (mount?.impactHits) return mount.impactHits;
  for (const rule of specialRules) {
    const match = rule.displayName?.match(/Impact Hits\s*\(([^)]+)\)/i);
    if (match) return match[1];
  }
  return null;
}

/**
 * Derive spell selection behaviour from resolved magic items and special rules.
 * @param {object[]} magicItems - resolved magic item objects
 * @param {object[]} specialRules - resolved special rule objects
 * @returns {{ canChoose: boolean, multiLore: boolean, maxSpells: number|null }}
 */
export function deriveSpellSelectionMode(magicItems, specialRules) {
  const itemNames = magicItems.map((i) => i.name.toLowerCase());
  return {
    canChoose: itemNames.includes("lore familiar"),
    multiLore: itemNames.includes("arcane familiar"),
    maxSpells: specialRules.some((r) => r.id === "cursed coven") ? 1 : null,
  };
}
