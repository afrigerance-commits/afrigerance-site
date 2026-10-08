"use client";
import Link from "next/link";
import { useState } from "react";
import { getPartitions, type PartitionType } from "@/lib/quran/partitions";

export function QuranPartitionExplorer({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"sourates" | PartitionType>("sourates");
  return <section><div className="mushaf-controls mb-6 flex flex-wrap gap-2 rounded-2xl border border-gold-600/25 p-3" role="group" aria-label="Découpage du Coran">
    {(["sourates", "juz", "hizb"] as const).map(value => <button key={value} type="button" aria-pressed={mode === value} onClick={() => setMode(value)} className={`min-h-11 rounded-xl px-5 text-base font-semibold transition-all ${mode === value ? "bg-emerald-900 text-ivory-50 shadow-md" : "hover:bg-gold-500/10"}`}>{value === "sourates" ? "Sourates" : value === "juz" ? "30 juz" : "60 hizb"}</button>)}
  </div>{mode === "sourates" ? children : <div><p className="mb-5 text-base text-muted">Chaque portion s’ouvre séparément, du premier au dernier verset.</p><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{getPartitions(mode).map(p => <Link key={p.number} href={`/coran/lecture/${mode}/${p.number}`} className="mushaf-card rounded-2xl border border-gold-600/25 p-5 focus-visible:outline-2 focus-visible:outline-gold-600"><span className="font-display text-xl font-semibold text-primary">{mode === "juz" ? "Juz" : "Hizb"} {p.number}</span><span className="mt-3 block text-sm text-muted">{p.start.chapter}:{p.start.verse} — {p.end.chapter}:{p.end.verse} · {p.count} versets</span></Link>)}</div></div>}</section>;
}
