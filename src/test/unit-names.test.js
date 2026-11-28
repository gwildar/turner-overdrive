import { describe, it, expect } from "vitest";
import { parseArmyList } from "../army.js";
import { displayUnitName, unitLabel } from "../utils/unit-name.js";
import darkElvesJson from "./fixtures/dark-elves.owb.json";
import bretonniaChargeJson from "./fixtures/bretonnia-charge.owb.json";
import lizardmenJson from "./fixtures/lizardmen.owb.json";
import mcSkeletonHordeJson from "./fixtures/mc-skeleton-horde.owb.json";

describe("Unit name resolution", () => {
  it("uses custom name for named characters", () => {
    const army = parseArmyList(bretonniaChargeJson);
    const baron = army.units.find((u) => u.mount?.name === "Hippogryph");
    expect(baron.name).toBe("Baron Guy de Bastille");
  });

  it("uses singular stat name for units without custom names", () => {
    const army = parseArmyList(darkElvesJson);
    const medusa = army.units.find((u) => u.id.startsWith("bloodwrack-medusa"));
    expect(medusa).toBeTruthy();
    expect(medusa.name).toBe("Bloodwrack Medusa");
  });

  it("strips {renegade} from unit names", () => {
    const army = parseArmyList(lizardmenJson);
    const slann = army.units.find((u) => u.id.startsWith("slann"));
    expect(slann).toBeTruthy();
    expect(slann.name).not.toContain("{");
    expect(slann.name).not.toContain("renegade");
  });

  it("strips {tomb kings} faction tag from unit names", () => {
    const army = parseArmyList(mcSkeletonHordeJson);
    const skeletons = army.units.find((u) =>
      u.id.startsWith("skeleton-warriors"),
    );
    expect(skeletons).toBeTruthy();
    expect(skeletons.name).not.toContain("{");
    expect(skeletons.name).not.toContain("tomb kings");
  });

  it("uses stat name for rank and file units", () => {
    const army = parseArmyList(bretonniaChargeJson);
    const squires = army.units.filter((u) => u.id.startsWith("squires"));
    expect(squires.length).toBeGreaterThan(0);
    expect(squires[0].name).toBe("Squire");
  });
});

describe("displayUnitName", () => {
  it("returns singular name when strength is 1 and name is stored plural", () => {
    expect(displayUnitName("Outcast Wizards", 1)).toBe("Outcast Wizard");
    expect(displayUnitName("Pegasus Knights", 1)).toBe("Pegasus Knight");
    expect(displayUnitName("Squires", 1)).toBe("Squire");
  });

  it("returns plural name when strength is greater than 1 and name is stored singular", () => {
    expect(displayUnitName("Squire", 13)).toBe("Squires");
    expect(displayUnitName("Chaos Warrior", 20)).toBe("Chaos Warriors");
    expect(displayUnitName("Pegasus Knight", 5)).toBe("Pegasus Knights");
  });

  it("returns plural name when strength is greater than 1 and name is already stored plural", () => {
    expect(displayUnitName("Pegasus Knights", 5)).toBe("Pegasus Knights");
    expect(displayUnitName("Squires", 13)).toBe("Squires");
  });

  it("does not alter named character names", () => {
    expect(displayUnitName("Baron Guy de Bastille", 1)).toBe(
      "Baron Guy de Bastille",
    );
    expect(displayUnitName("Paladin Jean-Prout", 1)).toBe("Paladin Jean-Prout");
  });

  it("pluralises -man endings to -men", () => {
    expect(displayUnitName("Peasant Bowman", 10)).toBe("Peasant Bowmen");
    expect(displayUnitName("Mounted Yeoman", 10)).toBe("Mounted Yeomen");
    expect(displayUnitName("Swordsman", 20)).toBe("Swordsmen");
  });

  it("singularises -men endings to -man", () => {
    expect(displayUnitName("Peasant Bowmen", 1)).toBe("Peasant Bowman");
    expect(displayUnitName("Swordsmen", 1)).toBe("Swordsman");
  });

  it("uses plural overrides for irregular compound names", () => {
    expect(displayUnitName("Yeoman Guard", 8)).toBe("Yeomen Guard");
    expect(displayUnitName("Knight of the Realm", 12)).toBe(
      "Knights of the Realm",
    );
  });
});

describe("plural rules for Warhammer unit names", () => {
  it.each([
    ["Witch Elf", "Witch Elves"],
    ["Giant Wolf", "Giant Wolves"],
    ["Temple Guard", "Temple Guard"],
    ["Black Guard", "Black Guard"],
    ["Man-at-Arms", "Men-at-Arms"],
    ["Sergeant-at-Arms", "Sergeants-at-Arms"],
    ["Knight Errant", "Knights Errant"],
    ["Sister of the Thorns", "Sisters of the Thorns"],
    ["Flamespyre Phoenix", "Flamespyre Phoenixes"],
    ["Pegasus", "Pegasus"],
    ["Repeater Crossbowman", "Repeater Crossbowmen"],
  ])("%s → %s, and back", (one, many) => {
    expect(displayUnitName(one, 5)).toBe(many);
    expect(displayUnitName(many, 1)).toBe(one);
  });
});

describe("unitLabel", () => {
  const text = (html) => html.replace(/<[^>]+>/g, "");

  it("plural name, mount, then the model count", () => {
    expect(
      text(unitLabel({ name: "Witch Elf", strength: 24, mount: "Cold One" })),
    ).toBe("Witch Elves (Cold One) x24");
  });

  it("leaves the count off a row that stands for several units", () => {
    expect(
      text(unitLabel({ name: "Dark Rider", strength: 5, merged: true })),
    ).toBe("Dark Riders");
  });

  it("keeps a player's own name as written", () => {
    expect(
      text(
        unitLabel({
          name: "Les Navets victorieux",
          strength: 11,
          customName: true,
        }),
      ),
    ).toBe("Les Navets victorieux x11");
  });

  it("ignores a parsed unit's mount object", () => {
    expect(
      text(
        unitLabel(
          /** @type {any} */ ({
            name: "Baron",
            strength: 1,
            mount: { name: "Pegasus" },
          }),
        ),
      ),
    ).toBe("Baron");
  });
});
