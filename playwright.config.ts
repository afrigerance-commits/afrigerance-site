import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium-desktop", use: { ...devices["Desktop Chrome"] } },
    // Chromium plutôt que WebKit pour l'émulation mobile : un seul moteur de
    // rendu à installer pour exécuter toute la suite (npx playwright install
    // chromium suffit). À étendre avec un projet WebKit dédié si une
    // vérification Safari mobile est nécessaire.
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: process.env.PLAYWRIGHT_PRODUCTION ? "npx next start --hostname 127.0.0.1" : "npm run dev -- --hostname 127.0.0.1 --webpack",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
