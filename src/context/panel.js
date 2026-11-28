/**
 * The card each step's information sits in: a tinted border and a title in
 * the same colour. Colours are spelled out in full so Tailwind keeps them.
 */
const PANEL_COLOURS = {
  movement: ["border-wh-phase-movement/30", "text-wh-phase-movement"],
  shooting: ["border-wh-phase-shooting/30", "text-wh-phase-shooting"],
  combat: ["border-wh-phase-combat/30", "text-wh-phase-combat"],
  magic: ["border-wh-purple/30", "text-wh-purple"],
  virtues: ["border-blue-400/30", "text-blue-400"],
  rules: ["border-wh-accent/20", "text-wh-accent"],
};

/**
 * @param {keyof typeof PANEL_COLOURS} colour
 * @param {string} title
 * @param {string} body - the panel's contents (HTML)
 * @param {{ titleGap?: "mb-1" | "mb-2" | "mb-3" }} [opts]
 */
export function panel(colour, title, body, { titleGap = "mb-3" } = {}) {
  const [border, text] = PANEL_COLOURS[colour];
  return `
    <div class="bg-wh-surface rounded-lg border ${border} p-4 mb-4">
      <h3 class="text-sm font-bold ${text} ${titleGap}">${title}</h3>
      ${body}
    </div>
  `;
}
