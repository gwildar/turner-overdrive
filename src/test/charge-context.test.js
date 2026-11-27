import { describe, it, expect } from "vitest";
import { renderChargeContext } from "../context/charge.js";
import { resolveSpecialRules } from "../parsers/resolve.js";

function chargeRow(army, namePattern) {
  const div = document.createElement("div");
  div.innerHTML = renderChargeContext(army);
  const row = [...div.querySelectorAll(".bg-wh-card")].find((r) =>
    namePattern.test(r.textContent),
  );
  return row?.textContent.replace(/\s+/g, " ").trim();
}

describe("charge context — Swiftstride from both rider rules and mount", () => {
  // A rider whose own rules include Swiftstride, on a mount that also has it.
  const army = {
    units: [
      {
        id: "rider",
        name: "Test Rider",
        category: "core",
        strength: 1,
        stats: [{ Name: "Test Rider", M: "5", troopType: ["LC"] }],
        specialRules: resolveSpecialRules("Swiftstride"),
        magicItems: [],
        mount: { name: "Test Steed", m: 9, rules: ["Swiftstride"] },
      },
    ],
  };

  it("applies Swiftstride once (M9 + 6 + 3 = 18)", () => {
    const row = chargeRow(army, /Test Rider/);
    expect(row.match(/Swift/g)).toHaveLength(1);
    expect(row).toContain('18"');
  });
});
