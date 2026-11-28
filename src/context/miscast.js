import { getScenarioOptions } from "../state.js";

const MISCAST_TABLE = [
  {
    roll: "2–4",
    name: "Dimensional Cascade",
    effect:
      'Centre a 5" blast template over the Wizard. All models underneath suffer Strength 10 hits with AP −4.',
  },
  {
    roll: "5–6",
    name: "Calamitous Detonation",
    effect:
      'Centre a 3" blast template over the Wizard. All models underneath suffer Strength 6 hits with AP −2.',
  },
  {
    roll: "7",
    name: "Careless Conjuration",
    effect: "The Wizard takes a Strength 4 hit with AP −1.",
  },
  {
    roll: "8–9",
    name: "Barely Controlled Power",
    effect:
      "Spell casts, but the Wizard cannot cast any more spells for the remainder of the current turn.",
  },
  {
    roll: "10–12",
    name: "Power Drain",
    effect:
      "Spell casts, but you cannot attempt to cast any more spells for the remainder of the current turn.",
  },
];

// Disastrous Miscast table (tow.whfb.app, Magic: Disastrous Miscasts). Used
// instead of the Miscast table with Channelling or Arcane Magic, or by
// agreement ("The Perils of Magic") — enabled in Scenario Setup.
const DISASTROUS_MISCAST_TABLE = [
  {
    roll: "2–3",
    name: "A Tear in Reality",
    effect:
      "Roll a Scatter dice. Arrow: flame template, narrow end on the Wizard, wide end in the arrow's direction. Hit: 5\" blast template centred on the Wizard. Every model underneath except the Wizard (friend or foe) risks a S10 AP −4 hit. Then the Wizard is reduced to zero Wounds and removed.",
  },
  {
    roll: "4–5",
    name: "Ethereal Tornado",
    effect:
      'Centre a 5" blast template over the Wizard: every model underneath (friend or foe) risks a S8 AP −3 hit. The Wizard cannot cast any more spells this turn.',
  },
  {
    roll: "6–7",
    name: "Calamitous Detonation",
    effect:
      'Centre a 3" blast template over the Wizard: every model underneath (friend or foe) risks a S6 AP −2 hit.',
  },
  {
    roll: "8–9",
    name: "Backlash",
    effect:
      "The Wizard takes a S4 AP −1 hit and is Bewildered for the rest of the game: −1 to Casting and Dispel rolls (−2 if Bewildered again, and so on).",
  },
  {
    roll: "10–11",
    name: "Magical Fulcrum",
    effect:
      "The Wizard (and their unit) Gives Ground directly away from the nearest enemy and becomes Bewildered. If they can't Give Ground, the Wizard takes a S6 AP −2 hit instead.",
  },
  {
    roll: "12",
    name: "The Price of Power",
    effect:
      "The spell is cast with a perfect invocation, but the Wizard loses a Level of Magic and forgets the spell for the rest of the game. You cannot cast any more spells this turn.",
  },
];

/** The table in use: Disastrous Miscasts if enabled in Scenario Setup. */
function activeTable() {
  return getScenarioOptions().disastrousMiscasts
    ? {
        title: "Disastrous Miscast Table (2D6)",
        rows: DISASTROUS_MISCAST_TABLE,
      }
    : { title: "Miscast Table (2D6)", rows: MISCAST_TABLE };
}

function miscastTableHtml(rows) {
  return `
    <table class="w-full text-xs mt-2">
      <thead>
        <tr class="text-left text-wh-muted">
          <th class="pb-1 pr-2 font-medium w-10">2D6</th>
          <th class="pb-1 pr-2 font-medium">Result</th>
          <th class="pb-1 font-medium">Effect</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (row) => `
          <tr class="border-t border-wh-border/30">
            <td class="py-1 pr-2 font-mono text-wh-accent">${row.roll}</td>
            <td class="py-1 pr-2 font-semibold text-wh-text whitespace-nowrap">${row.name}</td>
            <td class="py-1 text-wh-muted">${row.effect}</td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>
  `;
}

// Collapsible version — used inline within a spells panel (your turn)
export function renderMiscastTable() {
  const { title, rows } = activeTable();
  return `
    <details class="mt-3 pt-3 border-t border-wh-border/50">
      <summary class="text-xs text-wh-muted cursor-pointer select-none hover:text-wh-text transition-colors">${title}</summary>
      ${miscastTableHtml(rows)}
    </details>
  `;
}

// Always-visible panel — used on the opponent turn screen
export function renderMiscastPanel() {
  const { title, rows } = activeTable();
  return `
    <div class="bg-wh-surface rounded-lg border border-wh-purple/30 p-4 mb-4">
      <h3 class="text-sm font-bold text-wh-purple mb-1">${title}</h3>
      ${miscastTableHtml(rows)}
    </div>
  `;
}
