import { describe, it, expect } from "vitest";
import { renderShootingContext } from "../context/shooting.js";
import { RANGED_WEAPONS } from "../data/weapons.js";

function armyWith(weaponKey, S = "3") {
  return {
    units: [
      {
        id: "u1",
        name: "Test Unit",
        category: "core",
        strength: 1,
        stats: [{ Name: "Test", M: "4", BS: "3", S, T: "3", Ld: "7" }],
        shootingWeapons: [RANGED_WEAPONS[weaponKey]],
        specialRules: [],
        magicItems: [],
      },
    ],
  };
}

describe("shooting context strength", () => {
  it("adds an S+1 modifier to the model's Strength (Throwing Axe on S3 is S4)", () => {
    const html = renderShootingContext(armyWith("throwing axe", "3"));
    expect(html).toContain("S4");
    expect(html).not.toContain("S3+1");
  });

  it("uses the model's Strength for an 'S' weapon", () => {
    const weapon = { name: "Test Sling", range: '18"', s: "S", ap: "—" };
    const army = armyWith("throwing axe", "4");
    army.units[0].shootingWeapons = [weapon];
    expect(renderShootingContext(army)).toContain("S4");
  });

  it("shows a fixed Strength as-is", () => {
    const fixed = { name: "Test Bow", range: '24"', s: "3", ap: "—" };
    const army = armyWith("throwing axe", "5");
    army.units[0].shootingWeapons = [fixed];
    const html = renderShootingContext(army);
    expect(html).toContain("S3");
    expect(html).not.toContain("S5");
  });
});
