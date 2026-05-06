import { describe, it, expect } from "vitest";
import { parseArmyList } from "../army.js";
import fixture from "./fixtures/dark-elves.new-recruit.json";

describe("New Recruit import", () => {
  // ── Army-level ─────────────────────────────────────────────────────────────

  it("parses total army points from roster costs", () => {
    const army = parseArmyList(fixture);
    expect(army.points).toBe(2398);
  });

  it("produces one unit per top-level selection", () => {
    const army = parseArmyList(fixture);
    expect(army.units).toHaveLength(2);
  });

  // ── Caster / lore detection ─────────────────────────────────────────────────

  it("detects sorceress as caster", () => {
    const army = parseArmyList(fixture);
    const sorceress = army.units.find((u) =>
      u.name.toLowerCase().includes("sorceress"),
    );
    expect(sorceress.isCaster).toBe(true);
  });

  it("sets lores to lore keys, not spell names", () => {
    const army = parseArmyList(fixture);
    const sorceress = army.units.find((u) =>
      u.name.toLowerCase().includes("sorceress"),
    );
    expect(sorceress.lores).toContain("daemonology");
    expect(sorceress.lores).not.toContain("Steed of Shadows");
    expect(sorceress.lores).not.toContain("Gathering Darkness");
  });

  it("sets activeLore to the chosen lore key", () => {
    const army = parseArmyList(fixture);
    const sorceress = army.units.find((u) =>
      u.name.toLowerCase().includes("sorceress"),
    );
    expect(sorceress.activeLore).toBe("daemonology");
  });

  // ── Points (nested cost summation) ─────────────────────────────────────────

  it("calculates unit points by summing nested costs", () => {
    const army = parseArmyList(fixture);
    const sorceress = army.units.find((u) =>
      u.name.toLowerCase().includes("sorceress"),
    );
    // 150 (model) + 280 (Black Dragon) + 30 (Lore Familiar) + 40 (Pendant) = 500
    expect(sorceress.points).toBe(500);
  });

  // ── Magic items ─────────────────────────────────────────────────────────────

  it("resolves arcane items from nested selections", () => {
    const army = parseArmyList(fixture);
    const sorceress = army.units.find((u) =>
      u.name.toLowerCase().includes("sorceress"),
    );
    const itemNames = sorceress.magicItems.map((i) => i.name);
    expect(itemNames).toContain("Lore Familiar");
  });

  it("resolves talismans from nested selections", () => {
    const army = parseArmyList(fixture);
    const sorceress = army.units.find((u) =>
      u.name.toLowerCase().includes("sorceress"),
    );
    const itemNames = sorceress.magicItems.map((i) => i.name);
    expect(itemNames).toContain("Pendant of Khaeleth");
  });

  // ── Special rules ──────────────────────────────────────────────────────────

  it("resolves special rules with phase data", () => {
    const army = parseArmyList(fixture);
    const sorceress = army.units.find((u) =>
      u.name.toLowerCase().includes("sorceress"),
    );
    // Hatred (High Elves) is a known rule and should have a phases array
    const hatred = sorceress.specialRules.find((r) =>
      r.displayName?.toLowerCase().includes("hatred"),
    );
    expect(hatred).toBeDefined();
    expect(Array.isArray(hatred.phases)).toBe(true);
  });

  it("keeps unrecognised rules as bare entries with empty phases", () => {
    const army = parseArmyList(fixture);
    const sorceress = army.units.find((u) =>
      u.name.toLowerCase().includes("sorceress"),
    );
    // "Lore Of Naggaroth" is not a special rule — should appear as bare entry
    const loreRule = sorceress.specialRules.find((r) =>
      r.displayName?.toLowerCase().includes("lore of naggaroth"),
    );
    expect(loreRule).toBeDefined();
    expect(loreRule.id).toBeNull();
    expect(loreRule.phases).toEqual([]);
  });

  // ── Weapons ─────────────────────────────────────────────────────────────────

  it("resolves shooting weapons from equipment profiles", () => {
    const army = parseArmyList(fixture);
    const darkRiders = army.units.find((u) => u.name === "Dark Riders");
    const shootingNames = darkRiders.shootingWeapons.map((w) => w.name);
    expect(
      shootingNames.some((n) => n.toLowerCase().includes("crossbow")),
    ).toBe(true);
  });

  it("resolves melee weapons from equipment profiles", () => {
    const army = parseArmyList(fixture);
    const darkRiders = army.units.find((u) => u.name === "Dark Riders");
    const weaponNames = darkRiders.weapons.map((w) => w.name.toLowerCase());
    expect(weaponNames.some((n) => n.includes("spear"))).toBe(true);
  });

  // ── Mount ───────────────────────────────────────────────────────────────────

  it("resolves mount for Dark Riders (Dark Steed, M9)", () => {
    const army = parseArmyList(fixture);
    const darkRiders = army.units.find((u) => u.name === "Dark Riders");
    expect(darkRiders.mount).not.toBeNull();
    expect(darkRiders.mount.m).toBe(9);
  });

  // ── Armour save ─────────────────────────────────────────────────────────────

  it("computes armour save from armour profiles", () => {
    const army = parseArmyList(fixture);
    const darkRiders = army.units.find((u) => u.name === "Dark Riders");
    // Light armour (6+) + shield (-1 = 5+)
    expect(darkRiders.armourSave).toBe("5+");
  });

  // ── Army metadata ───────────────────────────────────────────────────────────

  it("does not set owbId on New Recruit armies", () => {
    const army = parseArmyList(fixture);
    expect(army.owbId).toBeFalsy();
  });
});
