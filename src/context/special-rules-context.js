import { panel } from "./panel.js";
import { subPhaseIdsFor } from "../phases.js";
import { getRound } from "../state.js";
import { normaliseRuleName } from "../helpers.js";
import { getRuleset } from "../parsers/resolve.js";

/** A rule with every phase as a { subPhaseId, description, … } entry. */
const withPhaseEntries = (rule) => ({
  ...rule,
  phases: rule.phases.map((entry) =>
    typeof entry === "string"
      ? {
          subPhaseId: entry,
          description: rule.description,
          yourTurnOnly: rule.yourTurnOnly,
          opponentOnly: rule.opponentOnly,
          fromRound: rule.fromRound,
        }
      : entry,
  ),
});

/** The rules data the army was resolved with (core + its supplement version). */
const armyRuleset = (army) =>
  getRuleset(army.composition, army.supplementVersion);

const TROOP_TYPE_RULES = {
  MCr: ["Large Target"],
  Be: ["Large Target", "Lumbering"],
};

function injectMountRules(unitRules, unit) {
  if (!unit.mount) return;
  const mount = unit.mount;
  for (const rule of mount.rules) {
    unitRules.push(rule);
  }
}

function injectTerrorFear(unitRules) {
  if (
    unitRules.some((r) => normaliseRuleName(r).toLowerCase() === "terror") &&
    !unitRules.some((r) => normaliseRuleName(r).toLowerCase() === "fear")
  ) {
    unitRules.push("Fear");
  }
}

function injectUnitTroopTypeRules(unitRules, unit) {
  const troopType = unit.stats?.[0]?.troopType?.[0];
  if (!troopType) return;
  const rules = TROOP_TYPE_RULES[troopType] || [];
  for (const rule of rules) {
    if (
      !unitRules.some(
        (r) => normaliseRuleName(r).toLowerCase() === rule.toLowerCase(),
      )
    ) {
      unitRules.push(rule);
    }
  }
}

/** @param {import("../types").Unit} unit */
function buildUnitRules(unit) {
  // Resolved rule objects from the unit (already supplement-version-aware)
  const resolvedRules = new Map();
  for (const rule of unit.specialRules || []) {
    if (rule.id && rule.phases) {
      resolvedRules.set(
        normaliseRuleName(rule.displayName).toLowerCase(),
        rule,
      );
    }
  }

  const unitRules = [];

  for (const rule of unit.specialRules || []) {
    if (rule.displayName) unitRules.push(rule.displayName);
  }

  if (Array.isArray(unit.weapons)) {
    for (const weapon of unit.weapons) {
      if (weapon.name) {
        unitRules.push(weapon.name);
      }
    }
  }

  if (Array.isArray(unit.shootingWeapons)) {
    for (const weapon of unit.shootingWeapons) {
      if (weapon.name) {
        unitRules.push(weapon.name);
      }
      if (weapon.rules?.length) {
        unitRules.push(...weapon.rules);
      }
    }
  }

  injectUnitTroopTypeRules(unitRules, unit);
  injectMountRules(unitRules, unit);
  injectTerrorFear(unitRules);
  return { unitRules, resolvedRules };
}

function renderRulesBlock(grouped, title) {
  const entries = Object.values(grouped);
  if (entries.length === 0) return "";
  return panel(
    "rules",
    title,
    `
      <div class="space-y-2">
        ${entries
          .map(
            (g) => `
  <div class="p-2 rounded bg-wh-card text-sm">
    <span class="text-xs bg-wh-accent/20 text-wh-accent px-1.5 py-0.5 rounded">${g.ruleName}</span>
    <p class="text-wh-muted text-xs mt-1">${g.description}</p>
    ${
      g.table
        ? `
      <table class="w-full text-xs mt-2 border border-wh-border">
      <thead>
        <tr class="text-left text-wh">
          ${Object.keys(g.table[0] || {})
            .map((key) => `<th class="p-2 border border-wh-border">${key}</th>`)
            .join("")}
        </tr>
      </thead>
      <tbody>
        ${g.table
          .map(
            (row) => `
            <tr>
              ${Object.values(row)
                .map(
                  (val) =>
                    `<td class="p-2 text-wh-muted align-top border border-wh-border">${val}</td>`,
                )
                .join("")}
            </tr>
          `,
          )
          .join("")}
      </tbody>
    </table>
  `
        : ""
    }
    <p class="text-wh-text text-xs mt-1">${g.units.join(", ")}</p>
  </div>
`,
          )
          .join("")}
      </div>
  `,
  );
}

