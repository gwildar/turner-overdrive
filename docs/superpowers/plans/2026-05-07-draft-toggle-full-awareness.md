# Draft Toggle Full Awareness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the "Use v1.5.2.2 draft rules" toggle affect special rule resolution, unit stat variants, and magic items — not just lore/spell selection.

**Architecture:** Thread an `isDraft` boolean through all resolve functions. When `isDraft=false`, only stable (`rlp-v1.5.js`) supplement data is active; when `isDraft=true`, draft supplement data (`de-renegade.js`, `ok-renegade.js`, `sk-renegade.js`) is also active and wins on conflicts. Spells already work via `loreRemaps`/`draftLoreRemaps` — this plan does not touch that path.

**Tech Stack:** Vanilla JS/ESM, Vitest for tests.

---

## Background / Key Concepts

- `src/data/supplements/rlp-v1.5.js` — **stable** supplement: rules + spells only, no unit overrides, no magic items
- `src/data/supplements/de-renegade.js` — **draft** supplement: rules + unit stat overrides (witch-elves-renegade, war-hydra-renegade, etc.) + magic items (Whip of Agony, Banner of Nagarythe, etc.)
- `src/data/supplements/index.js` — aggregates all supplements into `SUPPLEMENT_RULES`, `SUPPLEMENT_UNITS`, `SUPPLEMENT_ITEMS`
- `src/parsers/resolve.js` — `RULE_INDEX` (flat `Map` built at module load), `resolveStats`, `resolveSpecialRules`, `resolveMagicItems`
- `src/parsers/from-owb.js` — calls `getSupplementsEnabled()` only at lore-remap time (line 425); resolve calls at lines 184–271 ignore isDraft
- `src/parsers/from-new-recruit.js` — **zero** draft awareness; always uses stable rules
- `src/state.js` — `getSupplementsEnabled(): bool`, `saveSupplementsEnabled(bool)`

**Current bug:** When `isDraft=false` (toggle OFF), de-renegade unit variants (e.g. `war-hydra-renegade`) are still selected and draft-only special rules (e.g. `altar-of-khaine`, `if-one-head-is-severed`) are still injected.

---

## Files Modified

| File                                 | Change                                                                                                                                                                                                                      |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/data/supplements/index.js`      | Export `STABLE_SUPPLEMENT_RULES`, `DRAFT_SUPPLEMENT_RULES`, `STABLE_SUPPLEMENT_ITEMS`, `DRAFT_SUPPLEMENT_ITEMS`, `STABLE_SUPPLEMENT_UNITS`, `DRAFT_SUPPLEMENT_UNITS` alongside existing combined exports                    |
| `src/data/special-rules.js`          | Export `CORE_RULES` (non-supplement faction arrays)                                                                                                                                                                         |
| `src/parsers/resolve.js`             | Two RULE_INDEXes; `resolveSpecialRules(str, isDraft)`, `resolveStats(id, name, comp, isDraft)`, `resolveMagicItems(names, comp, isDraft)`, `lookupItem(name, comp, isDraft)`, `resolveWeapons(equip, items, comp, isDraft)` |
| `src/parsers/from-owb.js`            | Compute `isDraft` early; pass to all resolve calls                                                                                                                                                                          |
| `src/parsers/from-new-recruit.js`    | Import `getSupplementsEnabled`; pass `isDraft` to resolve calls (API consistency — no-op without composition)                                                                                                               |
| `src/test/de-renegade-draft.test.js` | New integration tests for toggle-off vs toggle-on; existing draft-dependent tests updated with `saveSupplementsEnabled(true)`                                                                                               |

---

## Task 1: Export stable/draft splits from supplements/index.js

**Files:**

- Modify: `src/data/supplements/index.js`
- Modify: `src/test/de-renegade-draft.test.js`

- [ ] **Step 1: Write failing test**

In `src/test/de-renegade-draft.test.js`, add a new `describe` block at the bottom:

```javascript
import {
  STABLE_SUPPLEMENT_RULES,
  DRAFT_SUPPLEMENT_RULES,
  STABLE_SUPPLEMENT_ITEMS,
  DRAFT_SUPPLEMENT_ITEMS,
  STABLE_SUPPLEMENT_UNITS,
  DRAFT_SUPPLEMENT_UNITS,
} from "../data/supplements/index.js";

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
```

- [ ] **Step 2: Run to confirm failure**

```bash
npm test -- --reporter=verbose 2>&1 | grep "supplement index"
```

Expected: `FAIL` — `STABLE_SUPPLEMENT_RULES is not exported`

- [ ] **Step 3: Implement the split in supplements/index.js**

Add the new exports **above** the existing combined exports (which stay unchanged for backward compatibility):

```javascript
// ── Stable / draft splits (for draft-toggle-aware resolution) ───────
export const STABLE_SUPPLEMENT_RULES = rlpV15.specialRules || [];
export const DRAFT_SUPPLEMENT_RULES = [
  ...(deRenegade.specialRules || []),
  ...(okRenegade.specialRules || []),
  ...(skRenegade.specialRules || []),
];

