/**
 * Hachage des mots de passe administrateur avec scrypt (module crypto de Node, sans dépendance).
 * Partagé entre l'application et le script `npm run admin:create`.
 * Format stocké : scrypt$N$r$p$sel(base64)$hachage(base64)
 */
import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";

const N = 32768;
const R = 8;
const P = 1;
const KEY_LENGTH = 64;
const MAX_MEMORY = 128 * 1024 * 1024;

export const PASSWORD_MIN_LENGTH = 12;

/**
 * @param {string} password
 * @param {Buffer} salt
 * @param {{ N: number, r: number, p: number }} cost
 * @returns {Promise<Buffer>}
 */
function derive(password, salt, cost) {
  return new Promise((resolve, reject) => {
    scrypt(password.normalize("NFKC"), salt, KEY_LENGTH, { ...cost, maxmem: MAX_MEMORY }, (error, key) =>
      error ? reject(error) : resolve(key),
    );
  });
}

/**
 * @param {string} password
 * @returns {Promise<string>}
 */
export async function hashPassword(password) {
  const salt = randomBytes(16);
  const key = await derive(password, salt, { N, r: R, p: P });
  return ["scrypt", N, R, P, salt.toString("base64"), key.toString("base64")].join("$");
}

/**
 * Compare en temps constant. Renvoie false pour tout hachage mal formé.
 * @param {string} password
 * @param {string} stored
 * @returns {Promise<boolean>}
 */
export async function verifyPassword(password, stored) {
  const [scheme, n, r, p, saltB64, keyB64] = stored.split("$");
  if (scheme !== "scrypt" || !saltB64 || !keyB64) return false;
  const expected = Buffer.from(keyB64, "base64");
  const actual = await derive(password, Buffer.from(saltB64, "base64"), {
    N: Number(n),
    r: Number(r),
    p: Number(p),
  });
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

/** Hachage factice pour garder un temps de réponse identique quand le compte n'existe pas. */
export const DUMMY_HASH =
  "scrypt$32768$8$1$AAAAAAAAAAAAAAAAAAAAAA==$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
