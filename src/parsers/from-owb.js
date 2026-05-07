/**
 * Converter from OWB (.owb.json) export format to canonical army schema.
 * This is a refactored version of the logic from army.js, adapted to return
 * the enriched canonical schema instead of the intermediate parsed format.
 */

import { LORE_NAME_TO_KEY } from "../data/spells.js";
import {
  resolveWeapons,
  resolveShootingWeapons,
  resolveMagicItems,
  resolveSpecialRules,
  resolveMount,
  resolveStats,
  deriveSpellSelectionMode,
  computeArmourSave,
  computeWard,
  computeRegen,
  computeMR,
  computePoisonedAttacks,
  computeStomp,
  computeImpactHits,
  computeUnitStrength,
} from "./resolve.js";
import {
  ARMY_COMPOSITIONS,
  ARMY_PHASE_CONFIG,
} from "../data/army-compositions.js";
import { MAGIC_ITEMS } from "../data/magic-items.js";
import { getSupplementsEnabled } from "../state.js";

const MAGIC_ITEM_NAMES = new Set(MAGIC_ITEMS.map((i) => i.name.toLowerCase()));

/** Returns name_en values for all active items in an array (safe if arr is not an array). */
function collectActive(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.filter((item) => item.active).map((item) => item.name_en);
}

