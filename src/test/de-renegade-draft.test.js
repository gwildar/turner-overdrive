import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  STABLE_SUPPLEMENT_RULES,
  DRAFT_SUPPLEMENT_RULES,
  STABLE_SUPPLEMENT_ITEMS,
  DRAFT_SUPPLEMENT_ITEMS,
  STABLE_SUPPLEMENT_UNITS,
  DRAFT_SUPPLEMENT_UNITS,
} from "../data/supplements/index.js";
import { loadArmy, startGame } from "./helpers.js";
import {
  resolveSpecialRules,
  resolveStats,
  resolveMagicItems,
} from "../parsers/resolve.js";
import {
  hasStartOfTurnRules,
  renderSpecialRulesContext,
} from "../context/special-rules-context.js";
import { buildCombatEntries } from "../context/combat-data.js";
import {
  saveRound,
  saveCharacterAssignments,
  saveSupplementsEnabled,
} from "../state.js";

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
    saveSupplementsEnabled(true);
    army = loadArmy("de-renegade-draft");
  });

  afterEach(() => {
    saveSupplementsEnabled(false);
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

  it("War Hydra stomp is D3+1 (renegade override, not legacy D3)", () => {
    const hydra = army.units.find((u) => u.id.startsWith("war-hydra"));
    expect(hydra.stomp).toBe("D3+1");
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

describe("Death Hag assigned to Witch Elves", () => {
  let army;
  let witchElvesEntry;
  let deathHagProfile;

  beforeEach(() => {
    saveCharacterAssignments({});
    army = loadArmy("de-renegade-draft");
    startGame(army);
    saveRound(1);
    const deathHag = army.units.find((u) => u.id.startsWith("death-hag"));
    const witchElves = army.units.find((u) => u.id.startsWith("witch-elves"));
    saveCharacterAssignments({ [deathHag.id]: witchElves.id });
    witchElvesEntry = buildCombatEntries(army).find(
      (e) => e.unitName === witchElves.name,
    );
    deathHagProfile = witchElvesEntry?.assignedCharProfiles?.find(
      (p) => p.name === "Death Hag",
    );
  });

  it("Death Hag appears as assigned char profile", () => {
    expect(deathHagProfile).toBeDefined();
  });

  it("Death Hag shows T5 W7 from Cauldron when assigned", () => {
    expect(deathHagProfile.t).toBe("5");
    expect(deathHagProfile.w).toBe("7");
  });

  it("Death Hag assigned profile has Rune of Khaine in combatRules", () => {
    expect(
      deathHagProfile.combatRules.some((r) =>
        r.toLowerCase().includes("rune of khaine"),
      ),
    ).toBe(true);
  });

  it("Death Hag assigned profile has crew from Cauldron", () => {
    expect(deathHagProfile.crew.length).toBeGreaterThan(0);
  });

  it("Death Hag assigned profile has impactHits from Cauldron", () => {
    expect(deathHagProfile.impactHits).toBe("D6+1");
  });

  it("Death Hag assigned profile shows A3+D3 (Rune of Khaine bonus)", () => {
    expect(deathHagProfile.a).toBe("3+D3");
  });
});

describe("High Beastmaster on Scourgerunner Chariot", () => {
  let army;
  let highBeastmaster;
  let combatEntry;

  beforeEach(() => {
    army = loadArmy("de-renegade-draft");
    highBeastmaster = army.units.find((u) =>
      u.id.startsWith("high-beastmaster"),
    );
    combatEntry = buildCombatEntries(army).find(
      (e) => e.unitName === "High Beastmaster",
    );
  });

  it("High Beastmaster resolves Scourgerunner Chariot as mount", () => {
    expect(highBeastmaster).toBeDefined();
    expect(highBeastmaster.mount).toBeDefined();
    expect(highBeastmaster.mount.name).toBe("Scourgerunner Chariot");
  });

  it("Scourgerunner Chariot mount has wBonus > 0 (isRiddenMonster)", () => {
    expect(highBeastmaster.mount.wBonus).toBeGreaterThan(0);
  });

  it("High Beastmaster shows T4 W7 from Scourgerunner Chariot", () => {
    expect(combatEntry).toBeDefined();
    expect(combatEntry.t).toBe("4");
    expect(combatEntry.w).toBe("7");
  });

  it("Scourgerunner Chariot has Beastmaster Crew in crew", () => {
    const crew = combatEntry.crew;
    const beastmasterCrew = crew.find(
      (c) => c.name === "Beastmaster Crew (x2)",
    );
    expect(beastmasterCrew).toBeDefined();
    expect(beastmasterCrew.a).toBe("1");
  });

  it("Scourgerunner Chariot has Dark Steed crew attacks", () => {
    const crew = combatEntry.crew;
    const darkSteed = crew.find((c) => c.name === "Dark Steed (x2)");
    expect(darkSteed).toBeDefined();
    expect(darkSteed.a).toBe("1");
    expect(darkSteed.ws).toBe("3");
  });

  it("Beastmaster Crew has Cavalry Spear weapon", () => {
    const crew = combatEntry.crew;
    const beastmasterCrew = crew.find(
      (c) => c.name === "Beastmaster Crew (x2)",
    );
    const weaponNames = beastmasterCrew.weapons.map((w) => w.name);
    expect(weaponNames).toContain("Cavalry Spear");
  });

  it("High Beastmaster combat entry has D6 impact hits", () => {
    expect(combatEntry.impactHits).toBe("D6");
  });

  it("High Beastmaster has Ravager Harpoon and Repeater Crossbow shooting weapons from chariot crew", () => {
    const names = highBeastmaster.shootingWeapons.map((w) => w.name);
    expect(names).toContain("Ravager Harpoon");
    expect(names).toContain("Repeater Crossbow");
  });

  it("Chariot crew shooting weapons have crew BS4 and crew name", () => {
    const harpoon = highBeastmaster.shootingWeapons.find(
      (w) => w.name === "Ravager Harpoon",
    );
    expect(harpoon.crewBS).toBe("4");
    expect(harpoon.crewName).toBe("Beastmaster Crew (x2)");
  });
});

describe("Murderous rule version for de-renegade", () => {
  let army;

  beforeEach(() => {
    army = loadArmy("de-renegade-draft");
  });

  it("units with Murderous {renegade} resolve to v1.5 rule (first round only), not draft (all rounds)", () => {
    // OWB exports "Murderous {renegade}" for DE renegade units.
    // Should resolve to murderous-v1.5, NOT murderous-renegade (draft).
    const witchElves = army.units.find((u) => u.id.startsWith("witch-elves"));
    expect(witchElves).toBeDefined();
    const murderous = witchElves.specialRules.find(
      (r) => r.displayName === "Murderous",
    );
    expect(murderous).toBeDefined();
    expect(murderous.id).toBe("murderous-v1.5");
    expect(murderous.description).toContain("first round of combat");
  });
});

describe("supplement index stable/draft split", () => {
  it("STABLE_SUPPLEMENT_RULES contains murderous-v1.5 but not murderous-renegade", () => {
    const ids = STABLE_SUPPLEMENT_RULES.map((r) => r.id);
    expect(ids).toContain("murderous-v1.5");
    expect(ids).not.toContain("murderous-renegade");
  });

  it("DRAFT_SUPPLEMENT_RULES contains murderous-renegade but not murderous-v1.5", () => {
    const ids = DRAFT_SUPPLEMENT_RULES.map((r) => r.id);
    expect(ids).toContain("murderous-renegade");
    expect(ids).not.toContain("murderous-v1.5");
  });

  it("STABLE_SUPPLEMENT_UNITS is empty (rlp-v1.5 has no unit overrides)", () => {
    expect(Object.keys(STABLE_SUPPLEMENT_UNITS)).toHaveLength(0);
  });

  it("DRAFT_SUPPLEMENT_UNITS contains de-renegade overrides", () => {
    expect(DRAFT_SUPPLEMENT_UNITS).toHaveProperty("war-hydra-renegade");
    expect(DRAFT_SUPPLEMENT_UNITS).toHaveProperty("witch-elves-renegade");
  });

  it("STABLE_SUPPLEMENT_ITEMS is empty (rlp-v1.5 has no magic items)", () => {
    expect(STABLE_SUPPLEMENT_ITEMS).toHaveLength(0);
  });

  it("DRAFT_SUPPLEMENT_ITEMS contains de-renegade items", () => {
    const names = DRAFT_SUPPLEMENT_ITEMS.map((i) => i.name);
    expect(names).toContain("Banner of Nagarythe");
    expect(names).toContain("Whip of Agony");
  });
});

describe("resolveStats draft awareness", () => {
  it("with isDraft=false, War Hydra uses core stats (AS 5)", () => {
    const stats = resolveStats("war-hydra", "War Hydra", "de-renegade", false);
    expect(stats[0]?.AS).toBe("5");
  });

  it("with isDraft=true, War Hydra uses renegade variant (AS 4)", () => {
    const stats = resolveStats("war-hydra", "War Hydra", "de-renegade", true);
    expect(stats[0]?.AS).toBe("4");
  });

  it("with isDraft=false, renegade composition does not look up -renegade keys", () => {
    const stats = resolveStats("war-hydra", "War Hydra", "de-renegade", false);
    const rules = stats[0]?.rules || [];
    expect(rules).toContain("Stomp Attacks (D3)");
    expect(rules).not.toContain("Stomp Attacks (D3+1)");
  });

  it("non-renegade composition ignores isDraft entirely", () => {
    const stats = resolveStats("war-hydra", "War Hydra", "dark-elves", true);
    expect(stats[0]?.AS).toBe("5");
  });
});

describe("resolveMagicItems draft awareness", () => {
  // Banner of Nagarythe exists in both core (65 pts) and de-renegade supplement (50 pts).
  // With isDraft=false + renegade composition, the supplement map is not consulted,
  // so the core version (65 pts) is returned.
  it("with isDraft=false and renegade composition, core version of Banner of Nagarythe is returned (65 pts)", () => {
    const result = resolveMagicItems(
      ["Banner of Nagarythe"],
      "de-renegade",
      false,
    );
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Banner of Nagarythe");
    expect(result[0].points).toBe(65);
  });

  it("with isDraft=true and renegade composition, supplement version of Banner of Nagarythe resolves (50 pts)", () => {
    const result = resolveMagicItems(
      ["Banner of Nagarythe"],
      "de-renegade",
      true,
    );
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Banner of Nagarythe");
    expect(result[0].type).toBe("banner");
    expect(result[0].points).toBe(50);
  });

  it("core magic items resolve regardless of isDraft", () => {
    const stable = resolveMagicItems(["Ogre Blade"], "de-renegade", false);
    const draft = resolveMagicItems(["Ogre Blade"], "de-renegade", true);
    expect(stable).toHaveLength(1);
    expect(draft).toHaveLength(1);
    expect(stable[0].name).toBe("Ogre Blade");
  });

  it("without renegade composition, supplement version is not consulted — core version returned", () => {
    const result = resolveMagicItems(
      ["Banner of Nagarythe"],
      "dark-elves",
      true,
    );
    expect(result).toHaveLength(1);
    // Core version: 65 pts (not the renegade supplement's 50 pts)
    expect(result[0].points).toBe(65);
  });
});

describe("resolveSpecialRules draft awareness", () => {
  it("with isDraft=false, 'altar of khaine' resolves to bare entry (not draft rule)", () => {
    const rules = resolveSpecialRules("Altar of Khaine", false);
    expect(rules[0].id).toBeNull();
  });

  it("with isDraft=true, 'altar of khaine' resolves to the de-renegade rule", () => {
    const rules = resolveSpecialRules("Altar of Khaine", true);
    expect(rules[0].id).toBe("altar of khaine");
  });

  it("with isDraft=false, 'if one head is severed' resolves to bare entry", () => {
    const rules = resolveSpecialRules("If One Head is Severed", false);
    expect(rules[0].id).toBeNull();
  });

  it("with isDraft=true, 'if one head is severed' resolves to the draft rule", () => {
    const rules = resolveSpecialRules("If One Head is Severed", true);
    expect(rules[0].id).toBe("if one head is severed");
  });

  it("Murderous {renegade} resolves to v1.5 rule regardless of isDraft", () => {
    const stable = resolveSpecialRules("Murderous {renegade}", false);
    const draft = resolveSpecialRules("Murderous {renegade}", true);
    expect(stable[0].id).toBe("murderous-v1.5");
    expect(draft[0].id).toBe("murderous-v1.5");
  });

  it("core rules resolve regardless of isDraft", () => {
    const stable = resolveSpecialRules("Killing Blow", false);
    const draft = resolveSpecialRules("Killing Blow", true);
    expect(stable[0].id).toBe("killing blow");
    expect(draft[0].id).toBe("killing blow");
  });
});

describe("draft toggle integration — from-owb parse pipeline", () => {
  afterEach(() => {
    saveSupplementsEnabled(false);
  });

  it("toggle OFF: War Hydra uses core stats (AS 5, not renegade AS 4)", () => {
    saveSupplementsEnabled(false);
    const army = loadArmy("de-renegade-draft");
    const hydra = army.units.find((u) => u.id.startsWith("war-hydra"));
    expect(hydra.stats[0].AS).toBe("5");
  });

  it("toggle ON: War Hydra uses renegade variant (AS 4)", () => {
    saveSupplementsEnabled(true);
    const army = loadArmy("de-renegade-draft");
    const hydra = army.units.find((u) => u.id.startsWith("war-hydra"));
    expect(hydra.stats[0].AS).toBe("4");
  });

  it("toggle OFF: War Hydra does not have 'if one head is severed' rule", () => {
    saveSupplementsEnabled(false);
    const army = loadArmy("de-renegade-draft");
    const hydra = army.units.find((u) => u.id.startsWith("war-hydra"));
    const ruleIds = hydra.specialRules.map((r) => r.id);
    expect(ruleIds).not.toContain("if one head is severed");
  });

  it("toggle ON: War Hydra has 'if one head is severed' rule", () => {
    saveSupplementsEnabled(true);
    const army = loadArmy("de-renegade-draft");
    const hydra = army.units.find((u) => u.id.startsWith("war-hydra"));
    const ruleIds = hydra.specialRules.map((r) => r.id);
    expect(ruleIds).toContain("if one head is severed");
  });

  it("toggle OFF: Witch Elves Murderous is still v1.5 (stable alias)", () => {
    saveSupplementsEnabled(false);
    const army = loadArmy("de-renegade-draft");
    const we = army.units.find((u) => u.id.startsWith("witch-elves"));
    const murderous = we.specialRules.find(
      (r) => r.displayName === "Murderous",
    );
    expect(murderous?.id).toBe("murderous-v1.5");
  });

  it("toggle OFF: War Hydra stomp is D3 (core, not renegade D3+1)", () => {
    saveSupplementsEnabled(false);
    const army = loadArmy("de-renegade-draft");
    const hydra = army.units.find((u) => u.id.startsWith("war-hydra"));
    expect(hydra.stomp).toBe("D3");
  });

  it("toggle OFF: Hekarti's Blessing shows 'once per game' (not 'once per turn')", () => {
    saveSupplementsEnabled(false);
    const army = loadArmy("de-renegade-draft");
    startGame(army);
    saveRound(1);
    const html = renderSpecialRulesContext(army, {
      id: "conjuration",
      label: "Conjuration",
    });
    expect(html).toContain("Once per game");
    expect(html).not.toContain("Once per turn");
  });

  it("toggle ON: Hekarti's Blessing shows 'once per turn' (draft version)", () => {
    saveSupplementsEnabled(true);
    const army = loadArmy("de-renegade-draft");
    startGame(army);
    saveRound(1);
    const html = renderSpecialRulesContext(army, {
      id: "conjuration",
      label: "Conjuration",
    });
    expect(html).toContain("Once per turn");
    expect(html).not.toContain("Once per game");
  });

  it("toggle OFF: caster has no naggaroth-renegade faction lore", () => {
    saveSupplementsEnabled(false);
    const army = loadArmy("de-renegade-draft");
    const casters = army.units.filter(
      (u) => u.factionLores && u.factionLores.length > 0,
    );
    expect(casters.length).toBeGreaterThan(0);
    for (const c of casters) {
      expect(c.factionLores).not.toContain("naggaroth-renegade");
    }
  });

  it("toggle ON: caster has naggaroth-renegade faction lore (Power of Darkness)", () => {
    saveSupplementsEnabled(true);
    const army = loadArmy("de-renegade-draft");
    const casters = army.units.filter(
      (u) => u.factionLores && u.factionLores.length > 0,
    );
    expect(casters.length).toBeGreaterThan(0);
    const hasRenegade = casters.some((c) =>
      c.factionLores.includes("naggaroth-renegade"),
    );
    expect(hasRenegade).toBe(true);
  });
});
