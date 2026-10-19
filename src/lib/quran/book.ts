/** Odd page on the right, following even page on the left (Arabic book order). */
export function bookSpreadNumbers(page: number) {
  if (!Number.isInteger(page) || page < 1 || page > 604) throw new Error("Page hors du mushaf");
  const first = page % 2 === 0 ? page - 1 : page;
  return [first, first + 1];
}

export type QuranBookPage = {
  number: number;
  juz: number;
  parts: Array<{
    chapter: number;
    title: string;
    verses: Array<{ number: number; arabic: string; french: string; globalNumber: number; position: number }>;
  }>;
};
