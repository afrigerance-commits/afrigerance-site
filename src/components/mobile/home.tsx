"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { BookOpen, Bookmark, Sparkles, ArrowUpRight } from "lucide-react";
import { ReadingResume } from "@/components/islamic/reading-resume";
import type { QuranChapterMeta } from "@/lib/quran/data";
import chapters from "../../../data/quran/chapters-meta.json";
import { useDeviceStore } from "@/lib/hooks/use-device-store";
import { initialPlan, parseReadingPlan, localDate, goalVerseCount } from "@/lib/quran/reading-plan";
import { QuranLanguageSelector } from "@/components/islamic/quran-language-selector";
function parseWelcome(raw: string | null) { return raw === "true"; }
export function MobileHome({ children }: { children: ReactNode }) {
  const store = useDeviceStore("mirath:reading-plan:v1", initialPlan, parseReadingPlan);
  const welcome = useDeviceStore("mirath:welcome:v1", false, parseWelcome);
  const p = store.value; const count = goalVerseCount(p.unit,p.target,Math.min(6236,p.completed+1));
  const read = p.logs[localDate()] ?? 0;
  return <><section className="app-mobile-home premium-container pb-5 pt-6" aria-label="Mon accueil quotidien">
    <p className="eyebrow">Votre rendez-vous avec le savoir</p><h1 className="mt-3 font-display text-4xl leading-tight text-primary">Un moment<br />pour l’essentiel.</h1>
    <ReadingResume chapters={chapters as QuranChapterMeta[]} />
    <Link href="/coran" className="mt-5 flex min-h-20 items-center gap-4 rounded-3xl bg-primary p-5 text-primary-foreground shadow-sm"><BookOpen className="size-6"/><span className="flex-1"><strong className="block text-lg">Ouvrir le Coran</strong><span className="text-sm opacity-85">Sourates, Juz et Hizb · trois modes de lecture</span></span><ArrowUpRight className="size-5"/></Link>
    </section>{children}<section className="app-mobile-home premium-container pb-6" aria-label="Mes outils quotidiens">
    <Link href="/mon-suivi" className="mt-4 block rounded-3xl border border-accent/30 bg-surface p-5"><span className="flex items-center justify-between gap-3"><strong className="font-display text-xl">Mon objectif du jour</strong><span className="text-sm text-accent-text">{store.ready ? `${read} / ${count}` : "…"}</span></span><progress className="mt-4 h-1.5 w-full accent-[var(--primary)]" value={Math.min(read,count)} max={Math.max(1,count)} aria-label="Objectif en versets déclarés lus"/><span className="mt-2 block text-xs text-muted">Versets déclarés lus · valider dans Mon suivi</span></Link>
    <div className="mt-4 grid grid-cols-2 gap-3">{[{href:"/invocations",title:"Invocations",text:"Selon votre moment",icon:Sparkles},{href:"/ma-bibliotheque",title:"Ma bibliothèque",text:"Signets, notes et audios",icon:Bookmark}].map(item=><Link href={item.href} key={item.href} className="rounded-3xl border border-border bg-surface p-5"><item.icon className="mb-4 size-5 text-accent-text"/><strong className="block">{item.title}</strong><span className="mt-1 block text-xs text-muted">{item.text}</span></Link>)}</div>
    <div className="mt-4 flex gap-3"><Link href="/routine" className="min-h-11 flex-1 rounded-xl border border-border px-4 py-3 text-center text-sm font-semibold">Ma routine</Link><Link href="/apprendre" className="min-h-11 flex-1 rounded-xl border border-border px-4 py-3 text-center text-sm font-semibold">Une leçon</Link></div>
    {welcome.ready && !welcome.value && <details className="mt-5 rounded-3xl border border-accent/30 bg-surface p-5"><summary className="min-h-11 cursor-pointer font-semibold">Bienvenue · personnaliser ma lecture</summary><div className="mt-4"><QuranLanguageSelector compact /><p className="mt-4 text-sm leading-7 text-muted">Réglez votre ville et l’adhan avec le bouton des horaires ci-dessous. Vous pouvez lire sans créer de compte.</p><button type="button" onClick={()=>welcome.save(true)} className="mt-3 min-h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">C’est compris</button></div></details>}
  </section></>;
}
