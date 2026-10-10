import chapters from "../../../data/quran/chapters-meta.json";
import { getPartitions, globalVerse } from "./partitions";
export const TOTAL_VERSES = 6236;
export type GoalUnit = "versets" | "hizb" | "juz";
export interface ReadingPlan { unit: GoalUnit; target: number; days: number; completed: number; logs: Record<string, number> }
export const initialPlan: ReadingPlan = { unit: "versets", target: 10, days: 30, completed: 0, logs: {} };
export function parseReadingPlan(raw: string | null): ReadingPlan {
  try {
    const p = JSON.parse(raw || "null");
    if (!p || !["versets", "hizb", "juz"].includes(p.unit) || !Number.isInteger(p.target) || p.target < 1 || p.target > 6236 || !Number.isInteger(p.days) || p.days < 1 || p.days > 365 || !Number.isInteger(p.completed) || p.completed < 0 || p.completed > TOTAL_VERSES) return initialPlan;
    if (p.target > (p.unit === "juz" ? 30 : p.unit === "hizb" ? 60 : TOTAL_VERSES)) return initialPlan;
    const logs: Record<string, number> = {};
    for (const [date, n] of Object.entries(p.logs ?? {})) if (/^\d{4}-\d{2}-\d{2}$/.test(date) && Number.isInteger(n) && Number(n) >= 0 && Number(n) <= TOTAL_VERSES) logs[date] = Number(n);
    return { unit: p.unit, target: p.target, days: p.days, completed: p.completed, logs };
  } catch { return initialPlan; }
}
export function localDate(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`; }
export function verseReference(global: number) {
  const n = Math.max(1, Math.min(TOTAL_VERSES, global));
  const chapter = chapters.find(c => globalVerse(c.number, c.versesCount) >= n)!;
  return { chapter: chapter.number, verse: n - globalVerse(chapter.number, 1) + 1 };
}
export function nextKhatmSession(completed: number, days: number) {
  if (completed >= TOTAL_VERSES) return null;
  const count = Math.ceil((TOTAL_VERSES - completed) / Math.max(1, days));
  return { first: completed + 1, last: Math.min(TOTAL_VERSES, completed + count), count };
}
export function goalVerseCount(unit: GoalUnit, target: number, from: number) {
  if (unit === "versets") return Math.min(target, TOTAL_VERSES - from + 1);
  const parts = getPartitions(unit);
  const first = Math.max(0, parts.findIndex(p => p.last >= from));
  return parts[Math.min(parts.length - 1, first + target - 1)].last - from + 1;
}
