import "server-only";
import { getChapterVerses, getChapters } from "./data";
import { normalizeSearch } from "./reading-position";
let index: { chapter: number; number: number; arabic: string; french: string; normalized: string }[] | null = null;
export function searchQuran(query: string, page = 1) {
  const q = normalizeSearch(query).slice(0, 120);
  if (q.length < 2) return { results: [], total: 0, page: 1 };
  if (!index) index = getChapters().flatMap(c => getChapterVerses(c.number).map(v => ({ chapter: c.number, number: v.number, arabic: v.arabic, french: v.french, normalized: normalizeSearch(`${v.arabic} ${v.french}`) })));
  const ref = /^(\d{1,3})\s*[:.]\s*(\d{1,3})$/.exec(q);
  const words = q.split(/\s+/).filter(Boolean);
  const matches = index.filter(v => ref ? v.chapter === Number(ref[1]) && v.number === Number(ref[2]) : words.every(word => v.normalized.includes(word)));
  const current = Math.min(Math.max(1, Math.floor(page) || 1), Math.max(1, Math.ceil(matches.length / 20)));
  return { results: matches.slice((current-1)*20,current*20).map(v => ({ chapter: v.chapter, number: v.number, arabic: v.arabic, french: v.french })), total: matches.length, page: current };
}
