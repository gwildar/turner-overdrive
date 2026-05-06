# Architecture Design Review — Turner Overdrive

## Context

Solo-developer side project: a Warhammer: The Old World game tracker. Vanilla JS, Vite 8, Tailwind 4, 1 runtime dep (Navigo), GitHub Pages deployment. ~49K lines total (35K is static game data). 31 test files, 451 tests passing. Alpha stage.

This review assesses the current architecture for correctness, maintainability, and scaling readiness. Calibrated for a side project — no enterprise patterns.

Quick wins Q1–Q4 already shipped in v3.9.6 (2026-05-06). Remaining items below are pending.

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

### Medium

**M1. Module-level `document.getElementById("app")` in all 10 screens**

Every screen grabs `const app = document.getElementById("app")` at import time. Couples module evaluation to DOM readiness. Test setup must create `#app` before any screen import. Latent ordering bug if imports are ever reorganised.

Files: `src/screens/game.js`, `opponent-turn.js`, `setup.js`, `deployment.js`, `first-turn.js`, `unit-assignment.js`, `scenario-setup.js`, `spell-selection-screen.js`, `about.js`, `game-over.js`

**M2. Scoring table duplicated between `scoring.js` and `game-over.js`**

~60 lines of identical logic: `noObjectives`, `turnsInOrder`, `totalYou/totalOpponent` computation, per-round row rendering, deployment-time row, score label derivation. Bug fix in one must be manually replicated in the other.

**M3. Game header duplicated between `game.js` and `opponent-turn.js`**

~40 lines of near-identical HTML: army name, round counter, OWB link, New Game button, phase progress bar. Minor divergences (opponent has "Opp" badge, progress bar index calculation differs). Header bugs need fixing in two places.

**M4. Supplement toggle requires page reload** — `src/data/supplements/index.js:12-21`

`isEnabled()` reads localStorage at module evaluation time. `SUPPLEMENT_*` exports are computed once. Toggling requires `window.location.reload()`. Also means supplement state is baked in at test import time — tests can't toggle supplements without module re-evaluation.

**M5. Thin New Recruit parser test coverage** — `src/test/new-recruit-import.test.js`

51 lines, 1 fixture, basic smoke test. The NR parser (334 lines) handles a materially different data structure with nested selections and recursive cost summation. OWB has 14 fixtures and deep assertion coverage; NR has 1.

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

### Medium efforts (1–4 hours) — pending

| ID   | What                                                                                                | Where                                                             | Impact                                                              |
| ---- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------- |
| M-R1 | Extract shared scoring table builder                                                                | `src/screens/scoring.js`, `game-over.js` → new `scoring-table.js` | Eliminates ~60 lines duplication                                    |
| M-R2 | Extract shared game header                                                                          | `src/screens/game.js`, `opponent-turn.js` → new `game-header.js`  | Eliminates ~40 lines duplication, single source of truth for header |
| M-R3 | Add 2–3 New Recruit parser fixtures with deeper assertions                                          | `src/test/new-recruit-import.test.js`                             | Catches NR-specific parsing bugs                                    |
| M-R4 | Pass `app` element as parameter to render functions (or use shared `getApp()` helper like tests do) | All 10 screen files                                               | Removes module-level DOM coupling, improves testability             |

### Larger refactors (> 4 hours) — pending

| ID   | What                                                                                                                                 | Where                                              | Impact                                                                           |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- | -------------------------------------------------------------------------------- |
| L-R1 | Lazy-load data files by faction via dynamic `import()`                                                                               | `src/data/units.js` → split into per-faction files | 60–70% initial bundle reduction. Matters when all factions supported.            |
| L-R2 | Make supplement data dynamically composable (export `withSupplements(base, supplements)` called at parse time, not module eval time) | `src/data/supplements/index.js` + data files       | Removes page-reload requirement for toggle, makes supplements testable           |
| L-R3 | Introduce thin `renderScreen(htmlFn, bindFn)` wrapper with try/catch                                                                 | All screen files                                   | Prevents half-rendered states when render throws after innerHTML but before bind |

### Recommended order for remaining work

1. **M-R1 + M-R2** — reduce duplication before more features land on scoring/header
2. **M-R3** — de-risk the second import format
3. **L-R1** — when bundle size becomes a real constraint
4. **L-R2** — when supplement toggle UX matters (more supplements, more users)

---

## Critical files

- `src/screens/scoring.js` + `game-over.js` — scoring dedup (M-R1)
- `src/screens/game.js` + `opponent-turn.js` — header dedup (M-R2)
- `src/test/new-recruit-import.test.js` — NR test coverage (M-R3)
- All 10 screen files — DOM coupling (M-R4)
- `src/data/supplements/index.js` — supplement toggle architecture (L-R2)
- `src/data/units.js` — faction code-splitting (L-R1)

## Verification

- `npm test` — all tests pass after each change
- Manual: upload `.owb.json`, play through all phases, check scoring, trigger error overlay, verify "Clear data & restart" works on production URL
- Build: `npm run build` → verify `dist/` output, check chunk sizes
