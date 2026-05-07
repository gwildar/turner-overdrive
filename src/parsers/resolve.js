import { COMBAT_WEAPONS, RANGED_WEAPONS } from "../data/weapons.js";
import { MAGIC_ITEMS } from "../data/magic-items.js";
import { CORE_RULES } from "../data/special-rules.js";
import {
  STABLE_SUPPLEMENT_RULES,
  DRAFT_SUPPLEMENT_RULES,
  STABLE_SUPPLEMENT_ITEMS,
  DRAFT_SUPPLEMENT_ITEMS,
} from "../data/supplements/index.js";
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

const STABLE_RULE_INDEX = buildRuleIndex([
  ...CORE_RULES,
  ...STABLE_SUPPLEMENT_RULES,
]);
const ALL_RULE_INDEX = buildRuleIndex([
  ...CORE_RULES,
  ...STABLE_SUPPLEMENT_RULES,
  ...DRAFT_SUPPLEMENT_RULES,
]);

// Maps canonical mount name (lowercase) → units.js key.
// Used for mounts whose slug doesn't directly match a units.js key.
const MOUNT_KEY_OVERRIDES = {
  griffon: "griffon-empire",
  manticore: "manticore-dark-elves",
  "skeletal steed": "skeletal-steed-vampire-counts",
  // Cauldron of Blood: use dedicated mount entry with bonus T/W and crew profiles
  "cauldron of blood": "cauldron-of-blood-mount",
  "cauldron of blood {renegade}": "cauldron-of-blood-mount",
  // Scourgerunner Chariot: use dedicated mount entry with crew profiles
  "scourgerunner chariot": "scourgerunner-chariot-mount",
};

const TROOP_STRENGTH_PER_MODEL = {
  RI: 1, // Regular Infantry
  HI: 1, // Heavy Infantry
  LC: 2, // Light Cavalry
  HC: 2, // Heavy Cavalry
  WB: 1, // War Beasts
  MI: 2, // Monstrous Infantry
  MCa: 3, // Monstrous Cavalry
  Be: 3, // Monstrous Beasts
  HCh: 3, // Heavy Chariot
  LCh: 3, // Light Chariot
  MCr: 5, // Monsters
  WM: 0, // War Machines
  Sw: 3, // Swarms
};

const TROOP_TYPE_MARKERS = new Set(["Ch", "NCh"]);

/**
 * Compute unit strength for a canonical unit.
 * For a character on a monster mount (mount.wBonus > 0), returns mount US + 1.
 * Otherwise derives US per model from the unit's primary troop type × model count.
 */
export function computeUnitStrength(unit) {
  const mount = unit.mount;

  // Character on a monster mount: combined wounds = character W + mount wBonus
  if (mount?.wBonus > 0) {
    const baseW = parseInt(unit.stats?.[0]?.W) || 1;
    return baseW + mount.wBonus;
  }

  const typeArr = unit.stats?.[0]?.troopType ?? [];
  const primaryType = typeArr.find((t) => !TROOP_TYPE_MARKERS.has(t));
  const isCharacter = typeArr.some((t) => TROOP_TYPE_MARKERS.has(t));

  // Character on a cavalry mount (wBonus = 0): use mount's troop type US
  if (mount?.troopType && isCharacter) {
    const mountUS = TROOP_STRENGTH_PER_MODEL[mount.troopType] ?? 1;
    return mountUS * (unit.strength || 1);
  }

  const usPerModel =
    primaryType !== undefined
      ? (TROOP_STRENGTH_PER_MODEL[primaryType] ?? 1)
      : 1;

  let baseUS = usPerModel * (unit.strength || 1);

  // Add detachment US contributions (e.g. Beast Pack animals)
  for (const d of unit.detachments || []) {
    const dTypeArr = d.stats?.[0]?.troopType ?? [];
    const dPrimary = dTypeArr.find((t) => !TROOP_TYPE_MARKERS.has(t));
    const dUsPerModel =
      dPrimary !== undefined ? (TROOP_STRENGTH_PER_MODEL[dPrimary] ?? 1) : 1;
    baseUS += dUsPerModel * (d.strength || 1);
  }

  return baseUS;
}

export function resolveUnitEntry(entry) {
  return Array.isArray(entry)
    ? entry
    : entry.stats.map((s) => ({ ...entry.shared, ...s }));
}

