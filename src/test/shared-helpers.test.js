import { describe, it, expect, beforeEach } from "vitest";
import { joinedCharacters, isCharacter } from "../utils/characters.js";
import { mergeDuplicates } from "../utils/merge-duplicates.js";
import { panel } from "../context/panel.js";
import { saveCharacterAssignments } from "../state.js";

describe("joinedCharacters", () => {
  beforeEach(() => localStorage.clear());
  const army = /** @type {any} */ ({
    units: [
      { id: "lord", category: "characters" },
      { id: "hero", category: "characters" },
      { id: "spears", category: "core" },
    ],
  });

  it("knows who joined which unit", () => {
    saveCharacterAssignments({ lord: "spears", hero: null });
    const { isJoined, joinedTo } = joinedCharacters(army);
    expect(isJoined("lord")).toBe(true);
    expect(isJoined("hero")).toBe(false);
    expect(joinedTo("spears").map((u) => u.id)).toEqual(["lord"]);
    expect(joinedTo("lord")).toEqual([]);
  });

  it("recognises characters by category", () => {
    expect(isCharacter(army.units[0])).toBe(true);
    expect(isCharacter(army.units[2])).toBe(false);
  });
});

describe("mergeDuplicates", () => {
  it("keeps the first of each kind and flags repeats", () => {
    const rows = mergeDuplicates(
      [
        { name: "Dark Riders", ld: 8 },
        { name: "Corsairs", ld: 8 },
        { name: "Dark Riders", ld: 8 },
      ],
      (r) => `${r.name}||${r.ld}`,
    );
    expect(rows.map((r) => [r.name, r.merged])).toEqual([
      ["Dark Riders", true],
      ["Corsairs", false],
    ]);
  });
});

describe("panel", () => {
  it("wraps content in a card with a coloured title", () => {
    const html = panel("combat", "Combat Units", "<p>body</p>");
    expect(html).toContain("border-wh-phase-combat/30");
    expect(html).toContain('text-wh-phase-combat mb-3">Combat Units</h3>');
    expect(html).toContain("<p>body</p>");
  });
});
