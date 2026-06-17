import { PHASES, getAllSubPhases } from "../phases.js";
import {
  getPhaseIndex,
  getRound,
  getFirstTurn,
  saveFirstTurn,
  resetGame,
  canGoBackToPreviousTurn,
  getStartTime,
  resetStartTime,
  recordCurrentPhaseTime,
  getDisplayMode,
  getScenarioOptions,
} from "../state.js";
import { PHASE_TEXT } from "../helpers.js";
import { renderGameHeader } from "./game-header.js";
import { renderCasterContext } from "../context/caster.js";
import { renderShootingContext } from "../context/shooting.js";
import {
  renderCombatWeaponsContext,
  renderCombatResultContext,
  renderCombatLeadershipContext,
} from "../context/combat-weapons.js";

// -----------------------------------------------------------------------------
// Priority rule definitions – displayed prominently at the top of each phase.
// Extensible: add new entries keyed by subPhase.id.
// -----------------------------------------------------------------------------
const PRIORITY_RULES = {
  "declare-charges": [
    {
      text: "Terror tests!",
      // additional data could be added (e.g., tooltip, icon) in future.
    },
  ],
  conjuration: [
    {
      text: "Dispel remains in play",
    },
  ],
};

/**
 * Render the priority rules for a given sub‑phase.
 * Returns an empty string if none are defined.
 */
// Determine if any unit in the army causes Terror (directly or via mount)
function hasTerrorUnits(army) {
  if (!army?.units) return false;
  return army.units.some((unit) => {
    const unitRules = unit.rules ?? [];
    const mountRules = unit.mount?.rules ?? [];
    return unitRules.includes("Terror") || mountRules.includes("Terror");
  });
}
function renderPriorityRules(subPhase, army) {
  let rules = PRIORITY_RULES[subPhase.id] || [];
  // If this is charge declaration and no unit causes Terror, remove it
  if (subPhase.id === "declare-charges") {
    const hasTerror = hasTerrorUnits(army);
    if (!hasTerror) {
      rules = rules.filter((r) => r.text !== "Terror");
    }
  }
  if (rules.length === 0) return "";
  // Visual style: dark background, white bold text, slight shadow.
  return `<div class="bg-wh-phase-combat text-wh-bg font-bold py-2 px-4 rounded-lg shadow-md mb-4">
    ${rules[0].text}
  </div>`;
}

import { renderChargeContext } from "../context/charge.js";
import { renderMovementStatsContext } from "../context/movement.js";
import { renderRandomMoverContext } from "../context/random-mover.js";
import { renderMagicItemsContext } from "../context/items.js";
import { renderVirtuesContext } from "../context/virtues.js";
import {
  renderSpecialRulesContext,
  hasSpecialRulesForSubPhase,
  hasStartOfTurnRules,
} from "../context/special-rules-context.js";
import { renderScoringUI, bindScoringEvents } from "./scoring.js";
import { renderSpecialFeaturesTable } from "../context/scenario-context.js";
import { navigate } from "../navigate.js";
import { getApp, renderScreen } from "./_app.js";

const allSubPhases = getAllSubPhases();

