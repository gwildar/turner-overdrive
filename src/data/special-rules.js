/**
 * Special rules registry.
 * Universal rules live in special-rules/common.js.
 * Faction-specific rules live in their own files under special-rules/.
 */

import { SUPPLEMENT_RULES } from "./supplements/index.js";
import COMMON from "./special-rules/common.js";
import UNDEAD from "./special-rules/undead.js";
import BEASTMEN from "./special-rules/beastmen.js";
import GREENSKINS from "./special-rules/greenskins.js";
import CHAOS_MARKS from "./special-rules/chaos-marks.js";
import DAEMONS from "./special-rules/daemons.js";
import DWARFS from "./special-rules/dwarfs.js";
import VAMPIRE_COUNTS from "./special-rules/vampire-counts.js";
import TOMB_KINGS from "./special-rules/tomb-kings.js";
import GRAND_CATHAY from "./special-rules/grand-cathay.js";

export const SPECIAL_RULES = [
  ...COMMON,
  ...UNDEAD,
  ...BEASTMEN,
  ...GREENSKINS,
  ...CHAOS_MARKS,
  ...DAEMONS,
  ...DWARFS,
  ...VAMPIRE_COUNTS,
  ...TOMB_KINGS,
  ...GRAND_CATHAY,
  ...SUPPLEMENT_RULES,
];

/**
 * Lore Familiar (Arcane Item, 30 pts)
 *
 * "The owner of a Lore Familiar does not randomly generate their spells.
 *  Instead, they may choose which spells they know from their chosen lore
 *  (including that lore's signature spell)."
 *
 * This affects army list building / spell selection — not a specific game phase.
 * Included here for reference when building spell-selection UI.
 */
export const LORE_FAMILIAR = {
  name: "Lore Familiar",
  type: "Arcane Item",
  points: 30,
  description:
    "The Wizard does not randomly generate spells. Instead, they choose which spells they know from their chosen lore (including the signature spell).",
};

/**
 * Arcane Familiar (Arcane Item, 15 pts)
 *
 * The bearer gains access to spells from two Lores of Magic.
 * Roll for each Lore separately; re-roll duplicates.
 * May discard one randomly generated spell and replace with that Lore's signature spell.
 */
export const ARCANE_FAMILIAR = {
  name: "Arcane Familiar",
  type: "Arcane Item",
  points: 15,
  description:
    "Bearer has access to two Lores of Magic. Roll for each separately, re-roll duplicates. May swap one random spell for that Lore's signature spell.",
};

// ─── Helpers ────────────────────────────────────────────────────────

/**
 * Look up a specific rule by name (case-insensitive).
 * @param {string} name
 * @returns {object|undefined}
 */
export function findRule(name) {
  const lower = name.toLowerCase();
  return SPECIAL_RULES.find((r) => r.id.toLowerCase() === lower);
}
