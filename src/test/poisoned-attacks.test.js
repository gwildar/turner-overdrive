import { describe, it, expect } from "vitest";
import { computePoisonedAttacks } from "../parsers/resolve.js";

const poisoned = (qualifier) =>
  computePoisonedAttacks([
    { displayName: `Poisoned Attacks${qualifier ? ` (${qualifier})` : ""}` },
  ]);

describe("computePoisonedAttacks", () => {
  it("counts an unqualified rule", () => {
    expect(poisoned("")).toBe(true);
  });

  it.each(["javelins only", "Javelins only", "javelins and shortbows only"])(
    "ignores a rule for ranged weapons only (%s)",
    (q) => expect(poisoned(q)).toBe(false),
  );

  it.each([
    "Steed of Slaanesh only",
    "Necroserpent only",
    "Doomfire Warlocks and Master only",
    "venomous tail only",
  ])("counts a rule for models or combat weapons (%s)", (q) =>
    expect(poisoned(q)).toBe(true),
  );

  it("is false without the rule", () => {
    expect(computePoisonedAttacks([{ displayName: "Hatred" }])).toBe(false);
  });
});
