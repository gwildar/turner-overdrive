/**
 * Magic items registry.
 * Universal items (available to all armies) live in magic-items/common.js.
 * Faction-specific items live in their own files under magic-items/.
 *
 * Each item has:
 *   name        – canonical name
 *   type        – weapon | armour | talisman | arcane-item | enchanted-item | banner
 *   points      – points cost
 *   effect      – full rules text
 *   phases      – array of phase IDs where the item is relevant (matches phases.js)
 *   extremely   – true if the item is an "Extremely Common" magic item (no duplicate limit)
 *   armourBase  – optional, base armour value (e.g. 5 for heavy armour)
 *   armourMod   – optional, modifier to armour save (negative = better)
 *   strengthMod – optional, modifier to Strength
 *
 * Source: https://tow.whfb.app/magic-items
 */

import { SUPPLEMENT_ITEMS } from "./supplements/index.js";
import COMMON from "./magic-items/common.js";
import DARK_ELVES from "./magic-items/dark-elves.js";
import BRETONNIA from "./magic-items/bretonnia.js";
import VAMPIRE_COUNTS from "./magic-items/vampire-counts.js";
import LIZARDMEN from "./magic-items/lizardmen.js";
import CHAOS_DWARFS from "./magic-items/chaos-dwarfs.js";
import WOOD_ELVES from "./magic-items/wood-elves.js";
import ORCS_AND_GOBLINS from "./magic-items/orcs-and-goblins.js";
import WARRIORS_OF_CHAOS from "./magic-items/warriors-of-chaos.js";
import EMPIRE from "./magic-items/empire.js";
import HIGH_ELVES from "./magic-items/high-elves.js";
import BEASTMEN from "./magic-items/beastmen.js";
import DWARFS from "./magic-items/dwarfs.js";
import SKAVEN from "./magic-items/skaven.js";
import OGRE_KINGDOMS from "./magic-items/ogre-kingdoms.js";
import TOMB_KINGS from "./magic-items/tomb-kings.js";
import GRAND_CATHAY from "./magic-items/grand-cathay.js";
import DAEMONS_OF_CHAOS from "./magic-items/daemons-of-chaos.js";

export const MAGIC_ITEMS = [
  ...COMMON,
  ...DARK_ELVES,
  ...BRETONNIA,
  ...VAMPIRE_COUNTS,
  ...LIZARDMEN,
  ...CHAOS_DWARFS,
  ...WOOD_ELVES,
  ...ORCS_AND_GOBLINS,
  ...WARRIORS_OF_CHAOS,
  ...EMPIRE,
  ...HIGH_ELVES,
  ...BEASTMEN,
  ...DWARFS,
  ...SKAVEN,
  ...OGRE_KINGDOMS,
  ...TOMB_KINGS,
  ...GRAND_CATHAY,
  ...DAEMONS_OF_CHAOS,
  ...SUPPLEMENT_ITEMS,
];

/**
 * Look up a magic item by name (case-insensitive).
 */
export function findMagicItem(name) {
  const lower = name.toLowerCase();
  return MAGIC_ITEMS.find((item) => item.name.toLowerCase() === lower) ?? null;
}

/**
 * Return all magic items relevant to a given phase ID.
 */
export function itemsForPhase(phaseId) {
  return MAGIC_ITEMS.filter((item) => item.phases.includes(phaseId));
}

/**
 * Return all magic items of a given type.
 */
export function itemsByType(type) {
  return MAGIC_ITEMS.filter((item) => item.type === type);
}
