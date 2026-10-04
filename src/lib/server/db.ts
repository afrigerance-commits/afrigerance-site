import "server-only";

import postgres from "postgres";
import { normalizeDatabaseUrl } from "./database-url.mjs";

/**
 * Connexion PostgreSQL (variable DATABASE_URL, lue uniquement côté serveur).
 * Renvoie null si la base n'est pas configurée : les appelants refusent alors l'opération.
 * `prepare: false` rend la connexion compatible avec les pools de connexions (Neon, Supabase…).
 */
declare global {
  var afrigeranceSql: postgres.Sql | undefined;
}

export function getSql(): postgres.Sql | null {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return null;
  if (!globalThis.afrigeranceSql) {
    globalThis.afrigeranceSql = postgres(normalizeDatabaseUrl(url), {
      max: 5,
      prepare: false,
      idle_timeout: 20,
      connect_timeout: 10,
      onnotice: () => {},
    });
  }
  return globalThis.afrigeranceSql;
}

/** Même chose, mais lève une erreur si la base n'est pas configurée (espace administrateur). */
export function requireSql(): postgres.Sql {
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL n'est pas configurée.");
  return sql;
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: unknown): value is string {
  return typeof value === "string" && UUID_PATTERN.test(value);
}
