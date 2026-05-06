import {
  getScores,
  getRound,
  getPhaseIndex,
  getIsOpponentTurn,
  getFirstTurn,
  getTimings,
  getDeploymentTime,
  resetGame,
  saveFirstTurn,
  getScenarioOptions,
} from "../state.js";
import { getAllSubPhases, PHASES } from "../phases.js";
import { navigate } from "../navigate.js";
import { getApp, renderScreen } from "./_app.js";
import { renderScoreTable } from "./scoring-table.js";

const allSubPhases = getAllSubPhases();

export function renderGameOverScreen(army) {
  renderScreen(() => {
    const scores = getScores();
    const round = getRound();
    const firstTurn = getFirstTurn();
    const timings = getTimings();
    const deploymentTime = getDeploymentTime();
    const scenarioOpts = getScenarioOptions();

    const {
      html: tableHtml,
      totalYou,
      totalOpponent,
      noObjectives,
      scoreLabel,
    } = renderScoreTable({
      scores,
      round,
      firstTurn,
      turnKey: null,
      timings,
      deploymentTime,
      scenarioOpts,
      renderScoreCells({ s, noObjectives: noObj }) {
        if (noObj) return "";
        return `<td class="px-3 py-2 text-wh-text font-bold">${s.you}</td>
                  <td class="px-3 py-2 text-wh-text font-bold">${s.opponent}</td>`;
      },
    });

    getApp().innerHTML = `
      <div class="min-h-dvh flex flex-col">
        <header class="bg-wh-surface border-b border-wh-border p-3">
          <div class="flex items-center justify-between">
            <button id="back-btn" class="text-wh-muted hover:text-wh-accent text-sm transition-colors">&#8592; Back</button>
            <h1 class="text-lg font-bold text-wh-text">Game Over</h1>
            <div></div>
          </div>
        </header>
  
        <main class="flex-1 overflow-y-auto p-4">
          <div class="max-w-2xl mx-auto">
            <h3 class="text-lg font-bold text-wh-text mb-4">${scoreLabel}</h3>
            ${
              noObjectives
                ? ""
                : `<div class="grid grid-cols-2 gap-4 mb-6">
              <div class="bg-wh-surface rounded-lg border border-wh-border p-4 text-center">
                <div class="text-xs uppercase tracking-wider text-wh-muted mb-1">Your Total</div>
                <div class="text-4xl font-black text-wh-accent">${totalYou}</div>
              </div>
              <div class="bg-wh-surface rounded-lg border border-wh-border p-4 text-center">
                <div class="text-xs uppercase tracking-wider text-wh-muted mb-1">Opponent Total</div>
                <div class="text-4xl font-black text-wh-red">${totalOpponent}</div>
              </div>
            </div>`
            }
  
            <div class="mb-6">${tableHtml}</div>
  
            ${
              scenarioOpts.baggageTrains
                ? `
            <div class="bg-wh-surface rounded-lg border border-wh-border p-4 mb-4">
              <h3 class="text-sm font-bold text-wh-text mb-2">Baggage Trains</h3>
              <table class="w-full text-xs">
                <thead><tr class="text-left text-wh-muted">
                  <th class="pb-1 pr-2 font-medium">Condition</th>
                  <th class="pb-1 font-medium text-right">VP</th>
                </tr></thead>
                <tbody>
                  <tr><td class="py-0.5 pr-2 text-wh-text">Control your supply train</td><td class="py-0.5 font-mono text-wh-accent text-right">100</td></tr>
                  <tr><td class="py-0.5 pr-2 text-wh-text">Destroy opponent's supply train</td><td class="py-0.5 font-mono text-wh-accent text-right">250</td></tr>
                </tbody>
              </table>
            </div>`
                : ""
            }
  
            ${
              scenarioOpts.specialFeatures
                ? `
            <div class="bg-wh-surface rounded-lg border border-wh-border p-4 mb-4">
              <h3 class="text-sm font-bold text-wh-text mb-2">Special Features</h3>
              <table class="w-full text-xs">
                <thead><tr class="text-left text-wh-muted">
                  <th class="pb-1 pr-2 font-medium">Condition</th>
                  <th class="pb-1 font-medium text-right">VP</th>
                </tr></thead>
                <tbody>
                  <tr><td class="py-0.5 pr-2 text-wh-text">Control the feature at game end</td><td class="py-0.5 font-mono text-wh-accent text-right">200</td></tr>
                </tbody>
              </table>
            </div>`
                : ""
            }
  
            ${
              scenarioOpts.domination
                ? `
            <div class="bg-wh-surface rounded-lg border border-wh-border p-4 mb-4">
              <h3 class="text-sm font-bold text-wh-text mb-2">Domination</h3>
              <p class="text-wh-muted text-xs mb-2">Score each board quarter separately. Winner = higher Unit Strength (fleeing units don't count).</p>
              <table class="w-full text-xs">
                <thead><tr class="text-left text-wh-muted">
                  <th class="pb-1 pr-2 font-medium">Condition</th>
                  <th class="pb-1 font-medium text-right">VP</th>
                </tr></thead>
                <tbody>
                  <tr><td class="py-0.5 pr-2 text-wh-text">Control a quarter</td><td class="py-0.5 font-mono text-wh-accent text-right">100</td></tr>
                  <tr><td class="py-0.5 pr-2 text-wh-text">2:1 US advantage in a quarter</td><td class="py-0.5 font-mono text-wh-accent text-right">+50</td></tr>
                  <tr><td class="py-0.5 pr-2 text-wh-text">Opponent has 0 US in a quarter</td><td class="py-0.5 font-mono text-wh-accent text-right">+100</td></tr>
                </tbody>
              </table>
              <div class="border-t border-wh-border mt-3 pt-3">
                <table class="w-full text-xs">
                  <thead><tr class="text-left text-wh-muted">
                    <th class="pb-1 pr-2 font-medium">Unit</th>
                    <th class="pb-1 font-medium text-right">US</th>
                  </tr></thead>
                  <tbody>
                    ${army.units
                      .slice()
                      .sort(
                        (a, b) => (b.unitStrength ?? 0) - (a.unitStrength ?? 0),
                      )
                      .map(
                        (u) =>
                          `<tr><td class="py-0.5 pr-2 text-wh-text">${u.name}</td><td class="py-0.5 font-mono text-wh-accent text-right">${u.unitStrength ?? 0}</td></tr>`,
                      )
                      .join("")}
                  </tbody>
                </table>
              </div>
            </div>`
                : ""
            }
          </div>
        </main>
  
        <footer class="sticky bottom-0 bg-wh-surface border-t border-wh-border p-3">
          <div class="max-w-2xl mx-auto flex gap-3">
            <button id="back-btn-footer"
              class="flex-1 py-3 rounded-lg font-semibold text-lg transition-colors bg-wh-card text-wh-text hover:bg-wh-border">
              &#8592; Back
            </button>
            <button id="new-game-btn"
              class="flex-1 py-3 rounded-lg font-bold text-lg transition-colors bg-wh-accent text-wh-bg hover:bg-wh-accent-dim">
              New Game &#10226;
            </button>
          </div>
        </footer>
      </div>
    `;

    bindGameOverActions();
  });
}

function bindGameOverActions() {
  const goBack = () => {
    const round = getRound();
    const phaseIdx = getPhaseIndex();
    if (getIsOpponentTurn()) {
      navigate(`/opponent/${round}/${PHASES[phaseIdx].id}`);
    } else {
      const { phase, subPhase } = allSubPhases[phaseIdx];
      navigate(`/game/${round}/${phase.id}/${subPhase.id}`);
    }
  };

  document.getElementById("back-btn")?.addEventListener("click", goBack);
  document.getElementById("back-btn-footer")?.addEventListener("click", goBack);

  document.getElementById("new-game-btn")?.addEventListener("click", () => {
    resetGame();
    saveFirstTurn(null);
    navigate("/");
  });
}
