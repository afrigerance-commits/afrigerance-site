/**
 * Préparation de la base de test avant tous les tests :
 * migrations (npm run db:migrate), données vidées, comptes administrateurs de test
 * créés avec le vrai script (npm run admin:create) et un mot de passe tiré au hasard.
 */
import { execFileSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { closeDb, db } from "./support/db";
import { testAdmins, testDatabaseUrl } from "./support/settings";

function runScript(script: string, env: Record<string, string>) {
  try {
    execFileSync(process.execPath, [script], {
      env: { ...process.env, DATABASE_URL: testDatabaseUrl(), ...env },
      stdio: "pipe",
      encoding: "utf8",
    });
  } catch (error) {
    const { stdout = "", stderr = "" } = error as { stdout?: string; stderr?: string };
    throw new Error(`${script} a échoué :\n${stdout}${stderr}`);
  }
}

export default async function globalSetup() {
  runScript("scripts/db-migrate.mjs", {});

  await db()`TRUNCATE requests, admin_sessions, admin_login_attempts, admin_users CASCADE`;
  await closeDb();

  for (const account of Object.values(testAdmins)) {
    const password = randomBytes(18).toString("base64url");
    runScript("scripts/admin-create.mjs", { ADMIN_EMAIL: account.email, ADMIN_PASSWORD: password });
    // Transmis aux tests par l'environnement, jamais écrit sur le disque.
    process.env[account.passwordVar] = password;
  }
}
