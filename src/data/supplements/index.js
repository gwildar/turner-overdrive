/**
 * Supplement registry.
 * Add new supplements here — they are automatically merged into the core data.
 *
 * Supplement data is always available. Rules, items, and unit variants are
 * faction-scoped and only activate for armies that have the matching
 * armyComposition (e.g. "de-renegade"). Standard armies are unaffected.
 */

import rlpV15 from "./rlp-v1.5.js";
import deRenegade from "./de-renegade.js";
import okRenegade from "./ok-renegade.js";
import skRenegade from "./sk-renegade.js";

// rlp-v1.5 is always loaded (stable default Renegade rules).
// The draft files (de/ok/sk-renegade) are also always loaded since their
// unit stats, items, and rules only activate for matching armyComposition values.
// Lore selection (v1.5 vs draft CVs) is controlled at import time in from-owb.js.
const supplements = [rlpV15, deRenegade, okRenegade, skRenegade];

export const SUPPLEMENT_UNITS = Object.assign(
  {},
  ...supplements.map((s) => s.units || {}),
);

export const SUPPLEMENT_RULES = supplements.flatMap(
  (s) => s.specialRules || [],
);

export const SUPPLEMENT_ITEMS = supplements.flatMap((s) => s.magicItems || []);

export const SUPPLEMENT_SPELLS = Object.assign(
  {},
  ...supplements.map((s) => s.spells || {}),
);
