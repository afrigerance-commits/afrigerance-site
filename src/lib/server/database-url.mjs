/**
 * Nettoie l'adresse de connexion PostgreSQL avant de la donner au pilote `postgres`.
 * Certains hébergeurs (ex. Neon) ajoutent `channel_binding=require`, option propre à libpq :
 * le pilote l'enverrait au serveur comme paramètre de session, qui la refuserait.
 * `sslmode` (chiffrement) est conservé.
 * @param {string} url
 * @returns {string}
 */
export function normalizeDatabaseUrl(url) {
  try {
    const parsed = new URL(url);
    parsed.searchParams.delete("channel_binding");
    return parsed.toString();
  } catch {
    return url;
  }
}
