"use client";
import Link from "next/link";
import { useState } from "react";
import { useDeviceStore } from "@/lib/hooks/use-device-store";
import { goalVerseCount, initialPlan, localDate, nextKhatmSession, parseReadingPlan, TOTAL_VERSES, verseReference, type GoalUnit } from "@/lib/quran/reading-plan";
import { Button } from "@/components/ui/button";
export function ReadingDashboard() {
  const store = useDeviceStore("mirath:reading-plan:v1", initialPlan, parseReadingPlan);
  const p = store.value;
  const [message, setMessage] = useState("");
  const today = localDate();
  const session = nextKhatmSession(p.completed, p.days);
  const daily = goalVerseCount(p.unit, p.target, Math.min(TOTAL_VERSES, p.completed + 1));
  const start = verseReference(session?.first ?? TOTAL_VERSES);
  const end = verseReference(session?.last ?? TOTAL_VERSES);
  function validate(count: number) {
    const n = Math.min(count, TOTAL_VERSES - p.completed);
    if (store.save({ ...p, completed: p.completed + n, days: Math.max(1, p.days - 1), logs: { ...p.logs, [today]: (p.logs[today] ?? 0) + n } })) setMessage(`${n} versets déclarés lus. Votre prochaine séance est recalculée.`);
  }
  return <section className="mt-8 space-y-6" aria-label="Objectifs et khatm">
    <p className="text-sm leading-7 text-muted">Suivi personnel conservé sur cet appareil. Validez vous-même vos lectures ; le défilement et l’écoute ne les valident pas automatiquement. Aucun nombre choisi ici n’est présenté comme une prescription religieuse.</p>
    <div className="grid gap-5 md:grid-cols-2">
      <div className="rounded-3xl border border-accent/30 bg-surface p-5 sm:p-7"><h2 className="font-display text-2xl">Mon objectif quotidien</h2>
        <div className="mt-5 flex flex-wrap gap-3"><label className="flex flex-col gap-2 text-sm">Quantité<input type="number" min={1} max={p.unit === "juz" ? 30 : p.unit === "hizb" ? 60 : 6236} value={p.target} disabled={!store.ready} onChange={e => { const n = Number(e.target.value); const max = p.unit === "juz" ? 30 : p.unit === "hizb" ? 60 : 6236; if (Number.isInteger(n) && n >= 1 && n <= max) store.save({ ...p, target: n }); }} className="min-h-11 w-24 rounded-xl border border-border bg-background p-3" /></label>
        <label className="flex flex-col gap-2 text-sm">Unité<select value={p.unit} disabled={!store.ready} onChange={e => store.save({ ...p, unit: e.target.value as GoalUnit, target: 1 })} className="min-h-11 rounded-xl border border-border bg-background p-3"><option value="versets">Versets</option><option value="hizb">Hizb</option><option value="juz">Juz</option></select></label></div>
        <p className="mt-5 text-sm">Aujourd’hui : {p.logs[today] ?? 0} versets déclarés lus.</p><p className="mt-2 text-sm text-muted">Prochain objectif : {daily} versets depuis la position de votre khatm.</p>
        <Button className="mt-5" disabled={!store.ready || p.completed === TOTAL_VERSES} onClick={() => validate(daily)}>J’ai lu mon objectif</Button>
      </div>
      <div className="rounded-3xl border border-accent/30 bg-surface p-5 sm:p-7"><h2 className="font-display text-2xl">Mon programme de khatm</h2>
        <label className="mt-5 flex flex-col gap-2 text-sm">Séances restantes<input type="number" min={1} max={365} value={p.days} disabled={!store.ready} onChange={e => { const n = Number(e.target.value); if (Number.isInteger(n) && n >= 1 && n <= 365) store.save({ ...p, days: n }); }} className="min-h-11 w-28 rounded-xl border border-border bg-background p-3" /></label>
        <p className="mt-3 text-sm text-muted">Une séance par jour si possible. Une journée manquée n’efface rien : ajustez les séances restantes pour alléger ou accélérer le programme.</p>
        <progress max={TOTAL_VERSES} value={p.completed} className="mt-5 h-2 w-full accent-[var(--primary)]" aria-label="Progression du khatm" /><p className="mt-2 text-sm">{p.completed} / {TOTAL_VERSES} versets</p>
        {session ? <><Link className="mt-4 block font-semibold text-primary underline" href={`/coran/${start.chapter}#verset-${start.verse}`}>Prochaine séance : {start.chapter}:{start.verse} → {end.chapter}:{end.verse}</Link><p className="mt-2 text-sm text-muted">{session.count} versets, à poursuivre dans les sourates suivantes si nécessaire.</p><Button className="mt-4" disabled={!store.ready} onClick={() => validate(session.count)}>J’ai terminé cette séance</Button></> : <p className="mt-4 font-semibold text-primary">Programme terminé.</p>}
        <details className="mt-5 text-sm"><summary className="cursor-pointer py-2">Corriger ma position ou recommencer</summary><label className="mt-3 flex flex-col gap-2">Versets déjà lus dans ce khatm<input type="number" min={0} max={TOTAL_VERSES} value={p.completed} disabled={!store.ready} onChange={e => { const n = Number(e.target.value); if (Number.isInteger(n) && n >= 0 && n <= TOTAL_VERSES) store.save({ ...p, completed: n }); }} className="min-h-11 rounded-xl border border-border bg-background p-3" /></label><Button variant="outline" className="mt-3" disabled={!store.ready} onClick={() => { if (window.confirm("Recommencer le khatm ? Votre historique quotidien sera conservé.")) store.save({ ...p, completed: 0, days: 30 }); }}>Recommencer un khatm</Button></details>
      </div>
    </div>
    {message && <p role="status" className="text-sm text-primary">{message}</p>}{store.error && <p role="alert" className="text-sm text-red-700">{store.error}</p>}
    <details className="rounded-2xl border border-border p-5"><summary className="cursor-pointer font-semibold">Historique de lecture</summary><ul className="mt-4 space-y-2 text-sm">{Object.entries(p.logs).sort(([a],[b]) => b.localeCompare(a)).slice(0,30).map(([date,n]) => <li key={date}>{date} · {n} versets déclarés lus</li>)}</ul>{!Object.keys(p.logs).length && <p className="mt-3 text-sm text-muted">Votre historique apparaîtra après votre première validation.</p>}</details>
  </section>;
}
