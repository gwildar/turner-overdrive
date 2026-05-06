import { showErrorOverlay } from "../error-overlay.js";

export function getApp() {
  return document.getElementById("app");
}

/**
 * Wraps a screen render+bind function in a try/catch so that any throw
 * (including errors in the bind phase after innerHTML is already set)
 * shows the error overlay rather than leaving the UI in a broken state.
 */
export function renderScreen(fn) {
  try {
    fn();
  } catch (err) {
    showErrorOverlay(err);
  }
}
