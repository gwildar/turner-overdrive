# Architecture Design Review — Turner Overdrive

## Context

Solo-developer side project: a Warhammer: The Old World game tracker. Vanilla JS, Vite 8, Tailwind 4, 1 runtime dep (Navigo), GitHub Pages deployment. ~49K lines total (35K is static game data). 31 test files, 451 tests passing. Alpha stage.

This review assesses the current architecture for correctness, maintainability, and scaling readiness. Calibrated for a side project — no enterprise patterns.

---

## Strengths

- **Minimal stack, zero framework churn** — 1 runtime dep. Will not rot.
- **Clean data pipeline** — OWB/NR raw JSON → parser → resolver → canonical army → localStorage → screens. Single shape for all downstream code. Pre-computed values (armour saves, ward saves, unit strength) mean screens never do rules math at render time.
- **Declarative phase system** — `phases.js` defines phases/sub-phases, `PHASE_RENDERERS` map dispatches, `getVisibleSubPhases()` filters. Adding a new sub-phase is data, not code.
- **Good test focus** — Tests concentrate on parsers, resolvers, and game screens where bugs are costly. Fixture-driven with 16+ real army exports. ~5.5K lines of test code.
- **Composable validation** — `army-validation.js` runs a `CHECKS` array. Easy to add new checks.
- **Schema versioning** — `clearAll()` on mismatch. No migration code to maintain at alpha stage.

---

## Concerns

### High (all fixed in v3.9.6)

**H1. XSS in error overlay** ✅ Fixed — `src/error-overlay.js:18`

**H2. Broken "Clear data & restart" on GitHub Pages** ✅ Fixed — `src/error-overlay.js:29`

**H3. O(n\*m) rule resolution** ✅ Fixed — `src/parsers/resolve.js`, `RULE_INDEX` Map

### Medium (all fixed)

**M1. Module-level `document.getElementById("app")` in all 10 screens** ✅ Fixed v3.9.8 — `src/screens/_app.js` `getApp()` helper

**M2. Scoring table duplicated between `scoring.js` and `game-over.js`** ✅ Fixed v3.9.9 — `src/screens/scoring-table.js` `renderScoreTable()`

**M3. Game header duplicated between `game.js` and `opponent-turn.js`** ✅ Fixed v3.9.10 — `src/screens/game-header.js` `renderGameHeader()`

**M4. Supplement toggle requires page reload** — `src/data/supplements/index.js:12-21`

`isEnabled()` reads localStorage at module evaluation time. `SUPPLEMENT_*` exports are computed once. Toggling requires `window.location.reload()`. Also means supplement state is baked in at test import time — tests can't toggle supplements without module re-evaluation.

**M5. Thin New Recruit parser test coverage** ✅ Fixed v3.9.11 — 9 new assertions + NR armour save bug fixed

### Low

**L1. Single-chunk bundle (677KB / ~140KB gzip)**

`units.js` alone is 23.6K lines. All data loaded at startup regardless of faction. Vite `chunkSizeWarningLimit` raised to 600KB to suppress the warning. Fine today with content-hash caching, but doubles if all 20+ factions are fully supported.

**L2. `getAllSubPhases()` recomputed each call** ✅ Fixed in v3.9.6

---

## Recommendations

### Quick wins (< 1 hour each) — all done ✅

| ID  | What                            | Status    |
| --- | ------------------------------- | --------- |
| Q1  | Fix error overlay XSS           | ✅ v3.9.6 |
| Q2  | Fix error overlay base path     | ✅ v3.9.6 |
| Q3  | Build `SPECIAL_RULES` index Map | ✅ v3.9.6 |
| Q4  | Memoize `getAllSubPhases()`     | ✅ v3.9.6 |

### Medium efforts — all done ✅

| ID   | What                                            | Status     |
| ---- | ----------------------------------------------- | ---------- |
| M-R1 | Extract shared scoring table builder            | ✅ v3.9.9  |
| M-R2 | Extract shared game header                      | ✅ v3.9.10 |
| M-R3 | Add NR parser fixtures with deeper assertions   | ✅ v3.9.11 |
| M-R4 | `getApp()` helper, remove module-level DOM grab | ✅ v3.9.8  |

### Larger refactors — in progress

| ID   | What                                                                                                                                 | Where                                              | Impact                                                                           | Status     |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- | -------------------------------------------------------------------------------- | ---------- |
| L-R1 | Lazy-load data files by faction via dynamic `import()`                                                                               | `src/data/units.js` → split into per-faction files | 60–70% initial bundle reduction. Matters when all factions supported.            | ⏳ Pending |
| L-R2 | Make supplement data dynamically composable (export `withSupplements(base, supplements)` called at parse time, not module eval time) | `src/data/supplements/index.js` + data files       | Removes page-reload requirement for toggle, makes supplements testable           | ⏳ Pending |
| L-R3 | `renderScreen(fn)` wrapper with try/catch in all screen render functions                                                             | `src/screens/_app.js` + all 10 screen files        | Prevents half-rendered states when render throws after innerHTML but before bind | ✅ v3.9.12 |

---

## Critical files (pending only)

- `src/data/supplements/index.js` — supplement toggle architecture (L-R2)
- `src/data/units.js` — faction code-splitting (L-R1)

## Verification

- `npm test` — all tests pass after each change
- Manual: upload `.owb.json`, play through all phases, check scoring, trigger error overlay, verify "Clear data & restart" works on production URL
- Build: `npm run build` → verify `dist/` output, check chunk sizes
