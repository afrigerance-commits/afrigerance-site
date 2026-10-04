/**
 * Construit le site pour les tests sans aucune variable sensible, comme sur un hébergeur
 * où les secrets ne seraient disponibles qu'à l'exécution : aucune page ne doit en dépendre
 * au moment de la construction (l'administration, en particulier, doit rester dynamique).
 */
import { spawnSync } from "node:child_process";

const env = { ...process.env };
for (const name of ["DATABASE_URL", "RESEND_API_KEY", "NOTIFICATION_EMAIL_FROM", "NOTIFICATION_EMAIL_TO", "RESEND_API_URL", "SITE_URL"]) {
  env[name] = "";
}
const result = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], { stdio: "inherit", env });
process.exit(result.status ?? 1);
