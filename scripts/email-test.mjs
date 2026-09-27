#!/usr/bin/env node
/**
 * Envoie un email de test avec la configuration Resend de .env.local.
 * Usage : npm run email:test
 * Ne crée aucune demande et n'écrit rien en base : il vérifie seulement que l'envoi fonctionne.
 */
import nextEnv from "@next/env";
import { readMailConfig, sendResendEmail } from "../src/lib/server/resend-client.mjs";

nextEnv.loadEnvConfig(process.cwd());

const missing = ["RESEND_API_KEY", "NOTIFICATION_EMAIL_FROM", "NOTIFICATION_EMAIL_TO"].filter(
  (name) => !process.env[name]?.trim(),
);
if (missing.length > 0) {
  console.error(`Variable(s) manquante(s) dans .env.local : ${missing.join(", ")}`);
  process.exit(1);
}

const config = readMailConfig(process.env);
const now = new Date().toLocaleString("fr-FR", { timeZone: "Africa/Dakar" });
console.log(`Envoi d'un email de test de « ${config.from} » vers : ${config.to.join(", ")} …`);

const result = await sendResendEmail(config, {
  subject: `Test de notification AFRIGÉRANCE — ${now}`,
  text: [
    "Ceci est un email de test envoyé par la commande « npm run email:test ».",
    "Si vous le recevez, la configuration Resend du site fonctionne.",
    "",
    `Envoyé le ${now} (heure de Dakar).`,
  ].join("\n"),
  idempotencyKey: `test-${Date.now()}`,
});

if (result.ok) {
  console.log(`✓ Email accepté par Resend${result.id ? ` (identifiant ${result.id})` : ""}.`);
  console.log("  Vérifiez la boîte de réception (et le dossier Courrier indésirable / Spam).");
} else {
  console.error(`✗ Échec : ${result.reason}`);
  if (result.reason.includes("401")) console.error("  → La clé RESEND_API_KEY est invalide ou révoquée.");
  if (result.reason.includes("403")) {
    console.error(
      "  → Avec l'expéditeur onboarding@resend.dev, NOTIFICATION_EMAIL_TO doit être l'adresse du compte Resend,",
      "\n    ou bien le domaine de l'expéditeur doit être vérifié dans Resend (menu Domains).",
    );
  }
  if (result.reason.includes("422")) console.error("  → Vérifiez le format de NOTIFICATION_EMAIL_FROM et NOTIFICATION_EMAIL_TO.");
  process.exitCode = 1;
}
