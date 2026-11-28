import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  findMount,
  getRuleset,
  mountedTW,
  computeUnitStrength,
} from "../parsers/resolve.js";

// Mount rules: tow.whfb.app/characters — split profile (cavalry / ridden
// monster / chariot mount) and Howdah.

describe("mount kinds", () => {
  it.each([
    ["Barded Warhorse", "cavalry"],
    ["Barded Pegasus", "cavalry"],
    ["Black Dragon", "monster"],
    ["Terrorgheist {mount}", "monster"],
    ["Chaos Chariot", "chariot"],
    ["Scourgerunner Chariot", "chariot"],
    ["Cauldron of Blood", "chariot"],
    ["Stegadon", "howdah"],
    ["Ancient Stegadon", "howdah"],
  ])("%s is a %s mount", (name, kind) => {
    expect(findMount(name)?.kind).toBe(kind);
  });

  it("every mount in the test army lists resolves, with a troop type", () => {
    const dir = path.join(
      path.dirname(new URL(import.meta.url).pathname),
      "fixtures",
    );
    const missing = [];
    for (const f of fs.readdirSync(dir)) {
      const list = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
      const rs = getRuleset(list.armyComposition || "");
      (function walk(n) {
        if (!n || typeof n !== "object") return;
        for (const m of Array.isArray(n.mounts) ? n.mounts : [])
          if (m.active && m.name_en !== "On foot") {
            const mount = findMount(m.name_en, rs);
            // Mounts built into the unit's own profile (e.g. Great Spirit
            // Longma) have no entry of their own.
            if (mount && !mount.troopType) missing.push(`${f}: ${m.name_en}`);
          }
        for (const v of Object.values(n)) walk(v);
      })(list);
    }
    expect(missing).toEqual([]);
  });
});

describe("a mounted character's Toughness and Wounds", () => {
  const tw = (name, t, w, rs) => mountedTW(t, w, findMount(name, rs));

  it("chariot: Wounds are added, Toughness is the higher of the two", () => {
    // Chaos Chariot T5 W4
    expect(tw("Chaos Chariot", 5, 4)).toEqual({ t: 5, w: 8 });
    expect(tw("Chaos Chariot", 4, 3)).toEqual({ t: 5, w: 7 });
    // Cauldron of Blood T5 W5: a T4 rider doesn't become T6
    expect(tw("Cauldron of Blood", 4, 2)).toEqual({ t: 5, w: 7 });
  });

  it("howdah behemoth follows the chariot rule", () => {
    // Ancient Stegadon T6 W5
    expect(tw("Ancient Stegadon", 2, 2)).toEqual({ t: 6, w: 7 });
  });

  it("ridden monster and cavalry add the bonus printed on the mount", () => {
    expect(tw("Terrorgheist {mount}", 5, 3)).toEqual({ t: 6, w: 8 });
    expect(tw("Barded Pegasus", 3, 2)).toEqual({ t: 3, w: 3 });
  });

  it("Unit Strength: chariot mount 5, howdah and monster as combined Wounds", () => {
    const rider = (mount) => ({
      strength: 1,
      stats: [{ W: "3", troopType: ["RI", "Ch"] }],
      mount: findMount(mount),
    });
    expect(computeUnitStrength(rider("Chaos Chariot"))).toBe(5);
    expect(computeUnitStrength(rider("Ancient Stegadon"))).toBe(8);
    expect(computeUnitStrength(rider("Terrorgheist {mount}"))).toBe(8);
  });
});

describe("a Renegade version's mounts are used when ridden", () => {
  it.each([
    ["lm-renegade", "v1.5.2.1", "Carnosaur", (m) => m.ws === "4"],
    ["lm-renegade", "v1.5.2.1", "Stegadon", (m) => m.w === 6],
    ["vc-renegade", "v1.5.3.1", "Skeletal Steed", (m) => m.m === 8],
    [
      "de-renegade",
      "v1.5.2.2",
      "Cauldron of Blood {renegade}",
      (m) => m.m === 5,
    ],
  ])("%s %s: %s", (comp, version, name, check) => {
    const draft = findMount(name, getRuleset(comp, version));
    const v15 = findMount(name, getRuleset(comp, "v1.5"));
    expect(check(draft)).toBe(true);
    expect(check(v15)).toBe(false);
  });
});
