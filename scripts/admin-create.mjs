#!/usr/bin/env node
/**
 * Crée un compte administrateur, ou change le mot de passe d'un compte existant.
 * Usage : npm run admin:create
 * Le mot de passe est saisi au clavier (masqué) : il n'est jamais écrit dans le code ni dans un fichier.
 * Pour une installation automatisée uniquement : variables ADMIN_EMAIL et ADMIN_PASSWORD.
 */
import readline from "node:readline";
import nextEnv from "@next/env";
import postgres from "postgres";
import { normalizeDatabaseUrl } from "../src/lib/server/database-url.mjs";
import { hashPassword, PASSWORD_MIN_LENGTH } from "../src/lib/server/password.mjs";

nextEnv.loadEnvConfig(process.cwd());

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) =>
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    }),
  );
}

/** Saisie masquée : les caractères tapés s'affichent sous forme d'astérisques. */
function askHidden(question) {
  if (!process.stdin.isTTY) return ask(question);
  return new Promise((resolve) => {
    process.stdout.write(question);
    const stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    let value = "";
    const onData = (chunk) => {
      for (const char of chunk) {
        if (char === "\r" || char === "\n") {
          stdin.setRawMode(false);
          stdin.pause();
          stdin.off("data", onData);
          process.stdout.write("\n");
          resolve(value);
          return;
        }
        if (char === "\u0003") {
          process.stdout.write("\n");
          process.exit(130);
        }
        if (char === "\u007f" || char === "\b") {
          if (value.length > 0) {
            value = value.slice(0, -1);
            process.stdout.write("\b \b");
          }
          continue;
        }
        value += char;
        process.stdout.write("*");
      }
    };
    stdin.on("data", onData);
  });
}

const url = process.env.DATABASE_URL?.trim();
if (!url) {
  console.error("DATABASE_URL est vide. Renseignez-la dans .env.local (voir README).");
  process.exit(1);
}

const sql = postgres(normalizeDatabaseUrl(url), { max: 1, prepare: false, onnotice: () => {} });

try {
  const [{ exists }] = await sql`SELECT to_regclass('public.admin_users') IS NOT NULL AS exists`;
  if (!exists) {
    console.error("La base n'est pas initialisée. Lancez d'abord : npm run db:migrate");
    process.exitCode = 1;
  } else {
    console.log("Création d'un compte administrateur AFRIGÉRANCE\n");
    const email = (process.env.ADMIN_EMAIL?.trim() || (await ask("Adresse email : "))).toLowerCase();
    if (!EMAIL_PATTERN.test(email)) throw new Error("Adresse email invalide.");

    let password = process.env.ADMIN_PASSWORD ?? "";
    if (!password) {
      password = await askHidden(`Mot de passe (${PASSWORD_MIN_LENGTH} caractères minimum) : `);
      const confirmation = await askHidden("Confirmez le mot de passe : ");
      if (password !== confirmation) throw new Error("Les deux mots de passe sont différents.");
    }
    if (password.length < PASSWORD_MIN_LENGTH) {
      throw new Error(`Le mot de passe doit contenir au moins ${PASSWORD_MIN_LENGTH} caractères.`);
    }

    const passwordHash = await hashPassword(password);
    const [user] = await sql`
      INSERT INTO admin_users (email, password_hash)
      VALUES (${email}, ${passwordHash})
      ON CONFLICT (email) DO UPDATE
        SET password_hash = EXCLUDED.password_hash, password_changed_at = now()
      RETURNING id, (xmax = 0) AS created`;
    // Un changement de mot de passe déconnecte toutes les sessions ouvertes de ce compte.
    await sql`DELETE FROM admin_sessions WHERE user_id = ${user.id}`;
    console.log(
      user.created
        ? `\n✓ Compte créé pour ${email}. Connexion : /admin`
        : `\n✓ Mot de passe mis à jour pour ${email}. Les sessions ouvertes ont été fermées.`,
    );
  }
} catch (error) {
  console.error(`\nÉchec : ${error.message}`);
  process.exitCode = 1;
} finally {
  await sql.end();
}
