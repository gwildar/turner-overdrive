import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderScenarioSetupScreen } from "../../screens/scenario-setup.js";
import { getApp, loadArmy } from "../helpers.js";
import {
  saveCharacterAssignments,
  getScenarioOptions,
  saveScenarioOptions,
} from "../../state.js";
import {
  renderMiscastPanel,
  renderMiscastTable,
} from "../../context/miscast.js";
import * as Nav from "../../navigate.js";

describe("Scenario Setup Screen", () => {
  let army;

  beforeEach(() => {
    army = loadArmy("dark-elves");
  });

  it("renders Scenario Setup heading", () => {
    renderScenarioSetupScreen(army);
    expect(getApp().querySelector("h2").textContent).toContain(
      "Scenario Setup",
    );
  });

  it("shows next-btn and prev-btn", () => {
    renderScenarioSetupScreen(army);
    expect(getApp().querySelector("#next-btn")).toBeTruthy();
    expect(getApp().querySelector("#prev-btn")).toBeTruthy();
  });
});

describe("Scenario Setup Screen — navigation", () => {
  let army;

  beforeEach(() => {
    saveCharacterAssignments({});
    army = loadArmy("dark-elves");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("prev-btn navigates back to unit assignment", () => {
    vi.spyOn(Nav, "navigate").mockImplementation(() => {});
    renderScenarioSetupScreen(army);
    getApp().querySelector("#prev-btn").click();
    expect(Nav.navigate).toHaveBeenCalledWith("/unit-assignment");
  });

  it("next-btn navigates to deployment", () => {
    vi.spyOn(Nav, "navigate").mockImplementation(() => {});
    renderScenarioSetupScreen(army);
    getApp().querySelector("#next-btn").click();
    expect(Nav.navigate).toHaveBeenCalledWith("/deployment");
  });
});

describe("Scenario Setup Screen — Disastrous Miscasts", () => {
  let army;

  beforeEach(() => {
    localStorage.removeItem("tow-scenario");
    army = loadArmy("dark-elves");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.removeItem("tow-scenario");
  });

  it("is a game option, off by default", () => {
    renderScenarioSetupScreen(army);
    const toggle = /** @type {HTMLInputElement} */ (
      getApp().querySelector("#toggle-disastrousMiscasts")
    );
    expect(toggle).toBeTruthy();
    expect(toggle.checked).toBe(false);
    expect(getApp().textContent).toContain("Game Options");
  });

  it("is saved when ticked", () => {
    vi.spyOn(Nav, "navigate").mockImplementation(() => {});
    renderScenarioSetupScreen(army);
    /** @type {HTMLInputElement} */ (
      getApp().querySelector("#toggle-disastrousMiscasts")
    ).checked = true;
    getApp().querySelector("#next-btn").click();
    expect(getScenarioOptions().disastrousMiscasts).toBe(true);
  });

  it("switches both miscast tables to the Disastrous Miscast table", () => {
    expect(renderMiscastPanel()).toContain("Dimensional Cascade");
    expect(renderMiscastTable()).not.toContain("A Tear in Reality");

    saveScenarioOptions({ ...getScenarioOptions(), disastrousMiscasts: true });
    expect(renderMiscastPanel()).toContain("Disastrous Miscast Table");
    expect(renderMiscastPanel()).toContain("A Tear in Reality");
    expect(renderMiscastTable()).toContain("The Price of Power");
    expect(renderMiscastPanel()).not.toContain("Dimensional Cascade");
  });

  it("options saved before the setting existed default to the standard table", () => {
    localStorage.setItem(
      "tow-scenario",
      JSON.stringify({ domination: true, specialFeatures: false }),
    );
    expect(getScenarioOptions().disastrousMiscasts).toBe(false);
    expect(renderMiscastPanel()).toContain("Dimensional Cascade");
  });
});
