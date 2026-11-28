import { findMount, isDiceMovement } from "./parsers/resolve.js";

/**
 * A random mover's dice (Random Movement): `null` if the unit moves
 * normally. The dice are its Movement characteristic ("3D6", "2D6+1") —
 * its own profiles' or its mount's. Several different dice in one unit
 * (a character on a different random mover): roll each, use the lowest.
 * @param {import("./types").Unit} unit
 * @returns {{ dice: string[] } | null}
 */
export function randomMovement(unit) {
  if (!hasRule(unit, "random movement")) return null;
  const dice = new Set();
  for (const p of unit.stats || [])
    if (isDiceMovement(p.M)) dice.add(String(p.M).replace(/\s+/g, ""));
  if (unit.mount?.mDice) dice.add(unit.mount.mDice);
  // "Random Movement (2D6)" in the list's own rule text
  for (const r of unit.specialRules || []) {
    const m = (r.displayName ?? "").match(/^random movement\s*\(([^)]+)\)/i);
    if (m && isDiceMovement(m[1])) dice.add(m[1].replace(/\s+/g, ""));
  }
  return { dice: [...dice] };
}

/** @param {import("./types").Unit} unit */
export function resolveMovement(unit) {
  // 1. Inline stats from army file
  const inlineMv = unit.stats?.[0]?.M;
  if (inlineMv && inlineMv !== "-") return inlineMv;
  // 2. Mount lookup (characters on mounts)
  if (unit.mount) {
    const mount = findMount(unit.mount);
    if (mount) return String(mount.m);
  }
  // 3. Embedded mount stat line (e.g. Blood Knights with Nightmare)
  if (unit.stats && unit.stats.length > 1) {
    for (let i = 1; i < unit.stats.length; i++) {
      const s = unit.stats[i];
      if (s.M && s.M !== "-" && s.Ld === "-") return s.M;
    }
  }
}

// Phase colour maps — full class names so Tailwind can detect them at build time
export const PHASE_BG = {
  "wh-phase-strategy": "bg-wh-phase-strategy",
  "wh-phase-movement": "bg-wh-phase-movement",
  "wh-phase-shooting": "bg-wh-phase-shooting",
  "wh-phase-combat": "bg-wh-phase-combat",
  "wh-phase-scoring": "bg-wh-phase-scoring",
};
export const PHASE_TEXT = {
  "wh-phase-strategy": "text-wh-phase-strategy",
  "wh-phase-movement": "text-wh-phase-movement",
  "wh-phase-shooting": "text-wh-phase-shooting",
  "wh-phase-combat": "text-wh-phase-combat",
  "wh-phase-scoring": "text-wh-phase-scoring",
};

export function formatSlug(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function normaliseRuleName(name) {
  // Strip parenthetical parameters: "Armour Bane (2)" → "Armour Bane"
  return name.replace(/\s*\(.*?\)\s*$/, "").trim();
}

/**
 * Whether a resolved special rule is the rule `id` ("terror", "random
 * movement"): by its id, its aliases, or its name without a parameter
 * ("Stomp Attacks (D3)" is "stomp attacks").
 * @param {{ id?: string | null, displayName?: string, aliases?: string[] }} rule
 * @param {string} id - lower case
 */
export function isRule(rule, id) {
  if (!rule) return false;
  if (rule.id === id) return true;
  if (normaliseRuleName(rule.displayName ?? "").toLowerCase() === id)
    return true;
  return (rule.aliases ?? []).some((a) => a.toLowerCase() === id);
}

/**
 * Whether a unit has the special rule `id`, its own or its mount's
 * (a character on a Dragon causes Terror).
 * @param {import("./types").Unit} unit
 * @param {string} id - lower case: "terror", "random movement"
 */
export function hasRule(unit, id) {
  return (
    (unit.specialRules ?? []).some((r) => isRule(r, id)) ||
    (unit.mount?.rules ?? []).some(
      (name) => normaliseRuleName(name).toLowerCase() === id,
    )
  );
}

export function ruleMatches(rule, normName) {
  if (rule.id === normName.toLowerCase()) return true;
  if (Array.isArray(rule.aliases)) {
    return rule.aliases.some((a) => a.toLowerCase() === normName.toLowerCase());
  }
  return false;
}

/**
 * Extract fly movement value from a unit's specialRules or mount data.
 * Returns the numeric fly distance, or null if the unit cannot fly.
 */
export function extractFlyMovement(unit) {
  if (unit.mount) {
    const flyRuleStr = (unit.mount.rules || [])
      .map((r) => r || "")
      .find((d) => /^fly\s*\(/i.test(d.trim()));
    const flyMatch = flyRuleStr ? flyRuleStr.match(/\((\d+)\)/) : null;
    return flyMatch ? Number(flyMatch[1]) : null;
  }
  const flyRuleStr = (unit.specialRules || [])
    .map((r) => r.displayName || "")
    .find((d) => /^fly\s*\(/i.test(d.trim()));
  const flyMatch = flyRuleStr ? flyRuleStr.match(/\((\d+)\)/) : null;
  return flyMatch ? Number(flyMatch[1]) : null;
}

/**
 * Resolve the base movement value (in inches) for charge/movement calculation.
 * Prefers mount.m; falls back to the unit's own M stat; returns null if unknown.
 */
export function resolveBaseMv(mountData, statMv) {
  return mountData ? mountData.m : statMv != null ? Number(statMv) : null;
}

export function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
