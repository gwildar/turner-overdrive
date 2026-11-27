import { describe, it, expect } from "vitest";
import { MAGIC_ITEMS } from "../data/magic-items.js";
import { SUPPLEMENT_ITEMS } from "../data/supplements/index.js";
import { PHASES } from "../phases.js";
import { renderMagicItemsContext } from "../context/items.js";
import { CORE_RULES } from "../data/special-rules.js";
import { SUPPLEMENT_RULES } from "../data/supplements/index.js";
import { renderSpecialRulesContext } from "../context/special-rules-context.js";
import { UNIT_STATS } from "../data/units.js";
import { SUPPLEMENT_UNITS } from "../data/supplements/index.js";
import { resolveUnitEntry } from "../parsers/resolve.js";

const PHASE_IDS = PHASES.map((p) => p.id);
const SUB_PHASE_IDS = PHASES.flatMap((p) => p.subPhases.map((s) => s.id));

// Runtime twin of the types in src/types.d.ts, so bad data also fails `npm test`.
const ALL_ITEMS = [...MAGIC_ITEMS, ...SUPPLEMENT_ITEMS];

const ITEM_TYPES = [
  "weapon",
  "armour",
  "talisman",
  "arcane-item",
  "enchanted-item",
  "banner",
  "standard",
  "virtue",
];

describe("magic item data", () => {
  it("every item has a known type", () => {
    const bad = ALL_ITEMS.filter((i) => !ITEM_TYPES.includes(i.type)).map(
      (i) => `${i.name}: ${i.type}`,
    );
    expect(bad).toEqual([]);
  });

  it("every item phase is a real phase (or passive)", () => {
    const bad = ALL_ITEMS.flatMap((i) =>
      (i.phases || [])
        .filter((p) => p !== "passive" && !PHASE_IDS.includes(p))
        .map((p) => `${i.name}: ${p}`),
    );
    expect(bad).toEqual([]);
  });

  it("every item sub-phase is a real game step", () => {
    const bad = ALL_ITEMS.flatMap((i) =>
      (i.subPhases || [])
        .filter((s) => !SUB_PHASE_IDS.includes(s))
        .map((s) => `${i.name}: ${s}`),
    );
    expect(bad).toEqual([]);
  });
});

describe("magic items appear on the steps where they matter", () => {
  const armyWith = (name) => ({
    units: [
      {
        name: "Bearer",
        magicItems: [MAGIC_ITEMS.find((i) => i.name === name)],
      },
    ],
  });

  // On the opponent's turn items show for the whole phase (step = null);
  // subPhases / opponentOnly only filter your own steps.
  it("Spelleater Axe shows as a weapon at your Choose & Fight", () => {
    expect(
      renderMagicItemsContext(
        armyWith("Spelleater Axe"),
        "combat",
        "choose-fight",
      ),
    ).toContain("Spelleater Axe");
  });

  it.each(["strategy", "shooting"])(
    "Spelleater Axe's Magic Resistance shows in the opponent's %s phase",
    (phase) => {
      expect(
        renderMagicItemsContext(armyWith("Spelleater Axe"), phase, null),
      ).toContain("Spelleater Axe");
    },
  );

  it.each(["shooting", "combat"])(
    "Spellshield (ward vs spells) shows in the opponent's %s phase",
    (phase) => {
      expect(
        renderMagicItemsContext(armyWith("Spellshield"), phase, null),
      ).toContain("Spellshield");
    },
  );

  it.each([
    ["shooting", "shoot"],
    ["combat", "choose-fight"],
  ])("Spellshield does not show on your own %s / %s step", (phase, step) => {
    expect(
      renderMagicItemsContext(armyWith("Spellshield"), phase, step),
    ).not.toContain("Spellshield");
  });
});

describe("special rule data", () => {
  const RULE_STEP_IDS = [...SUB_PHASE_IDS, "deployment"];

  it("every rule reminder points at a real game step (or deployment)", () => {
    const bad = [...CORE_RULES, ...SUPPLEMENT_RULES].flatMap((r) =>
      r.phases
        .map((p) => (typeof p === "string" ? p : p.subPhaseId))
        .filter((id) => !RULE_STEP_IDS.includes(id))
        .map((id) => `${r.displayName}: ${id}`),
    );
    expect(bad).toEqual([]);
  });

  it("From the Ashes shows at Choose & Fight", () => {
    const rule = CORE_RULES.find((r) => r.id === "from the ashes");
    const army = {
      units: [{ name: "Flamespyre Phoenix", specialRules: [rule] }],
    };
    expect(renderSpecialRulesContext(army, { id: "choose-fight" })).toContain(
      "From The Ashes",
    );
  });
});

describe("unit profile data", () => {
  const CHARACTERISTICS = [
    "Name",
    "M",
    "WS",
    "BS",
    "S",
    "T",
    "W",
    "I",
    "A",
    "Ld",
  ];

  it("every unit profile is complete (including shared + per-line entries)", () => {
    const bad = Object.entries({ ...UNIT_STATS, ...SUPPLEMENT_UNITS }).flatMap(
      ([key, entry]) =>
        resolveUnitEntry(entry).flatMap((profile, i) =>
          CHARACTERISTICS.filter((c) => typeof profile[c] !== "string").map(
            (c) => `${key}[${i}] missing ${c}`,
          ),
        ),
    );
    expect(bad).toEqual([]);
  });
});
