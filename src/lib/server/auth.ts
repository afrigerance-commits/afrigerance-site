import "server-only";

import { createHash, randomBytes } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { getSql } from "./db";
import { clientIp, hashIp } from "./ip";
import { DUMMY_HASH, verifyPassword } from "./password.mjs";

/**
 * Authentification de l'espace administrateur.
 * - Comptes créés uniquement en ligne de commande (npm run admin:create).
 * - Mots de passe hachés avec scrypt ; sessions stockées en base (hachage du jeton uniquement).
 * - Cookie httpOnly limité à /admin, Secure dès que le site n'est pas servi en local.
 * - 5 échecs en 15 minutes (par email ou par connexion) bloquent temporairement les tentatives.
 */

const COOKIE_NAME = "afg_admin_session";
const COOKIE_PATH = "/admin";
const SESSION_HOURS = 12;
const MAX_FAILURES = 5;
const FAILURE_WINDOW_MINUTES = 15;

export const LOGIN_PATH = "/admin/connexion";

export type AdminUser = { id: string; email: string };
export type LoginResult = "ok" | "missing" | "invalid" | "throttled" | "unavailable";

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function isLocalRequest(requestHeaders: Headers) {
  const host = requestHeaders.get("host") ?? "";
  return /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(host);
}

/** Administrateur connecté, ou null. Vérifié en base à chaque requête (mis en cache le temps d'un rendu). */
export const getCurrentAdmin = cache(async (): Promise<AdminUser | null> => {
  // Le cookie est lu en premier : les pages de l'administration restent ainsi toujours rendues
  // à la demande, même si la base n'est pas configurée au moment de la construction du site.
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  const sql = getSql();
  if (!sql) return null;
  if (!token || token.length > 200) return null;
  try {
    const rows = await sql<AdminUser[]>`
      SELECT u.id, u.email
      FROM admin_sessions s
      JOIN admin_users u ON u.id = s.user_id
      WHERE s.id = ${sha256(token)}
        AND s.expires_at > now()
        AND s.created_at >= u.password_changed_at`;
    return rows[0] ?? null;
  } catch (error) {
    console.error("[admin] Vérification de session impossible :", (error as Error).message);
    return null;
  }
});

/** À appeler en tête de chaque page, action et fonction d'accès aux données de l'administration. */
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getCurrentAdmin();
  if (!admin) redirect(LOGIN_PATH);
  return admin;
}

export async function login(rawEmail: string, rawPassword: string): Promise<LoginResult> {
  const email = rawEmail.trim().toLowerCase().slice(0, 254);
  const password = rawPassword.slice(0, 1024);
  if (!email || !password) return "missing";

  const sql = getSql();
  if (!sql) return "unavailable";
  const requestHeaders = await headers();

  try {
    const ipHash = await hashIp(sql, clientIp(requestHeaders));
    const [{ failures }] = await sql<{ failures: number }[]>`
      SELECT count(*)::int AS failures
      FROM admin_login_attempts
      WHERE succeeded = false
        AND attempted_at > now() - make_interval(mins => ${FAILURE_WINDOW_MINUTES})
        AND (email = ${email} OR (${ipHash}::text IS NOT NULL AND ip_hash = ${ipHash}))`;
    if (failures >= MAX_FAILURES) return "throttled";

    const [user] = await sql<{ id: string; password_hash: string }[]>`
      SELECT id, password_hash FROM admin_users WHERE email = ${email}`;
    // Le calcul est fait même si le compte n'existe pas, pour ne pas révéler son existence.
    const valid = (await verifyPassword(password, user?.password_hash ?? DUMMY_HASH)) && Boolean(user);

    await sql`INSERT INTO admin_login_attempts (email, ip_hash, succeeded) VALUES (${email}, ${ipHash}, ${valid})`;
    await sql`DELETE FROM admin_login_attempts WHERE attempted_at < now() - interval '1 day'`;
    if (!valid || !user) return "invalid";

    const token = randomBytes(32).toString("base64url");
    await sql`
      INSERT INTO admin_sessions (id, user_id, expires_at, user_agent)
      VALUES (
        ${sha256(token)},
        ${user.id},
        now() + make_interval(hours => ${SESSION_HOURS}),
        ${requestHeaders.get("user-agent")?.slice(0, 300) ?? null}
      )`;
    await sql`UPDATE admin_users SET last_login_at = now() WHERE id = ${user.id}`;
    await sql`DELETE FROM admin_sessions WHERE expires_at < now()`;

    (await cookies()).set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: !isLocalRequest(requestHeaders),
      path: COOKIE_PATH,
      maxAge: SESSION_HOURS * 3600,
    });
    return "ok";
  } catch (error) {
    console.error("[admin] Connexion impossible :", (error as Error).message);
    return "unavailable";
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const sql = getSql();
  if (token && sql) {
    await sql`DELETE FROM admin_sessions WHERE id = ${sha256(token)}`.catch(() => undefined);
  }
  cookieStore.set(COOKIE_NAME, "", { httpOnly: true, sameSite: "lax", path: COOKIE_PATH, maxAge: 0 });
}
