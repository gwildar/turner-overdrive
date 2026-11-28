/**
 * Offline cache and automatic updates (vite-plugin-pwa, production only).
 *
 * The service worker precaches the build, so the app loads with no signal.
 * When a new version is deployed it downloads in the background and is
 * applied automatically — but never mid-game: on the setup and army screens
 * it's applied straight away (a reload); during a game it waits until you
 * leave the game screens, or the next launch.
 */
import { registerSW } from "virtual:pwa-register";
import { onNavigate } from "./navigate.js";

/** How often an open app checks for a new version */
const CHECK_EVERY_MS = 60 * 60 * 1000;

/**
 * Whether a reload now would interrupt a game in progress.
 * @param {string} path - location.pathname
 */
export function isMidGamePath(path) {
  return /^\/(game|opponent)\//.test(path);
}

export function setupAutoUpdate() {
  let updateReady = false;
  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      updateReady = true;
      applyIfSafe();
    },
    onRegisteredSW(_url, registration) {
      if (registration)
        setInterval(() => registration.update(), CHECK_EVERY_MS);
    },
  });

  function applyIfSafe() {
    // activate the new version and reload
    if (updateReady && !isMidGamePath(window.location.pathname)) updateSW(true);
  }

  onNavigate(applyIfSafe);
}
