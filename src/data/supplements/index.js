/**
 * Supplement registry.
 * Add new supplements here — they are automatically merged into the core data.
 *
 * Supplement data is always available. Rules, items, and unit variants are
 * faction-scoped and only activate for armies that have the matching
 * armyComposition (e.g. "de-renegade"). Standard armies are unaffected.
 */

import deRenegade from "./de-renegade.js";
import okRenegade from "./ok-renegade.js";
import skRenegade from "./sk-renegade.js";

const supplements = [deRenegade, okRenegade, skRenegade];

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
