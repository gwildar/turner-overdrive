/**
 * Special rules registry.
 * Universal rules (and rules several armies share) live in
 * special-rules/common.js; each army's own rules in special-rules/<army>.js,
 * sorted by the army tow.whfb.app gives for the rule.
 */

import { SUPPLEMENT_RULES } from "./supplements/index.js";
import COMMON from "./special-rules/common.js";
import CHAOS_MARKS from "./special-rules/chaos-marks.js";
import BEASTMEN from "./special-rules/beastmen.js";
import BRETONNIA from "./special-rules/bretonnia.js";
import CHAOS_DWARFS from "./special-rules/chaos-dwarfs.js";
import DAEMONS from "./special-rules/daemons.js";
import DARK_ELVES from "./special-rules/dark-elves.js";
import DWARFS from "./special-rules/dwarfs.js";
import EMPIRE from "./special-rules/empire.js";
import GRAND_CATHAY from "./special-rules/grand-cathay.js";
import GREENSKINS from "./special-rules/greenskins.js";
import HIGH_ELVES from "./special-rules/high-elves.js";
import LIZARDMEN from "./special-rules/lizardmen.js";
import OGRE_KINGDOMS from "./special-rules/ogre-kingdoms.js";
import SKAVEN from "./special-rules/skaven.js";
import TOMB_KINGS from "./special-rules/tomb-kings.js";
import VAMPIRE_COUNTS from "./special-rules/vampire-counts.js";
import WARRIORS_OF_CHAOS from "./special-rules/warriors-of-chaos.js";
import WOOD_ELVES from "./special-rules/wood-elves.js";

// Universal rules first, then each army's own (one file per army; the
// Marks of Chaos are shared by Warriors, Beastmen and Daemons)
export const CORE_RULES = [
  ...COMMON,
  ...CHAOS_MARKS,
  ...BEASTMEN,
  ...BRETONNIA,
  ...CHAOS_DWARFS,
  ...DAEMONS,
  ...DARK_ELVES,
  ...DWARFS,
  ...EMPIRE,
  ...GRAND_CATHAY,
  ...GREENSKINS,
  ...HIGH_ELVES,
  ...LIZARDMEN,
  ...OGRE_KINGDOMS,
  ...SKAVEN,
  ...TOMB_KINGS,
  ...VAMPIRE_COUNTS,
  ...WARRIORS_OF_CHAOS,
  ...WOOD_ELVES,
];

export const SPECIAL_RULES = [...CORE_RULES, ...SUPPLEMENT_RULES];

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
