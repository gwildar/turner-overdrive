import { describe, it, expect, beforeEach } from "vitest";
import { loadArmy } from "./helpers.js";
import { buildCombatEntries } from "../context/combat-data.js";

describe("Skink Priest on Ancient Stegadon (Howdah chariot split profile)", () => {
  let army;
  let skinkPriest;
  let combatEntry;

  beforeEach(() => {
    army = loadArmy("lizardmen");
    skinkPriest = army.units.find((u) => u.id.startsWith("skink-priest"));
    combatEntry = buildCombatEntries(army).find(
      (e) => e.unitName === "Skink Priest",
    );
  });

  it("Skink Priest resolves Ancient Stegadon as mount", () => {
    expect(skinkPriest).toBeDefined();
    expect(skinkPriest.mount).toBeDefined();
    expect(skinkPriest.mount.name).toBe("Ancient Stegadon");
  });

  it("Ancient Stegadon mount has wBonus > 0 (chariot split profile)", () => {
    expect(skinkPriest.mount.wBonus).toBeGreaterThan(0);
  });

  it("Skink Priest combat entry shows T6 from Stegadon", () => {
    expect(combatEntry).toBeDefined();
    expect(combatEntry.t).toBe("6");
  });

  it("Skink Priest combat entry shows W7 (Stegadon W5 + Priest W2)", () => {
    expect(combatEntry.w).toBe("7");
  });

  it("Ancient Stegadon mount has Skink Crew in crew profiles", () => {
    const crew = combatEntry.crew;
    expect(crew).toBeDefined();
    const skinkCrew = crew.find((c) => c.name === "Skink Crew (x5)");
    expect(skinkCrew).toBeDefined();
  });

  it("Ancient Stegadon mount has impact hits D3+1", () => {
    expect(combatEntry.impactHits).toBe("D3+1");
  });

  it("Ancient Stegadon mount has stomp D3+2", () => {
    expect(skinkPriest.stomp).toBe("D3+2");
  });
});