function formatFaction(armySlug) {
  if (!armySlug) return "Unknown Faction";
  return armySlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Calculate unit points from OWB raw data
 */
function calculateUnitPoints(raw) {
  let pts = (raw.points || 0) * (raw.strength || 1);

  const addActivePoints = (items, recurse = false) => {
    if (!Array.isArray(items)) return;
    for (const item of items) {
      if (item.active && item.points) {
        pts += item.perModel ? item.points * (raw.strength || 1) : item.points;
      } else if (item.stackableCount && item.points) {
        pts += item.points * item.stackableCount;
      }
      if (recurse && item.active && Array.isArray(item.options)) {
        addActivePoints(item.options, true);
      }
    }
  };

  addActivePoints(raw.equipment);
  addActivePoints(raw.armor);
  addActivePoints(raw.options, true);
  addActivePoints(raw.mounts);

  // Mount options (e.g. barding)
  if (Array.isArray(raw.mounts)) {
    for (const mount of raw.mounts) {
      if (mount.active) {
        addActivePoints(mount.options);
      }
    }
  }

  if (Array.isArray(raw.command)) {
    for (const cmd of raw.command) {
      if (cmd.active) {
        if (cmd.points) pts += cmd.points;
        if (Array.isArray(cmd.magic?.selected)) {
          for (const item of cmd.magic.selected) {
            pts += item.points || 0;
          }
        }
      }
    }
  }

  if (Array.isArray(raw.items)) {
    for (const slot of raw.items) {
      if (Array.isArray(slot.selected)) {
        for (const item of slot.selected) {
          if (item.perModel && item.perModelPoints != null) {
            pts += item.perModelPoints * (raw.strength || 1);
          } else {
            pts += (item.points || 0) * (item.amount || 1);
          }
        }
      }
    }
  }

  // Detachments (e.g. beasts in a Wood Elf Beast Pack)
  for (const det of raw.detachments || []) {
    pts += (det.points || 0) * (det.strength || 1);
  }

  return pts;
}

/**
 * Parse a single unit from OWB export format to canonical unit
 */
function parseCanonicalUnit(raw, category, armyComposition = "") {
  const isDraft = getSupplementsEnabled();
  // Core identity
  const id = raw.id || "unknown";
  const strength = raw.strength || 1;

  // Gather equipment and armour strings
  const activeOptions = collectActive(raw.options);
  const equipment = [...collectActive(raw.equipment), ...activeOptions];
  const armour = collectActive(raw.armor);

  // Gather special rules text — include active option names so rules like
  // Ambushers, Scouts, The Grail Vow etc. are resolved from the options array.
  // If the unit has composition-specific rules (e.g. ok-renegade overrides),
  // prefer those over the top-level specialRules.
  const compositionRules =
    armyComposition &&
    typeof raw.armyComposition === "object" &&
    raw.armyComposition?.[armyComposition]?.specialRules?.name_en;
  let specialRulesText = compositionRules || raw.specialRules?.name_en || "";
  if (activeOptions.length > 0) {
    const optionRulesText = activeOptions.join(", ");
    specialRulesText = specialRulesText
      ? `${specialRulesText}, ${optionRulesText}`
      : optionRulesText;
  }

  // Gather magic items from various sources
  const magicItemNames = [];

  // From items slots
  if (Array.isArray(raw.items)) {
    for (const slot of raw.items) {
      if (Array.isArray(slot.selected)) {
        for (const item of slot.selected) {
          magicItemNames.push(item.name_en);
        }
      }
    }
  }

  // From equipment (named characters)
  const gearParts = [...equipment, ...armour].flatMap((e) =>
    e.split(",").map((s) => s.trim()),
  );
  for (const part of gearParts) {
    if (MAGIC_ITEM_NAMES.has(part.toLowerCase())) {
      magicItemNames.push(part);
    }
  }

  // From command group magic
  const commandItemNames = new Set();
  if (Array.isArray(raw.command)) {
    for (const cmd of raw.command) {
      if (cmd.active && Array.isArray(cmd.magic?.selected)) {
        for (const mi of cmd.magic.selected) {
          magicItemNames.push(`${mi.name_en} (${cmd.name_en})`);
          commandItemNames.add(mi.name_en.toLowerCase());
        }
      }
    }
  }

  // Look up stats from units.js (source of truth)
  const stats = resolveStats(id, raw.name_en, armyComposition, isDraft);

  // Resolve weapons and items (composition-aware for supplement overrides)
  const weapons = resolveWeapons(
    equipment,
    magicItemNames,
    armyComposition,
    isDraft,
  );
  const shootingWeapons = resolveShootingWeapons([
    ...equipment,
    specialRulesText || "",
    raw.name_en || "",
  ]);
  const magicItems = resolveMagicItems(
    magicItemNames,
    armyComposition,
    isDraft,
  ).map((item) =>
    commandItemNames.has(item.name.toLowerCase()) && item.type !== "banner"
      ? { ...item, championOnly: true }
      : item,
  );
  let specialRules = resolveSpecialRules(specialRulesText, isDraft);

  // Inject rules from supplement unit definition that aren't in the OWB text.
  // Renegade supplement variants (e.g. war-hydra-renegade) may add draft rules
  // (e.g. "If One Head is Severed") that the OWB export doesn't include.
  if (isDraft && armyComposition?.includes("renegade") && stats[0]?.rules) {
    for (const ruleName of stats[0].rules) {
      const resolved = resolveSpecialRules(ruleName, isDraft);
      for (const r of resolved) {
        if (
          r.id &&
          !specialRules.some(
            (sr) =>
              sr.id === r.id ||
              (sr.displayName &&
                sr.displayName.toLowerCase() === r.displayName?.toLowerCase()),
          )
        ) {
          specialRules.push(r);
        }
      }
    }
  }

  // Inject gift/attribute-type items as special rules (e.g. Rune of Khaine from Gifts of Khaine).
  // These items don't appear in magic-items.js but are named special rules (e.g. phases: ["choose-fight"]).
  const MAGIC_ITEM_TYPES = new Set([
    "weapon",
    "armour",
    "talisman",
    "enchanted-item",
    "banner",
    "standard",
    "virtue",
  ]);
  if (Array.isArray(raw.items)) {
    for (const slot of raw.items) {
      for (const item of slot.selected || []) {
        if (!MAGIC_ITEM_TYPES.has(item.type)) {
          const resolved = resolveSpecialRules(item.name_en, isDraft);
          for (const r of resolved) {
            if (
              r.id &&
              !specialRules.some(
                (sr) =>
                  sr.id === r.id ||
                  sr.displayName?.toLowerCase() ===
                    r.displayName?.toLowerCase(),
              )
            ) {
              specialRules.push(r);
            }
          }
        }
      }
    }
  }

  // Inject rules granted by magic items (e.g. Alter Kindred aspects)
  for (const item of magicItems) {
    for (const ruleName of item.grantsRules || []) {
      if (!specialRules.some((r) => r.id === ruleName)) {
        const resolved = resolveSpecialRules(ruleName, isDraft);
        specialRules.push(...resolved);
      }
    }
  }

  // Inject rules granted by special rules (e.g. The Exile's Vow grants Stubborn + Veteran)
  for (const rule of [...specialRules]) {
    for (const ruleName of rule.grantsRules || []) {
      if (!specialRules.some((r) => r.id === ruleName)) {
        const resolved = resolveSpecialRules(ruleName, isDraft);
        specialRules.push(...resolved);
      }
    }
  }

  // Remove rules suppressed by magic items (e.g. Da Thinkin' Orc's 'At removes Impetuous)
  const removedRuleIds = new Set(
    magicItems.flatMap((item) => item.removesRules || []),
  );
  if (removedRuleIds.size > 0) {
    specialRules = specialRules.filter((r) => !removedRuleIds.has(r.id));
  }

  const spellSelectionMode = deriveSpellSelectionMode(magicItems, specialRules);

  // Find the active mount (if any)
  let mountName = null;
  if (Array.isArray(raw.mounts)) {
    const activeMount = raw.mounts.find((m) => m.active);
    if (activeMount && activeMount.name_en !== "On foot") {
      mountName = activeMount.name_en;
    }
  }
  const mount = resolveMount(mountName);

  // Append mount crew shooting weapons (e.g. Scourgerunner Chariot's Ravager Harpoon
  // and Repeater Crossbows are on the crew, not the character's equipment list).
  // Tag with crew BS and name so the shooting display uses crew stats, not character's.
  if (mount?.crew) {
    for (const crew of mount.crew) {
      const crewShooting = resolveShootingWeapons(crew.equipment || []);
      for (const sw of crewShooting) {
        if (!shootingWeapons.some((w) => w.name === sw.name)) {
          sw.crewBS = crew.bs && crew.bs !== "-" ? crew.bs : null;
          sw.crewName = crew.name;
          shootingWeapons.push(sw);
        }
      }
    }
  }

  // Compute saves
  const armourSave = computeArmourSave(
    equipment,
    armour,
    magicItems,
    mount,
    specialRules,
    stats,
  );
  // Flag when a ridden monster's natural AS is strictly better than the rider's
  // equipment save. Used to generate an import warning.
  let armourSaveFromMount = false;
  if (mount?.as !== undefined && armourSave) {
    const mountSave = Math.max(2, Math.min(6, mount.as));
    const riderSave = parseInt(armourSave);
    armourSaveFromMount =
      riderSave === mountSave &&
      (armour.length > 0 ||
        equipment.some((e) => e.toLowerCase().includes("armour")));
    // Only flag if rider's equipment alone would be worse — avoid false positives
    // when rider's own save already equals the mount's (e.g. heavy armour + shield = 4+, mount 4+)
    if (armourSaveFromMount) {
      let riderBase = null;
      for (const a of armour.map((s) => s.toLowerCase())) {
        if (a.includes("full plate") || a.includes("chaos armour")) {
          riderBase = 4;
          break;
        }
        if (a.includes("heavy")) {
          riderBase = 5;
          break;
        }
        if (a.includes("light")) {
          riderBase = 6;
          break;
        }
      }
      if (riderBase !== null) {
        let mod = 0;
        const hasShield =
          equipment.some((e) => e.toLowerCase().includes("shield")) ||
          armour.some((a) => a.toLowerCase().includes("shield"));
        if (hasShield) mod -= 1;
        const riderFinal = riderBase + mod;
        // Flag if rider's save is worse OR equal — equal means the mundane
        // armour is wasted points since the mount's natural save is the same.
        armourSaveFromMount = riderFinal >= mountSave;
      }
    }
  }
  const ward = computeWard(magicItems, specialRules);
  const regen = computeRegen(magicItems, specialRules);
  const magicResistance = computeMR(magicItems, specialRules, stats);
  const poisonedAttacks = computePoisonedAttacks(specialRules);
  // stats[0].Stomps / stats[0]["Impact-Hits"] are authoritative for supplement overrides
  // (e.g. war-hydra-renegade has D3+1 stomps vs legacy D3 in the OWB fixture text).
  const stomp = stats?.[0]?.Stomps ?? computeStomp(mount, specialRules);
  const itemImpactHits =
    magicItems.find((item) => item.impactHits)?.impactHits ?? null;
  const impactHits =
    stats?.[0]?.["Impact-Hits"] ??
    computeImpactHits(mount, specialRules) ??
    itemImpactHits;

  // Command group flags
  const isGeneral =
    raw.command?.some(
      (cmd) => cmd.active && cmd.name_en?.toLowerCase() === "general",
    ) || false;
  const isBSB =
    raw.command?.some(
      (cmd) =>
        cmd.active && cmd.name_en?.toLowerCase() === "battle standard bearer",
    ) || false;
  const hasStandard =
    raw.command?.some(
      (cmd) =>
        cmd.active && cmd.name_en?.toLowerCase().includes("standard bearer"),
    ) || false;
  const hasMusician =
    raw.command?.some(
      (cmd) => cmd.active && cmd.name_en?.toLowerCase().includes("musician"),
    ) || false;
  const hasChampion =
    raw.command?.some((cmd) => {
      if (!cmd.active) return false;
      const n = cmd.name_en?.toLowerCase() ?? "";
      return (
        !n.includes("standard bearer") &&
        !n.includes("musician") &&
        !n.includes("general") &&
        !n.includes("battle standard bearer")
      );
    }) || false;

  // Caster check and faction lores extraction
  // These locals drive lore assignment only (see lores derivation below).
  // They are NOT put on the unit — spell selection behaviour is in spellSelectionMode.
  const hasCursedCoven = specialRules.some((r) => r.id === "cursed coven");
  const hasVortexOfSouls = specialRules.some((r) => r.id === "vortex of souls");
  const lores = hasVortexOfSouls
    ? ["vortex-of-souls"]
    : hasCursedCoven
      ? ["dark-magic", "daemonology"]
      : [...(raw.lores || [])];

  // Detect bound spell weapons in equipment (treated as spells, not shooting weapons)
  const equipmentFlat = [...equipment, specialRulesText || ""]
    .join(", ")
    .toLowerCase();
  if (
    equipmentFlat.includes("engine of the gods") &&
    !lores.includes("engine-of-the-gods")
  ) {
    lores.push("engine-of-the-gods");
  }
  if (
    equipmentFlat.includes("solar engine") &&
    !lores.includes("solar-engine")
  ) {
    lores.push("solar-engine");
  }

  // Remap lores for composition variants.
  // Toggle OFF → v1.5 stable lore (loreRemaps)
  // Toggle ON  → draft v1.5.2.2 lore (draftLoreRemaps), falling back to v1.5
  const compConfig = armyComposition
    ? ARMY_COMPOSITIONS[armyComposition] || {}
    : {};
  const loreRemaps = isDraft
    ? compConfig.draftLoreRemaps || compConfig.loreRemaps || {}
    : compConfig.loreRemaps || {};
  for (let i = 0; i < lores.length; i++) {
    if (loreRemaps[lores[i]]) lores[i] = loreRemaps[lores[i]];
  }

  const isCaster = lores.length > 0;

  // Extract faction lores from special rules
  const factionLores = [];
  if (specialRulesText) {
    const rules = specialRulesText.split(",").map((r) => r.trim());
    for (const rule of rules) {
      const cleaned = rule
        .replace(/\s*\{[^}]*\}/g, "")
        .replace(/\*$/, "")
        .trim()
        .toLowerCase();
      if (
        LORE_NAME_TO_KEY[cleaned] &&
        !factionLores.includes(LORE_NAME_TO_KEY[cleaned])
      ) {
        factionLores.push(LORE_NAME_TO_KEY[cleaned]);
      }
    }
  }
  // Apply same lore remap to faction lores (LORE_NAME_TO_KEY may resolve to
  // draft lore keys like "naggaroth-renegade" regardless of toggle state).
  for (let i = 0; i < factionLores.length; i++) {
    if (loreRemaps[factionLores[i]]) {
      factionLores[i] = loreRemaps[factionLores[i]];
    }
  }

  // Display name: custom name > stat name (singular) > unit name (plural)
  let displayName = raw.name || "";
  if (!displayName && stats?.[0]) {
    displayName = stats[0].Name;
  }
  if (!displayName) {
    displayName = raw.name_en || "Unit";
  }
  displayName = displayName.replace(/\{[^}]*\}/g, "").trim();

  // Parse detachments (e.g. beasts in a Wood Elf Beast Pack)
  const detachments = (raw.detachments || []).map((det) => {
    const detEquipment = collectActive(det.equipment);
    const detStats = resolveStats(
      det.id,
      det.name_en,
      armyComposition,
      isDraft,
    );
    const detWeapons = resolveWeapons(
      detEquipment,
      [],
      armyComposition,
      isDraft,
    );
    const detSpecialRules = resolveSpecialRules(
      det.specialRules?.name_en || "",
      isDraft,
    );
    return {
      id: det.id,
      name: det.name_en,
      strength: det.strength || 1,
      points: det.points || 0,
      stats: detStats,
      weapons: detWeapons,
      specialRules: detSpecialRules,
    };
  });

  // Build canonical unit
  const unit = {
    id,
    name: displayName,
    category,
    strength,
    points: calculateUnitPoints(raw),
    stats,
    weapons,
    shootingWeapons,
    magicItems,
    specialRules,
    mount: mount || null,
    armourSave,
    armourSaveFromMount: armourSaveFromMount || false,
    ward,
    regen,
    magicResistance,
    poisonedAttacks,
    stomp,
    impactHits,
    detachments,
    champions: [], // TODO: parse from stat lines
    crew: [], // TODO: parse from stat lines
    isGeneral,
    isBSB,
    hasChampion,
    hasStandard,
    hasMusician,
    isCaster,
    lores,
    spellSelectionMode,
    activeLore: raw.activeLore || null,
    factionLores,
  };

  unit.unitStrength = computeUnitStrength(unit);
  return unit;
}