export const STABLE_SUPPLEMENT_ITEMS = rlpV15.magicItems || [];
export const DRAFT_SUPPLEMENT_ITEMS = [
  ...(deRenegade.magicItems || []),
  ...(okRenegade.magicItems || []),
  ...(skRenegade.magicItems || []),
];

export const STABLE_SUPPLEMENT_UNITS = Object.assign({}, rlpV15.units || {});
export const DRAFT_SUPPLEMENT_UNITS = Object.assign(
  {},
  deRenegade.units || {},
  okRenegade.units || {},
  skRenegade.units || {},
);
```

Keep the existing combined exports (`SUPPLEMENT_UNITS`, `SUPPLEMENT_RULES`, `SUPPLEMENT_ITEMS`, `SUPPLEMENT_SPELLS`) unchanged below them.

- [ ] **Step 4: Run tests**

```bash
npm test 2>&1 | tail -5
```

Expected: all tests pass, including the 6 new ones.

- [ ] **Step 5: Commit**

```bash
git add src/data/supplements/index.js src/test/de-renegade-draft.test.js
git commit -m "feat: export stable/draft supplement splits from index.js"
```

---

## Task 2: Draft-aware RULE_INDEX and resolveSpecialRules

**Files:**

- Modify: `src/data/special-rules.js`
- Modify: `src/parsers/resolve.js`
- Modify: `src/test/de-renegade-draft.test.js`

- [ ] **Step 1: Write failing tests**

Add to `src/test/de-renegade-draft.test.js`:

```javascript
import { resolveSpecialRules } from "../parsers/resolve.js";

