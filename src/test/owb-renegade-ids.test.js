import { describe, it, expect } from "vitest";
import {
  getRuleset,
  resolveStats,
  resolveMagicItems,
  resolveMagicShootingWeapons,
} from "../parsers/resolve.js";

describe("Renegade units with their own army-list id", () => {
  const de = (v) => getRuleset("de-renegade", v);

  it.each(["v1.5", "v1.5.2.2"])(
    "Repeater Crossbowmen {renegade} get the Repeater Crossbowmen profile (%s)",
    (v) => {
      const stats = resolveStats(
        "repeater-crossbowmen-renegade",
        "Repeater Crossbowmen {renegade}",
        de(v),
      );
      expect(stats[0]?.Name).toBe("Repeater Crossbowman");
    },
  );

  it.each(["v1.5", "v1.5.2.2"])(
    "a War Hydra taken as Special (war-hydra-special-renegade) gets War Hydra stats (%s)",
    (v) => {
      const stats = resolveStats(
        "war-hydra-special-renegade",
        "War Hydra {renegade}",
        de(v),
      );
      expect(stats[0]?.Name).toBe("War Hydra");
    },
  );
});

describe("magic missile weapons show as shooting attacks", () => {
  it("Hunter's Scorn uses its bow profile (30\", S5, AP -1)", () => {
    const items = resolveMagicItems(["Hunter's Scorn"]);
    const [bow] = resolveMagicShootingWeapons(items);
    expect(bow).toMatchObject({
      name: "Hunter's Scorn",
      range: '30"',
      s: "5",
      ap: "-1",
      magical: true,
    });
    expect(bow.rules).toContain("Multiple Shots (2)");
  });

  it("a magic bow with no weapon profile uses the item's own range, S and AP", () => {
    const [bow] = resolveMagicShootingWeapons(
      resolveMagicItems(["Dragon Bow"]),
    );
    expect(bow).toMatchObject({
      range: '36"',
      s: "6",
      ap: "-2",
      magical: true,
    });
  });

  it("combat-only magic weapons are not shooting attacks", () => {
    expect(
      resolveMagicShootingWeapons(resolveMagicItems(["Ogre Blade"])),
    ).toEqual([]);
  });
});