export function renderGameScreen(army) {
  renderScreen(() => {
    if (getStartTime() === null) {
      resetStartTime();
    }
    const phaseIdx = getPhaseIndex();
    const round = getRound();
    const { phase, subPhase } = allSubPhases[phaseIdx];
    const isFirst = phaseIdx === 0;
    const isLast = phaseIdx === allSubPhases.length - 1;
    const visiblePhases = getVisibleSubPhases(army);
    const visibleStep =
      visiblePhases.findIndex((sp) => sp.subPhase.id === subPhase.id) + 1;
    const visibleTotal = visiblePhases.length;

    const activePhaseIndex = PHASES.findIndex((p) => p.id === phase.id);

    getApp().innerHTML = `
      <div class="min-h-dvh flex flex-col">
        ${renderGameHeader({ army, round, activePhaseIndex, isOpponentTurn: false })}
  
        <!-- Main content -->
        <main class="flex-1 overflow-y-auto p-4">
          <div class="max-w-2xl mx-auto">
            <!-- Phase & sub-phase heading -->
            <div class="mb-4">
              <span class="text-xs uppercase tracking-wider ${PHASE_TEXT[phase.colour]}">${phase.name}</span>
              <h2 class="text-2xl font-bold text-wh-text">${subPhase.name}</h2>
              <span class="text-xs text-wh-muted">Step ${visibleStep} of ${visibleTotal}</span>
            </div>
            ${renderPriorityRules(subPhase, army)}
  
            <!-- Rules -->
            <details class="mb-4">
            <summary>Rules Summary</summary>
            <div class="bg-wh-surface rounded-lg border border-wh-border p-4 mt-1 mb-4">
              <ul class="space-y-2">
                ${subPhase.rules
                  .map((rule) => {
                    if (rule.startsWith("•")) {
                      return `<li class="flex gap-2 text-sm ml-5">
                      <span class="text-wh-muted mt-0.5 shrink-0">•</span>
                      <span>${rule.slice(1).trim()}</span>
                    </li>`;
                    }
                    return `<li class="flex gap-2 text-sm">
                    <span class="${PHASE_TEXT[phase.colour]} mt-0.5 shrink-0">&#9654;</span>
                    <span>${rule}</span>
                  </li>`;
                  })
                  .join("")}
              </ul>
            </div>
            </details>
  
            <!-- Pinned rule -->
            ${
              subPhase.pinnedRule
                ? `<div class="bg-wh-surface rounded-lg border border-wh-border p-4 mb-4">
              <ul class="space-y-2">
                <li class="flex gap-2 text-sm">
                  <span class="${PHASE_TEXT[phase.colour]} mt-0.5 shrink-0">&#9654;</span>
                  <span>${subPhase.pinnedRule}</span>
                </li>
              </ul>
            </div>`
                : ""
            }
  
            <!-- Contextual army info -->
            ${renderPhaseContext(army, phase, subPhase)}
  
          </div>
        </main>
  
        <!-- Footer nav -->
        <footer class="sticky bottom-0 bg-wh-surface border-t border-wh-border p-3">
          <div class="max-w-2xl mx-auto flex gap-3">
            <button id="prev-btn"
              class="flex-1 py-3 rounded-lg font-semibold text-lg transition-colors
              ${
                isFirst && !canGoBackToPreviousTurn()
                  ? "bg-wh-card text-wh-muted cursor-not-allowed opacity-50"
                  : "bg-wh-card text-wh-text hover:bg-wh-border"
              }"
              ${isFirst && !canGoBackToPreviousTurn() ? "disabled" : ""}>
              ${isFirst && canGoBackToPreviousTurn() ? "&#8592; Opponent Turn" : "&#8592; Previous"}
            </button>
            <button id="next-btn"
              class="flex-1 py-3 rounded-lg font-bold text-lg transition-colors
              bg-wh-accent text-wh-bg hover:bg-wh-accent-dim">
              ${isLast ? "End Turn &#10226;" : "Next &#8594;"}
            </button>
          </div>
        </footer>
      </div>
    `;

    bindGameActions(army);
  });
}

const PHASE_CASTER_RENDERERS = {
  shoot: [(a) => renderCasterContext(a, ["magic-missile", "magical-vortex"])],
  "remaining-moves": [(a) => renderCasterContext(a, ["conveyance"])],
  "choose-fight": [(a) => renderCasterContext(a, ["assailment"])],
};

const PHASE_RENDERERS = {
  rally: [(a) => renderCombatLeadershipContext(a, "Rally Leadership")],
  "declare-charges": [renderChargeContext],
  "compulsory-moves": [renderRandomMoverContext],
  "remaining-moves": [renderMovementStatsContext],
  "choose-fight": [renderCombatWeaponsContext],
  "combat-result": [renderCombatResultContext],
  "break-test": [renderCombatLeadershipContext],
};

function renderPhaseContext(army, phase, subPhase) {
  const lightweight = getDisplayMode() === "lightweight";
  let html = "";

  if (subPhase.id === "start-of-turn" && getScenarioOptions().specialFeatures)
    html += renderSpecialFeaturesTable();

  if (subPhase.showCasters)
    html += renderCasterContext(army, ["enchantment", "hex"]);
  for (const renderer of PHASE_CASTER_RENDERERS[subPhase.id] || []) {
    html += renderer(army);
  }

  if (!lightweight && subPhase.showShooting)
    html += renderShootingContext(army);

  const blockedInLightweight = new Set([
    "declare-charges",
    "remaining-moves",
    "choose-fight",
    "combat-result",
    "break-test",
    "rally",
  ]);

  if (!lightweight || !blockedInLightweight.has(subPhase.id)) {
    for (const renderer of PHASE_RENDERERS[subPhase.id] || []) {
      html += renderer(army);
    }
  }
  if (subPhase.id !== "reserve-moves" && subPhase.id !== "scoring") {
    html += renderMagicItemsContext(army, phase.id, subPhase.id);
  }
  if (subPhase.id !== "reserve-moves" && subPhase.id !== "scoring") {
    html += renderVirtuesContext(army, phase.id, subPhase.id);
  }

  if (subPhase.id === "scoring") {
    html += renderScoringUI(army);
  }
  html += renderSpecialRulesContext(army, subPhase);
  if (
    subPhase.id === "command" &&
    army.units.some((u) =>
      (u.specialRules || []).some((r) =>
        r.displayName?.toLowerCase().includes("rallying cry"),
      ),
    )
  )
    html += renderCombatLeadershipContext(army, "Rally Leadership");

  return html;
}

