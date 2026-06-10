import { describe, it, expect } from "vitest";
import { computeWard } from "../parsers/resolve.js";

describe("computeWard", () => {
  it("returns null when no ward sources", () => {
    expect(computeWard([], [])).toBeNull();
  });

  it("returns ward from magic item", () => {
    const magicItems = [{ ward: "5+" }];
    expect(computeWard(magicItems, [])).toBe("5+");
  });

  it("returns 4+ for Daughters of Eternity (Sisters of the Thorn)", () => {
    const specialRules = [
      {
        id: "daughters of eternity",
        displayName: "Daughters of Eternity",
        ward: "4+",
      },
    ];
    expect(computeWard([], specialRules)).toBe("4+");
  });

  it("returns 4+ if rules are lower than magic item", () => {
    const magicItems = [{ ward: "5+" }];
    const specialRules = [
      {
        id: "daughters of eternity",
        displayName: "Daughters of Eternity",
        ward: "4+",
      },
    ];
    expect(computeWard(magicItems, specialRules)).toBe("4+");
  });

  it("ignores unrelated special rules", () => {
    const specialRules = [{ id: "hatred", displayName: "Hatred (Undead)" }];
    expect(computeWard([], specialRules)).toBeNull();
  });
});
