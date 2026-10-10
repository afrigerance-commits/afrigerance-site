"use client";
import type { ReactNode } from "react";
import { useDeviceStore } from "@/lib/hooks/use-device-store";

export type QuranLanguage = "both" | "arabic" | "french";
function parseLanguage(raw: string | null): QuranLanguage {
  try { const value = JSON.parse(raw ?? '"both"'); return value === "arabic" || value === "french" ? value : "both"; } catch { return "both"; }
}
export function useQuranLanguage() {
  return useDeviceStore<QuranLanguage>("mirath:quran:language", "both", parseLanguage);
}
const options = [
  { value: "both", label: "Arabe et français", description: "Le texte arabe accompagné de la traduction du sens." },
  { value: "arabic", label: "Arabe seulement", description: "Le texte original et ses signes d’arrêt." },
  { value: "french", label: "Français seulement", description: "La traduction du sens par Muhammad Hamidullah." },
] as const;
export function QuranLanguageSelector({ compact = false }: { compact?: boolean }) {
  const language = useQuranLanguage();
  return <section className={compact ? "w-full" : "mb-8"} aria-label="Langue de lecture du Coran">
    {!compact && <h2 className="mb-4 font-display text-2xl text-primary">Choisir ma lecture</h2>}
    <div className={compact ? "flex flex-wrap gap-2" : "grid gap-3 sm:grid-cols-3"}>
      {options.map(option => <button key={option.value} type="button" aria-pressed={language.value === option.value} onClick={() => language.save(option.value)} className={`min-h-11 rounded-2xl border px-4 py-3 text-left transition-colors ${language.value === option.value ? "border-accent bg-primary text-primary-foreground shadow-sm" : "border-accent/30 bg-surface hover:border-accent"}`}>
        <span className="block font-semibold">{option.label}</span>
        {!compact && <span className="mt-2 block text-sm leading-6 opacity-85">{option.description}</span>}
      </button>)}
    </div>
    {language.value === "french" && <p className="mt-3 text-xs leading-6 text-muted">Traduction du sens des versets, distincte du texte arabe du Coran. Ce choix concerne l’affichage ; l’audio se règle séparément dans le lecteur.</p>}
    {language.error && <p role="status" className="mt-2 text-sm text-muted">{language.error}</p>}
  </section>;
}
export function QuranArabicOnly({ children }: { children: ReactNode }) {
  const language = useQuranLanguage();
  return language.value === "french" ? null : children;
}
