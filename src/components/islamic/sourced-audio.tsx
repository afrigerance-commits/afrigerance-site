"use client";

import { useEffect, useRef, useState } from "react";

export const AUDIO_FOCUS_EVENT = "mirath:audio-focus";

/** Native controls remain usable with keyboard, touch and assistive technology. */
export function SourcedAudio({ src, title, credit, sourceUrl, note }: { src: string; title: string; credit: string; sourceUrl: string; note?: string }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [error, setError] = useState(false);
  const [speed, setSpeed] = useState("1");
  const [repeat, setRepeat] = useState(false);
  useEffect(() => {
    const audio = ref.current;
    const focus = (event: Event) => {
      if ((event as CustomEvent).detail !== ref.current) ref.current?.pause();
    };
    window.addEventListener(AUDIO_FOCUS_EVENT, focus);
    return () => { window.removeEventListener(AUDIO_FOCUS_EVENT, focus); audio?.pause(); };
  }, []);
  return <div className="mt-4 min-w-0 rounded-2xl border border-gold-500/30 bg-background p-4">
    <p className="text-sm font-semibold text-primary">{title}</p>
    <audio ref={ref} src={src} controls loop={repeat} preload="none" aria-label={title} className="mt-3 h-11 w-full max-w-full"
      onPlay={() => { setError(false); window.dispatchEvent(new CustomEvent(AUDIO_FOCUS_EVENT, { detail: ref.current })); }}
      onError={() => setError(true)} />
    <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
      <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-muted underline underline-offset-4">{credit}</a>
      <label className="flex items-center gap-2">Vitesse<select aria-label={`Vitesse : ${title}`} value={speed} className="rounded-lg border border-border bg-surface px-2 py-1" onChange={event => { setSpeed(event.target.value); if (ref.current) ref.current.playbackRate = Number(event.target.value); }}><option value="0.75">0,75×</option><option value="1">1×</option><option value="1.25">1,25×</option></select></label>
    </div>
    <label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" checked={repeat} onChange={event => setRepeat(event.target.checked)} />Rejouer le fichier en boucle</label>
    {note && <p className="mt-3 text-sm leading-6 text-muted">{note}</p>}
    {error && <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-300">Audio indisponible. Réessayez avec une connexion Internet ou ouvrez la source.</p>}
  </div>;
}

const base = "https://d1.islamhouse.com/data/ar/ih_sounds/chain_01/Hisn_Almuslim/Hisn_Almuslim_AlShwehi/";
const chapters = [
  { number: "042", title: "Invocations pour le remboursement des dettes" },
  { number: "030", title: "Invocations du coucher" },
  { number: "029", title: "Invocations du matin et du soir" },
  { number: "026", title: "Invocations avant le salut final" },
];

export function InvocationAudiobook() {
  return <div className="mt-6 grid gap-4">{chapters.map(chapter => <details key={chapter.number} className="rounded-2xl border border-gold-500/30 bg-surface p-5">
    <summary className="cursor-pointer font-semibold text-primary">{chapter.title} — chapitre complet</summary>
    <SourcedAudio src={`${base}ar_${chapter.number}_Hisn_Almuslim_Alshwehi.mp3`} title={`Chapitre complet : ${chapter.title}`} credit="Sulaymân ash-Shuwayhî · IslamHouse" sourceUrl="https://islamhouse.com/ar/audios/2799103/" note="Lecture humaine du chapitre complet de la Citadelle du musulman. Plusieurs formules, versets ou références peuvent être récités. Ce fichier ne correspond pas à une seule fiche. La boucle est un outil personnel d’apprentissage, sans nombre de répétitions prescrit." />
  </details>)}</div>;
}
