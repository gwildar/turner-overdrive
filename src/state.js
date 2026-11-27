const KEYS = {
  army: "tow-army",
  armySource: "tow-army-source",
  spellSelections: "tow-spell-selections",
  phaseIndex: "tow-phase-index",
  round: "tow-round",
  opponentTurn: "tow-opponent-turn",
  firstTurn: "tow-first-turn",
  scores: "tow-scores",
  timings: "tow-timings",
  startTime: "tow-start-time",
  assignments: "tow-character-assignments",
  activeLores: "tow-active-lores",
  schemaVersion: "tow-schema-version",
  deploymentTime: "tow-deployment-time",
  displayMode: "tow-display-mode",
  scenario: "tow-scenario",
  supplementsEnabled: "tow-supplements-enabled",
};

const DEFAULT_SCENARIO = {
  domination: false,
  baggageTrains: false,
  strategicLocations: { enabled: false, count: 3 },
  specialFeatures: false,
};

export const SCHEMA_VERSION = "9";

export function getSchemaVersion() {
  return load(KEYS.schemaVersion, null);
}

export function saveSchemaVersion(v) {
  save(KEYS.schemaVersion, v);
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Army
// The imported file is stored as-is and re-parsed on every load (see
// loadStoredArmy in army.js), so data and settings changes apply without a
// re-import. getArmy/saveArmy hold a parsed army: older versions of the app
// stored that instead, and it's still read as a fallback.
export function getArmySource() {
  return load(KEYS.armySource, null);
}

export function saveArmySource(json) {
  save(KEYS.armySource, json);
}

export function getArmy() {
  const army = load(KEYS.army, null);
  return army ? applyActiveLores(army) : null;
}

export function saveArmy(army) {
  save(KEYS.army, army);
}

export function clearArmy() {
  localStorage.removeItem(KEYS.army);
  localStorage.removeItem(KEYS.armySource);
  localStorage.removeItem(KEYS.spellSelections);
  localStorage.removeItem(KEYS.assignments);
  localStorage.removeItem(KEYS.activeLores);
}

// Core lore chosen per caster on the spell selection screen: { [unitId]: loreKey }.
// Kept separate from the army so the army itself is never edited after import.
export function getActiveLores() {
  return load(KEYS.activeLores, {});
}

export function saveActiveLore(unitId, loreKey) {
  save(KEYS.activeLores, { ...getActiveLores(), [unitId]: loreKey });
}

export function applyActiveLores(army) {
  const chosen = getActiveLores();
  for (const unit of army.units) {
    if (chosen[unit.id]) unit.activeLore = chosen[unit.id];
  }
  return army;
}

// Character assignments: { [characterId]: unitId }
export function getCharacterAssignments() {
  return load(KEYS.assignments, {});
}

export function saveCharacterAssignments(assignments) {
  save(KEYS.assignments, assignments);
}

// Spell selections: { [unitId]: [spellKey, ...] }
export function getSpellSelections() {
  return load(KEYS.spellSelections, {});
}

export function saveSpellSelections(selections) {
  save(KEYS.spellSelections, selections);
}

// Phase navigation
export function getPhaseIndex() {
  return load(KEYS.phaseIndex, 0);
}

export function savePhaseIndex(index) {
  save(KEYS.phaseIndex, index);
}

// Round
export function getRound() {
  return load(KEYS.round, 1);
}

export function saveRound(round) {
  save(KEYS.round, round);
}

// Opponent turn
export function getIsOpponentTurn() {
  return load(KEYS.opponentTurn, false);
}

export function saveIsOpponentTurn(value) {
  save(KEYS.opponentTurn, value);
}

// First turn (who goes first: 'you' or 'opponent')
export function getFirstTurn() {
  return load(KEYS.firstTurn, null);
}

export function saveFirstTurn(value) {
  save(KEYS.firstTurn, value);
}

// Scores: { [round]: { you: { you: N, opponent: N }, opponent: { you: N, opponent: N } } }
export function getScores() {
  return load(KEYS.scores, {});
}

export function saveScores(scores) {
  save(KEYS.scores, scores);
}

export function updateScore(round, isOpponentTurn, player, score) {
  const turnKey = isOpponentTurn ? "opponent" : "you";
  const scores = getScores();
  if (!scores[round]) {
    scores[round] = {
      you: { you: 0, opponent: 0 },
      opponent: { you: 0, opponent: 0 },
    };
  }
  scores[round][turnKey][player] = score;
  saveScores(scores);
}

// Timings: { [round]: { you: { [phaseIdx]: duration }, opponent: { [phaseIdx]: duration } } }
export function getTimings() {
  return load(KEYS.timings, {});
}

export function saveTimings(timings) {
  save(KEYS.timings, timings);
}

export function recordTiming(round, isOpponentTurn, phaseIdx, duration) {
  const turnKey = isOpponentTurn ? "opponent" : "you";
  const timings = getTimings();
  if (!timings[round]) {
    timings[round] = {
      you: {},
      opponent: {},
    };
  }
  if (!timings[round][turnKey][phaseIdx]) {
    timings[round][turnKey][phaseIdx] = 0;
  }
  timings[round][turnKey][phaseIdx] += duration;
  saveTimings(timings);
}

export function getStartTime() {
  return load(KEYS.startTime, null);
}

export function saveStartTime(time) {
  save(KEYS.startTime, time);
}

export function resetStartTime() {
  saveStartTime(Date.now());
}

export function recordCurrentPhaseTime(isOpponentTurn) {
  const startTime = getStartTime();
  if (startTime) {
    recordTiming(
      getRound(),
      isOpponentTurn,
      getPhaseIndex(),
      Date.now() - startTime,
    );
  }
  resetStartTime();
}

// Deployment time (ms elapsed during deployment screen)
export function getDeploymentTime() {
  return load(KEYS.deploymentTime, null);
}

export function saveDeploymentTime(ms) {
  save(KEYS.deploymentTime, ms);
}

// Can we go back to the previous turn?
export function canGoBackToPreviousTurn() {
  const round = getRound();
  const firstTurn = getFirstTurn();
  const isOpponentTurn = getIsOpponentTurn();
  if (round === 1) {
    if (firstTurn === "you" && !isOpponentTurn) return false;
    if (firstTurn === "opponent" && isOpponentTurn) return false;
  }
  return true;
}

// Scenario options
export function getScenarioOptions() {
  return load(KEYS.scenario, DEFAULT_SCENARIO);
}

export function saveScenarioOptions(opts) {
  save(KEYS.scenario, opts);
}

// Reset game (keeps army)
export function resetGame() {
  save(KEYS.phaseIndex, 0);
  save(KEYS.round, 1);
  save(KEYS.opponentTurn, false);
  save(KEYS.scores, {});
  save(KEYS.timings, {});
  save(KEYS.startTime, null);
  save(KEYS.deploymentTime, null);
  localStorage.removeItem(KEYS.scenario);
}

// Clear all app state
export function clearAll() {
  for (const key of Object.values(KEYS)) {
    localStorage.removeItem(key);
  }
}

export function getDisplayMode() {
  return load(KEYS.displayMode, "standard");
}

export function saveDisplayMode(mode) {
  save(KEYS.displayMode, mode);
}

export function getSupplementsEnabled() {
  return load(KEYS.supplementsEnabled, false);
}

export function saveSupplementsEnabled(enabled) {
  save(KEYS.supplementsEnabled, enabled);
}
