import { describe, it, expect, beforeEach } from "vitest";
import { loadArmy, startGame } from "./helpers.js";
import {
  hasStartOfTurnRules,
  renderSpecialRulesContext,
} from "../context/special-rules-context.js";
import { saveRound } from "../state.js";

describe("de-renegade-draft fixture", () => {
  let army;

  beforeEach(() => {
    army = loadArmy("de-renegade-draft");
  });

  it("loads successfully as a de-renegade composition", () => {
    expect(army.composition).toBe("de-renegade");
    expect(army.units.length).toBeGreaterThan(0);
  });
});

describe("War Hydra draft rules", () => {
  let army;

  beforeEach(() => {
    army = loadArmy("de-renegade-draft");
  });

  it("War Hydra has 'if one head is severed' special rule", () => {
    const hydra = army.units.find((u) => u.id.startsWith("war-hydra"));
    expect(hydra).toBeDefined();
    const ruleIds = hydra.specialRules.map((r) => r.id);
    expect(ruleIds).toContain("if one head is severed");
  });

  it("War Hydra 'if one head is severed' shows in start-of-turn context", () => {
    startGame(army);
    saveRound(1);
    const html = renderSpecialRulesContext(army, {
      id: "start-of-turn",
      label: "Start of Turn",
    });
    expect(html).toContain("If One Head is Severed");
  });

  it("hasStartOfTurnRules returns true for the draft army (Hydra rule)", () => {
    expect(hasStartOfTurnRules(army, 1)).toBe(true);
  });
});

describe("Immune to Psychology phase display", () => {
  let army;

  beforeEach(() => {
    army = loadArmy("de-renegade-draft");
    startGame(army);
    saveRound(1);
  });

  it("shows Immune to Psychology in combat-result context", () => {
    const html = renderSpecialRulesContext(army, {
      id: "combat-result",
      label: "Combat Result",
    });
    expect(html).toContain("Immune to Psychology");
  });

  it("shows Immune to Psychology in break-test context", () => {
    const html = renderSpecialRulesContext(army, {
      id: "break-test",
      label: "Break Test",
    });
    expect(html).toContain("Immune to Psychology");
  });
});

describe("Black Dragon Terror injection", () => {
  let army;

  beforeEach(() => {
    army = loadArmy("de-renegade-draft");
  });

  it("Dreadlord on Black Dragon resolves a Black Dragon mount", () => {
    const dreadlord = army.units.find((u) =>
      u.id.startsWith("dark-elf-dreadlord"),
    );
    expect(dreadlord).toBeDefined();
    expect(dreadlord.mount).toBeDefined();
    expect(dreadlord.mount.name).toBe("Black Dragon");
  });

  it("Black Dragon mount has terror flag", () => {
    const dreadlord = army.units.find((u) =>
      u.id.startsWith("dark-elf-dreadlord"),
    );
    expect(dreadlord.mount.terror).toBe(true);
  });

  it("Dreadlord on Black Dragon shows Terror in declare-charges context", () => {
    startGame(army);
    saveRound(1);
    const html = renderSpecialRulesContext(army, {
      id: "declare-charges",
      label: "Declare Charges",
    });
    expect(html).toContain("Terror");
  });
});
