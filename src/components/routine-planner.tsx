"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Clock3, RotateCcw } from "lucide-react";
import { createRoutine, routineDay, type RoutineProfile } from "@/lib/routine";

const KEY = "mirath-routine-v1";
export function RoutinePlanner() {
  const [profile, setProfile] = useState<RoutineProfile>("homme");
  const [minutes, setMinutes] = useState<10 | 20 | 40>(20);
  const [done, setDone] = useState<string[]>([]);
  const [day, setDay] = useState(routineDay());
  const dayRef = useRef(day);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    const hydrate = window.setTimeout(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
      if (saved) {
        if (["homme", "femme"].includes(saved.profile)) setProfile(saved.profile);
        if ([10,20,40].includes(saved.minutes)) setMinutes(saved.minutes);
        if (saved.day === routineDay() && Array.isArray(saved.done)) setDone(saved.done.filter((id: unknown) => typeof id === "string" && ["coran","apprendre","invocations","bilan"].includes(id)));
      }
    } catch { setStorageError(true); }
    const today = routineDay(); dayRef.current = today; setDay(today);
    setReady(true);
    }, 0);
    const checkDay = () => { const today = routineDay(); if (dayRef.current !== today) { dayRef.current = today; setDone([]); setDay(today); } };
    const timer = setInterval(checkDay, 60000);
    window.addEventListener("focus", checkDay);
    return () => { window.clearTimeout(hydrate); clearInterval(timer); window.removeEventListener("focus", checkDay); };
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify({ profile, minutes, done, day })); } catch { queueMicrotask(() => setStorageError(true)); }
  }, [profile, minutes, done, day, ready]);
  const tasks = createRoutine(profile, minutes);
  return <div className="mt-10"><div className="grid gap-7 rounded-3xl border border-accent/30 bg-surface p-6 sm:grid-cols-2 sm:p-8"><fieldset><legend className="mb-3 text-sm font-semibold">Mon profil</legend><div className="flex gap-2">{(["homme","femme"] as const).map(value => <button key={value} type="button" aria-pressed={profile === value} onClick={() => setProfile(value)} className={`min-h-11 rounded-full border px-5 py-2 text-sm ${profile === value ? "border-primary bg-primary text-white" : "border-border"}`}>{value === "homme" ? "Homme" : "Femme"}</button>)}</div></fieldset><fieldset><legend className="mb-3 text-sm font-semibold">Mon temps disponible</legend><div className="flex flex-wrap gap-2">{([10,20,40] as const).map(value => <button key={value} type="button" aria-pressed={minutes === value} onClick={() => setMinutes(value)} className={`min-h-11 rounded-full border px-4 py-2 text-sm ${minutes === value ? "border-gold-600 bg-accent/20" : "border-border"}`}>{value} min</button>)}</div></fieldset><p className="col-span-full text-sm leading-6 text-muted">Le choix du profil propose une première lecture différente. Les activités sont accessibles aux femmes comme aux hommes ; adaptez-les à votre situation. Ces durées sont des repères d’organisation personnelle, pas des prescriptions religieuses.</p></div>
    <div className="my-8 flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm text-muted">Aujourd’hui · {day.split("-").reverse().join("/")}</p><p aria-live="polite" className="mt-1 font-display text-2xl">{done.length} / {tasks.length} étapes accomplies</p></div><button onClick={() => setDone([])} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 py-2 text-sm"><RotateCcw className="size-4" /> Recommencer la journée</button></div><progress value={done.length} max={tasks.length} aria-label="Progression de ma routine" className="mb-8 h-2 w-full accent-[#123F38]" />
    <ol className="grid gap-4 lg:grid-cols-2">{tasks.map((task, index) => <li key={task.id} className={`rounded-3xl border p-6 transition-colors ${done.includes(task.id) ? "border-primary/40 bg-primary/5" : "border-border bg-surface"}`}><div className="flex items-start justify-between gap-4"><div><p className="text-sm text-accent-text">{String(index+1).padStart(2,"0")} · {task.moment}</p><h2 className="mt-3 font-display text-2xl">{task.title}</h2></div><label className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"><input type="checkbox" className="sr-only" aria-label={`Terminer : ${task.title}`} checked={done.includes(task.id)} onChange={() => setDone(current => current.includes(task.id) ? current.filter(id => id !== task.id) : [...current,task.id])} /><Check aria-hidden="true" className={done.includes(task.id) ? "size-5 text-primary" : "size-5 text-muted/40"} /></label></div><p className="mt-4 text-base leading-7 text-muted">{task.text}</p><div className="mt-6 flex flex-wrap items-center justify-between gap-3"><Link href={task.href} className="text-sm font-semibold text-primary underline underline-offset-4">{task.action}</Link><span className="inline-flex items-center gap-1 text-sm text-muted"><Clock3 className="size-4" /> {task.minutes} min</span></div></li>)}</ol><p role="status" className="mt-6 text-sm text-muted">{storageError ? "Votre navigateur ne permet pas d’enregistrer la routine. Le suivi reste disponible pendant cette visite." : "Votre choix et votre progression restent sur cet appareil. Les cases repartent à zéro chaque jour."}</p>
    <aside className="mt-10 rounded-2xl border border-border p-6"><h2 className="font-display text-xl">Privilégier la constance</h2><p className="mt-3 leading-7 text-muted">Al-Bukhârî 6464 rapporte que les œuvres les plus aimées d’Allah sont celles accomplies avec régularité, même modestes. Ce repère inspire l’organisation proposée ; il ne fixe ni ce programme ni ses durées.</p><a href="https://sunnah.com/bukhari:6464" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary underline">Consulter la référence</a></aside>
  </div>;
}
