import { panel } from "./panel.js";
import { subPhaseIdsFor } from "../phases.js";
/** @param {import("../types").Army} army */
export function renderVirtuesContext(army, phaseId, subPhaseId) {
  const grouped = {};

  for (const unit of army.units) {
    // In canonical schema, magicItems are already resolved objects
    for (const item of unit.magicItems || []) {
      if (!item || item.type !== "virtue") continue;
      if (!item.phases?.includes(phaseId)) continue;
      if (
        subPhaseId &&
        item.subPhases &&
        !subPhaseIdsFor(subPhaseId).some((id) => item.subPhases.includes(id))
      )
        continue;
      if (subPhaseId && item.opponentOnly) continue;
      if (!subPhaseId && item.yourTurnOnly) continue;
      const key = item.name;
      if (!grouped[key]) grouped[key] = { item, units: [] };
      if (!grouped[key].units.includes(unit.name))
        grouped[key].units.push(unit.name);
    }
  }

  const entries = Object.values(grouped);
  if (entries.length === 0) return "";

  return panel(
    "virtues",
    "Virtues",
    `
      <div class="space-y-2">
        ${entries
          .map(
            ({ item, units }) => `
          <div class="p-2 rounded bg-wh-card text-sm">
            <span class="text-wh-accent font-semibold">${item.name}</span>
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
