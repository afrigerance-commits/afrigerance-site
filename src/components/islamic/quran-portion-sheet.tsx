"use client";
import type { ReactNode } from "react";
import { useQuranDisplay } from "./quran-display-options";
import { useQuranLanguage } from "./quran-language-selector";

export function QuranPortionSheet({ children }: { children: ReactNode }) {
  const display = useQuranDisplay();
  const language = useQuranLanguage();
  return <div dir={display.continuous && language.value !== "french" ? "rtl" : undefined} className={`mushaf-sheet mt-5 rounded-3xl border border-gold-600/25 px-3 py-4 sm:px-6 ${display.continuous ? "text-justify leading-loose [&>.quran-portion-verse]:contents" : ""}`}>{children}</div>;
}
