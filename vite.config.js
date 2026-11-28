import process from "node:process";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves the app at /turner-overdrive/; Cloudflare (Pages, or
// Workers Builds) serves it at the root of its domain. Cloudflare's build
// environment sets CF_PAGES / WORKERS_CI.
const onCloudflare = Boolean(process.env.CF_PAGES || process.env.WORKERS_CI);

export default defineConfig({
  base: onCloudflare ? "/" : "/turner-overdrive/",
  plugins: [tailwindcss()],
  build: {
    chunkSizeWarningLimit: 600,
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
  },
});
