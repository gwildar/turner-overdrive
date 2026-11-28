import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/",
  plugins: [
    tailwindcss(),
    // Offline cache + installable app. Updates are applied by src/pwa.js
    // (automatically, but never mid-game), so registration is manual.
    VitePWA({
      registerType: "prompt",
      injectRegister: false,
      includeAssets: ["icon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "Turner Overdrive — The Old World companion",
        short_name: "Turner Overdrive",
        description:
          "Phase-by-phase rules companion for Warhammer: The Old World.",
        theme_color: "#1a1a2e",
        background_color: "#1a1a2e",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
          {
            src: "maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png}"],
        // The Battle Builder catalog is only needed to import a .bb.json
        // list: cached the first time it's used, not downloaded up front
        globIgnores: ["**/battle-builder-catalog-*.js"],
        runtimeCaching: [
          {
            urlPattern: /\/assets\/battle-builder-catalog-.*\.js$/,
            handler: "CacheFirst",
            options: {
              cacheName: "battle-builder-catalog",
              expiration: { maxEntries: 2 },
            },
          },
        ],
        navigateFallback: "/index.html",
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 600,
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
  },
});