describe("resolveSpecialRules draft awareness", () => {
  it("with isDraft=false, 'altar of khaine' resolves to bare entry (not draft rule)", () => {
    const rules = resolveSpecialRules("Altar of Khaine", false);
    // "altar of khaine" only exists in de-renegade draft supplement
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
    // Alias lives on murderous-v1.5 (stable supplement), not on murderous-renegade (draft)
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
```

- [ ] **Step 2: Run to confirm failure**

```bash
npm test -- --reporter=verbose 2>&1 | grep "resolveSpecialRules draft"
```

Expected: wrong id values — currently "altar of khaine" resolves even with isDraft=false.

- [ ] **Step 3: Export CORE_RULES from special-rules.js**

In `src/data/special-rules.js`, add a `CORE_RULES` export before the existing `SPECIAL_RULES`:

```javascript
export const CORE_RULES = [
  ...COMMON,
  ...UNDEAD,
  ...BEASTMEN,
  ...GREENSKINS,
  ...CHAOS_MARKS,
  ...DAEMONS,
  ...DWARFS,
  ...VAMPIRE_COUNTS,
  ...TOMB_KINGS,
  ...GRAND_CATHAY,
];

export const SPECIAL_RULES = [...CORE_RULES, ...SUPPLEMENT_RULES]; // unchanged
```

- [ ] **Step 4: Build two RULE_INDEXes in resolve.js**

Replace the existing `RULE_INDEX` construction (lines 7–16) with:

```javascript
import { CORE_RULES } from "../data/special-rules.js";
import {
  STABLE_SUPPLEMENT_RULES,
  DRAFT_SUPPLEMENT_RULES,
} from "../data/supplements/index.js";

function buildRuleIndex(rules) {
  const map = new Map();
  for (const rule of rules) {
    map.set(rule.id.toLowerCase(), rule);
    if (rule.aliases) {
      for (const alias of rule.aliases) map.set(alias.toLowerCase(), rule);
    }
  }
  return map;
}

const STABLE_RULE_INDEX = buildRuleIndex([
  ...CORE_RULES,
  ...STABLE_SUPPLEMENT_RULES,
]);
const ALL_RULE_INDEX = buildRuleIndex([
  ...CORE_RULES,
  ...STABLE_SUPPLEMENT_RULES,
  ...DRAFT_SUPPLEMENT_RULES,
]);
```

Remove the old `import { SPECIAL_RULES }` and `RULE_INDEX` — they are replaced by `CORE_RULES` + the two indexes. The `SPECIAL_RULES` import may still be needed if other code in resolve.js uses it; check and keep only if used.

- [ ] **Step 5: Update `resolveSpecialRules` signature**

```javascript
export function resolveSpecialRules(rulesString, isDraft = false) {
  if (!rulesString || !rulesString.trim()) return [];

  const index = isDraft ? ALL_RULE_INDEX : STABLE_RULE_INDEX;
  const rules = [];
  const parts = rulesString.split(",").map((s) => s.trim());

  for (const rawPart of parts) {
    const part = rawPart.replace(/\*$/, "").trim();
    const cleanPart = part.replace(/\s*\{[^}]*\}/g, "").trim();

    const found =
      index.get(part.toLowerCase()) ||
      (cleanPart !== part ? index.get(cleanPart.toLowerCase()) : null) ||
      null;

    if (found) {
      rules.push(found);
    } else {
      rules.push({ id: null, displayName: cleanPart || part, phases: [] });
    }
  }

  return rules;
}
```

- [ ] **Step 6: Run tests**

```bash
npm test 2>&1 | tail -5
```

Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add src/data/special-rules.js src/parsers/resolve.js src/test/de-renegade-draft.test.js
git commit -m "feat: draft-aware RULE_INDEX and resolveSpecialRules(str, isDraft)"
```

---

## Task 3: Draft-aware unit stat resolution

**Files:**

- Modify: `src/parsers/resolve.js`
- Modify: `src/test/de-renegade-draft.test.js`

- [ ] **Step 1: Write failing tests**

Both core `war-hydra` and `war-hydra-renegade` have `crewed: true`. Use AS (armour save) as distinguisher: core has `AS: "5"`, renegade has `AS: "4"`.

Add to `src/test/de-renegade-draft.test.js`:

```javascript
import { resolveStats } from "../parsers/resolve.js";

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
    // Core war-hydra has "Stomp Attacks (D3)" in rules, not D3+1
    const rules = stats[0]?.rules || [];
    expect(rules).toContain("Stomp Attacks (D3)");
    expect(rules).not.toContain("Stomp Attacks (D3+1)");
  });

  it("non-renegade composition ignores isDraft entirely", () => {
    const stats = resolveStats("war-hydra", "War Hydra", "dark-elves", true);
    // "dark-elves" composition (not renegade) — never tries -renegade keys
    expect(stats[0]?.AS).toBe("5");
  });
});
```

- [ ] **Step 2: Run to confirm failure**

```bash
npm test -- --reporter=verbose 2>&1 | grep "resolveStats draft"
```

Expected: isDraft=false test fails — currently returns renegade variant (AS "4") regardless of isDraft.

- [ ] **Step 3: Update resolveStats to gate -renegade lookup on isDraft**

In `src/parsers/resolve.js`, add `isDraft` parameter to `resolveStats` (line 98):

```javascript
export function resolveStats(id, name, composition, isDraft = false) {
  const baseId = (id || "").split(".")[0];
  const slug = name?.replace(/[{}]/g, "").toLowerCase().replace(/\s+/g, "-");
  const keys = [
    baseId,
    baseId.replace(/s$/, ""),
    baseId + "s",
    slug,
    slug?.replace(/s$/, ""),
  ];
  // Draft unit overrides only when isDraft=true
  if (isDraft && composition?.includes("renegade")) {
    for (const key of keys) {
      const rk = key ? key + "-renegade" : null;
      if (rk && UNIT_STATS[rk]) return resolveUnitEntry(UNIT_STATS[rk]);
    }
  }
  for (const key of keys) {
    if (key && UNIT_STATS[key]) return resolveUnitEntry(UNIT_STATS[key]);
  }
  return [];
}
```

- [ ] **Step 4: Run tests**

```bash
npm test 2>&1 | tail -5
```

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add src/parsers/resolve.js src/test/de-renegade-draft.test.js
git commit -m "feat: resolveStats gates -renegade unit variants on isDraft flag"
```

---

## Task 4: Draft-aware magic item resolution

**Files:**

- Modify: `src/parsers/resolve.js`
- Modify: `src/test/de-renegade-draft.test.js`

- [ ] **Step 1: Write failing tests**

de-renegade.js items: Whip of Agony, Cold-Blooded Banner, Tome of Furion, Focus Familiar, Banner of Nagarythe. None exist in core `magic-items.js`.

Add to `src/test/de-renegade-draft.test.js`:

```javascript
import { resolveMagicItems } from "../parsers/resolve.js";

describe("resolveMagicItems draft awareness", () => {
  it("with isDraft=false, draft-only item 'Banner of Nagarythe' is not found", () => {
    const result = resolveMagicItems(
      ["Banner of Nagarythe"],
      "de-renegade",
      false,
    );
    expect(result).toHaveLength(0);
  });

  it("with isDraft=true, draft-only item 'Banner of Nagarythe' resolves", () => {
    const result = resolveMagicItems(
      ["Banner of Nagarythe"],
      "de-renegade",
      true,
    );
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Banner of Nagarythe");
    expect(result[0].type).toBe("banner");
  });

  it("core magic items resolve regardless of isDraft", () => {
    const stable = resolveMagicItems(["Ogre Blade"], "de-renegade", false);
    const draft = resolveMagicItems(["Ogre Blade"], "de-renegade", true);
    expect(stable).toHaveLength(1);
    expect(draft).toHaveLength(1);
    expect(stable[0].name).toBe("Ogre Blade");
  });

  it("without renegade composition, draft items are never found", () => {
    const result = resolveMagicItems(
      ["Banner of Nagarythe"],
      "dark-elves",
      true,
    );
    expect(result).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Run to confirm failure**

```bash
npm test -- --reporter=verbose 2>&1 | grep "resolveMagicItems draft"
```

Expected: "Banner of Nagarythe" test with isDraft=false fails — currently found regardless of toggle.

- [ ] **Step 3: Implement draft-aware lookupItem and resolveMagicItems**

In `src/parsers/resolve.js`, replace the existing `SUPPLEMENT_ITEM_MAP` (lines 231–238) and `lookupItem` (lines 240–246):

```javascript
import {
  STABLE_SUPPLEMENT_ITEMS,
  DRAFT_SUPPLEMENT_ITEMS,
} from "../data/supplements/index.js";

// Build separate item maps for stable and draft supplements
function buildSupplementItemMap(items) {
  const map = {};
  for (const item of items) {
    const key = item.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    map[key] = item;
  }
  return map;
}

const STABLE_SUPPLEMENT_ITEM_MAP = buildSupplementItemMap(
  STABLE_SUPPLEMENT_ITEMS,
);
const DRAFT_SUPPLEMENT_ITEM_MAP = buildSupplementItemMap(
  DRAFT_SUPPLEMENT_ITEMS,
);

function lookupItem(name, composition, isDraft = false) {
  const key = normaliseItemName(name);
  if (composition?.includes("renegade")) {
    if (isDraft && DRAFT_SUPPLEMENT_ITEM_MAP[key])
      return DRAFT_SUPPLEMENT_ITEM_MAP[key];
    if (STABLE_SUPPLEMENT_ITEM_MAP[key]) return STABLE_SUPPLEMENT_ITEM_MAP[key];
  }
  return MAGIC_ITEM_MAP[key] ?? null;
}
```

Remove the old `import { SUPPLEMENT_ITEMS }` from supplements/index.js (no longer needed in resolve.js — the stable/draft imports replace it).

Update `resolveMagicItems` signature:

```javascript
export function resolveMagicItems(itemNames, composition, isDraft = false) {
  const items = [];
  for (const name of itemNames) {
    const mi = lookupItem(name, composition, isDraft);
    if (mi) items.push(mi);
  }
  return items;
}
```

Update `resolveWeapons` signature (it calls `lookupItem` internally):

```javascript
export function resolveWeapons(
  equipmentStrings,
  magicItemNames,
  composition,
  isDraft = false,
) {
  // ... existing logic unchanged, just update the lookupItem call:
  const mi = lookupItem(itemName, composition, isDraft);
  // ... rest unchanged
}
```

Also update `resolveShootingWeapons` if it calls `lookupItem` — check first; it likely doesn't.

- [ ] **Step 4: Run tests**

```bash
npm test 2>&1 | tail -5
```

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add src/parsers/resolve.js src/test/de-renegade-draft.test.js
git commit -m "feat: draft-aware magic item lookup (STABLE vs DRAFT supplement item maps)"
```

---

## Task 5: Thread isDraft through from-owb.js and fix existing tests

This is the core integration task. It threads `isDraft` through `parseCanonicalUnit` and updates existing tests that rely on draft behaviour.

**Files:**

- Modify: `src/parsers/from-owb.js`
- Modify: `src/test/de-renegade-draft.test.js`

### Existing tests that will break

After this task, `getSupplementsEnabled()` defaults to `false`. These test describe blocks rely on draft behaviour and need `saveSupplementsEnabled(true)` in `beforeEach` and `saveSupplementsEnabled(false)` in `afterEach`:

| Describe block                      | Why it breaks without toggle ON                                                         |
| ----------------------------------- | --------------------------------------------------------------------------------------- |
| "War Hydra draft rules" (line 23)   | Stomp D3+1, "If One Head is Severed" — both from `-renegade` unit stats                 |
| "Murderous rule version" (line 321) | **Does NOT break** — alias is on `murderous-v1.5` (stable), resolves with isDraft=false |

Other describe blocks (Immune to Psychology, Black Dragon Terror, Behemoth troop type, Death Hag, High Beastmaster) rely on mount resolution or core rules — these are NOT affected by isDraft.

- [ ] **Step 1: Write integration tests for toggle behaviour**

Add to `src/test/de-renegade-draft.test.js`:

```javascript
import { saveSupplementsEnabled } from "../state.js";

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
});
```

- [ ] **Step 2: Update existing "War Hydra draft rules" describe block**

Add `saveSupplementsEnabled(true)` to the `beforeEach` and `afterEach` cleanup:

```javascript
describe("War Hydra draft rules", () => {
  let army;

  beforeEach(() => {
    saveSupplementsEnabled(true);
    army = loadArmy("de-renegade-draft");
  });

  afterEach(() => {
    saveSupplementsEnabled(false);
  });

  // ... existing tests unchanged ...
});
```

Add `saveSupplementsEnabled` to the import from `../state.js` (which already imports `saveRound` and `saveCharacterAssignments`):

```javascript
import {
  saveRound,
  saveCharacterAssignments,
  saveSupplementsEnabled,
} from "../state.js";
```

- [ ] **Step 3: Run to confirm integration tests fail**

```bash
npm test -- --reporter=verbose 2>&1 | grep "draft toggle integration"
```

Expected: toggle OFF tests fail (War Hydra still uses renegade stats).

- [ ] **Step 4: Move isDraft computation to top of parseCanonicalUnit in from-owb.js**

In `parseCanonicalUnit` (line 120), `isDraft` is currently computed at line 425 for lore remapping. Move it to the top of the function, then pass to all resolve calls:

```javascript
function parseCanonicalUnit(raw, category, armyComposition = "") {
  const isDraft = getSupplementsEnabled(); // ← move to top
  const id = raw.id || "unknown";
  // ...existing setup code unchanged...

  // Line 184: add isDraft
  const stats = resolveStats(id, raw.name_en, armyComposition, isDraft);

  // Line 187: add isDraft
  const weapons = resolveWeapons(
    equipment,
    magicItemNames,
    armyComposition,
    isDraft,
  );

  // Line 193: add isDraft
  const magicItems = resolveMagicItems(
    magicItemNames,
    armyComposition,
    isDraft,
  ).map(/* ... */);

  // Line 199: add isDraft
  let specialRules = resolveSpecialRules(specialRulesText, isDraft);

  // Line 204: add isDraft guard — rule injection from stats[0].rules is for
  // renegade variants that add rules OWB doesn't export. When isDraft=false,
  // resolveStats returns core stats whose rules are already in OWB text, but
  // the isDraft guard keeps this block correctly scoped to draft mode only.
  if (isDraft && armyComposition?.includes("renegade") && stats[0]?.rules) {
    for (const ruleName of stats[0].rules) {
      const resolved = resolveSpecialRules(ruleName, isDraft);
      // ...existing dedup logic unchanged...
    }
  }

  // Line 238 (magic item → special rule injection): add isDraft
  const resolved = resolveSpecialRules(item.name_en, isDraft);

  // Lines 259, 271 (grantsRules injection): add isDraft
  const resolved = resolveSpecialRules(ruleName, isDraft);

  // Line 425: isDraft already defined from top — delete the duplicate declaration.
  // Keep the lore remap logic, just remove `const isDraft = getSupplementsEnabled();`
}
```

Also thread isDraft through any detachment parsing inside `parseCanonicalUnit` if present:

```javascript
const detStats = resolveStats(det.id, det.name_en, armyComposition, isDraft);
const detWeapons = resolveWeapons(detEquipment, [], armyComposition, isDraft);
const detSpecialRules = resolveSpecialRules(/* ... */, isDraft);
```

- [ ] **Step 5: Run tests**

```bash
npm test 2>&1 | tail -5
```

Expected: all pass, including the new integration tests and the updated existing tests.

- [ ] **Step 6: Commit**

```bash
git add src/parsers/from-owb.js src/test/de-renegade-draft.test.js
git commit -m "feat: thread isDraft through from-owb.js parse pipeline"
```

---

## Task 6: Add draft awareness to from-new-recruit.js (API consistency)

This is a no-op for current functionality — from-new-recruit.js doesn't pass `composition` to resolve calls, so isDraft alone won't activate renegade gates. But updating the API calls ensures consistency and future-proofs the parser.

**Files:**

- Modify: `src/parsers/from-new-recruit.js`

- [ ] **Step 1: Import getSupplementsEnabled and thread isDraft**

At the top of `src/parsers/from-new-recruit.js`, add to imports:

```javascript
import { getSupplementsEnabled } from "../state.js";
```

Inside `parseCanonicalUnit` (line 167), add:

```javascript
const isDraft = getSupplementsEnabled();
```

Update all resolve calls to pass isDraft as the last argument. These calls currently don't pass `composition` — don't add it, just add isDraft in the correct parameter position:

```javascript
// Line 219: currently resolveWeapons(equipment, magicItemNames)
// resolveWeapons signature: (equipmentStrings, magicItemNames, composition, isDraft)
const weapons = resolveWeapons(equipment, magicItemNames, undefined, isDraft);

// Line 221: currently resolveMagicItems(magicItemNames)
const resolvedMagicItems = resolveMagicItems(
  magicItemNames,
  undefined,
  isDraft,
);

// Line 222: currently resolveSpecialRules(allRulesText)
const specialRules = resolveSpecialRules(allRulesText, isDraft);

// Line 317: currently resolveStats(id, unitName)
const resolvedStats = resolveStats(id, unitName, undefined, isDraft);
```

- [ ] **Step 2: Run tests**

```bash
npm test 2>&1 | tail -5
```

Expected: all pass. No behaviour change.

- [ ] **Step 3: Commit**

```bash
git add src/parsers/from-new-recruit.js
git commit -m "feat: add isDraft awareness to from-new-recruit.js parser"
```

---

## Task 7: Version bump and push

- [ ] **Step 1: Run full test suite**

```bash
npm test 2>&1 | tail -8
```

Expected: all tests pass.

- [ ] **Step 2: Bump version**

```bash
npm version minor --no-git-tag-version
```

(Minor bump — meaningful behaviour change to draft toggle.)

- [ ] **Step 3: Commit and push**

```bash
git add package.json package-lock.json
git commit -m "chore: bump to 4.1.0 — draft toggle controls rules, units, and items"
git push
```

---

## Self-Review

### Spec coverage

| Requirement                                     | Covered by                                     |
| ----------------------------------------------- | ---------------------------------------------- |
| Toggle affects special rule resolution          | Task 2 (two RULE_INDEXes) + Task 5 (threading) |
| Toggle affects unit stat variants               | Task 3 (resolveStats gating) + Task 5          |
| Toggle affects magic items                      | Task 4 (split item maps) + Task 5              |
| Spells already working                          | Not touched — confirmed out of scope           |
| from-new-recruit API consistency                | Task 6                                         |
| Murderous v1.5 stays correct both toggle states | Tested in Task 2 and Task 5                    |
| Existing draft-dependent tests updated          | Task 5 step 2                                  |

### Notes

1. **`findRule()` in `special-rules.js` is NOT draft-aware** — it does a linear scan of `SPECIAL_RULES` (which includes all supplement rules). Only used in one test (`special-rules-data.test.js:72`). If anything ever calls `findRule()` at runtime for a draft-only rule, it would find it regardless of toggle. Low risk — monitor if new callers are added.

2. **`SUPPLEMENT_ITEMS` import in resolve.js** — After Task 4, the old `SUPPLEMENT_ITEM_MAP` is replaced by `STABLE_SUPPLEMENT_ITEM_MAP` + `DRAFT_SUPPLEMENT_ITEM_MAP`. Remove the `SUPPLEMENT_ITEMS` import if nothing else in resolve.js uses it.

3. **Mount resolution is NOT draft-aware** — `resolveMount` uses `findMount` which looks up `UNIT_STATS` directly via `MOUNT_KEY_OVERRIDES`. Mount keys are hardcoded (e.g. `"cauldron of blood": "cauldron-of-blood-mount"`) and don't have `-renegade` variants. This is correct — mount profiles don't differ between v1.5 and draft.
