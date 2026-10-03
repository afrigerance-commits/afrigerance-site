/**
 * Réglages communs des tests de bout en bout : base de test, serveurs lancés, comptes de test.
 *
 * Les tests effacent le contenu de la base qu'ils utilisent : ils ne tournent que sur la base
 * indiquée par TEST_DATABASE_URL, dont le nom doit contenir « test » et qui doit être
 * différente de DATABASE_URL.
 */
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

function databaseKey(raw: string): string | null {
  try {
    const url = new URL(raw);
    return `${url.hostname}:${url.port || "5432"}${url.pathname}`;
  } catch {
    return null;
  }
}

/** Adresse de la base de test, après les contrôles de sécurité. Lève une erreur claire sinon. */
export function testDatabaseUrl(): string {
  const raw = process.env.TEST_DATABASE_URL?.trim();
  if (!raw) {
    throw new Error(
      "TEST_DATABASE_URL est vide. Ajoutez dans .env.local l'adresse d'une base PostgreSQL réservée aux tests " +
        "(son nom doit contenir « test »). Voir README, section « Tests automatiques ».",
    );
  }
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error("TEST_DATABASE_URL n'est pas une adresse valide (attendu : postgresql://…).");
  }
  if (url.protocol !== "postgres:" && url.protocol !== "postgresql:") {
    throw new Error("TEST_DATABASE_URL doit commencer par postgresql:// ou postgres://.");
  }
  const name = decodeURIComponent(url.pathname.slice(1));
  if (!/test/i.test(name)) {
    throw new Error(
      `Le nom de la base de test doit contenir « test » (actuellement « ${name || "aucun"} ») : ` +
        "les tests effacent son contenu.",
    );
  }
  const production = process.env.DATABASE_URL?.trim();
  if (production && databaseKey(production) === databaseKey(raw)) {
    throw new Error("TEST_DATABASE_URL désigne la même base que DATABASE_URL : utilisez une base séparée.");
  }
  return raw;
}

/** Faux service d'email local qui imite l'API Resend (aucun email réel n'est envoyé). */
export const mockResend = {
  port: 4110,
  url: "http://localhost:4110",
  /** Fausse clé : sert à vérifier qu'elle ne fuit jamais vers le navigateur. */
  apiKey: "re_test_cle_factice_e2e",
  from: "AFRIGERANCE Test <notifications@exemple.test>",
  to: "gestionnaire.test@exemple.test",
};

/** Comptes administrateurs créés sur la base de test ; mots de passe tirés au hasard à chaque lancement. */
export const testAdmins = {
  main: { email: "gestionnaire.test@exemple.test", passwordVar: "E2E_ADMIN_PASSWORD" },
  /** Compte réservé au test de blocage après 5 essais, pour ne pas bloquer le compte principal. */
  lockout: { email: "verrouillage.test@exemple.test", passwordVar: "E2E_LOCKOUT_PASSWORD" },
} as const;

export function adminPassword(account: keyof typeof testAdmins): string {
  const value = process.env[testAdmins[account].passwordVar];
  if (!value) throw new Error("Mot de passe de test absent : lancez les tests avec npm run test:e2e.");
  return value;
}

type Server = { port: number; url: string; env: Record<string, string> };

function server(port: number, env: Partial<Record<string, string>>): Server {
  // Toutes les variables lues par le site sont fixées explicitement (une valeur vide empêche
  // Next.js de reprendre celle de .env.local) : aucun test ne touche la vraie base ni n'envoie de vrai email.
  return {
    port,
    url: `http://localhost:${port}`,
    env: {
      DATABASE_URL: "",
      RESEND_API_KEY: "",
      NOTIFICATION_EMAIL_FROM: "",
      NOTIFICATION_EMAIL_TO: "",
      RESEND_API_URL: "",
      SITE_URL: "",
      ...env,
    } as Record<string, string>,
  };
}

function emailEnv(siteUrl: string) {
  return {
    RESEND_API_KEY: mockResend.apiKey,
    NOTIFICATION_EMAIL_FROM: mockResend.from,
    NOTIFICATION_EMAIL_TO: mockResend.to,
    RESEND_API_URL: `${mockResend.url}/emails`,
    SITE_URL: siteUrl,
  };
}

/** Ajoute l'option channel_binding des adresses Neon, que le site doit savoir ignorer. */
function withChannelBinding(raw: string): string {
  const url = new URL(raw);
  url.searchParams.set("channel_binding", "require");
  return url.toString();
}

/** Les cinq configurations du site testées, chacune sur son port, à partir du même build. */
export function serverConfigs() {
  const database = testDatabaseUrl();
  return {
    /** Base de test, envoi d'email non configuré. */
    noEmail: server(3101, { DATABASE_URL: database }),
    /** Base de test (adresse au format Neon) + faux service d'email + SITE_URL. */
    email: server(3102, { DATABASE_URL: withChannelBinding(database), ...emailEnv("http://localhost:3102") }),
    /** Base configurée mais injoignable. */
    databaseDown: server(3103, { DATABASE_URL: "postgresql://afg:afg@127.0.0.1:5999/base_test_injoignable" }),
    /** Aucune base configurée. */
    noDatabase: server(3104, {}),
    /** Base de test + faux service d'email, sans SITE_URL. */
    emailNoLink: server(3105, { DATABASE_URL: database, ...emailEnv("") }),
  };
}

export const servers = serverConfigs();
