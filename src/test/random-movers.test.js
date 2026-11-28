import { describe, it, expect } from "vitest";
import { parseArmyList } from "../army.js";
import { battleBuilderToOwb } from "../parsers/from-battle-builder.js";
import catalog from "../data/battle-builder-catalog.json";
import { randomMovement } from "../helpers.js";
import { isDiceMovement } from "../parsers/resolve.js";
import { renderRandomMoverContext } from "../context/random-mover.js";
import { renderChargeContext } from "../context/charge.js";
import { renderMovementStatsContext } from "../context/movement.js";

const army = (factionId, units) =>
  parseArmyList(battleBuilderToOwb({ factionId, units }, catalog));
const text = (html) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

const greenskins = army("tow/orc-and-goblin-tribes", [
  {
    unitEntryId: "tow/orc-and-goblin-tribes/night-goblin-squig-hopper-mobs",
    quantity: 5,
  },
  {
    unitEntryId: "tow/orc-and-goblin-tribes/night-goblin-bigboss",
    selectedOptions: [
      { groupId: "night-goblin-bigboss-mounts", optionId: "giant-cave-squig" },
    ],
  },
  { unitEntryId: "tow/orc-and-goblin-tribes/orc-mobs", quantity: 20 },
]);

describe("random movers", () => {
  it("recognises dice Movement values", () => {
    for (const m of ["3D6", "2D6", "D6", "2D6+1", "2D6 + 1"])
      expect(isDiceMovement(m)).toBe(true);
    for (const m of ["4", "-", "", null]) expect(isDiceMovement(m)).toBe(false);
  });

  it("reads each unit's dice from its Movement", () => {
    const spawn = army("tow/warriors-of-chaos", [
      { unitEntryId: "tow/warriors-of-chaos/chaos-spawn" },
    ]).units[0];
    expect(randomMovement(spawn)?.dice).toEqual(["2D6+1"]);
    const hoppers = greenskins.units.find((u) => /Squig Hopper/.test(u.name));
    expect(randomMovement(hoppers)?.dice).toEqual(["3D6"]);
  });

  it("knows a character on a Giant Cave Squig moves 3D6", () => {
    const boss = greenskins.units.find((u) => /Bigboss/.test(u.name));
    expect(boss.mount?.mDice).toBe("3D6");
    expect(boss.mount?.m).toBe(null);
    expect(randomMovement(boss)?.dice).toEqual(["3D6"]);
  });

  it("shows the dice in the Random Movers panel", () => {
    const html = text(renderRandomMoverContext(greenskins));
    expect(html).toMatch(/Squig Hoppers x5 3D6"/);
    expect(html).toMatch(/Bigboss \(Giant Cave Squig\) 3D6"/);
    expect(html).not.toContain("Orc Mob");
  });

  it("leaves random movers out of charge and movement ranges", () => {
    for (const html of [
      text(renderChargeContext(greenskins)),
      text(renderMovementStatsContext(greenskins)),
    ]) {
      expect(html).toMatch(/Orc/);
      expect(html).not.toContain("Squig");
      expect(html).not.toContain("Bigboss");
      expect(html).not.toContain("NaN");
    }
  });

  it("asks for the lowest roll when a unit has different dice", () => {
    const mixed = {
      ...greenskins.units[0],
      stats: [
        { ...greenskins.units[0].stats[0], M: "2D6" },
        { ...greenskins.units[0].stats[0], M: "3D6" },
      ],
    };
    const html = text(
      renderRandomMoverContext(/** @type {any} */ ({ units: [mixed] })),
    );
    expect(html).toContain("roll each and use the lowest");
  });
});

describe("a real Orc & Goblin list with squigs", async () => {
  const fs = await import("node:fs");
  const path = await import("node:path");
  const file = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    "fixtures/orc-and-goblin-squigs.owb.json",
  );
  const list = parseArmyList(JSON.parse(fs.readFileSync(file, "utf8")));

  it("lists Squig Hoppers and the Mangler Squig at 3D6", () => {
    const html = text(renderRandomMoverContext(list));
    expect(html).toMatch(/Squig Hoppers x5 3D6"/);
    expect(html).toMatch(/Mangler Squig 3D6"/);
    expect(html).not.toContain("Herder");
  });

  it("keeps the herders and Oddnobs in charge and movement, without NaN", () => {
    const charge = text(renderChargeContext(list));
    const move = text(renderMovementStatsContext(list));
    expect(charge).toContain("Squig Herders");
    expect(move).toMatch(/Oddnob 4" March 8"/);
    for (const html of [charge, move]) {
      expect(html).not.toMatch(/Hopper|Mangler/);
      expect(html).not.toContain("NaN");
    }
  });
});
