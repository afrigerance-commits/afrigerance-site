import chapters from "../../../data/quran/chapters-meta.json";
/** Éditions audio vérifiées dans le catalogue Al Quran Cloud (Hafs). */
export interface Reciter {
  id: string;
  nom: string;
  portrait: string;
  mode?: "surah";
  everyAyahFolder?: string;
}

export const reciters: Reciter[] = [
  { id: "ar.alafasy", nom: "Mishary Alafasy", portrait: "/images/reciters/alafasy.jpg" },
  { id: "ar.saoodshuraym", nom: "Saoud Al-Shuraim", portrait: "/images/reciters/shuraim.png" },
  { id: "ar.abdulbasitmurattal", nom: "Abdul Basit", portrait: "/images/reciters/abdul-basit.jpg" },
  { id: "ar.abdurrahmaansudais", nom: "Abdurrahman As-Sudais", portrait: "/images/reciters/sudais.png" },
  { id: "ar.husary", nom: "Mahmoud Al-Husary", portrait: "/images/reciters/husary.jpg" },
  { id: "ar.minshawi", nom: "Mohamed Al-Minshawi", portrait: "/images/reciters/minshawi.jpg" },
  { id: "ar.hudhaify", nom: "Ali Al-Houdhayfi", portrait: "/images/reciters/hudhaify.webp" },
  { id: "everyayah.ghamdi", nom: "Saad Al-Ghamdi", portrait: "/images/reciters/saad-ghamdi.webp", everyAyahFolder: "Ghamadi_40kbps" },
  { id: "everyayah.matroud", nom: "Abdullah Matrood", portrait: "https://tvquran.com/uploads/authors/images/%D8%B9%D8%A8%D8%AF%20%D8%A7%D9%84%D9%84%D9%87%20%D8%A7%D9%84%D9%85%D8%B7%D8%B1%D9%88%D8%AF.jpg", everyAyahFolder: "Abdullah_Matroud_128kbps" },
  { id: "everyayah.ali-jaber", nom: "Ali Jaber", portrait: "/images/reciters/ali-jaber.webp", everyAyahFolder: "Ali_Jaber_64kbps" },
  { id: "tvquran.hady-toure", nom: "Muhammad Hady Touré", portrait: "https://tvquran.com/uploads/authors/images/%D9%85%D8%AD%D9%85%D8%AF%20%D8%A7%D9%84%D9%87%D8%A7%D8%AF%D9%8A%20%D8%AA%D9%88%D8%B1%D9%8A.jpg", mode: "surah" },
];

export const defaultReciterId = reciters[0].id;

export interface VerseAudioRef { number: number; globalNumber: number; sourceChapter?: number; sourceVerse?: number }

/**
 * L'API attribue les véritables URL et débits à chaque ayah. Construire une
 * URL fixe en /128/{récitateur}/{numéro} provoquait des lectures décalées :
 * Shuraim est en 64 kb/s, Abdul Basit et Sudais en 192 kb/s.
 * Un catalogue incomplet ou dont la numérotation diverge est refusé entier.
 */
export async function loadRecitation(chapter: number, reciterId: string, verses: VerseAudioRef[]): Promise<Map<number, string[]>> {
  const reciter = reciters.find((item) => item.id === reciterId && item.mode !== "surah");
  if (!reciter || !Number.isInteger(chapter) || chapter < 1 || chapter > 114 || !verses.length ||
    verses.some((verse, index) => !Number.isInteger(verse.number) || verse.number < 1 || (index > 0 && verse.number !== verses[index - 1].number + 1) || !Number.isInteger(verse.globalNumber) || verse.globalNumber < 1)) {
    throw new Error("Récitateur ou sourate invalide.");
  }
  if (reciter.everyAyahFolder) {
    return new Map(verses.map((verse) => [verse.number,
      [`https://everyayah.com/data/${reciter.everyAyahFolder}/${String(chapter).padStart(3, "0")}${String(verse.number).padStart(3, "0")}.mp3`],
    ]));
  }
  return loadAudioEdition(chapter, reciterId, verses);
}

