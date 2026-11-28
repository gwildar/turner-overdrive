import { describe, it, expect, afterEach } from "vitest";
import { redirectLegacyHashRoute } from "../navigate.js";

describe("links from when the app used hash routing", () => {
  afterEach(() => window.history.replaceState(null, "", "/"));

  it("rewrites /#/game/1/... to /game/1/...", () => {
    window.history.replaceState(null, "", "/#/game/1/strategy/start-of-turn");
    redirectLegacyHashRoute();
    expect(window.location.pathname).toBe("/game/1/strategy/start-of-turn");
    expect(window.location.hash).toBe("");
  });

  it("leaves normal paths and plain anchors alone", () => {
    window.history.replaceState(null, "", "/about#credits");
    redirectLegacyHashRoute();
    expect(window.location.pathname).toBe("/about");
    expect(window.location.hash).toBe("#credits");
  });
});

describe("onNavigate", () => {
  it("runs after navigate() and on back/forward", async () => {
    const { navigate, onNavigate } = await import("../navigate.js");
    const calls = [];
    onNavigate(() => calls.push(window.location.pathname));
    navigate("/about");
    window.dispatchEvent(new PopStateEvent("popstate"));
    expect(calls.length).toBe(2);
    expect(calls[0]).toBe("/about");
  });
});
