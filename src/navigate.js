import Navigo from "navigo";

// Path-based routing (/game/1/...). Cloudflare serves index.html for any
// path that isn't a file (wrangler.jsonc: not_found_handling), so reloads and
// deep links work.
export const router = new Navigo("/");

export function navigate(path) {
  router.navigate(path);
}

/**
 * Links and bookmarks from when the app used hash routing ("/#/game/1/...")
 * are rewritten to the equivalent path before the router starts.
 */
export function redirectLegacyHashRoute() {
  const { hash } = window.location;
  if (hash.startsWith("#/"))
    window.history.replaceState(null, "", hash.slice(1));
}
