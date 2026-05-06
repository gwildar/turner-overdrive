/**
 * Supplement registry.
 * Add new supplements here — they are automatically merged into the core data.
 *
 * Supplements are opt-in via the "tow-supplements-enabled" localStorage key.
 * Reading localStorage directly here avoids circular imports with state.js.
 */

import deRenegade from "./de-renegade.js";
import okRenegade from "./ok-renegade.js";
import skRenegade from "./sk-renegade.js";

function isEnabled() {
  try {
    const raw = localStorage.getItem("tow-supplements-enabled");
    return raw ? JSON.parse(raw) : false;
  } catch {
    return false;
  }
}

const supplements = isEnabled() ? [deRenegade, okRenegade, skRenegade] : [];

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
