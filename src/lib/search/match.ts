import { normalizeSearch } from "@/lib/quran/reading-position";
const groups = [
  ["fajr","sobh","subh","soubh","aube","aurore","فجر","الفجر","صبح","الصبح"],
  ["dhuhr","dhour","zuhr","dohr","ظهر","الظهر"],
  ["asr","عصر","العصر"], ["maghrib","magrib","مغرب","المغرب"], ["isha","ichaa","icha","عشاء","العشاء"],
  ["mouwatta","muwatta","mouatta","mowatta","muwattae","موطا","الموطا"],
  ["bukhari","boukhari","boukari","بخاري","البخاري"],
  ["salat","salah","priere","prieres","صلاة","الصلاة"],
  ["zakat","aumone","aumones","زكاة","الزكاة"],
  ["baqara","baqarah"],
];
const stop = new Set(["le","la","les","de","du","des","un","une","et","dans","sur","pour","en","au","aux"]);
export function searchTerms(q: string) { return normalizeSearch(q).replace(/[’']/g," ").split(/[^\p{L}\p{N}]+/u).filter(t=>t&&!stop.has(t)).slice(0,16); }
export function searchable(text: string) { return ` ${normalizeSearch(text).replace(/[’']/g," ").replace(/[^\p{L}\p{N}]+/gu," ")} `; }
export function relevance(q: string, text: string, title = "") {
  const terms = searchTerms(q); if (!terms.length || normalizeSearch(q).length < 2) return 0;
  const source = searchable(text), heading = searchable(title);
  let score = 0;
  for (const term of terms) {
    const alternatives = groups.find(g=>g.includes(term)) ?? [term];
    const direct = source.includes(` ${term} `);
    if (!direct && !alternatives.some(t=>source.includes(` ${t} `))) return 0;
    score += direct ? 3 : 1;
    if (heading.includes(` ${term} `)) score += 8;
  }
  return score;
}
