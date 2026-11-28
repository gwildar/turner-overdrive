import { fromOwb } from "./parsers/from-owb.js";
import {
  isBattleBuilderList,
  battleBuilderToOwb,
} from "./parsers/from-battle-builder.js";
import {
  getArmy,
  getArmySource,
  saveArmySource,
  clearArmy,
  applyActiveLores,
  saveSupplementVersion,
} from "./state.js";
import { SUPPLEMENT_VERSIONS } from "./data/supplements/index.js";

/**
 * Parse an Old World Builder (.owb.json) export into the canonical army.
 * OWB files have "army" and direct category arrays (characters, core, special, etc.)
 */
export function parseArmyList(json) {
  // New Recruit / BattleScribe rosters were supported in earlier versions
  if (json?.roster?.forces) {
    throw new Error(
      "New Recruit files are no longer supported. Export your list from Old World Builder (.owb.json) or Battle Builder (.bb.json) instead.",
    );
  }

  if (isBattleBuilderList(json)) {
    throw new Error(
      "Battle Builder lists must be converted first (convertArmyFile).",
    );
  }

  // Detect OWB format
  if (
    json?.army !== undefined ||
    json?.characters !== undefined ||
    json?.core !== undefined
  ) {
    return fromOwb(json);
  }

  throw new Error(
    "Unrecognised army list format. Expected an Old World Builder (.owb.json) or Battle Builder (.bb.json) export.",
  );
}

/**
 * An uploaded army file in the shape parseArmyList reads: Old World Builder
 * exports as they are; Battle Builder (.bb.json) exports converted with its
 * catalog, which is loaded only here. The converted list is what's stored.
 */
export async function convertArmyFile(json) {
  if (!isBattleBuilderList(json)) return json;
  const { default: catalog } =
    await import("./data/battle-builder-catalog.json");
  return battleBuilderToOwb(json, catalog);
}

/**
 * Parse a newly imported army file and store the file itself. Clears any
 * previous army along with its spell, lore and character choices.
 */
export function importArmy(json) {
  // A Battle Builder list names its Renegade rules version: use it, when
  // the app has that version, before parsing
  const versions = SUPPLEMENT_VERSIONS[json?.armyComposition] ?? [];
  if (versions.some((v) => v.id === json?.supplementVersion))
    saveSupplementVersion(json.armyComposition, json.supplementVersion);
  const army = parseArmyList(json);
  clearArmy();
  saveArmySource(json);
  return army;
}

/**
 * Load the stored army by re-parsing the imported file, so the current data
 * and settings always apply. Falls back to a parsed army saved by an older
 * version of the app.
 *
 * If the stored file no longer parses (e.g. a format the app has dropped),
 * the army is cleared and the setup screen asks the user to re-upload,
 * rather than every screen failing.
 */
export function loadStoredArmy() {
  const source = getArmySource();
  if (!source) return getArmy();
  try {
    return applyActiveLores(parseArmyList(source));
  } catch (err) {
    console.warn("Stored army could not be parsed and was cleared:", err);
    clearArmy();
    sessionStorage.setItem("tow-recovered", "1");
    return null;
  }
}

/** @param {import("./types").Army} army */
export function getCasters(army) {
  if (!army) return [];
  return army.units.filter((u) => u.isCaster);
}

/** @param {import("./types").Army} army */
export function getShootingUnits(army) {
  if (!army) return [];
  return army.units.filter((u) => {
    // Check if unit has resolved shooting weapons
    if (u.shootingWeapons && u.shootingWeapons.length > 0) {
      return true;
    }

    // Check if unit's mount has breath attack
    if (u.mount) {
      const mountData = u.mount;
      if (mountData?.breath != null) {
        return true;
      }
    }

    return false;
  });
}
