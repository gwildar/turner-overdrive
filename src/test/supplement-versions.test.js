import { describe, it, expect, afterEach } from "vitest";
import {
  getRuleset,
  CORE_RULESET,
  resolveSpecialRules,
  resolveShootingWeapons,
  resolveWeapons,
  findMount,
} from "../parsers/resolve.js";
import {
  SUPPLEMENT_VERSIONS,
  findSupplementVersion,
} from "../data/supplements/index.js";
import { ARMY_COMPOSITIONS } from "../data/army-compositions.js";
import {
  getSupplementVersion,
  getSupplementVersions,
  saveSupplementVersion,
} from "../state.js";
import { parseArmyList } from "../army.js";
import { renderSetupScreen } from "../screens/setup.js";
import { getApp } from "./helpers.js";
import deRenegadeJson from "./fixtures/de-renegade-draft.owb.json";

// The same units as a standard Dark Elves army (no Renegade composition).
const standardDarkElvesJson = { ...deRenegadeJson, armyComposition: "" };

afterEach(() => localStorage.clear());

describe("supplement version registry", () => {
  it("offers v1.5 (PDF) first, as the default, for every Renegade composition", () => {
    for (const versions of Object.values(SUPPLEMENT_VERSIONS)) {
      expect(versions[0].id).toBe("v1.5");
    }
  });

  it("only lists compositions the app knows", () => {
    for (const composition of Object.keys(SUPPLEMENT_VERSIONS)) {
      expect(ARMY_COMPOSITIONS[composition]).toBeDefined();
    }
  });

  it("falls back to the default for an unknown version", () => {
    expect(findSupplementVersion("de-renegade", "v9")?.id).toBe("v1.5");
  });

  it("has no version for a standard composition", () => {
    expect(findSupplementVersion("dark-elves", "v1.5.2.2")).toBeNull();
    expect(getRuleset("dark-elves", "v1.5.2.2")).toBe(CORE_RULESET);
  });
});

describe("supplement data never leaks into a standard army", () => {
  const standard = getRuleset("", "v1.5.2.2");
  const draft = getRuleset("de-renegade", "v1.5.2.2");

  it("Hekarti's Blessing is the core rule (once per game)", () => {
    expect(
      resolveSpecialRules("Hekarti's Blessing", standard)[0].description,
    ).toMatch(/once per game/i);
    expect(
      resolveSpecialRules("Hekarti's Blessing", draft)[0].description,
    ).toMatch(/once per turn/i);
  });

  it("the Ravager Harpoon keeps Ponderous", () => {
    const [core] = resolveShootingWeapons(["Ravager harpoon"], standard);
    const [renegade] = resolveShootingWeapons(["Ravager harpoon"], draft);
    expect(core.rules).toContain("Ponderous");
    expect(renegade.rules).not.toContain("Ponderous");
  });

  it("the Har Ganeth greatsword is the core profile", () => {
    const [core] = resolveWeapons(["Har Ganeth greatsword"], [], standard);
    const [renegade] = resolveWeapons(["Har Ganeth greatsword"], [], draft);
    expect(core).toEqual(
      resolveWeapons(["Har Ganeth greatsword"], [], CORE_RULESET)[0],
    );
    expect(renegade).not.toEqual(core);
  });

  it("the Cauldron of Blood mount is the core one (M2), the draft one only for the draft", () => {
    expect(findMount("Cauldron of Blood", standard)?.m).toBe(2);
    expect(findMount("Cauldron of Blood", draft)?.m).toBe(5);
  });

  it("a parsed standard Dark Elves army ignores a chosen Dark Elves draft", () => {
    saveSupplementVersion("de-renegade", "v1.5.2.2");
    const army = parseArmyList(standardDarkElvesJson);
    expect(army.supplementVersion).toBeNull();
    const hag = army.units.find((u) => u.id.startsWith("death-hag"));
    expect(hag.mount.m).toBe(2);
    const hydra = army.units.find((u) => u.id.startsWith("war-hydra"));
    expect(hydra.specialRules.map((r) => r.id)).not.toContain(
      "if one head is severed",
    );
  });
});