/**
 * Convert OWB export JSON to canonical army schema
 */
export function fromOwb(json) {
  const units = [];
  const categories = [
    "characters",
    "core",
    "special",
    "rare",
    "mercenaries",
    "allies",
    "lords",
    "heroes",
  ];

  const composition = json.armyComposition || "";

  // Parse units from each category
  for (const category of categories) {
    const categoryUnits = json[category];
    if (Array.isArray(categoryUnits)) {
      for (const raw of categoryUnits) {
        const unit = parseCanonicalUnit(raw, category, composition);
        units.push(unit);
      }
    }
  }

  // Apply Army of Infamy composition bonuses if applicable
  if (composition && ARMY_COMPOSITIONS[composition]) {
    const bonusRules = ARMY_COMPOSITIONS[composition].rules || [];
    for (const bonus of bonusRules) {
      for (const unitId of bonus.unitIds) {
        for (const unit of units) {
          if (unit.id.startsWith(unitId + ".")) {
            // Inject the bonus rule
            const bonusRule = {
              id: null,
              displayName: bonus.rule,
              phases: [],
            };
            if (!unit.specialRules.some((r) => r.displayName === bonus.rule)) {
              unit.specialRules.push(bonusRule);
            }
          }
        }
      }
    }
  }

  // Build canonical army
  const phaseConfig = ARMY_PHASE_CONFIG[json.army] || {};
  const army = {
    name: json.name || "Unknown Army",
    armySlug: json.army || "",
    faction: formatFaction(json.army),
    points: json.points || 0,
    composition: composition || null,
    owbId: json.id || null,
    units,
    skipPhases: phaseConfig.skipPhases || [],
  };

  return army;
}
