/**
 * Supplement registry.
 * Add new supplements here — they are automatically merged into the core data.
 */

import deRenegade from "./de-renegade.js";
import okRenegade from "./ok-renegade.js";

const supplements = [deRenegade, okRenegade];

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