describe("versions are kept apart", () => {
  it("one army's draft doesn't bring in another army's draft rules", () => {
    const skaven = getRuleset("sk-renegade", "v1.5.2.2");
    expect(resolveSpecialRules("Altar of Khaine", skaven)[0].id).toBeNull();
  });

  it("a Renegade army on v1.5 doesn't use draft rules", () => {
    const v15 = getRuleset("de-renegade", "v1.5");
    expect(resolveSpecialRules("Altar of Khaine", v15)[0].id).toBeNull();
    expect(findMount("Cauldron of Blood", v15)?.m).toBe(2);
  });

  it("choosing a version for one army leaves the others on their default", () => {
    saveSupplementVersion("de-renegade", "v1.5.2.2");
    expect(getSupplementVersion("de-renegade")).toBe("v1.5.2.2");
    expect(getSupplementVersion("sk-renegade")).toBeNull();
    expect(parseArmyList(deRenegadeJson).supplementVersion).toBe("v1.5.2.2");
  });

  it("a parsed Renegade army records the version it was resolved with", () => {
    expect(parseArmyList(deRenegadeJson).supplementVersion).toBe("v1.5");
  });
});

describe("the old draft checkbox setting", () => {
  it("carries over as the v1.5.2.2 drafts it used to switch on", () => {
    localStorage.setItem("tow-supplements-enabled", "true");
    expect(getSupplementVersions()).toEqual({
      "de-renegade": "v1.5.2.2",
      "ok-renegade": "v1.5.2.2",
      "sk-renegade": "v1.5.2.2",
    });
  });

  it("is dropped once a version is chosen", () => {
    localStorage.setItem("tow-supplements-enabled", "true");
    saveSupplementVersion("de-renegade", "v1.5");
    expect(localStorage.getItem("tow-supplements-enabled")).toBeNull();
    expect(getSupplementVersions()).toEqual({
      "de-renegade": "v1.5",
      "ok-renegade": "v1.5.2.2",
      "sk-renegade": "v1.5.2.2",
    });
  });
});

describe("Settings — Community Supplements", () => {
  it("has a version picker for each Renegade army with more than one version", () => {
    renderSetupScreen();
    const pickers = getApp().querySelectorAll(
      "select[data-supplement-composition]",
    );
    const multi = Object.entries(SUPPLEMENT_VERSIONS).filter(
      ([, v]) => v.length > 1,
    );
    expect(pickers).toHaveLength(multi.length);
  });

  it("saves the version chosen for that army", () => {
    renderSetupScreen();
    const select = /** @type {HTMLSelectElement} */ (
      getApp().querySelector(
        'select[data-supplement-composition="ok-renegade"]',
      )
    );
    select.value = "v1.5.2.2";
    select.dispatchEvent(new Event("change"));
    expect(getSupplementVersion("ok-renegade")).toBe("v1.5.2.2");
    expect(getSupplementVersion("de-renegade")).toBeNull();
  });
});

describe("every supplement rule can be found by its name", () => {
  // Variant rules that unit data names by id instead (de-renegade.js
  // cauldron-of-blood-mount lists "blessings of khaine-renegade").
  const ID_ONLY = new Set(["blessings of khaine-renegade"]);
  const layers = [
    ...new Set(
      Object.values(SUPPLEMENT_VERSIONS).flatMap((vs) =>
        vs.flatMap((v) => v.layers),
      ),
    ),
  ];
  it.each(layers.flatMap((l) => (l.specialRules || []).map((r) => [r.id, r])))(
    "%s",
    (id, rule) => {
      const keys = [rule.id, ...(rule.aliases || [])].map((k) =>
        k.toLowerCase(),
      );
      const name = rule.displayName.toLowerCase();
      const byName =
        keys.includes(name) || keys.some((k) => k.startsWith(name + " {"));
      expect(byName || ID_ONLY.has(id)).toBe(true);
    },
  );
});
