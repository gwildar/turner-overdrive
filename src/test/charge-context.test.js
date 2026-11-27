import { describe, it, expect } from "vitest";
import { renderChargeContext } from "../context/charge.js";
import { loadArmy } from "./helpers.js";

function chargeRow(army, namePattern) {
  const div = document.createElement("div");
  div.innerHTML = renderChargeContext(army);
  const row = [...div.querySelectorAll(".bg-wh-card")].find((r) =>
    namePattern.test(r.textContent),
  );
  return row?.textContent.replace(/\s+/g, " ").trim();
}

describe("charge context — Swiftstride from both rider rules and mount", () => {
  // New Recruit lists mount rules on the rider, so these units have
  // Swiftstride in specialRules *and* in mount.rules.
  const army = loadArmy("dark-elves-nr");

  it("applies Swiftstride once for Dark Riders (M9 + 6 + 3 = 18)", () => {
    const row = chargeRow(army, /Dark Riders/);
    expect(row.match(/Swift/g)).toHaveLength(1);
    expect(row).toContain('18"');
  });

  it("applies Swiftstride once for a Sorceress on Black Dragon (15, Fly 19)", () => {
    const row = chargeRow(army, /Supreme Sorceress/);
    expect(row.match(/Swift/g)).toHaveLength(1);
    expect(row).toContain('15"');
    expect(row).toContain('Fly 19"');
  });
});
