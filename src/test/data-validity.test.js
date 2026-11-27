import { describe, it, expect } from "vitest";
import { MAGIC_ITEMS } from "../data/magic-items.js";
import { SUPPLEMENT_ITEMS } from "../data/supplements/index.js";

// Runtime twin of the types in src/types.d.ts, so bad data also fails `npm test`.
const ALL_ITEMS = [...MAGIC_ITEMS, ...SUPPLEMENT_ITEMS];

const ITEM_TYPES = [
  "weapon",
  "armour",
  "talisman",
  "arcane-item",
  "enchanted-item",
  "banner",
  "standard",
  "virtue",
];

describe("magic item data", () => {
  it("every item has a known type", () => {
    const bad = ALL_ITEMS.filter((i) => !ITEM_TYPES.includes(i.type)).map(
      (i) => `${i.name}: ${i.type}`,
    );
    expect(bad).toEqual([]);
  });
});
