#!/usr/bin/env node
/**
 * Applique les migrations SQL de db/migrations/ qui ne l'ont pas encore été.
 * Usage : npm run db:migrate
 * Lit DATABASE_URL depuis l'environnement ou les fichiers .env* (comme Next.js).
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import nextEnv from "@next/env";
import postgres from "postgres";
import { normalizeDatabaseUrl } from "../src/lib/server/database-url.mjs";

nextEnv.loadEnvConfig(process.cwd());

const url = process.env.DATABASE_URL?.trim();
if (!url) {
  console.error("DATABASE_URL est vide. Renseignez-la dans .env.local (voir README).");
  process.exit(1);
}

const sql = postgres(normalizeDatabaseUrl(url), { max: 1, prepare: false, onnotice: () => {} });
const folder = path.join(process.cwd(), "db", "migrations");

try {
  await sql`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name        text PRIMARY KEY,
      applied_at  timestamptz NOT NULL DEFAULT now()
    )`;
  const applied = new Set((await sql`SELECT name FROM schema_migrations`).map((row) => row.name));
  const files = (await readdir(folder)).filter((file) => file.endsWith(".sql")).sort();

  let count = 0;
  for (const file of files) {
    if (applied.has(file)) continue;
    const content = await readFile(path.join(folder, file), "utf8");
    await sql.begin(async (tx) => {
      await tx.unsafe(content);
      await tx`INSERT INTO schema_migrations (name) VALUES (${file})`;
    });
    console.log(`✓ Migration appliquée : ${file}`);
    count += 1;
  }
  console.log(count ? `${count} migration(s) appliquée(s).` : "Base déjà à jour : aucune migration à appliquer.");
} catch (error) {
  console.error("Échec de la migration :", error.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
