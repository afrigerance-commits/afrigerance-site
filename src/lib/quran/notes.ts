import chapters from "../../../data/quran/chapters-meta.json";
export const notesKey = "mirath:quran:notes:v1";
export interface VerseNote { chapter: number; verse: number; text: string; updated: string }
export type VerseNotes = Record<string, VerseNote>;
export function parseVerseNotes(raw: string | null): VerseNotes {
  const result: VerseNotes = {};
  try {
    const values = JSON.parse(raw || "{}");
    for (const [key, n] of Object.entries(values ?? {})) {
      if (!n || typeof n !== "object") continue;
      const note = n as VerseNote;
      const meta = chapters.find(c => c.number === note.chapter);
      if (meta && Number.isInteger(note.verse) && note.verse >= 1 && note.verse <= meta.versesCount && key === `${note.chapter}:${note.verse}` && typeof note.text === "string" && note.text.trim() && note.text.length <= 4000 && typeof note.updated === "string" && Number.isFinite(Date.parse(note.updated))) result[key] = note;
    }
  } catch { /* Invalid device data is ignored. */ }
  return result;
}
