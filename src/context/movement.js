import { panel } from "./panel.js";
import { joinedCharacters, isCharacter } from "../utils/characters.js";
import {
  randomMovement,
  resolveMovement,
  extractFlyMovement,
  resolveBaseMv,
} from "../helpers.js";
import { unitLabel } from "../utils/unit-name.js";

/** @param {import("../types").Army} army */
export function renderMovementStatsContext(army) {
  const { isJoined, joinedTo } = joinedCharacters(army);

  // Random movers move in Compulsory Moves (see Random Movers), not here
  const rows = army.units
    .filter((u) => !(isCharacter(u) && isJoined(u.id)) && !randomMovement(u))
    .map((u) => {
      const mountData = u.mount ?? null;
      const chars = joinedTo(u.id).map((c) => c.name);

      // Crewed units: use crew M stat; war machines (WM) cannot march, others can
      const isWM = u.stats?.[0]?.troopType?.includes("WM");
      const crewProfile =
        u.stats?.[0]?.crewed === true
          ? u.stats.find((s) => s.Ld && s.Ld !== "-")
          : null;
      if (crewProfile) {
        const baseMv =
          crewProfile.M && crewProfile.M !== "-" ? Number(crewProfile.M) : null;
        const crewMarch = isWM ? null : baseMv != null ? baseMv * 2 : null;
        return { u, baseMv, march: crewMarch, flyMv: null, chars };
      }

      const mv = resolveMovement(u);
      let baseMv = resolveBaseMv(mountData, mv);
      let march = baseMv != null ? baseMv * 2 : null;
      const flyMv = extractFlyMovement(u);

      // Run with the Pack: unit moves at the majority M when beasts outnumber keepers
      if (u.detachments && u.detachments.length > 0) {
        const keeperCount = u.strength || 1;
        const mCounts = {};
        let totalBeastCount = 0;
        for (const d of u.detachments) {
          const dM = d.stats?.[0]?.M;
          if (dM && dM !== "-") {
            const count = d.strength || 1;
            totalBeastCount += count;
            mCounts[dM] = (mCounts[dM] || 0) + count;
          }
        }
        if (totalBeastCount > keeperCount) {
          const majorityM = Number(
            Object.entries(mCounts).reduce((a, b) => (b[1] > a[1] ? b : a))[0],
          );
          baseMv = majorityM;
          march = majorityM * 2;
        }
      }

      return { u, baseMv, march, flyMv, chars };
    })
    .filter(({ baseMv }) => baseMv != null)
    .sort((a, b) => b.baseMv - a.baseMv);

  if (rows.length === 0) return "";

  return panel(
    "movement",
    "Movement",
    `
      <div class="space-y-1">
        ${rows
          .map(
            ({ u, baseMv, march, flyMv, chars }) => `
          <div class="text-sm py-1 px-2 rounded bg-wh-card">
            <div class="flex justify-between items-start">
              <div>
                <div class="flex flex-wrap items-center gap-1">
                  <span class="text-wh-text">${unitLabel(u)}</span>
                </div>
                ${chars.map((c) => `<div class="text-wh-muted text-xs">${c}</div>`).join("")}
              </div>
              <div class="text-right shrink-0 ml-2">
                <span class="text-wh-phase-movement font-mono text-xs">${baseMv}"</span>
                ${
                  march != null
                    ? `<span class="text-wh-muted font-mono text-xs ml-2">March ${march}"</span>`
                    : `<span class="text-wh-muted text-xs ml-2">No march</span>`
                }
                ${
                  flyMv != null
                    ? `<div class="mt-0.5"><span class="text-blue-400 text-xs mr-1">Fly</span><span class="text-blue-400 font-mono text-xs">${flyMv}"</span></div>`
                    : ""
                }
              </div>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
  `,
  );
}