/**
 * Find the rule entries for a rule name. The unit's own resolved rule wins —
 * it was resolved with the army's supplement version, and a passive one has
 * no reminders. Names the unit didn't resolve (weapons, weapon rules, troop
 * types, mount rules) are looked up in the army's ruleset, so a standard army
 * never picks up a supplement's version of a rule.
 */
function findRulesForName(normName, resolvedRules, ruleset) {
  const key = normName.toLowerCase();
  const rule = resolvedRules.get(key) ?? ruleset.ruleIndex.get(key);
  return rule?.phases?.length ? [withPhaseEntries(rule)] : [];
}

/**
 * Every step entry of every special rule in the army, with the unit that
 * has it: `{ unit, rule, phase }`, where `phase` is a `{ subPhaseId,
 * description, … }` entry. The screens below filter this one walk.
 * @param {import("../types").Army} army
 */
function* ruleEntries(army) {
  const ruleset = armyRuleset(army);
  for (const unit of army.units) {
    const { unitRules, resolvedRules } = buildUnitRules(unit);
    for (const ruleName of unitRules) {
      const normName = normaliseRuleName(ruleName);
      for (const rule of findRulesForName(normName, resolvedRules, ruleset))
        for (const phase of rule.phases) yield { unit, rule, phase };
    }
  }
}

/** Entries grouped by rule and text, listing the units that have each */
function groupByRule(entries) {
  const grouped = {};
  for (const { unit, rule, phase } of entries) {
    const key = `${rule.displayName}||${phase.description}`;
    grouped[key] ??= {
      ruleName: rule.displayName,
      description: phase.description,
      table: phase.table ?? null,
      units: [],
    };
    if (!grouped[key].units.includes(unit.name))
      grouped[key].units.push(unit.name);
  }
  return grouped;
}

/** Whether a step would show any special rules (steps with none are skipped) */
export function hasSpecialRulesForSubPhase(army, subPhaseId) {
  const ids = subPhaseIdsFor(subPhaseId);
  for (const { phase } of ruleEntries(army))
    if (ids.includes(phase.subPhaseId)) return true;
  return false;
}

/** Whether your Start of Turn step has special rules this round */
export function hasStartOfTurnRules(army, round) {
  for (const { phase } of ruleEntries(army))
    if (
      phase.subPhaseId === "start-of-turn" &&
      !(phase.fromRound && round < phase.fromRound) &&
      !phase.opponentOnly
    )
      return true;
  return false;
}

/** Special rules for one of your steps */
export function renderSpecialRulesContext(army, subPhase) {
  const round = getRound();
  const ids = subPhaseIdsFor(subPhase.id).filter(
    (id) => !(army.skipPhases || []).includes(id),
  );
  const entries = [...ruleEntries(army)].filter(
    ({ phase }) =>
      ids.includes(phase.subPhaseId) &&
      !(phase.fromRound && round < phase.fromRound) &&
      !phase.opponentOnly,
  );
  return renderRulesBlock(groupByRule(entries), "Special Rules This Step");
}

/** Special rules for a whole phase of the opponent's turn, step by step */
export function renderSpecialRulesForPhase(army, phase) {
  const round = getRound();
  const all = [...ruleEntries(army)].filter(
    ({ phase: p }) => !(p.fromRound && round < p.fromRound) && !p.yourTurnOnly,
  );
  const inStepOrder = phase.subPhases.flatMap((sub) => {
    const ids = subPhaseIdsFor(sub.id);
    return all.filter(({ phase: p }) => ids.includes(p.subPhaseId));
  });
  return renderRulesBlock(groupByRule(inStepOrder), "Special Rules This Phase");
}
