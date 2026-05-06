import { PHASES } from "../phases.js";
import { PHASE_BG } from "../helpers.js";

/**
 * Renders the shared game/opponent-turn header.
 *
 * @param {object} opts
 * @param {object} opts.army            - canonical army object
 * @param {number} opts.round           - current round number
 * @param {number} opts.activePhaseIndex - main-phase index (0–4) for progress bar
 * @param {boolean} opts.isOpponentTurn - shows "Opp" badge and dims army name
 */
export function renderGameHeader({
  army,
  round,
  activePhaseIndex,
  isOpponentTurn,
}) {
  const progressBar = PHASES.map((p, i) => {
    const isCurrent = i === activePhaseIndex;
    const isPast = i < activePhaseIndex;
    return `<div class="flex-1 text-center">
      <div class="h-1.5 rounded-full mb-1 transition-all ${
        isCurrent
          ? PHASE_BG[p.colour]
          : isPast
            ? `${PHASE_BG[p.colour]} opacity-40`
            : "bg-wh-border"
      }"></div>
      <span class="text-[10px] ${isCurrent ? "text-wh-text font-semibold" : "text-wh-muted"}">${p.name.replace(" Phase", "")}</span>
    </div>`;
  }).join("");

  return `
    <header class="bg-wh-surface border-b border-wh-border p-3">
      <div class="flex justify-between items-center mb-2">
        <div class="flex items-center gap-2">
          <button id="manage-army-btn" class="text-wh-muted hover:text-wh-accent text-sm transition-colors">
            &#9776; Army
          </button>
          <span class="text-wh-muted text-sm hidden sm:inline">|</span>
          <span class="text-sm ${isOpponentTurn ? "text-wh-muted" : "text-wh-accent"} hidden sm:inline">${army.name}</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="font-mono ${isOpponentTurn ? "" : "font-black "}text-wh-accent">Round ${round}</span>
          ${isOpponentTurn ? `<span class="text-xs text-wh-red font-semibold border border-wh-red px-2 py-0.5 rounded">Opp</span>` : ""}
          ${army.owbId ? `<a href="https://old-world-builder.com/game-view/${army.owbId}" target="_blank" rel="noopener noreferrer" class="text-xs text-wh-green border border-wh-green/30 px-2 py-1 rounded transition-colors" title="View in Old World Builder">&#128065; OWB</a>` : ""}
          <button id="new-game-btn"
            class="text-xs text-wh-muted hover:text-wh-red border border-wh-border px-2 py-1 rounded transition-colors">
            New Game
          </button>
        </div>
      </div>
      <div class="flex gap-1">${progressBar}</div>
    </header>
  `;
}
