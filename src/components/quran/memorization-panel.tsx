"use client";
import { useState } from "react";
import { useQuranAudioContext } from "@/components/islamic/quran-audio-player";
import { Button } from "@/components/ui/button";
export function MemorizationPanel() {
  const p = useQuranAudioContext();
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [repetitions, setRepetitions] = useState(3);
  const [delay, setDelay] = useState(5);
  const first = p.verses.some(v => v.number === from) ? from : p.verses[0]?.number ?? 1;
  const last = p.verses.some(v => v.number === to) ? to : p.verses.at(-1)?.number ?? 1;
  const available = p.reciterId !== "tvquran.hady-toure";
  return <details className="reader-secondary mt-4 rounded-2xl border border-accent/30 bg-surface p-4"><summary className="min-h-11 cursor-pointer py-2 font-semibold text-primary">Mémoriser un passage</summary><p className="mt-3 text-sm leading-7 text-muted">Écoutez chaque verset plusieurs fois, avec un silence pour réciter. Si la traduction audio est active, chaque répétition comprend l’arabe puis le français. Utilisez « Masquer le texte » dans les options de lecture. Ces répétitions sont un choix pédagogique personnel.</p><div className="mt-4 grid gap-3 sm:grid-cols-4">
    <label className="text-sm">Du verset<select value={first} onChange={e => setFrom(Number(e.target.value))} className="mt-2 min-h-11 w-full rounded-xl border border-border bg-background p-2">{p.verses.map(v => <option key={v.number} value={v.number}>{v.sourceChapter ? `${v.sourceChapter}:` : ""}{v.sourceVerse ?? v.number}</option>)}</select></label>
    <label className="text-sm">Au verset<select value={last} onChange={e => setTo(Number(e.target.value))} className="mt-2 min-h-11 w-full rounded-xl border border-border bg-background p-2">{p.verses.map(v => <option key={v.number} value={v.number}>{v.sourceChapter ? `${v.sourceChapter}:` : ""}{v.sourceVerse ?? v.number}</option>)}</select></label>
    <label className="text-sm">Répétitions<select value={repetitions} onChange={e => setRepetitions(Number(e.target.value))} className="mt-2 min-h-11 w-full rounded-xl border border-border bg-background p-2">{[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n}>{n}</option>)}</select></label>
    <label className="text-sm">Silence<select value={delay} onChange={e => setDelay(Number(e.target.value))} className="mt-2 min-h-11 w-full rounded-xl border border-border bg-background p-2">{[0,3,5,10,15,30].map(n => <option key={n} value={n}>{n} s</option>)}</select></label>
  </div><div className="mt-4 flex flex-wrap gap-3"><Button disabled={!available || first > last || !p.verses.length} onClick={() => { p.configureMemorization({ from: first, to: last, repetitions, delay }); p.playVerse(first, true); }}>Commencer la mémorisation</Button>{p.memorization && <Button variant="outline" onClick={() => p.configureMemorization(null)}>Quitter la mémorisation</Button>}</div>{!available && <p className="mt-3 text-sm text-muted">Choisissez un récitateur découpé par verset.</p>}{first > last && <p role="alert" className="mt-3 text-sm">Le début doit précéder la fin.</p>}{p.memorization && <p role="status" className="mt-3 text-sm text-primary">Mémorisation active · {p.memorization.repetitions} répétition(s) par verset{p.paused ? " · en pause" : ""}</p>}</details>;
}
