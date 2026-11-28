import { describe, it, expect, beforeEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { convertArmyFile, importArmy, parseArmyList } from "../army.js";
import {
  isBattleBuilderList,
  battleBuilderToOwb,
} from "../parsers/from-battle-builder.js";
import catalog from "../data/battle-builder-catalog.json";

const dir = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  "fixtures",
);
const load = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
const DE = load("dark-elves-monster-mash.bb.json");
const BRET = load("bretonnian-exiles.bb.json");
const total = (army) => army.units.reduce((s, u) => s + u.points, 0);

beforeEach(() => localStorage.clear());

describe("Battle Builder (.bb.json) import", () => {
  it("detects Battle Builder lists and not OWB ones", () => {
    expect(isBattleBuilderList(DE)).toBe(true);
    expect(isBattleBuilderList(load("de-renegade-draft.owb.json"))).toBe(false);
  });

  it("asks for conversion before parsing", () => {
    expect(() => parseArmyList(DE)).toThrow(/converted/);
  });

  it("maps faction and force template to army and composition", async () => {
    const de = parseArmyList(await convertArmyFile(DE));
    expect(de.composition).toBe("de-renegade");
    const bret = parseArmyList(await convertArmyFile(BRET));
    expect(bret.composition).toBe("bretonnian-exiles");
  });

  it("adds up points from base costs, options and items", async () => {
    expect(total(parseArmyList(await convertArmyFile(BRET)))).toBe(1996);
    const de = parseArmyList(await convertArmyFile(DE));
    const dreadlord = de.units.find((u) => u.name === "Dark Elf Dreadlord");
    // 130 + lance 4 + full plate 6 + Black Dragon 280 + two 40-pt items
    expect(dreadlord.points).toBe(500);
  });

  it("gives every unit stats", async () => {
    for (const list of [DE, BRET]) {
      const army = parseArmyList(await convertArmyFile(list));
      for (const u of army.units)
        expect(u.stats.length, u.name).toBeGreaterThan(0);
    }
  });

  it("keeps custom names, mounts, items, weapons and lores", async () => {
    const bret = parseArmyList(await convertArmyFile(BRET));
    const wizard = bret.units.find((u) => u.activeLore);
    expect(wizard.activeLore).toBe("dark-magic");
    expect(wizard.mount?.name).toBe("Warhorse");
    expect(wizard.magicItems.map((i) => i.name)).toContain("Ring of Doom");

    const de = parseArmyList(await convertArmyFile(DE));
    const dreadlord = de.units.find((u) => u.name === "Dark Elf Dreadlord");
    expect(dreadlord.mount?.name).toBe("Black Dragon");
    expect(dreadlord.weapons.map((w) => w.name)).toEqual(
      expect.arrayContaining(["Hand Weapon", "Lance"]),
    );
    const crossbows = de.units.find((u) => /Crossbow/.test(u.name));
    expect(crossbows.shootingWeapons.map((w) => w.name)).toEqual([
      "Repeater Crossbow",
    ]);
    const riders = de.units.filter((u) => u.name.startsWith("Dark Rider"));
    expect(riders[0].shootingWeapons.map((w) => w.name)).toContain(
      "Repeater Crossbow",
    );
  });

  it("stores the converted list so a reload doesn't need the catalog", async () => {
    importArmy(await convertArmyFile(DE));
    const stored = JSON.parse(
      Object.values({ ...localStorage })
        .map(String)
        .find((v) => v.includes('"source":"battle-builder"')) ?? "null",
    );
    expect(stored?.army).toBe("dark-elves");
  });

  it("maps units Battle Builder names differently", () => {
    const owb = battleBuilderToOwb(
      {
        factionId: "tow/beastmen-brayherds",
        forceTemplateId: "tow/beastmen-brayherds/wild-herd",
        units: [{ unitEntryId: "tow/beastmen-brayherds/centigor-chieftain" }],
      },
      catalog,
    );
    const [unit] = parseArmyList(owb).units;
    expect(unit.stats[0].Name).toBe("Warhoof");
  });

  it("names units the catalog doesn't have", () => {
    expect(() =>
      battleBuilderToOwb(
        { factionId: "tow/x", units: [{ unitEntryId: "tow/x/nope" }] },
        catalog,
      ),
    ).toThrow(/tow\/x\/nope/);
  });
});
