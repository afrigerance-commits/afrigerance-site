import "server-only";

import { createHash } from "node:crypto";
import type postgres from "postgres";

/**
 * Adresse IP du visiteur, telle que transmise par l'hébergeur.
 * 1. x-nf-client-connection-ip : fixé par Netlify, le visiteur ne peut pas le falsifier.
 *    C'est l'en-tête utilisé en production (hébergement Netlify).
 * 2. X-Real-IP puis X-Forwarded-For : seulement hors Netlify (développement local, tests).
 *    Le visiteur peut les inventer : sur un autre hébergeur, revoir cet ordre.
 */
export function clientIp(headers: Headers): string | null {
  const ip =
    headers.get("x-nf-client-connection-ip")?.trim() ||
    headers.get("x-real-ip")?.trim() ||
    headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return ip ? ip.slice(0, 64) : null;
}

let saltPromise: Promise<string | null> | null = null;

async function getSalt(sql: postgres.Sql): Promise<string | null> {
  saltPromise ??= sql<{ value: string }[]>`SELECT value FROM app_settings WHERE key = 'ip_hash_salt'`
    .then((rows) => rows[0]?.value ?? null)
    .catch(() => {
      saltPromise = null;
      return null;
    });
  return saltPromise;
}

/**
 * Empreinte salée et tronquée de l'adresse IP : permet de limiter les abus
 * sans jamais conserver l'adresse elle-même.
 */
export async function hashIp(sql: postgres.Sql, ip: string | null): Promise<string | null> {
  if (!ip) return null;
  const salt = await getSalt(sql);
  if (!salt) return null;
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}
