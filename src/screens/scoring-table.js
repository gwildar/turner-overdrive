import { formatDuration } from "../helpers.js";

/**
 * Renders the score/time table shared between the scoring panel and game-over screen.
 *
 * @param {object} opts
 * @param {object} opts.scores          - from getScores()
 * @param {number} opts.round           - current round
 * @param {string} opts.firstTurn       - "you" | "opponent"
 * @param {string|null} opts.turnKey    - active turn ("you"|"opponent") for highlighting;
 *                                        null on game-over (no active turn)
 * @param {object} opts.timings         - from getTimings()
 * @param {number|null} opts.deploymentTime - ms
 * @param {object} opts.scenarioOpts    - from getScenarioOptions()
 * @param {Function} opts.renderScoreCells
 *   Called per data row. Receives { r, turn, s, isCurrent, isFuture, scoreOptions, noObjectives }.
 *   Returns HTML string for the score columns (empty string when noObjectives).
 *
 * @returns {{ html: string, totalYou: number, totalOpponent: number,
 *             noObjectives: boolean, scoreLabel: string, scoreOptions: number[] }}
 */
export function renderScoreTable({
  scores,
  round,
  firstTurn,
  turnKey,
  timings,
  deploymentTime,
  scenarioOpts,
  renderScoreCells,
}) {
  const slOpts = scenarioOpts.strategicLocations;
  const noObjectives =
    !scenarioOpts.domination &&
    !scenarioOpts.baggageTrains &&
    !slOpts.enabled &&
    !scenarioOpts.specialFeatures;
  const maxScore = slOpts.enabled ? slOpts.count : 4;
  const scoreOptions = Array.from({ length: maxScore + 1 }, (_, i) => i);
  const scoreLabel = noObjectives
    ? "Turn Times"
    : slOpts.enabled
      ? `Strategic Locations (${slOpts.count})`
      : "Strategic Objectives";

  const turnsInOrder =
    firstTurn === "opponent" ? ["opponent", "you"] : ["you", "opponent"];

  let totalYou = 0;
  let totalOpponent = 0;

  const deploymentRow =
    deploymentTime !== null
      ? `<tr>
          <td class="px-3 py-2 text-wh-muted font-mono">0</td>
          <td class="px-3 py-2 text-wh-muted italic text-xs">Deployment</td>
          ${noObjectives ? "" : `<td class="px-3 py-2 text-wh-text">—</td><td class="px-3 py-2 text-wh-text">—</td>`}
          <td class="px-3 py-2 font-mono text-xs">${formatDuration(deploymentTime)}</td>
        </tr>`
      : "";

  const rounds = [];
  for (let i = 1; i <= round; i++) rounds.push(i);

  const tableRows = rounds
    .map((r) =>
      turnsInOrder
        .map((turn) => {
          const s = (scores[r] && scores[r][turn]) || { you: 0, opponent: 0 };
          totalYou += s.you;
          totalOpponent += s.opponent;
          const isCurrent = turnKey !== null && r === round && turn === turnKey;
          const isFuture =
            turnKey !== null &&
            r === round &&
            turnsInOrder.indexOf(turn) > turnsInOrder.indexOf(turnKey);
          const turnMs = Object.values(
            (timings[r] && timings[r][turn]) || {},
          ).reduce((a, b) => a + b, 0);
          const timeCell = turnMs > 0 ? formatDuration(turnMs) : "—";
          const scoreCells = renderScoreCells({
            r,
            turn,
            s,
            isCurrent,
            isFuture,
            scoreOptions,
            noObjectives,
          });
          return `<tr class="${isCurrent ? "bg-wh-accent/5" : ""}">
            <td class="px-3 py-2 text-wh-muted font-mono">${turn === turnsInOrder[0] ? r : ""}</td>
            <td class="px-3 py-2 text-wh-muted italic text-xs capitalize">${turn === "you" ? "Yours" : "Opponents"}</td>
            ${scoreCells}
            <td class="px-3 py-2 font-mono text-xs">${timeCell}</td>
          </tr>`;
        })
        .join(""),
    )
    .join("");

  const html = `
    <div class="overflow-hidden border border-wh-border rounded-lg">
      <table class="w-full text-sm text-left">
        <thead class="bg-wh-card text-wh-muted uppercase tracking-wider border-b border-wh-border">
          <tr>
            <th class="px-3 py-2 font-semibold">Rd</th>
            <th class="px-3 py-2 font-semibold">Turn</th>
            ${noObjectives ? "" : `<th class="px-3 py-2 font-semibold text-wh-accent">You</th><th class="px-3 py-2 font-semibold text-wh-red">Opp</th>`}
            <th class="px-3 py-2 font-semibold">Time</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-wh-border">
          ${deploymentRow}
          ${tableRows}
        </tbody>
        ${
          noObjectives
            ? ""
            : `<tfoot class="bg-wh-card border-t border-wh-border font-bold">
          <tr>
            <td class="px-3 py-2 text-wh-muted" colspan="2">Total</td>
            <td class="px-3 py-2 text-wh-accent">${totalYou}</td>
            <td class="px-3 py-2 text-wh-red">${totalOpponent}</td>
            <td class="px-3 py-2"></td>
          </tr>
        </tfoot>`
        }
      </table>
    </div>
  `;

  return {
    html,
    totalYou,
    totalOpponent,
    noObjectives,
    scoreLabel,
    scoreOptions,
  };
}
