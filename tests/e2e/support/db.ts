/** Accès direct à la base de test, pour vérifier ce que le site a réellement enregistré. */
import postgres from "postgres";
import { testDatabaseUrl } from "./settings";

let client: postgres.Sql | undefined;

/** Retire channel_binding (option des adresses Neon que le pilote ne connaît pas), comme le site. */
function normalize(raw: string): string {
  const url = new URL(raw);
  url.searchParams.delete("channel_binding");
  return url.toString();
}

export function db(): postgres.Sql {
  client ??= postgres(normalize(testDatabaseUrl()), { max: 2, prepare: false, onnotice: () => {} });
  return client;
}

export async function closeDb() {
  await client?.end();
  client = undefined;
}

/** Première colonne de la première ligne, convertie en texte (ou null). */
export async function value(query: TemplateStringsArray, ...params: postgres.ParameterOrFragment<never>[]) {
  const rows = await db()(query, ...params);
  const first = rows[0];
  if (!first) return null;
  const cell = Object.values(first)[0];
  return cell === null || cell === undefined ? null : String(cell);
}

export async function requestCount(): Promise<number> {
  return Number(await value`SELECT count(*) FROM requests`);
}

/** Vide les demandes (et leur historique) : chaque fichier de tests part d'une liste vide. */
export async function resetRequests() {
  await db()`TRUNCATE requests CASCADE`;
}
