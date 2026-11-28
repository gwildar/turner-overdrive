import { panel } from "./panel.js";
import { subPhaseIdsFor } from "../phases.js";
import { TEMPLATE_SPELL_NAMES, spellTemplateSize } from "../data/spells.js";
import { blastTemplateButton } from "../tools/launchers.js";

/** Template shortcuts for a bound spell that uses one (Ring of Doom → Doombolt) */
function boundSpellTemplateButtons(item) {
  if (!/bound spell/i.test(item.effect ?? "")) return "";
  return TEMPLATE_SPELL_NAMES.filter((name) => item.effect.includes(name))
    .map((name) => blastTemplateButton({ size: spellTemplateSize(name) }))
    .join("");
}
/** @param {import("../types").Army} army */
export function renderMagicItemsContext(army, phaseId, subPhaseId) {
  const grouped = {};

  for (const unit of army.units) {
    // In canonical schema, magicItems are already resolved objects
    for (const item of unit.magicItems) {
      if (!item) continue;
      if (item.type === "virtue") continue;
      if (!item.phases?.includes(phaseId)) continue;
      if (
        subPhaseId &&
        item.subPhases &&
        !subPhaseIdsFor(subPhaseId).some((id) => item.subPhases.includes(id))
      )
        continue;
      if (subPhaseId && item.opponentOnly) continue;
      if (!subPhaseId && item.yourTurnOnly) continue;
      // Your shooting phase: show weapons, banners, bound spells
      // Opponent shooting phase (subPhaseId null): only show defensive items (banners, talismans, etc.)
      if (
        phaseId === "shooting" &&
        !subPhaseId &&
        (item.type === "weapon" ||
          item.effect?.toLowerCase().includes("poisoned attacks")) &&
        !item.mr
      )
        continue;
      if (
        phaseId === "shooting" &&
        subPhaseId &&
        item.type !== "weapon" &&
        item.type !== "banner" &&
        !item.effect?.toLowerCase().includes("bound spell")
      )
        continue;
      const key = item.name;
      if (!grouped[key]) grouped[key] = { item, units: [] };
      if (!grouped[key].units.includes(unit.name))
        grouped[key].units.push(unit.name);
    }

    // In canonical schema, weapons are already resolved and magical ones are in magicItems
    // So no additional processing needed here
  }

  const entries = Object.values(grouped);
  if (entries.length === 0) return "";

  return panel(
    "magic",
    "Magic Items",
    `
      <div class="space-y-2">
        ${entries
          .map(
            ({ item, units }) => `
          <div class="p-2 rounded bg-wh-card text-sm">
            <span class="text-wh-accent font-semibold">${item.name}</span>
            <span class="text-xs text-wh-muted ml-1">${item.type}</span>
            ${boundSpellTemplateButtons(item)}
            <p class="text-wh-muted text-xs mt-1">${item.effect}</p>
            <p class="text-wh-text text-xs mt-1">${units.join(", ")}</p>
          </div>
        `,
          )
          .join("")}
      </div>
  `,
  );
}
