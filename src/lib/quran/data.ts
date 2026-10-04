import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Texte du Coran réel : Coran uthmani (Hafs), édition du complexe Roi Fahd,
 * et traduction française de Muhammad Hamidullah — les deux diffusées par
 * Tanzil (http://tanzil.net), via le jeu de données ouvert
 * github.com/fawazahmed0/quran-api. Voir docs/CONTENT_SOURCES.md.
 * Lu une seule fois par processus (fichiers volumineux), jamais exposé au
 * bundle client grâce à `server-only`.
 */

const DATA_DIR = path.join(process.cwd(), "data", "quran");

export interface QuranChapterMeta {
  number: number;
  nameArabic: string;
  nameEnglish: string;
  nameTransliteration: string;
  nameFrench: string;
  revelation: "Mecca" | "Madina";
  versesCount: number;
}

interface RawVerse {
  chapter: number;
  verse: number;
  text: string;
}

export interface QuranVerse {
  number: number;
  arabic: string;
  french: string;
  /** Numéro global 1-6236 dans le Coran entier, utilisé pour l'URL audio verset par verset. */
  globalNumber?: number;
}

let chaptersCache: QuranChapterMeta[] | null = null;
let arabicCache: RawVerse[] | null = null;
let frenchCache: RawVerse[] | null = null;

function readJson<T>(file: string): T {
  const raw = fs.readFileSync(path.join(DATA_DIR, file), "utf-8");
  return JSON.parse(raw) as T;
}

function loadChapters(): QuranChapterMeta[] {
  if (!chaptersCache) chaptersCache = readJson<QuranChapterMeta[]>("chapters-meta.json");
  return chaptersCache;
}

function loadArabic(): RawVerse[] {
  if (!arabicCache) arabicCache = readJson<{ quran: RawVerse[] }>("ar-uthmani.json").quran;
  return arabicCache;
}

function loadFrench(): RawVerse[] {
  if (!frenchCache) frenchCache = readJson<{ quran: RawVerse[] }>("fr-hamidullah.json").quran;
  return frenchCache;
}

export function getChapters(): QuranChapterMeta[] {
  return loadChapters();
}

export function getChapterMeta(number: number): QuranChapterMeta | undefined {
  return loadChapters().find((c) => c.number === number);
}

let chapterOffsetsCache: Map<number, number> | null = null;

/** Décalage cumulé (nombre de versets dans les sourates précédentes) pour calculer le numéro d'ayah global 1-6236, utilisé par l'API audio. */
function getChapterOffsets(): Map<number, number> {
  if (!chapterOffsetsCache) {
    const map = new Map<number, number>();
    let cumulative = 0;
    for (const chapter of loadChapters()) {
      map.set(chapter.number, cumulative);
      cumulative += chapter.versesCount;
    }
    chapterOffsetsCache = map;
  }
  return chapterOffsetsCache;
}

export function getGlobalAyahNumber(chapter: number, verse: number): number {
  const offset = getChapterOffsets().get(chapter) ?? 0;
  return offset + verse;
}

export function getChapterVerses(number: number): QuranVerse[] {
  const ar = loadArabic().filter((v) => v.chapter === number);
  const fr = loadFrench().filter((v) => v.chapter === number);
  const offset = getChapterOffsets().get(number) ?? 0;
  return ar.map((v, i) => ({
    number: v.verse,
    arabic: v.text,
    french: fr[i]?.text ?? "",
    globalNumber: offset + v.verse,
  }));
}

export function getVerse(chapter: number, verse: number): QuranVerse | undefined {
  const ar = loadArabic().find((v) => v.chapter === chapter && v.verse === verse);
  const fr = loadFrench().find((v) => v.chapter === chapter && v.verse === verse);
  if (!ar) return undefined;
  return { number: verse, arabic: ar.text, french: fr?.text ?? "" };
}

/** Verset pseudo-aléatoire mais stable pour une même journée (évite un verset différent à chaque rendu). */
export function getVerseOfTheDay(): QuranVerse & { chapter: QuranChapterMeta } {
  const all = loadArabic();
  const dayIndex = Math.floor(Date.now() / 86_400_000);
  const pick = all[dayIndex % all.length];
  const chapter = getChapterMeta(pick.chapter)!;
  const verse = getVerse(pick.chapter, pick.verse)!;
  return { ...verse, chapter };
}
