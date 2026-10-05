"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import type { QuranChapterMeta } from "@/lib/quran/data";
import { normalizeSearch } from "@/lib/quran/reading-position";
import { ReadingResume } from "@/components/islamic/reading-resume";

export function ChapterExplorer({ chapters }: { chapters: QuranChapterMeta[] }) {
  const [query, setQuery] = useState("");
  const [origin, setOrigin] = useState("all");
  const normalized = normalizeSearch(query);
  const filtered = chapters.filter((c) => (origin === "all" || c.revelation === origin) && (!normalized || [String(c.number), c.nameFrench, c.nameTransliteration, c.nameArabic].some(s=>normalizeSearch(s).includes(normalized))));
  return <>
    <ReadingResume chapters={chapters} />
    <div className="chapter-controls mb-7 flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4 sm:p-5 lg:flex-row lg:items-center">
      <label className="flex flex-1 items-center gap-3"><Search className="size-4 shrink-0 text-primary" aria-hidden="true" /><span className="sr-only">Rechercher une sourate</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Nom français, arabe ou numéro…" className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none" /></label>
      <div className="flex flex-wrap gap-1" role="group" aria-label="Lieu de révélation">{[{value:"all",label:"Toutes"},{value:"Mecca",label:"Mecquoises"},{value:"Madina",label:"Médinoises"}].map(item=><button type="button" key={item.value} onClick={()=>setOrigin(item.value)} aria-pressed={origin===item.value} className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${origin===item.value?"bg-primary text-primary-foreground":"text-muted hover:bg-surface-muted"}`}>{item.label}</button>)}</div>
    </div>
    <p role="status" className="mb-5 text-xs text-muted">{filtered.length} sourate{filtered.length>1?"s":""}</p>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(c=><Link key={c.number} href={`/coran/${c.number}`} className="chapter-card group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5"><span className="chapter-number flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent/25 font-display text-sm text-accent-text">{c.number}</span><div className="min-w-0 flex-1"><p lang="ar" dir="rtl" className="mb-2 truncate text-left font-arabic text-xl text-primary">{c.nameArabic}</p><h2 className="text-sm font-semibold">{c.nameFrench}</h2><p className="mt-1 text-[11px] text-muted">{c.nameTransliteration} · {c.versesCount} versets</p></div><ArrowUpRight className="size-4 shrink-0 text-accent-text transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" /></Link>)}</div>
    {filtered.length===0&&<div className="rounded-2xl border border-dashed border-border p-10 text-center"><p>Aucune sourate ne correspond à votre recherche.</p><button onClick={()=>{setQuery("");setOrigin("all")}} className="mt-3 text-sm text-primary underline">Afficher toutes les sourates</button></div>}
  </>;
}
