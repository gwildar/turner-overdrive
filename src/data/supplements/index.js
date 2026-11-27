/**
 * Supplement registry.
 *
 * Community supplements are versioned per army composition. Each Renegade
 * composition lists the rules versions a player can choose from (Settings →
 * Community Supplements); the first is the default. A version is a stack of
 * supplement data layers, highest priority first, that sit over the core data.
 *
 * Supplement data only ever applies to an army of its own composition and the
 * chosen version: standard armies always use the core data alone. Lookups go
 * through getRuleset() in parsers/resolve.js.
 */

import rlpV15 from "./rlp-v1.5.js";
import deRenegade from "./de-renegade.js";
import okRenegade from "./ok-renegade.js";
import skRenegade from "./sk-renegade.js";
import cdRenegade from "./cd-renegade.js";

/** @typedef {import("../../types").Supplement} Supplement */

/**
 * @typedef {object} SupplementVersion
 * @property {string} id - stored in settings, e.g. "v1.5.2.2"
 * @property {string} label - shown in the version picker
 * @property {Supplement[]} layers - supplement data, highest priority first
 * @property {Record<string, string>} [loreRemaps] - replaces the
 *   composition's loreRemaps when this version is chosen
 */

/** The Renegade Legacy Pack v1.5 PDF: the default for every Renegade army. */
const V1_5 = { id: "v1.5", label: "v1.5 (PDF)", layers: [rlpV15] };

/**
 * A community draft. Anything the draft doesn't redefine falls back to v1.5.
 * @returns {SupplementVersion}
 */
const draft = (id, data, loreRemaps) => ({
  id,
  label: `${id} draft`,
  layers: [data, rlpV15],
  loreRemaps,
});

/** @type {Record<string, SupplementVersion[]>} */
export const SUPPLEMENT_VERSIONS = {
  "de-renegade": [
    V1_5,
    draft("v1.5.2.2", deRenegade, { naggaroth: "naggaroth-renegade" }),
  ],
  "ok-renegade": [
    V1_5,
    draft("v1.5.2.2", okRenegade, { "great-maw": "great-maw-renegade" }),
  ],
  "sk-renegade": [
    V1_5,
    draft("v1.5.2.2", skRenegade, { "horned-rat": "horned-rat-renegade" }),
  ],
  "vc-renegade": [V1_5],
  "lm-renegade": [V1_5],
  "cd-renegade": [V1_5, draft("v1.5.2.2", cdRenegade)],
  "doc-renegade": [V1_5],
};

/** @returns {SupplementVersion[]} the versions on offer for a composition */
export function supplementVersions(composition) {
  return SUPPLEMENT_VERSIONS[composition ?? ""] ?? [];
}

/**
 * The version to use: the requested one if the composition offers it,
 * otherwise its default. Null for compositions without supplements.
 * @returns {SupplementVersion | null}
 */
export function findSupplementVersion(composition, versionId) {
  const versions = supplementVersions(composition);
  return versions.find((v) => v.id === versionId) ?? versions[0] ?? null;
}

const supplements = [rlpV15, deRenegade, okRenegade, skRenegade, cdRenegade];

// ── Per-release lists (used by tests and data checks) ──────────────
export const STABLE_SUPPLEMENT_RULES = rlpV15.specialRules || [];
export const DRAFT_SUPPLEMENT_RULES = [
  ...(deRenegade.specialRules || []),
  ...(okRenegade.specialRules || []),
  ...(skRenegade.specialRules || []),
  ...(cdRenegade.specialRules || []),
];

export const STABLE_SUPPLEMENT_ITEMS = rlpV15.magicItems || [];
export const DRAFT_SUPPLEMENT_ITEMS = [
  ...(deRenegade.magicItems || []),
  ...(okRenegade.magicItems || []),
  ...(skRenegade.magicItems || []),
  ...(cdRenegade.magicItems || []),
];

export const STABLE_SUPPLEMENT_UNITS = Object.assign({}, rlpV15.units || {});
export const DRAFT_SUPPLEMENT_UNITS = Object.assign(
  {},
  deRenegade.units || {},
  okRenegade.units || {},
  skRenegade.units || {},
  cdRenegade.units || {},
);

// ── Everything from every supplement ───────────────────────────────
// For listings and data checks only — never for resolving an army's
// units, rules, items or weapons, which must go through getRuleset().

export const SUPPLEMENT_UNITS = Object.assign(
  {},
  ...supplements.map((s) => s.units || {}),
);

export const SUPPLEMENT_RULES = supplements.flatMap(
  (s) => s.specialRules || [],
);

export const SUPPLEMENT_ITEMS = supplements.flatMap((s) => s.magicItems || []);

// Spell lores are keyed per version ("naggaroth-v1.5", "naggaroth-renegade")
// and chosen by the version's loreRemaps, so they can all be registered.
export const SUPPLEMENT_SPELLS = Object.assign(
  {},
  ...supplements.map((s) => s.spells || {}),
);
