import { describe, it, expect, afterEach } from "vitest";
import {
  getRuleset,
  CORE_RULESET,
  resolveSpecialRules,
  resolveShootingWeapons,
  resolveWeapons,
  findMount,
  resolveStats,
  computeWard,
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
import { parseArmyList, importArmy, loadStoredArmy } from "../army.js";
import { renderSetupScreen } from "../screens/setup.js";
import { renderSpecialRulesContext } from "../context/special-rules-context.js";
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

describe("army card — Renegade rules version picker", () => {
  const picker = () =>
    getApp().querySelector("select[data-supplement-composition]");

  it("shows below the unit strength for a Renegade army, above the units", () => {
    importArmy(deRenegadeJson);
    renderSetupScreen();
    const select = picker();
    expect(select).not.toBeNull();
    expect(select.dataset.supplementComposition).toBe("de-renegade");
    // In the army card: after the unit strength line, before the unit list
    const strength = [...getApp().querySelectorAll("p")].find((p) =>
      p.textContent.includes("Unit Strength"),
    );
    const firstCategory = getApp().querySelector("h3");
    const after = (a, b) =>
      Boolean(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
    expect(after(strength, select)).toBe(true);
    expect(after(select, firstCategory)).toBe(true);
    expect(firstCategory.textContent).toBe("characters");
  });

  it("is not shown for a standard army", () => {
    importArmy(standardDarkElvesJson);
    renderSetupScreen();
    expect(picker()).toBeNull();
  });

  it("is no longer in Settings", () => {
    renderSetupScreen();
    expect(
      document.querySelector(
        "#settings-modal select[data-supplement-composition]",
      ),
    ).toBeNull();
  });

  it("saves the chosen version and applies it to the army straight away", () => {
    importArmy(deRenegadeJson);
    renderSetupScreen();
    const select = /** @type {HTMLSelectElement} */ (picker());
    select.value = "v1.5.2.2";
    select.dispatchEvent(new Event("change"));
    expect(getSupplementVersion("de-renegade")).toBe("v1.5.2.2");
    expect(/** @type {HTMLSelectElement} */ (picker()).value).toBe("v1.5.2.2");
    expect(loadStoredArmy().supplementVersion).toBe("v1.5.2.2");
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

describe("Chaos Dwarfs Renegade: v1.5 vs the v1.5.2.2 draft", () => {
  const v15 = getRuleset("cd-renegade", "v1.5");
  const draft = getRuleset("cd-renegade", "v1.5.2.2");
  const core = CORE_RULESET;
  const ward = (name, rs) => resolveSpecialRules(name, rs)[0].ward;

  it("Hellbound: the official rule wards only non-magical attacks; v1.5 and the draft ward everything", () => {
    expect(ward("Hellbound", core)).toBe("6+ (non-magical)");
    expect(ward("Hellbound", v15)).toBe("6+");
    expect(ward("Hellbound", draft)).toBe("6+");
  });

  it("the draft's Dreadquake Mortar no longer has Slow Reload", () => {
    const [v] = resolveShootingWeapons(["Dreadquake Mortar"], v15);
    const [d] = resolveShootingWeapons(["Dreadquake Mortar"], draft);
    expect(v.rules).toContain("Slow Reload");
    expect(d.rules).not.toContain("Slow Reload");
  });

  it("Blackshard Armour improves the armour value only on the draft", () => {
    expect(
      resolveSpecialRules("Blackshard Armour", v15)[0].armourMod,
    ).toBeUndefined();
    expect(resolveSpecialRules("Blackshard Armour", draft)[0].armourMod).toBe(
      -1,
    );
  });

  it("the draft's K'daai Fireborn wear heavy armour and Bull Centaurs have more Attacks", () => {
    const kdaai = (rs) =>
      resolveStats("k'daai-fireborn", "K'daai Fireborn {renegade}", rs);
    expect(kdaai(v15)[0].equipment).not.toContain("heavy armour");
    expect(kdaai(draft)[0].equipment).toContain("heavy armour");
    expect(kdaai(v15)[0].rules).toContain("Born of Fire");
    const renders = (rs) =>
      resolveStats("bull-centaur-renders", "Bull Centaur Renders", rs);
    expect(renders(v15)[0].A).toBe("2");
    expect(renders(draft)[0].A).toBe("3");
  });

  it("the draft's Demolition Rockets hit harder", () => {
    const [v] = resolveShootingWeapons(["Demolition Rockets"], v15);
    const [d] = resolveShootingWeapons(["Demolition Rockets"], draft);
    expect(v.s).toBe("3(6)");
    expect(d.s).toBe("4(8)");
  });

  it("Born of Fire resolves by name", () => {
    expect(resolveSpecialRules("Born of Fire", v15)[0].id).not.toBeNull();
  });
});

describe("v1.5 Renegade unit profiles", () => {
  it("apply to a Renegade army on v1.5, not to a standard army", () => {
    const taurus = (rs) => resolveStats("great-taurus", "Great Taurus", rs);
    expect(taurus(getRuleset("cd-renegade", "v1.5"))[0].troopType).toEqual(
      taurus(getRuleset("cd-renegade", "v1.5.2.2"))[0].troopType,
    );
    expect(taurus(getRuleset("cd-renegade", "v1.5"))).not.toEqual(
      taurus(CORE_RULESET),
    );
  });
});

describe("Lizardmen Renegade: v1.5 vs the v1.5.2.1 draft", () => {
  const v15 = getRuleset("lm-renegade", "v1.5");
  const draft = getRuleset("lm-renegade", "v1.5.2.1");
  const rule = (name, rs) => resolveSpecialRules(name, rs)[0];

  it('"Cold Blooded {renegade}" is the Renegade rule (Leadership and Break tests), not the official one', () => {
    expect(rule("Cold Blooded {renegade}", v15).description).toMatch(
      /Leadership or Break test/,
    );
    expect(rule("Cold Blooded", CORE_RULESET).description).toMatch(/Fear/);
  });

  it("Guardians: v1.5 transfers hits from the Slann, the draft doesn't", () => {
    expect(rule("Guardians {renegade}", v15).description).toMatch(/transfer/);
    expect(rule("Guardians {renegade}", draft).description).not.toMatch(
      /transfer/,
    );
  });

  it("the draft's Ripperdactyls are Predatory Fighters, not Furious Chargers", () => {
    const riders = (rs) =>
      resolveStats("ripperdactyl-riders", "Ripperdactyl Riders", rs)[0].rules;
    expect(riders(v15)).toContain("Furious Charge (Ripperdactyl only)");
    expect(riders(draft)).toContain("Predatory Fighter (Ripperdactyl only)");
  });

  it("the draft uses its own Lore of Lustria (Monsoon 10+)", () => {
    expect(v15.loreRemaps.lustria).toBe("lustria-v1.5");
    expect(draft.loreRemaps.lustria).toBe("lustria-renegade");
  });
});

describe("Vampire Counts Renegade: v1.5 vs the v1.5.3.1 draft", () => {
  const v15 = getRuleset("vc-renegade", "v1.5");
  const draft = getRuleset("vc-renegade", "v1.5.3.1");

  it("the draft's Zombies are a Shambling Horde instead of The Newly Dead", () => {
    const z = (rs) => resolveStats("zombies", "Zombies", rs)[0];
    expect(z(v15).rules).toContain("The Newly Dead");
    expect(z(draft).rules).toContain("Shambling Horde");
    expect(z(draft).T).toBe("2");
  });

  it("Wailing Dirge (-2) takes the draft's bracketed modifier wording", () => {
    const army = (rs) => ({
      composition: "vc-renegade",
      supplementVersion: rs.version,
      units: [
        {
          name: "T",
          specialRules: resolveSpecialRules("Wailing Dirge (-2)", rs),
        },
      ],
    });
    expect(renderSpecialRulesContext(army(draft), { id: "shoot" })).toMatch(
      /modifier in brackets/,
    );
    expect(renderSpecialRulesContext(army(v15), { id: "shoot" })).toMatch(
      /Ld test at -2/,
    );
  });

  it("Carrion Feeders lower Weapon Skill on the draft, Initiative officially", () => {
    expect(resolveSpecialRules("Carrion Feeders", v15)[0].description).toMatch(
      /Initiative/,
    );
    expect(
      resolveSpecialRules("Carrion Feeders", draft)[0].description,
    ).toMatch(/Weapon Skill/);
  });
});

describe("Daemons of Chaos: core fixes and the v1.5.2.1 draft", () => {
  const v15 = getRuleset("doc-renegade", "v1.5");
  const draft = getRuleset("doc-renegade", "v1.5.2.1");

  it('"Daemons of Khorne" (as army lists write it) resolves to the alignment rule', () => {
    expect(resolveSpecialRules("Daemons of Khorne", CORE_RULESET)[0].id).toBe(
      "daemon of khorne",
    );
  });

  it("core Daemonic gives its 5+ Ward against non-magical attacks", () => {
    expect(computeWard([], resolveSpecialRules("Daemonic", CORE_RULESET))).toBe(
      "5+ (non-magical)",
    );
  });

  it("the draft's Daemonic rolls on the Reign of Chaos each turn", () => {
    const army = (rs) => ({
      composition: "doc-renegade",
      supplementVersion: rs.version,
      units: [{ name: "D", specialRules: resolveSpecialRules("Daemonic", rs) }],
    });
    expect(
      renderSpecialRulesContext(army(draft), { id: "start-of-turn" }),
    ).toContain("Chaotic Surge");
    expect(
      renderSpecialRulesContext(army(v15), { id: "start-of-turn" }),
    ).not.toContain("Chaotic Surge");
  });

  it("the draft's Bloodthirster has Impact Hits (D3+1) and no Furious Charge", () => {
    const b = (rs) => resolveStats("bloodthirster", "Bloodthirster", rs)[0];
    expect(b(v15).rules).toContain("Furious Charge");
    expect(b(draft).rules).not.toContain("Furious Charge");
    expect(b(draft)["Impact-Hits"]).toBe("D3+1");
  });
});
