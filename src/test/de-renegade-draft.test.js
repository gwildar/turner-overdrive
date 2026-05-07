import { describe, it, expect, beforeEach } from "vitest";
import { loadArmy, startGame } from "./helpers.js";
import {
  hasStartOfTurnRules,
  renderSpecialRulesContext,
} from "../context/special-rules-context.js";
import { buildCombatEntries } from "../context/combat-data.js";
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

describe("Behemoth troop type rule injection", () => {
  let army;

  beforeEach(() => {
    army = loadArmy("de-renegade-draft");
    startGame(army);
    saveRound(1);
  });

  it("War Hydra shows Lumbering in remaining-moves context", () => {
    const html = renderSpecialRulesContext(army, {
      id: "remaining-moves",
      label: "Remaining Moves",
    });
    expect(html).toContain("Lumbering");
  });
});

describe("Death Hag on Cauldron of Blood", () => {
  let army;
  let deathHag;
  let combatEntry;

  beforeEach(() => {
    army = loadArmy("de-renegade-draft");
    deathHag = army.units.find((u) => u.id.startsWith("death-hag"));
    combatEntry = buildCombatEntries(army).find(
      (e) => e.unitName === "Death Hag",
    );
  });

  it("Death Hag resolves Cauldron of Blood as mount", () => {
    expect(deathHag).toBeDefined();
    expect(deathHag.mount).toBeDefined();
    expect(deathHag.mount.name).toBe("Cauldron of Blood");
  });

  it("Cauldron mount has wBonus > 0 (isRiddenMonster)", () => {
    expect(deathHag.mount.wBonus).toBeGreaterThan(0);
  });

  it("Death Hag combat entry shows T5 from Cauldron and W7 (cauldron W5 + character W2)", () => {
    expect(combatEntry).toBeDefined();
    expect(combatEntry.t).toBe("5");
    expect(combatEntry.w).toBe("7");
  });

  it("Death Hag combat entry shows Impact Hits D6+1", () => {
    expect(combatEntry.impactHits).toBe("D6+1");
  });

  it("Death Hag has armour save 4+ from Cauldron", () => {
    expect(deathHag.armourSave).toBe("4+");
  });

  it("Witch Elf Crew shown in combat entry crew", () => {
    const crew = combatEntry.crew;
    const witchElves = crew.find((c) => c.name === "Witch Elf Crew (x2)");
    expect(witchElves).toBeDefined();
    expect(witchElves.a).toBe("1");
    expect(witchElves.i).toBe("5");
  });

  it("Witch Elf Crew has Additional Hand Weapon in combat entry (two hand weapons = extra attack)", () => {
    const crew = combatEntry.crew;
    const witchElves = crew.find((c) => c.name === "Witch Elf Crew (x2)");
    const weaponNames = witchElves.weapons.map((w) => w.name);
    expect(weaponNames).toContain("Additional Hand Weapon");
  });

  it("Rune of Khaine is in Death Hag specialRules", () => {
    const ruleIds = deathHag.specialRules.map((r) => r.id);
    expect(ruleIds).toContain("rune of khaine");
  });

  it("Rune of Khaine shows in combat rules (choose-fight)", () => {
    const combatRules = combatEntry.combatRules;
    expect(
      combatRules.some((r) => r.toLowerCase().includes("rune of khaine")),
    ).toBe(true);
  });

  it("Poisoned Attacks suppressed when Death Hag has Ogre Blade (magic weapon)", () => {
    // Unit has Poisoned Attacks special rule but magic weapon replaces mundane — skull should not show
    expect(deathHag.poisonedAttacks).toBe(true);
    const tags = combatEntry.riderTags;
    expect(tags.inline).not.toContain("☠️");
    expect(tags.sub).not.toContain("Poisoned Attacks");
  });
});
