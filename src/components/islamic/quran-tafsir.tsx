"use client";

import { useEffect, useState } from "react";
import { BookOpen, ExternalLink } from "lucide-react";

type TafsirText = { arabic: string | null; french: string | null; errorArabic: boolean; errorFrench: boolean };

/** Les deux textes viennent d'éditions différentes : ne jamais les présenter comme une traduction l'un de l'autre. */
export function QuranTafsir({ chapter, verse }: { chapter: number; verse: number }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState<TafsirText>({ arabic: null, french: null, errorArabic: false, errorFrench: false });

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    const fetchArabic = async () => {
      try {
        const response = await fetch(`https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/ar-tafsir-ibn-kathir/${chapter}/${verse}.json`, { signal: controller.signal });
        if (!response.ok) throw new Error("Source indisponible");
        const item: { surah?: number; ayah?: number; text?: string } = await response.json();
        if (item.surah !== chapter || item.ayah !== verse || typeof item.text !== "string" || !item.text.trim()) throw new Error("Référence incohérente");
        setText((current) => ({ ...current, arabic: item.text! }));
      } catch { if (!controller.signal.aborted) setText((current) => ({ ...current, errorArabic: true })); }
    };
    const fetchFrench = async () => {
      try {
        const response = await fetch(`https://quranenc.com/api/v1/translation/aya/french_mokhtasar/${chapter}/${verse}`, { signal: controller.signal });
        if (!response.ok) throw new Error("Source indisponible");
        const item: { result?: { sura?: string; aya?: string; translation?: string } } = await response.json();
        const result = item.result;
        if (Number(result?.sura) !== chapter || Number(result?.aya) !== verse || typeof result?.translation !== "string" || !result.translation.trim()) throw new Error("Référence incohérente");
        setText((current) => ({ ...current, french: result.translation! }));
      } catch { if (!controller.signal.aborted) setText((current) => ({ ...current, errorFrench: true })); }
    };
    void fetchArabic();
    void fetchFrench();
    return () => controller.abort();
  }, [chapter, verse, open]);

  return <details open={open} onToggle={(event) => setOpen(event.currentTarget.open)} className="mt-5 rounded-xl border border-gold-600/20 bg-[#f8f4e9]/70 px-4 py-3 text-sm dark:bg-emerald-900/15">
    <summary className="flex cursor-pointer items-center gap-2 font-semibold text-emerald-900 dark:text-gold-500"><BookOpen className="size-4" /> Tafsîr du verset {verse}</summary>
    {open && <div className="mt-4 space-y-5 leading-7">
      <section>
        <h3 className="font-semibold text-emerald-950 dark:text-ivory-50">Ibn Kathîr · arabe</h3>
        {text.arabic ? <p lang="ar" dir="rtl" className="mt-2 max-h-96 overflow-y-auto whitespace-pre-wrap rounded-lg bg-white/75 p-4 text-right font-arabic text-lg leading-10 dark:bg-emerald-950/30">{text.arabic}</p> : <p role="status" className="text-xs text-muted">{text.errorArabic ? "Texte arabe indisponible pour ce verset." : "Chargement du texte arabe…"}</p>}
        <p className="mt-1 text-xs text-muted">Texte arabe : corpus Ibn Kathîr diffusé par Tarteel/Quran.com via tafsir_api. Une même explication peut couvrir plusieurs versets.</p>
      </section>
      <section className="border-t border-gold-600/20 pt-4">
        <h3 className="font-semibold text-emerald-950 dark:text-ivory-50">Explication française · Al-Mukhtasar</h3>
        <p className="text-xs text-muted">Autre ouvrage : ce passage français n’est pas la traduction d’Ibn Kathîr ni du recueil attribué à Ibn ‘Abbâs.</p>
        {text.french ? <p lang="fr" className="mt-2 rounded-lg bg-white/75 p-4 text-foreground dark:bg-emerald-950/30">{text.french}</p> : <p role="status" className="text-xs text-muted">{text.errorFrench ? "Explication française indisponible pour ce verset." : "Chargement de l’explication française…"}</p>}
        <p className="mt-1 text-xs text-muted">Source : Centre d’Exégèse pour les Études Coraniques, traduction française Al-Mukhtasar, version 1.0.0, QuranEnc.com. Texte reproduit sans modification.</p>
      </section>
      <section className="border-t border-gold-600/20 pt-4 text-xs text-muted">
        <p>« Tanwîr al-Miqbâs » est attribué à Ibn ‘Abbâs, mais cette attribution est contestée. Son texte arabe et une traduction française n’ont pas été intégrés faute d’une édition par verset contrôlée.</p>
        <a className="mt-2 inline-flex items-center gap-1 text-primary underline" href={`https://www.altafsir.com/Tafasir.asp?LanguageId=2&tAyahNo=${verse}&tDisplay=yes&tMadhNo=0&tSoraNo=${chapter}&tTafsirNo=73`} target="_blank" rel="noopener noreferrer">Consulter le recueil attribué à Ibn ‘Abbâs à sa source <ExternalLink className="size-3" /></a>
      </section>
    </div>}
  </details>;
}
