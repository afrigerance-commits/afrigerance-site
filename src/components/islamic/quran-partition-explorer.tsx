"use client";
import Link from "next/link";
import { useState } from "react";
import { QuranPageNavigation } from "./quran-page-navigation";
import { getPartitions, type PartitionType } from "@/lib/quran/partitions";

export function QuranPartitionExplorer({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"sourates" | PartitionType>("sourates");
  return <section><div className="mushaf-controls mb-6 flex flex-wrap gap-2 rounded-2xl border border-gold-600/25 p-3" role="group" aria-label="Découpage du Coran">
    {(["sourates", "juz", "hizb", "page"] as const).map(value => <button key={value} type="button" aria-pressed={mode === value} onClick={() => setMode(value)} className={`min-h-11 rounded-xl px-5 text-base font-semibold transition-all ${mode === value ? "bg-emerald-900 text-ivory-50 shadow-md" : "hover:bg-gold-500/10"}`}>{value === "sourates" ? "Sourates" : value === "juz" ? "30 juz" : value === "hizb" ? "60 hizb" : "604 pages"}</button>)}
  </div>{mode === "sourates" ? children : mode === "page" ? <div className="rounded-2xl border border-gold-600/25 p-4"><h2 className="font-display text-xl text-primary">Lire page par page</h2><p className="mt-3 text-sm leading-7 text-muted">Choisissez l’une des 604 pages du mushaf de Médine. Le texte s’adapte à votre écran ; les limites des pages sont conservées.</p><Link href="/coran/lecture/page/1" className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-primary px-4 py-3 text-primary-foreground">Commencer à la page 1</Link><QuranPageNavigation current={1} /></div> : <div><p className="mb-5 text-base text-muted">Chaque portion s’ouvre séparément, du premier au dernier verset.</p><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{getPartitions(mode).map(p => <Link key={p.number} href={`/coran/lecture/${mode}/${p.number}`} className="mushaf-card rounded-2xl border border-gold-600/25 p-5 focus-visible:outline-2 focus-visible:outline-gold-600"><span className="font-display text-xl font-semibold text-primary">{mode === "juz" ? "Juz" : "Hizb"} {p.number}</span><span className="mt-3 block text-sm text-muted">{p.start.chapter}:{p.start.verse} — {p.end.chapter}:{p.end.verse} · {p.count} versets</span></Link>)}</div></div>}</section>;
}
