import { describe, it, expect } from "vitest";
import { computeWard } from "../parsers/resolve.js";
import { CORE_RULES } from "../data/special-rules.js";
import { MAGIC_ITEMS } from "../data/magic-items.js";
import {
  STABLE_SUPPLEMENT_RULES,
  DRAFT_SUPPLEMENT_RULES,
  STABLE_SUPPLEMENT_ITEMS,
  DRAFT_SUPPLEMENT_ITEMS,
} from "../data/supplements/index.js";

describe("ward data", () => {
  const sources = [
    ...CORE_RULES,
    ...STABLE_SUPPLEMENT_RULES,
    ...DRAFT_SUPPLEMENT_RULES,
    ...MAGIC_ITEMS,
    ...STABLE_SUPPLEMENT_ITEMS,
    ...DRAFT_SUPPLEMENT_ITEMS,
  ].filter((s) => s.ward);

  it.each(sources.map((s) => [s.displayName ?? s.name, s.ward]))(
    "%s ward %s starts with an N+ value",
    (_, ward) => {
      expect(ward).toMatch(/^[2-6]\+/);
    },
  );
});

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

  it("prefers a better magic item ward over a worse rule ward", () => {
    const magicItems = [{ ward: "4+" }];
    const specialRules = [{ id: "x", displayName: "X", ward: "6+" }];
    expect(computeWard(magicItems, specialRules)).toBe("4+");
  });

  it("prefers a better rule ward over a worse magic item ward", () => {
    const magicItems = [{ ward: "6+" }];
    const specialRules = [{ id: "x", displayName: "X", ward: "4+" }];
    expect(computeWard(magicItems, specialRules)).toBe("4+");
  });

  it("picks the best ward across several magic items", () => {
    const magicItems = [{ ward: "4+" }, { ward: "6+" }];
    expect(computeWard(magicItems, [])).toBe("4+");
  });

  it("compares conditional wards by their base value", () => {
    const magicItems = [{ ward: "5+ (4+ vs S5+)" }];
    const specialRules = [{ id: "x", displayName: "X", ward: "6+" }];
    expect(computeWard(magicItems, specialRules)).toBe("5+ (4+ vs S5+)");
  });

  it("ignores unrelated special rules", () => {
    const specialRules = [{ id: "hatred", displayName: "Hatred (Undead)" }];
    expect(computeWard([], specialRules)).toBeNull();
  });
});
