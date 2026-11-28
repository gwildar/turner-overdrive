import { describe, it, expect, beforeEach } from "vitest";
import { findRule } from "../data/special-rules.js";
import {
  renderSpecialRulesContext,
  renderSpecialRulesForPhase,
} from "../context/special-rules-context.js";
import { PHASES } from "../phases.js";
import { resolveSpecialRules, computeWard } from "../parsers/resolve.js";
import { loadArmy } from "./helpers.js";

function makeVeteranArmy() {
  return {
    units: [
      {
        name: "Dark Elf Warriors",
        specialRules: [{ id: "veteran", displayName: "Veteran" }],
        weapons: [],
        shootingWeapons: [],
      },
    ],
  };
}

describe("weapon rules appear in special rules section — bretonnian-exiles", () => {
  it("Volley Fire appears at shoot sub-phase (Peasant Bowmen have Longbows)", () => {
    const army = loadArmy("bretonnian-exiles");
    const html = renderSpecialRulesContext(army, { id: "shoot" });
    expect(html).toContain("Volley Fire");
  });

  it("Quick Shot appears at shoot sub-phase (Yeomen Guard have Shortbows)", () => {
    const army = loadArmy("bretonnian-exiles");
    const html = renderSpecialRulesContext(army, { id: "shoot" });
    expect(html).toContain("Quick Shot");
  });
});

describe("Cumbersome — appears in special rules at shoot sub-phase", () => {
  it("appears in special rules for the shoot sub-phase", () => {
    const army = {
      units: [
        {
          name: "Test Unit",
          specialRules: [{ id: "cumbersome", displayName: "Cumbersome" }],
          weapons: [],
          shootingWeapons: [],
        },
      ],
    };
    const html = renderSpecialRulesContext(army, { id: "shoot" });
    expect(html).toContain("Cumbersome");
  });
});

describe("Veteran rule — shoot phase visibility", () => {
  it("does not appear on your shoot sub-phase", () => {
    const html = renderSpecialRulesContext(makeVeteranArmy(), { id: "shoot" });
    expect(html).not.toContain("Veteran");
  });

  it("does appear on opponent's shooting phase", () => {
    const shootingPhase = PHASES.find((p) => p.id === "shooting");
    const html = renderSpecialRulesForPhase(makeVeteranArmy(), shootingPhase);
    expect(html).toContain("Veteran");
  });
});

describe("Gaze of the Gods rule data", () => {
  let rule;
  let phase;

  beforeEach(() => {
    rule = findRule("gaze of the gods");
    phase = rule?.phases?.find((p) => p.subPhaseId === "command");
  });

  it("exists in SPECIAL_RULES", () => {
    expect(rule).toBeDefined();
  });

  it("has a command phase with yourTurnOnly", () => {
    expect(phase).toBeDefined();
    expect(phase?.yourTurnOnly).toBe(true);
  });

  it("has a D6 table with 6 entries", () => {
    expect(phase?.table).toHaveLength(6);
  });

  it("table covers rolls 1 through 6", () => {
    const rolls = phase?.table?.map((entry) => entry.roll);
    expect(rolls).toEqual(["1", "2", "3", "4", "5", "6"]);
  });

  it("all table entries have result and effect", () => {
    for (const entry of phase?.table ?? []) {
      expect(entry.result).toBeTruthy();
      expect(entry.effect).toBeTruthy();
    }
  });
});

describe("rule reminders added from the tow.whfb.app crawl", () => {
  // Rules as the parser produces them from an OWB rules string.
  const armyWithRule = (owbText) => ({
    units: [{ name: "Test Unit", specialRules: resolveSpecialRules(owbText) }],
  });
  const shows = (owbText, step) =>
    renderSpecialRulesContext(armyWithRule(owbText), { id: step });

  it.each([
    ["Indomitable (2)", "break-test", "Unstable"],
    ["Infernal Favour (1)", "break-test", "Daemonic Instability"],
    ["Lance Formation", "combat-result", "+1 combat result"],
    ["Ignore Panic", "shoot", "No Panic test"],
    ["Ignore Panic", "break-test", "No Panic test"],
    ["Ignore Panic", "compulsory-moves", "fled through"],
    ["Backstab", "choose-fight", "re-roll failed To Hit"],
    ["Blood Greed", "choose-fight", "+2 Attacks"],
    ["Blood Greed", "pursuit", "single D6"],
  ])("%s shows at %s", (owbText, step, text) => {
    expect(shows(owbText, step)).toContain(text);
  });

  it.each([
    ["Lance Formation", "choose-fight"],
    ["Backstab", "combat-result"],
    ["Blood Greed", "break-test"],
  ])("%s does not show at %s", (owbText, step) => {
    expect(shows(owbText, step)).toBe("");
  });
});

describe("rules units use that had no app entry (tow.whfb.app crawl)", () => {
  const armyWithRule = (owbText) => ({
    units: [{ name: "Test Unit", specialRules: resolveSpecialRules(owbText) }],
  });
  const shows = (owbText, step) =>
    renderSpecialRulesContext(armyWithRule(owbText), { id: step });

  it.each([
    ["Ensorcelled Weapons", "choose-fight", "Magical Attacks and AP -1"],
    ["Khopesh", "choose-fight", "AP -1"],
    ["Drunken", "start-of-turn", "Belligerent Drunks"],
    ["Maddening Aura", "command", "D3 S3 hits"],
    ["Caged Fury", "start-of-turn", "Misfire table"],
    ["Dances of Loec", "choose-fight", "Whirling Death"],
    ["Banner of the King", "break-test", "Unstable by D3"],
    ["Steam Power", "remaining-moves", "discard the lowest"],
    ["Doomseeker", "scoring", "bonus VP"],
    ["Rampant Mutation", "choose-fight", "Killing Blow"],
    ["Hit & Run", "combat-result", "Fall Back in Good Order"],
    ['"Stand Back Chief"', "shoot", ""],
  ])("%s shows at %s", (owbText, step, text) => {
    const html = shows(owbText, step);
    if (text) expect(html).toContain(text);
    else expect(html).toBe(""); // opponent-only: not on your own turn
  });

  it.each([
    ["Maddening Aura", "choose-fight"],
    ["Ensorcelled Weapons", "command"],
    ["Brayhorn", "command"], // from round 2 only
    ["Beast Handlers", "shoot"], // opponent's shooting only
  ])("%s does not show at %s", (owbText, step) => {
    expect(shows(owbText, step)).toBe("");
  });

  it.each([
    ["Chaos Armour (5+)", "5+"],
    ["Chaos Armour", "4+"],
    ["Talismanic Tattoos", "6+"],
    ["Arcane Shield", "5+"],
    ["Blackshard Armour", "5+ (Flaming Attacks)"],
  ])("%s gives a %s Ward save", (owbText, ward) => {
    expect(computeWard([], resolveSpecialRules(owbText))).toBe(ward);
  });
});