export function resolveStats(id, name, composition, isDraft = false) {
  const baseId = (id || "").split(".")[0];
  const slug = name?.replace(/[{}]/g, "").toLowerCase().replace(/\s+/g, "-");
  const keys = [
    baseId,
    baseId.replace(/s$/, ""),
    baseId + "s",
    slug,
    slug?.replace(/s$/, ""),
  ];
  // For renegade compositions, try -renegade suffixed keys first
  if (isDraft && composition?.includes("renegade")) {
    for (const key of keys) {
      const rk = key ? key + "-renegade" : null;
      if (rk && UNIT_STATS[rk]) return resolveUnitEntry(UNIT_STATS[rk]);
    }
  }
  for (const key of keys) {
    if (key && UNIT_STATS[key]) return resolveUnitEntry(UNIT_STATS[key]);
  }
  return [];
}

function parseBonusInt(val) {
  return parseInt(String(val ?? "").match(/\(\+(\d+)\)/)?.[1] ?? "0", 10);
}

export function findMount(name) {
  if (!name) return null;
  if (typeof name === "object") return name;

  const lower = name.toLowerCase();
  const normalised = lower.replace(/[{}]/g, "");
  const key = MOUNT_KEY_OVERRIDES[lower] ?? normalised.replace(/\s+/g, "-");
  const entry = UNIT_STATS[key];
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
      s: p.S,
      a: p.A,
      equipment: p.equipment || [],
    }));

  return {
    name: profile.Name,
    m: parseInt(motiveProfile.M, 10),
    stomp: profile.Stomps ?? null,
    impactHits: profile["Impact-Hits"] ?? null,
    tBonus: parseBonusInt(profile.T),
    wBonus: parseBonusInt(profile.W),
    ws: profile.WS,
    s: profile.S,
    i: profile.I,
    a: profile.A,
    as: profile.as ?? (profile.AS ? parseInt(profile.AS, 10) : null),
    weapons: equipment,
    crew: crewProfiles.length > 0 ? crewProfiles : null,
    swiftstride:
      profile.rules?.some((r) => r.toLowerCase() === "swiftstride") ?? false,
    troopType: profile.troopType?.[0] ?? null,
    armourBane,
    f: profile.Fly ? parseInt(profile.Fly, 10) : null,
    breath: equipment.find((e) => RANGED_WEAPONS[e]) ?? null,
    firstCharge:
      profile.rules?.some((r) => r.toLowerCase() === "first charge") ?? false,
    furiousCharge:
      profile.rules?.some((r) => r.toLowerCase() === "furious charge") ?? false,
    counterCharge:
      profile.rules?.some((r) => r.toLowerCase() === "counter charge") ?? false,
    strikeFirst:
      profile.rules?.some((r) => r.toLowerCase() === "strike first") ?? false,
    largeTarget:
      profile.rules?.some((r) => r.toLowerCase() === "large target") ?? false,
    terror: profile.rules?.some((r) => r.toLowerCase() === "terror") ?? false,
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

/**
 * Build a lookup map from magic item names (lowercase) → item data.
 * Uses first-write-wins so core items are preserved when supplement items
 * share the same name (e.g. Weeping Blade at different points costs).
 */
function buildMagicItemMap() {
  const map = {};
  for (const item of MAGIC_ITEMS) {
    const key = item.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    if (!map[key]) map[key] = item;
  }
  return map;
}

const MAGIC_ITEM_MAP = buildMagicItemMap();

function buildSupplementItemMap(items) {
  const map = {};
  for (const item of items) {
    const key = item.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    map[key] = item;
  }
  return map;
}

const STABLE_SUPPLEMENT_ITEM_MAP = buildSupplementItemMap(
  STABLE_SUPPLEMENT_ITEMS,
);
const DRAFT_SUPPLEMENT_ITEM_MAP = buildSupplementItemMap(
  DRAFT_SUPPLEMENT_ITEMS,
);

function lookupItem(name, composition, isDraft = false) {
  const key = normaliseItemName(name);
  if (composition?.includes("renegade")) {
    if (isDraft && DRAFT_SUPPLEMENT_ITEM_MAP[key])
      return DRAFT_SUPPLEMENT_ITEM_MAP[key];
    if (STABLE_SUPPLEMENT_ITEM_MAP[key]) return STABLE_SUPPLEMENT_ITEM_MAP[key];
  }
  return MAGIC_ITEM_MAP[key] ?? null;
}

const WARD_RULES = new Map([
  ["the grail vow", "6+ (5+ > S5)"],
  ["daughters of eternity", "4+"],
  ["dark runes", "5+ (non-magical shooting)"],
]);

/**
 * Resolve combat weapons from equipment strings
 * @param {string[]} equipmentStrings - e.g. ["Hand weapon", "Lance", "Shield"]
 * @param {string[]} magicItemNames - magic item names that may include weapons
 * @param {string} [composition] - army composition for supplement-aware lookup
 * @returns {object[]} - array of resolved weapon objects
 */
export function resolveWeapons(
  equipmentStrings,
  magicItemNames,
  composition,
  isDraft = false,
) {
  const weapons = [];
  const seen = new Set();

  // Check for magic weapons first (skip champion-only items)
  for (const itemName of magicItemNames) {
    if (itemName.toLowerCase().includes("(champion)")) continue;
    const mi = lookupItem(itemName, composition, isDraft);
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
    for (const [key, weapon] of Object.entries(COMBAT_WEAPONS)) {
      if (lower.includes(key) && !seen.has(weapon.name)) {
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
 * @returns {object[]} - array of resolved ranged weapon objects
 */
export function resolveShootingWeapons(equipmentStrings) {
  const weapons = [];
  const seen = new Set();

  for (const equipStr of equipmentStrings) {
    const parts = equipStr.split(",").map((s) => s.trim().toLowerCase());
    for (const part of parts) {
      // Use longest-key matching to avoid substring false positives
      // e.g. "repeater crossbow" must not also match "crossbow"
      let bestKey = null;
      let bestWeapon = null;
      for (const [key, weapon] of Object.entries(RANGED_WEAPONS)) {
        if (part.includes(key) && (!bestKey || key.length > bestKey.length)) {
          bestKey = key;
          bestWeapon = weapon;
        }
      }
      if (bestWeapon && !seen.has(bestWeapon.name)) {
        seen.add(bestWeapon.name);
        weapons.push({
          name: bestWeapon.name,
          range: bestWeapon.range,
          s: bestWeapon.s,
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
 * Resolve magic items by name
 * @param {string[]} itemNames - magic item names
 * @param {string} [composition] - army composition for supplement-aware lookup
 * @returns {object[]} - array of full magic item objects
 */
export function resolveMagicItems(itemNames, composition, isDraft = false) {
  const items = [];

  for (const name of itemNames) {
    const mi = lookupItem(name, composition, isDraft);
    if (mi) {
      items.push(mi);
    }
  }

  return items;
}

/**
 * Resolve special rules from a comma-separated rules string
 * @param {string} rulesString - e.g. "Killing Blow, Hatred (Elves), Armoured Hide (1)"
 * @returns {object[]} - array of resolved rule objects
 */
export function resolveSpecialRules(rulesString, isDraft = false) {
  if (!rulesString || !rulesString.trim()) return [];

  const index = isDraft ? ALL_RULE_INDEX : STABLE_RULE_INDEX;
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
export function resolveMount(mountName) {
  if (!mountName) return null;
  return findMount(mountName);
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

  // Ridden monster: use mount's natural armour save if it's better than the rider's
  // (including any shield or equipment bonus already accumulated in modifier).
  // Exception: magic armour items provide a specific save that takes precedence.
  if (mount?.as) {
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

/**
 * Compute ward save from magic items and special rules
 */
export function computeWard(magicItems, specialRules) {
  // Check magic items
  for (const item of magicItems) {
    if (item.ward) return item.ward;
  }

  // Check special rules — Blessings of the Lady and The Grail Vow both grant 6+
  for (const rule of specialRules) {
    if (WARD_RULES.has(rule.id)) return WARD_RULES.get(rule.id);
  }

  return null;
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
 * Compute magic resistance from stats, magic items, and special rules
 */
export function computeMR(magicItems, specialRules, stats) {
  let total = 0;

  // Direct lookup from units.js stat profile
  if (stats?.[0]?.["Magic-Res"]) total += parseInt(stats[0]["Magic-Res"]);

  // Check magic items
  for (const item of magicItems) {
    if (item.mr) total += parseInt(item.mr);
  }

  return total !== 0 ? `${total}` : null;
}

const RANGED_WEAPON_NAMES = [
  "javelin",
  "bow",
  "crossbow",
  "handgun",
  "pistol",
  "sling",
  "throwing",
  "bolt thrower",
  "cannon",
  "mortar",
  "catapult",
  "harpoon",
  "breath",
];

/**
 * Compute whether a unit has poisoned attacks for combat (not ranged-only)
 */
export function computePoisonedAttacks(specialRules) {
  for (const rule of specialRules) {
    const match = rule.displayName?.match(
      /Poisoned Attacks(?:\s*\(([^)]+)\))?/i,
    );
    if (!match) continue;
    if (!match[1]) return true;
    const qualifier = match[1].toLowerCase();
    return !RANGED_WEAPON_NAMES.some((w) => qualifier.includes(w));
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
