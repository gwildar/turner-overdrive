import { describe, it, expect, vi } from "vitest";

vi.mock("virtual:pwa-register", () => ({ registerSW: vi.fn() }));
const { isMidGamePath } = await import("../pwa.js");

describe("automatic updates wait until you're not mid-game", () => {
  it.each(["/game/2/combat/choose-fight", "/opponent/3/shooting"])(
    "%s is mid-game",
    (path) => expect(isMidGamePath(path)).toBe(true),
  );

  it.each(["/", "/about", "/scenario", "/deployment", "/game-over"])(
    "%s is safe to update on",
    (path) => expect(isMidGamePath(path)).toBe(false),
  );
});
