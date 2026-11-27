import { fromOwb } from "./parsers/from-owb.js";
import { fromNewRecruit } from "./parsers/from-new-recruit.js";
import {
  getArmy,
  getArmySource,
  saveArmySource,
  clearArmy,
  applyActiveLores,
} from "./state.js";

/**
 * Detect the army list format and delegate to the appropriate converter
 * - OWB format: has "army" and direct category arrays (characters, core, special, etc.)
 * - New Recruit format: has roster.forces nested structure
 */
export function parseArmyList(json) {
  // Detect New Recruit format
  if (json?.roster?.forces && Array.isArray(json.roster.forces)) {
    return fromNewRecruit(json);
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
    "Unrecognised army list format. Expected OWB or New Recruit format.",
  );
}

/**
 * Parse a newly imported army file and store the file itself. Clears any
 * previous army along with its spell, lore and character choices.
 */
export function importArmy(json) {
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

export function getCasters(army) {
  if (!army) return [];
  return army.units.filter((u) => u.isCaster);
}

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
