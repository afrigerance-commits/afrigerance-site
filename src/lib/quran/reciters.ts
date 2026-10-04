/** Éditions audio vérifiées dans le catalogue Al Quran Cloud (Hafs). */
export interface Reciter {
  id: string;
  nom: string;
  portrait: string;
}

export const reciters: Reciter[] = [
  { id: "ar.alafasy", nom: "Mishary Alafasy", portrait: "/images/reciters/alafasy.jpg" },
  { id: "ar.saoodshuraym", nom: "Saoud Al-Shuraim", portrait: "/images/reciters/shuraim.png" },
  { id: "ar.abdulbasitmurattal", nom: "Abdul Basit", portrait: "/images/reciters/abdul-basit.jpg" },
  { id: "ar.abdurrahmaansudais", nom: "Abdurrahman As-Sudais", portrait: "/images/reciters/sudais.png" },
  { id: "ar.husary", nom: "Mahmoud Al-Husary", portrait: "/images/reciters/husary.jpg" },
  { id: "ar.minshawi", nom: "Mohamed Al-Minshawi", portrait: "/images/reciters/minshawi.jpg" },
];

export const defaultReciterId = reciters[0].id;

export interface VerseAudioRef { number: number; globalNumber: number }

/**
 * L'API attribue les véritables URL et débits à chaque ayah. Construire une
 * URL fixe en /128/{récitateur}/{numéro} provoquait des lectures décalées :
 * Shuraim est en 64 kb/s, Abdul Basit et Sudais en 192 kb/s.
 * Un catalogue incomplet ou dont la numérotation diverge est refusé entier.
 */
export async function loadRecitation(chapter: number, reciterId: string, verses: VerseAudioRef[]): Promise<Map<number, string[]>> {
  if (!reciters.some((reciter) => reciter.id === reciterId) || !Number.isInteger(chapter) || chapter < 1 || chapter > 114) {
    throw new Error("Récitateur ou sourate invalide.");
  }
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