/** Strict edition and global-ayah validation is shared by Arabic and French. */
async function loadAudioEdition(chapter: number, reciterId: string, verses: VerseAudioRef[]): Promise<Map<number, string[]>> {
  const response = await fetch(`https://api.alquran.cloud/v1/surah/${chapter}/${reciterId}`);
  if (!response.ok) throw new Error("Le service audio est temporairement indisponible.");
  const payload = await response.json() as {
    status?: string;
    data?: { number?: number; edition?: { identifier?: string }; ayahs?: Array<{
      number?: number; numberInSurah?: number; audio?: string; audioSecondary?: string[];
    }> };
  };
  const data = payload.data;
  if (payload.status !== "OK" || data?.number !== chapter || data.edition?.identifier !== reciterId || data.ayahs?.length !== verses.length) {
    throw new Error("La source audio ne correspond pas à cette sourate.");
  }
  const result = new Map<number, string[]>();
  for (const [index, verse] of verses.entries()) {
    const item = data.ayahs[index];
    if (item.numberInSurah !== verse.number || item.number !== verse.globalNumber) {
      throw new Error("La numérotation audio ne correspond pas aux versets affichés.");
    }
    const urls = [item.audio, ...(item.audioSecondary ?? [])].filter((url): url is string =>
      typeof url === "string" && /^https:\/\/cdn\.islamic\.network\/quran\/audio\/\d+\/[\w.-]+\/\d+\.mp3$/.test(url),
    );
    if (!urls.length || urls.some((url) => !url.endsWith(`/${verse.globalNumber}.mp3`) || !url.includes(`/${reciterId}/`))) {
      throw new Error("Fichier audio manquant ou incohérent pour ce verset.");
    }
    result.set(verse.number, urls);
  }
  return result;
}

/** A section may cross surahs. Validate each complete surah catalog, then select
 * only the requested verses and retain their unique sequence positions. */
export async function loadSectionRecitation(reciterId: string, verses: VerseAudioRef[]) {
  const chapterNumbers = [...new Set(verses.map(v => v.sourceChapter!))];
  const result = new Map<number, string[]>();
  await Promise.all(chapterNumbers.map(async chapter => {
    const meta = chapters.find(c => c.number === chapter);
    if (!meta) throw new Error("Sourate inconnue.");
    const offset = chapters.filter(c => c.number < chapter).reduce((n, c) => n + c.versesCount, 0);
    const full = Array.from({ length: meta.versesCount }, (_, i) => ({ number: i + 1, globalNumber: offset + i + 1 }));
    const catalog = await loadRecitation(chapter, reciterId, full);
    for (const verse of verses.filter(v => v.sourceChapter === chapter)) {
      if (!verse.sourceVerse || verse.globalNumber !== offset + verse.sourceVerse || !catalog.has(verse.sourceVerse)) throw new Error("Verset de portion incohérent.");
      result.set(verse.number, catalog.get(verse.sourceVerse)!);
    }
  }));
  return result;
}


export const frenchAudioEdition = {
  id: "fr.leclerc",
  name: "Youssouf Leclerc",
  translation: "Muhammad Hamidullah, revue et corrigée par le complexe du roi Fahd",
  source: "https://www.lenoblecoran.fr/audio/",
  terms: "https://alquran.cloud/terms-and-conditions",
} as const;

/** Validate complete catalogs before selecting a juz/hizb's source verses. */
export async function loadFrenchRecitation(chapter: number, verses: VerseAudioRef[]): Promise<Map<number, string[]>> {
  if (!verses.length) throw new Error("Portion vide.");
  const result = new Map<number, string[]>();
  const numbers = [...new Set(verses.map(v => v.sourceChapter ?? chapter))];
  await Promise.all(numbers.map(async number => {
    const meta = chapters.find(c => c.number === number);
    if (!meta) throw new Error("Sourate inconnue.");
    const offset = chapters.filter(c => c.number < number).reduce((sum, c) => sum + c.versesCount, 0);
    const full = Array.from({ length: meta.versesCount }, (_, i) => ({ number: i + 1, globalNumber: offset + i + 1 }));
    const catalog = await loadAudioEdition(number, frenchAudioEdition.id, full);
    for (const verse of verses.filter(v => (v.sourceChapter ?? chapter) === number)) {
      const sourceVerse = verse.sourceVerse ?? verse.number;
      if (!Number.isInteger(sourceVerse) || verse.globalNumber !== offset + sourceVerse || !catalog.has(sourceVerse)) throw new Error("Traduction audio incohérente pour ce verset.");
      result.set(verse.number, catalog.get(sourceVerse)!);
    }
  }));
  return result;
}
