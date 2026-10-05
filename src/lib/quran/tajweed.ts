/** Annotations fournies par l'édition quran-tajweed d'Al Quran Cloud. */
export const tajweedRules: Record<string, { label: string; color: string }> = {
  h: { label: "Hamzat al-wasl", color: "#8b8b8b" },
  s: { label: "Lettre silencieuse", color: "#8b8b8b" },
  l: { label: "Lâm solaire", color: "#8b8b8b" },
  n: { label: "Madd naturel", color: "#537fff" },
  p: { label: "Madd permis", color: "#4050ff" },
  m: { label: "Madd nécessaire", color: "#000ebc" },
  o: { label: "Madd obligatoire", color: "#2144c1" },
  q: { label: "Qalqala", color: "#dd0008" },
  c: { label: "Ikhfâ’ shafawî", color: "#d500b7" },
  f: { label: "Ikhfâ’", color: "#9400a8" },
  w: { label: "Idghâm shafawî", color: "#58b800" },
  i: { label: "Iqlâb", color: "#26bffd" },
  a: { label: "Idghâm avec ghunna", color: "#169777" },
  u: { label: "Idghâm sans ghunna", color: "#169200" },
  d: { label: "Idghâm mutajânisayn", color: "#a1a1a1" },
  b: { label: "Idghâm mutaqâribayn", color: "#a1a1a1" },
  g: { label: "Ghunna", color: "#ff7e1e" },
};

export interface TajweedSegment { text: string; rule?: string }

/** N'interprète aucune balise inconnue : mieux vaut afficher la graphie ordinaire. */
export function parseTajweed(value: string): TajweedSegment[] | null {
  const segments: TajweedSegment[] = [];
  const token = /\[([a-z])(?::\d+)?\[([^\[\]]+)\]/g;
  let index = 0;
  for (const match of value.matchAll(token)) {
    const start = match.index;
    if (!tajweedRules[match[1]]) return null;
    const plain = value.slice(index, start);
    if (/[\[\]]/.test(plain)) return null;
    if (plain) segments.push({ text: plain });
    segments.push({ text: match[2], rule: match[1] });
    index = start + match[0].length;
  }
  const tail = value.slice(index);
  if (/[\[\]]/.test(tail)) return null;
  if (tail) segments.push({ text: tail });
  return segments.length ? segments : null;
}