function recordAndNavigate(army, newPhaseIdx, isOpponentTurn, isPrev) {
  recordCurrentPhaseTime(false);
  const newRound =
    isOpponentTurn && !isPrev && getFirstTurn() === "opponent"
      ? getRound() + 1
      : isOpponentTurn && isPrev && getFirstTurn() === "you"
        ? getRound() - 1
        : getRound();
  if (isOpponentTurn) {
    navigate(`/opponent/${newRound}/${PHASES[newPhaseIdx].id}`);
  } else {
    const { phase, subPhase } = allSubPhases[newPhaseIdx];
    navigate(`/game/${newRound}/${phase.id}/${subPhase.id}`);
  }
}

function hasReserveMove(army) {
  return army.units.some((u) =>
    (u.specialRules || []).some((r) => r.id === "reserve move"),
  );
}

function hasCommandContent(army) {
  if (hasSpecialRulesForSubPhase(army, "command")) return true;
  return army.units.some((u) =>
    (u.specialRules || []).some((r) =>
      r.displayName?.toLowerCase().includes("rallying cry"),
    ),
  );
}

export function hasStartOfTurnContent(army) {
  if (getScenarioOptions().specialFeatures) return true;
  const round = getRound();
  if (hasStartOfTurnRules(army, round)) return true;
  return army.units.some((unit) =>
    (unit.magicItems || []).some(
      (item) =>
        item &&
        item.phases?.includes("strategy") &&
        !(item.subPhases && !item.subPhases.includes("start-of-turn")) &&
        !item.opponentOnly,
    ),
  );
}

/**
 * Whether a sub-phase should be skipped for this army (direction-independent).
 * Shared between getVisibleSubPhases and nextVisibleIdx.
 */
function shouldSkipSubPhase(army, subPhaseId) {
  if (subPhaseId === "reserve-moves" && !hasReserveMove(army)) return true;
  if (subPhaseId === "command" && !hasCommandContent(army)) return true;
  if ((army.skipPhases || []).includes(subPhaseId)) return true;
  return false;
}

function getVisibleSubPhases(army) {
  return allSubPhases.filter(({ subPhase }) => {
    if (subPhase.id === "start-of-turn" && !hasStartOfTurnContent(army))
      return false;
    return !shouldSkipSubPhase(army, subPhase.id);
  });
}

function nextVisibleIdx(army, from, direction) {
  let idx = from + direction;
  while (idx >= 0 && idx < allSubPhases.length) {
    const id = allSubPhases[idx].subPhase.id;
    if (shouldSkipSubPhase(army, id)) {
      idx += direction;
      continue;
    }
    // Only skip start-of-turn when navigating forward (user can go back to it)
    if (
      direction > 0 &&
      id === "start-of-turn" &&
      !hasStartOfTurnContent(army)
    ) {
      idx += direction;
      continue;
    }
    return idx;
  }
  return -1;
}

function bindGameActions(army) {
  bindScoringEvents(army, renderGameScreen);

  document.getElementById("prev-btn")?.addEventListener("click", () => {
    const idx = getPhaseIndex();
    const target = nextVisibleIdx(army, idx, -1);
    if (target >= 0) {
      recordAndNavigate(army, target, false, true);
    } else if (canGoBackToPreviousTurn()) {
      recordAndNavigate(army, PHASES.length - 1, true, true);
    }
  });

  document.getElementById("next-btn")?.addEventListener("click", () => {
    const idx = getPhaseIndex();
    const target = nextVisibleIdx(army, idx, 1);
    if (target >= 0) {
      recordAndNavigate(army, target, false, false);
    } else {
      recordAndNavigate(army, 0, true, false);
    }
  });

  document.getElementById("manage-army-btn")?.addEventListener("click", () => {
    navigate("/");
  });

  document.getElementById("new-game-btn")?.addEventListener("click", () => {
    if (confirm("Start a new game? This will reset the round counter.")) {
      resetGame();
      saveFirstTurn(null);
      navigate("/");
    }
  });
}
