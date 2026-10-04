/**
 * Tests de bout en bout (navigateur réel + base PostgreSQL de test + faux service d'email).
 * Lancement : npm run test:e2e — voir README, section « Tests automatiques ».
 */
import { defineConfig, devices } from "@playwright/test";
import { mockResend, servers } from "./tests/e2e/support/settings";

const next = "node node_modules/next/dist/bin/next";
// E2E_SKIP_BUILD=1 réutilise le dernier build (relances rapides quand seul un test a changé).
// Construction sans secret (voir support/build.mjs), puis chaque configuration démarre avec ses variables.
const build = process.env.E2E_SKIP_BUILD?.trim() === "1" ? "" : "node tests/e2e/support/build.mjs && ";
const [first, ...others] = Object.values(servers);

export default defineConfig({
  testDir: "./tests/e2e",
  globalSetup: "./tests/e2e/global-setup.ts",
  // Les tests partagent la base de test : ils s'exécutent un par un, dans l'ordre.
  workers: 1,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [["list"]],
  use: {
    ...devices["Desktop Chrome"],
    locale: "fr-FR",
    timezoneId: "Africa/Dakar",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  // Démarrés l'un après l'autre : le premier construit le site, les suivants réutilisent ce build.
  webServer: [
    {
      command: `node tests/e2e/support/mock-resend.mjs ${mockResend.port}`,
      url: `${mockResend.url}/__test/health`,
      reuseExistingServer: false,
    },
    {
      command: `${build}${next} start -p ${first.port}`,
      url: first.url,
      env: first.env,
      reuseExistingServer: false,
      timeout: 300_000,
      stdout: "pipe",
    },
    ...others.map((server) => ({
      command: `${next} start -p ${server.port}`,
      url: server.url,
      env: server.env,
      reuseExistingServer: false,
    })),
  ],
});
