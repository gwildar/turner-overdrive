import { navigate } from "../navigate.js";
import {
  getScores,
  updateScore,
  getRound,
  getIsOpponentTurn,
  getFirstTurn,
  getTimings,
  getDeploymentTime,
  getScenarioOptions,
} from "../state.js";
import { renderScoreTable } from "./scoring-table.js";

export function renderScoringUI(army = null) {
  const scores = getScores();
  const round = getRound();
  const isOpponentTurn = getIsOpponentTurn();
  const turnKey = isOpponentTurn ? "opponent" : "you";
  const firstTurn = getFirstTurn();
  const timings = getTimings();
  const deploymentTime = getDeploymentTime();
  const scenarioOpts = getScenarioOptions();

  const currentTurnScores = (scores[round] && scores[round][turnKey]) || {
    you: 0,
    opponent: 0,
  };

  const {
    html: tableHtml,
    noObjectives,
    scoreLabel,
    scoreOptions,
  } = renderScoreTable({
    scores,
    round,
    firstTurn,
    turnKey,
    timings,
    deploymentTime,
    scenarioOpts,
    renderScoreCells({
      r,
      turn,
      s,
      isCurrent,
      isFuture,
      scoreOptions: opts,
      noObjectives: noObj,
    }) {
      if (noObj) return "";
      const scoreSelect = (player) => {
        const val = s[player];
        if (isCurrent)
          return `<td class="px-3 py-2 text-wh-text font-bold">${val}</td>`;
        if (isFuture) return `<td class="px-3 py-2 text-wh-muted">—</td>`;
        return `<td class="px-3 py-2"><select data-hist-round="${r}" data-hist-turn="${turn}" data-hist-player="${player}" class="bg-wh-card border border-wh-border text-wh-text rounded px-1 py-0.5 text-sm outline-none focus:border-wh-accent transition-colors">${opts.map((v) => `<option value="${v}" ${val === v ? "selected" : ""}>${v}</option>`).join("")}</select></td>`;
      };
      return `${scoreSelect("you")}${scoreSelect("opponent")}`;
    },
  });

  return `
    <div class="mt-8 border-t border-wh-border pt-6 pb-4">
      <h3 class="text-lg font-bold text-wh-text mb-4">${scoreLabel}</h3>

      ${
        noObjectives
          ? ""
          : `<div class="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label class="block text-xs uppercase tracking-wider text-wh-muted mb-1">Your Score</label>
          <select id="score-you" class="w-full bg-wh-card border border-wh-border text-wh-text rounded p-2 outline-none focus:border-wh-accent transition-colors">
            ${scoreOptions.map((v) => `<option value="${v}" ${currentTurnScores.you === v ? "selected" : ""}>${v}</option>`).join("")}
          </select>
        </div>
        <div>
          <label class="block text-xs uppercase tracking-wider text-wh-muted mb-1">Opponent Score</label>
          <select id="score-opponent" class="w-full bg-wh-card border border-wh-border text-wh-text rounded p-2 outline-none focus:border-wh-accent transition-colors">
            ${scoreOptions.map((v) => `<option value="${v}" ${currentTurnScores.opponent === v ? "selected" : ""}>${v}</option>`).join("")}
          </select>
        </div>
      </div>`
      }

      ${tableHtml}

      ${
        army?.composition === "orions-wild-hunt"
          ? `
      <div class="mt-4 bg-wh-surface border border-wh-purple/30 rounded-lg p-3">
        <div class="text-xs font-semibold text-wh-purple mb-1">Worthy of Kurnous</div>
        <div class="text-xs text-wh-muted">+100 VP if the nominated model is slain, flees, or is fleeing at game end</div>
      </div>`
          : ""
      }

      <div class="mt-4 flex justify-end">
        <button id="end-game-btn"
          class="px-4 py-2 rounded-lg font-semibold text-sm bg-wh-card border border-wh-border text-wh-muted hover:border-wh-red hover:text-wh-red transition-colors">
          End Game
        </button>
      </div>
    </div>
  `;
}

export function bindScoringEvents(army, renderCallback) {
  const round = getRound();
  const isOpponentTurn = getIsOpponentTurn();

  document.getElementById("score-you")?.addEventListener("change", (e) => {
    updateScore(round, isOpponentTurn, "you", parseInt(e.target.value, 10));
    renderCallback(army);
  });

  document.getElementById("score-opponent")?.addEventListener("change", (e) => {
    updateScore(
      round,
      isOpponentTurn,
      "opponent",
      parseInt(e.target.value, 10),
    );
    renderCallback(army);
  });

  document.querySelectorAll("select[data-hist-round]").forEach((el) => {
    el.addEventListener("change", (e) => {
      const r = parseInt(e.target.dataset.histRound, 10);
      const isOpp = e.target.dataset.histTurn === "opponent";
      const player = e.target.dataset.histPlayer;
      updateScore(r, isOpp, player, parseInt(e.target.value, 10));
      renderCallback(army);
    });
  });

  document.getElementById("end-game-btn")?.addEventListener("click", () => {
    navigate("/game-over");
  });
}
