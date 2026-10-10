"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import chapters from "../../../data/quran/chapters-meta.json";
export function QuranBookmarksLibrary() {
  const [saved, setSaved] = useState<{ chapter: number; verse: number; name: string }[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const load = () => {
      try {
        const bookmarks = chapters.flatMap(c => { const verse = Number(localStorage.getItem(`mirath:quran:bookmark:${c.number}`)); return Number.isInteger(verse) && verse >= 1 && verse <= c.versesCount ? [{ chapter: c.number, verse, name: c.nameFrench }] : []; });
        setSaved(bookmarks);
      } catch { setError("Les signets de cet appareil ne sont pas accessibles."); }
    };
    queueMicrotask(load); window.addEventListener("storage",load); window.addEventListener("mirath-quran-bookmarks",load);
    return () => { window.removeEventListener("storage",load); window.removeEventListener("mirath-quran-bookmarks",load); };
  }, []);
  return <section className="mt-10 rounded-2xl border border-border bg-surface p-5"><h2 className="font-display text-2xl">Mes signets coraniques</h2><p className="mt-3 text-sm text-muted">Un repère par sourate, enregistré sur cet appareil.</p>{error && <p role="alert" className="mt-3 text-sm">{error}</p>}<ul className="mt-4 space-y-3">{saved.map(b => <li key={b.chapter}><Link className="inline-block min-h-11 py-2 font-medium text-primary underline" href={`/coran/${b.chapter}#verset-${b.verse}`}>{b.name} · verset {b.verse}</Link></li>)}</ul>{!saved.length && <p className="mt-4 text-sm text-muted">Utilisez l’icône de signet à côté d’un verset.</p>}</section>;
}
