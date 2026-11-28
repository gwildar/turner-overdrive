import { displayUnitName } from "../utils/unit-name.js";
import { randomMovement } from "../helpers.js";

/** @param {import("../types").Army} army */
export function renderRandomMoverContext(army) {
  const movers = army.units
    .map((u) => ({ unit: u, move: randomMovement(u) }))
    .filter(({ move }) => move);

  if (movers.length === 0) return "";

  return `
    <div class="bg-wh-surface rounded-lg border border-wh-phase-movement/30 p-4 mb-4">
      <h3 class="text-sm font-bold text-wh-phase-movement mb-3">Random Movers</h3>
      <div class="space-y-1">
        ${movers
          .map(({ unit: u, move }) => {
            const dice = move.dice.length
              ? move.dice
                  .map(
                    (d) =>
                      `<span class="rounded bg-wh-phase-movement/15 px-1.5 py-0.5 font-mono text-sm font-bold text-wh-phase-movement">${d}"</span>`,
                  )
                  .join('<span class="text-wh-muted text-xs">/</span>')
              : '<span class="text-wh-muted text-xs">Random Movement</span>';
            return `
          <div class="text-sm py-1 px-2 rounded bg-wh-card">
            <div class="flex justify-between items-center gap-2">
              <div class="flex items-center gap-1">
                <span class="text-wh-text">${displayUnitName(u.name, u.strength)}</span>
                ${u.strength > 1 ? `<span class="text-wh-muted">x${u.strength}</span>` : ""}
                ${u.mount?.mDice ? `<span class="text-wh-muted text-xs">(${u.mount.name})</span>` : ""}
              </div>
              <span class="flex items-center gap-1 shrink-0" title="Roll for the maximum distance moved">${dice}</span>
            </div>
            ${move.dice.length > 1 ? '<p class="text-[11px] text-wh-muted mt-0.5">Different dice in the unit: roll each and use the lowest.</p>' : ""}
          </div>
        `;
          })
          .join("")}
      </div>
    </div>
  `;
}
