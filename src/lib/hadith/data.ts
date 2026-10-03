import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Recueils de hadith réels (texte arabe + traduction française), issus du
 * jeu de données ouvert github.com/fawazahmed0/hadith-api. Les degrés
 * d'authenticité proviennent des grades inclus dans ce jeu de données
 * lorsqu'ils existent (ex. gradation du Muwatta' par Salim al-Hilali) ;
 * absence de grade ≠ hadith faible, cela signifie seulement qu'aucune
 * gradation n'est fournie dans cette édition — voir docs/CONTENT_SOURCES.md.
 * Les titres de livre/chapitre en français sont une traduction éditoriale
 * (le jeu de données ne fournit que l'anglais).
 */

const DATA_DIR = path.join(process.cwd(), "data", "hadith");

export const hadithCollections = [
  {
    slug: "muwatta",
    dir: "malik",
    nom: "Al-Muwatta'",
    nomArabe: "الموطأ",
    auteur: "L'imam Mâlik ibn Anas",
    description:
      "L'un des plus anciens recueils de hadith et de droit islamique, fondateur de l'école malikite.",
  },
  {
    slug: "boukhari",
    dir: "bukhari",
    nom: "Sahîh Al-Bukhârî",
    nomArabe: "صحيح البخاري",
    auteur: "L'imam Al-Bukhârî",
    description: "Considéré par la tradition sunnite comme le recueil de hadith le plus rigoureusement authentifié.",
  },
  {
    slug: "muslim",
    dir: "muslim",
    nom: "Sahîh Muslim",
    nomArabe: "صحيح مسلم",
    auteur: "L'imam Muslim ibn Al-Hajjâj",
    description: "Second des deux recueils les plus authentifiés (« les deux Sahîh ») selon la tradition sunnite.",
  },
] as const;

export type HadithCollectionSlug = (typeof hadithCollections)[number]["slug"];

export function getCollection(slug: string) {
  return hadithCollections.find((c) => c.slug === slug);
}

interface RawHadith {
  hadithnumber: number;
  arabicnumber?: number;
  text: string;
  grades?: { name: string; grade: string }[];
  reference: { book: number; hadith: number };
}

interface RawEdition {
  metadata: { name: string; sections: Record<string, string> };
  hadiths: RawHadith[];
}

export interface HadithBook {
  number: number;
  titreFrancais: string;
  titreAnglais: string;
  count: number;
}

export interface Hadith {
  numero: number;
  numeroArabe?: number;
  arabe: string;
  francais: string;
  grade?: string;
  gradePar?: string;
  livre: number;
}

const arCache = new Map<string, RawEdition>();
const frCache = new Map<string, RawEdition>();
const sectionsFrCache = new Map<string, Record<string, string>>();

function readJson<T>(dir: string, file: string): T {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, dir, file), "utf-8")) as T;
}

function loadAr(dir: string): RawEdition {
  if (!arCache.has(dir)) arCache.set(dir, readJson<RawEdition>(dir, "ar.json"));
  return arCache.get(dir)!;
}
function loadFr(dir: string): RawEdition {
  if (!frCache.has(dir)) frCache.set(dir, readJson<RawEdition>(dir, "fr.json"));
  return frCache.get(dir)!;
}
function loadSectionsFr(dir: string): Record<string, string> {
  if (!sectionsFrCache.has(dir)) sectionsFrCache.set(dir, readJson<Record<string, string>>(dir, "sections-fr.json"));
  return sectionsFrCache.get(dir)!;
}

export function getBooks(collectionSlug: string): HadithBook[] {
  const collection = getCollection(collectionSlug);
  if (!collection) return [];
  const ar = loadAr(collection.dir);
  const sectionsFr = loadSectionsFr(collection.dir);

  const counts = new Map<number, number>();
  for (const h of ar.hadiths) counts.set(h.reference.book, (counts.get(h.reference.book) ?? 0) + 1);

  return Object.keys(ar.metadata.sections)
    .map(Number)
    .filter((n) => counts.has(n))
    .sort((a, b) => a - b)
    .map((n) => ({
      number: n,
      titreFrancais: sectionsFr[String(n)] || ar.metadata.sections[String(n)] || `Livre ${n}`,
      titreAnglais: ar.metadata.sections[String(n)] || "",
      count: counts.get(n) ?? 0,
    }));
}

export function getHadithsForBook(collectionSlug: string, bookNumber: number): Hadith[] {
  const collection = getCollection(collectionSlug);
  if (!collection) return [];
  const ar = loadAr(collection.dir);
  const fr = loadFr(collection.dir);

  const frByNumber = new Map(fr.hadiths.map((h) => [h.hadithnumber, h]));

  return ar.hadiths
    .filter((h) => h.reference.book === bookNumber)
    .map((h) => {
      const grade = h.grades?.[0];
      return {
        numero: h.hadithnumber,
        numeroArabe: h.arabicnumber,
        arabe: h.text,
        francais: frByNumber.get(h.hadithnumber)?.text ?? "",
        grade: grade?.grade,
        gradePar: grade?.name,
        livre: h.reference.book,
      };
    });
}
