import { getCharacterAssignments } from "../state.js";

/** Army list categories that hold characters */
export const CHARACTER_CATEGORIES = new Set(["characters", "lords", "heroes"]);

/** @param {import("../types").Unit} unit */
export function isCharacter(unit) {
  return CHARACTER_CATEGORIES.has(unit.category);
}

/**
 * Which characters have joined which units (chosen on the Unit Assignment
 * screen).
 *
 *   const { isJoined, joinedTo } = joinedCharacters(army);
 *   if (isJoined(unit.id)) continue;       // shown with their unit instead
 *   for (const char of joinedTo(unit.id))  // characters with this unit
 *
 * @param {import("../types").Army} army
 */
export function joinedCharacters(army) {
  const unitById = new Map(army.units.map((u) => [u.id, u]));
  const joinedIds = new Set();
  /** @type {Map<string, import("../types").Unit[]>} */
  const byHost = new Map();
  for (const [charId, hostId] of Object.entries(getCharacterAssignments())) {
    if (!hostId) continue;
    joinedIds.add(charId);
    const char = unitById.get(charId);
    if (!char) continue;
    byHost.set(hostId, [...(byHost.get(hostId) ?? []), char]);
  }
  return {
    /** @param {string} unitId */
    isJoined: (unitId) => joinedIds.has(unitId),
    /** @param {string} hostId @returns {import("../types").Unit[]} */
    joinedTo: (hostId) => byHost.get(hostId) ?? [],
  };
}
