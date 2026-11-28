import { describe, it, expect, beforeEach } from "vitest";
import { isRule, hasRule } from "../helpers.js";
import { renderDeploymentScreen } from "../screens/deployment.js";
import { getApp } from "../screens/_app.js";

describe("isRule / hasRule", () => {
  it("matches a rule by id, by name without its parameter, or by alias", () => {
    expect(isRule({ id: "terror", displayName: "Terror" }, "terror")).toBe(
      true,
    );
    expect(
      isRule({ id: null, displayName: "Stomp Attacks (D3)" }, "stomp attacks"),
    ).toBe(true);
    expect(isRule({ id: "ambushers", aliases: ["Ambush"] }, "ambush")).toBe(
      true,
    );
    // a name containing the rule isn't the rule
    expect(isRule({ displayName: "Terror Aura" }, "terror")).toBe(false);
  });

  it("finds a rule on the unit or on its mount", () => {
    const onDragon = /** @type {any} */ ({
      specialRules: [],
      mount: { rules: ["Terror", "Fly (10)"] },
    });
    expect(hasRule(onDragon, "terror")).toBe(true);
    expect(hasRule(onDragon, "fly")).toBe(true);
    expect(hasRule(onDragon, "fear")).toBe(false);
  });
});

describe("deployment rules use the unit's own (version-aware) rule text", () => {
  beforeEach(() => localStorage.clear());

  it("shows the description the unit's resolved Scouts rule carries", () => {
    const army = /** @type {any} */ ({
      name: "Test",
      units: [
        {
          id: "u1",
          name: "Test Scouts",
          strength: 5,
          category: "core",
          specialRules: [
            {
              id: "scouts",
              displayName: "Scouts",
              description: "A draft version of Scouts.",
              phases: [],
            },
          ],
          magicItems: [],
        },
      ],
    });
    renderDeploymentScreen(army);
    expect(getApp().textContent).toContain("A draft version of Scouts.");
  });
});
