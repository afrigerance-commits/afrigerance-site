"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useQuranAudioContext } from "@/components/islamic/quran-audio-player";
import { AUDIO_CACHE, downloadAudioPack, readAudioPacks, removeAudioPack, type AudioPack } from "@/lib/quran/offline-audio";
import { reciters } from "@/lib/quran/reciters";
import { Button } from "@/components/ui/button";
export function QuranDownloadPanel({ chapter }: { chapter: number }) {
  const player = useQuranAudioContext();
  const controller = useRef<AbortController | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState({ done: 0, total: 1 });
  useEffect(() => () => controller.current?.abort(), []);
  async function download() {
    controller.current?.abort();
    const abort = new AbortController(); controller.current = abort;
    setBusy(true); setMessage(""); setProgress({ done: 0, total: 1 });
    try {
      if (!("serviceWorker" in navigator) || !(await navigator.serviceWorker.getRegistration())?.active) throw new Error("Le lecteur hors ligne n’est pas encore prêt. Rechargez cette page avec Internet puis réessayez.");
      const pack = await downloadAudioPack(chapter, player.reciterId, player.verses, player.translationEnabled, abort.signal, (done,total) => setProgress({ done,total }));
      if ("serviceWorker" in navigator) { const registration = await navigator.serviceWorker.getRegistration(); registration?.active?.postMessage({ type: "SAVE_PAGE", path: location.pathname }); }
      setMessage(`${pack.urls.length} fichiers enregistrés (${(pack.bytes/1024/1024).toFixed(1)} Mo). Laissez aussi la page de lecture finir de se charger avant de couper Internet.`);
    } catch (cause) { setMessage(abort.signal.aborted ? "Téléchargement annulé. Les fichiers déjà enregistrés restent gérables dans Mes téléchargements." : cause instanceof Error ? cause.message : "Téléchargement impossible."); }
    finally { if (controller.current === abort) { setBusy(false); controller.current = null; } }
  }
  return <details className="reader-secondary mt-4 rounded-2xl border border-accent/30 bg-surface p-4"><summary className="min-h-11 cursor-pointer py-2 font-semibold text-primary">Emporter cette lecture hors ligne</summary><p className="mt-3 text-sm leading-7 text-muted">Téléchargez l’audio du récitateur choisi, avec le français si activé. Usage personnel sur cet appareil ; la disponibilité dépend de la source et de l’espace libre.</p><div className="mt-4 flex flex-wrap gap-3"><Button disabled={busy || !player.verses.length || player.reciterId === "tvquran.hady-toure"} onClick={() => void download()}>Télécharger l’audio de cette {player.section ? "portion" : "sourate"}</Button>{busy && <Button variant="outline" onClick={() => controller.current?.abort()}>Annuler</Button>}<Link href="/hors-ligne" className="min-h-11 py-3 text-sm text-primary underline">Mes téléchargements</Link></div>{busy && <div className="mt-4"><progress aria-label="Téléchargement audio" className="w-full accent-[var(--primary)]" max={progress.total} value={progress.done} /><p role="status" className="text-sm">{progress.done} / {progress.total} fichiers</p></div>}{message && <p role="status" className="mt-3 text-sm leading-7">{message}</p>}{player.reciterId === "tvquran.hady-toure" && <p className="mt-3 text-sm text-muted">Choisissez un récitateur découpé par verset pour le téléchargement.</p>}</details>;
}
export function AudioDownloadsLibrary() {
  const [packs, setPacks] = useState<AudioPack[]>([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    let cancelled = false;
    let version = 0;
    const load = async () => {
      const request = ++version;
      try {
        if (typeof caches === "undefined") { if (!cancelled) setMessage("Le stockage audio n’est pas accessible sur cet appareil."); return; }
        const cache = await caches.open(AUDIO_CACHE);
        const saved = await Promise.all(readAudioPacks().map(async pack => {
          const found = await Promise.all(pack.urls.map(async url => { const response = await cache.match(url); return response ? { url, bytes: Number(response.headers.get("X-Mirath-Audio-Bytes")) || (await response.blob()).size } : null; }));
          const live = found.filter((file): file is { url: string; bytes: number } => file !== null);
          return { ...pack, urls: live.map(file => file.url), bytes: live.reduce((sum,file) => sum+file.bytes,0), complete: pack.complete && live.length === pack.total };
        }));
        if (!cancelled && request === version) setPacks(saved);
      } catch { if (!cancelled) setMessage("Les fichiers enregistrés ne sont pas accessibles. Vérifiez les réglages du stockage."); }
    };
    const refresh = () => { void load(); };
    queueMicrotask(refresh); window.addEventListener("mirath-audio-downloads",refresh);
    return () => { cancelled = true; window.removeEventListener("mirath-audio-downloads",refresh); };
  }, []);
  return <section className="mt-10"><h2 className="font-display text-2xl">Mes audios enregistrés</h2><p className="mt-3 text-sm text-muted">{(packs.reduce((n,p) => n+p.bytes,0)/1024/1024).toFixed(1)} Mo dans les téléchargements listés. Des fichiers partagés peuvent être comptés dans plusieurs portions. Le navigateur peut effacer ce stockage.</p>{!packs.length && <p className="mt-4 text-muted">Ouvrez une sourate ou un Juz et utilisez « Emporter cette lecture hors ligne ».</p>}<ul className="mt-5 space-y-4">{packs.map(p => <li key={p.id} className="rounded-2xl border border-border bg-surface p-5"><Link href={`/coran/${p.chapter}`} className="font-semibold text-primary underline">Sourate {p.chapter} · {reciters.find(r => r.id === p.reciter)?.nom ?? p.reciter}</Link><p className="mt-2 text-sm text-muted">Versets globaux {p.first}–{p.last} · {p.urls.length} / {p.total} fichiers · {p.complete ? "Téléchargement complet" : "Téléchargement partiel"} · {(p.bytes/1024/1024).toFixed(1)} Mo</p><Button className="mt-3" variant="outline" onClick={async () => { if (!window.confirm("Supprimer ce téléchargement audio ?")) return; try { await removeAudioPack(p.id); } catch { setMessage("Suppression impossible : vérifiez l’accès au stockage."); } }}>Supprimer les fichiers</Button></li>)}</ul>{message && <p role="alert" className="mt-3">{message}</p>}</section>;
}
