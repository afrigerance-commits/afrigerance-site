"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { bookSpreadNumbers } from "@/lib/quran/book";

export function QuranPageNavigation({ current, spread = false, book = false }: { current: number; spread?: boolean; book?: boolean }) {
  const router = useRouter();
  const first = bookSpreadNumbers(current)[0];
  const prev = spread ? first - 2 : current - 1;
  const next = spread ? first + 2 : current + 1;
  return <nav aria-label="Navigation des pages du Coran" className={`my-5 flex ${book ? "flex-row-reverse" : ""} flex-wrap items-center justify-between gap-3 rounded-2xl border border-gold-600/25 bg-surface p-3 text-sm`}>
    {prev >= 1 ? <Link className="min-h-11 rounded-xl border border-border px-3 py-3" href={`/coran/lecture/page/${prev}`}>{book ? "→" : "←"} {spread ? "Pages précédentes" : "Page précédente"}</Link> : <span />}
    <label className="flex items-center gap-2">Page <select aria-label="Choisir une page du Coran" value={current} onChange={event => router.push(`/coran/lecture/page/${event.target.value}`)} className="min-h-11 max-w-24 rounded-lg border border-border bg-surface px-2">{Array.from({length:604}, (_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}</select><span className="text-muted">/ 604</span></label>
    {next <= 604 ? <Link className="min-h-11 rounded-xl border border-border px-3 py-3" href={`/coran/lecture/page/${next}`}>{spread ? "Pages suivantes" : "Page suivante"} {book ? "←" : "→"}</Link> : <span />}
  </nav>;
}
