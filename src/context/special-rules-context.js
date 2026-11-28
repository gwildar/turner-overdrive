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
  return `
    <div class="bg-wh-surface rounded-lg border border-wh-accent/20 p-4 mb-4">
      <h3 class="text-sm font-bold text-wh-accent mb-3">${title}</h3>
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
    </div>
  `;
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

/** @param {import("../types").Army} army */
export function hasSpecialRulesForSubPhase(army, subPhaseId) {
  const ruleset = armyRuleset(army);
  for (const unit of army.units) {
    const { unitRules, resolvedRules } = buildUnitRules(unit);
    for (const ruleName of unitRules) {
      const normName = normaliseRuleName(ruleName);
      for (const rule of findRulesForName(normName, resolvedRules, ruleset)) {
        const ids = subPhaseIdsFor(subPhaseId);
        if (rule.phases.some((p) => ids.includes(p.subPhaseId))) return true;
      }
    }
  }
  return false;
}

/** @param {import("../types").Army} army */
export function hasStartOfTurnRules(army, round) {
  const ruleset = armyRuleset(army);
  for (const unit of army.units) {
    const { unitRules, resolvedRules } = buildUnitRules(unit);
    for (const ruleName of unitRules) {
      const normName = normaliseRuleName(ruleName);
      for (const rule of findRulesForName(normName, resolvedRules, ruleset)) {
        for (const phase of rule.phases) {
          if (phase.subPhaseId !== "start-of-turn") continue;
          if (phase.fromRound && round < phase.fromRound) continue;
          if (phase.opponentOnly) continue;
          return true;
        }
      }
    }
  }
  return false;
}

/** @param {import("../types").Army} army */
export function renderSpecialRulesContext(army, subPhase) {
  const ruleset = armyRuleset(army);
  const round = getRound();
  const matches = [];
  const ids = subPhaseIdsFor(subPhase.id).filter(
    (id) => !(army.skipPhases || []).includes(id),
  );

  for (const unit of army.units) {
    const { unitRules, resolvedRules } = buildUnitRules(unit);

    for (const ruleName of unitRules) {
      const normName = normaliseRuleName(ruleName);
      for (const rule of findRulesForName(normName, resolvedRules, ruleset)) {
        for (const phase of rule.phases) {
          if (!ids.includes(phase.subPhaseId)) continue;
          if (phase.fromRound && round < phase.fromRound) continue;
          if (phase.opponentOnly) continue;
          matches.push({
            unitName: unit.name,
            ruleName: rule.displayName,
            description: phase.description,
            table: phase.table ?? null,
          });
        }
      }
    }
  }

  const grouped = {};
  for (const m of matches) {
    const key = `${m.ruleName}||${m.description}`;
    if (!grouped[key])
      grouped[key] = {
        ruleName: m.ruleName,
        description: m.description,
        table: m.table,
        units: [],
      };
    if (!grouped[key].units.includes(m.unitName))
      grouped[key].units.push(m.unitName);
  }

  return renderRulesBlock(grouped, "Special Rules This Step");
}

/** @param {import("../types").Army} army */
export function renderSpecialRulesForPhase(army, phase) {
  const ruleset = armyRuleset(army);
  const round = getRound();
  const grouped = {};

  for (const sub of phase.subPhases) {
    for (const unit of army.units) {
      const { unitRules, resolvedRules } = buildUnitRules(unit);

      for (const ruleName of unitRules) {
        const normName = normaliseRuleName(ruleName);
        for (const rule of findRulesForName(normName, resolvedRules, ruleset)) {
          for (const rulePhase of rule.phases) {
            if (!subPhaseIdsFor(sub.id).includes(rulePhase.subPhaseId))
              continue;
            if (rulePhase.fromRound && round < rulePhase.fromRound) continue;
            if (rulePhase.yourTurnOnly) continue;
            const key = `${rule.displayName}||${rulePhase.description}`;
            if (!grouped[key])
              grouped[key] = {
                ruleName: rule.displayName,
                description: rulePhase.description,
                table: rulePhase.table ?? null,
                units: [],
              };
            if (!grouped[key].units.includes(unit.name))
              grouped[key].units.push(unit.name);
          }
        }
      }
    }
  }

  return renderRulesBlock(grouped, "Special Rules This Phase");
}
