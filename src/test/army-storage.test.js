import { describe, it, expect, afterEach } from "vitest";
import { importArmy, loadStoredArmy, parseArmyList } from "../army.js";
import {
  getArmySource,
  saveArmySource,
  getArmy,
  saveArmy,
  clearArmy,
  saveActiveLore,
  saveSupplementVersion,
} from "../state.js";
import { renderSetupScreen } from "../screens/setup.js";
import lizardmenJson from "./fixtures/lizardmen.owb.json";
import deRenegadeDraftJson from "./fixtures/de-renegade-draft.owb.json";

describe("army storage — raw file is stored and re-parsed on load", () => {
  afterEach(() => saveSupplementVersion("de-renegade", "v1.5"));

  it("stores the original file, not the parsed army", () => {
    importArmy(lizardmenJson);
    expect(getArmySource()).toEqual(lizardmenJson);
  });

  it("loads the same army that a fresh parse produces (OWB)", () => {
    importArmy(lizardmenJson);
    expect(loadStoredArmy()).toEqual(parseArmyList(lizardmenJson));
  });

  it("rejects a New Recruit file with a message pointing to Old World Builder", () => {
    const newRecruitFile = { roster: { forces: [{ selections: [] }] } };
    expect(() => importArmy(newRecruitFile)).toThrow(/Old World Builder/);
    expect(() => importArmy(newRecruitFile)).toThrow(/New Recruit/);
  });

  it("picks up settings changed after import without re-importing", () => {
    // War Hydra Stomp differs between stable and draft supplement rules.
    const hydraStomp = () =>
      loadStoredArmy().units.find((u) => u.id.startsWith("war-hydra")).stomp;

    importArmy(deRenegadeDraftJson);
    const stable = hydraStomp();
    saveSupplementVersion("de-renegade", "v1.5.2.2");
    expect(hydraStomp()).toBe("D3+1");
    expect(stable).not.toBe("D3+1");
  });

  it("re-applies the chosen core lore after re-parsing", () => {
    const army = importArmy(lizardmenJson);
    const caster = army.units.find((u) => u.lores?.length > 1);
    const other = caster.lores.find((l) => l !== caster.activeLore);
    saveActiveLore(caster.id, other);
    const loaded = loadStoredArmy().units.find((u) => u.id === caster.id);
    expect(loaded.activeLore).toBe(other);
  });

  it("falls back to a parsed army saved by an older version", () => {
    const legacy = parseArmyList(lizardmenJson);
    saveArmy(legacy);
    expect(loadStoredArmy()).toEqual(legacy);
  });

  it("returns null once the army is cleared", () => {
    importArmy(lizardmenJson);
    clearArmy();
    expect(getArmySource()).toBeNull();
    expect(loadStoredArmy()).toBeNull();
  });

  it("does not keep an older parsed army alongside a new import", () => {
    saveArmy(parseArmyList(deRenegadeDraftJson));
    importArmy(lizardmenJson);
    expect(getArmy()).toBeNull();
    expect(loadStoredArmy().name).toBe(parseArmyList(lizardmenJson).name);
  });

  it("keeps the current army if a new file fails to parse", () => {
    importArmy(lizardmenJson);
    expect(() => importArmy({ not: "an army" })).toThrow();
    expect(getArmySource()).toEqual(lizardmenJson);
  });

  it("clears a stored army that no longer parses, and tells the user on the setup screen", () => {
    saveArmySource({ not: "an army" });
    expect(loadStoredArmy()).toBeNull();
    expect(getArmySource()).toBeNull();

    renderSetupScreen();
    expect(document.getElementById("app").textContent).toContain(
      "Please re-upload your army",
    );
  });
});
