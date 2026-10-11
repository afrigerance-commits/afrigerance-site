"use client";
import { useState } from "react";
import Link from "next/link";
import type { LearningLesson } from "@/lib/types/content";
import { useDeviceStore } from "@/lib/hooks/use-device-store";

interface ReaderState { page: number; bookmarks: number[] }
const empty: ReaderState = { page: 1, bookmarks: [] };
function parse(raw: string | null): ReaderState {
  try { const value = JSON.parse(raw || "null"); return value && Number.isInteger(value.page) && value.page > 0 && Array.isArray(value.bookmarks) ? { page: value.page, bookmarks: [...new Set<number>(value.bookmarks.filter((page: number) => Number.isInteger(page) && page > 0))] } : empty; } catch { return empty; }
}
export function OriginalBookReader({ slug, chapters }: { slug: string; chapters: (LearningLesson & { pathSlug: string; pathTitle: string })[] }) {
  const store = useDeviceStore(`mirath:book:v1:${slug}`, empty, parse);
  const page = Math.min(store.value.page,chapters.length);
  const [size, setSize] = useState(18);
  const [offline, setOffline] = useState("");
  const chapter = chapters[page - 1];
  function go(next: number) { if (next < 1 || next > chapters.length) return; store.save({ ...store.value, page: next }); window.scrollTo({ top: 0, behavior: "instant" }); }
  async function download() {
    setOffline("Enregistrement du livre…");
    try {
      if (!("serviceWorker" in navigator) || !("caches" in window)) throw new Error();
      const registration = await navigator.serviceWorker.ready;
      const channel = new MessageChannel();
      await new Promise<void>((resolve, reject) => {
        const timeout = window.setTimeout(() => reject(new Error()), 30000);
        channel.port1.onmessage = event => { window.clearTimeout(timeout); channel.port1.close(); event.data?.ok ? resolve() : reject(new Error()); };
        if (!registration.active) { window.clearTimeout(timeout); reject(new Error()); return; }
        registration.active.postMessage({ type: "SAVE_BOOK", path: `/bibliotheque/${slug}/lire` }, [channel.port2]);
      });
      setOffline("Livre enregistré. Tous ses chapitres sont inclus dans cette page ; retrouvez-le dans Mes lectures hors ligne.");
    } catch { setOffline("L’enregistrement a échoué. Vérifiez la connexion et l’espace disponible, puis réessayez."); }
  }
  const marked = store.value.bookmarks.includes(page);
  return <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
    <Link href={`/bibliotheque/${slug}`} className="inline-block min-h-11 py-2 text-sm text-primary underline">← Notice du livre</Link>
    <header className="mt-4 rounded-3xl border border-accent/30 bg-surface p-5 sm:p-7"><p className="eyebrow">Livre original MIRÂTH</p><h1 className="mt-3 font-display text-3xl">Apprendre avec les sources</h1><p className="mt-3 text-sm text-muted">Lecture par chapitres · progression et signets conservés · commentaires pédagogiques distincts des sources religieuses.</p>
      <label className="mt-5 block text-sm font-semibold">Sommaire<select value={page} onChange={event => go(Number(event.target.value))} className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-3">{chapters.map((item, index) => <option key={`${item.pathSlug}-${item.slug}`} value={index+1}>{index+1}. {item.titre}</option>)}</select></label>
      <div className="mt-4 flex flex-wrap gap-2"><button className="min-h-11 rounded-xl border border-border px-3" onClick={() => setSize(value => Math.max(16, value-2))} aria-label="Réduire le texte">A−</button><button className="min-h-11 rounded-xl border border-border px-3" onClick={() => setSize(value => Math.min(28, value+2))} aria-label="Agrandir le texte">A+</button><button aria-pressed={marked} className="min-h-11 rounded-xl border border-accent/40 px-3" onClick={() => store.save({ page, bookmarks: marked ? store.value.bookmarks.filter(item => item !== page) : [...store.value.bookmarks, page] })}>{marked ? "Retirer le signet" : "Marquer ce chapitre"}</button><button className="min-h-11 rounded-xl bg-primary px-4 text-primary-foreground" onClick={() => void download()}>Enregistrer hors connexion</button></div>
      <p className="mt-4 text-sm text-muted" role="status">Chapitre {page} / {chapters.length}{store.ready && store.value.page > 1 ? " · reprise de lecture enregistrée" : ""}</p>{offline && <p role="status" className="mt-3 text-sm">{offline}</p>}{store.error && <p role="alert">{store.error}</p>}
      {store.value.bookmarks.length > 0 && <div className="mt-4 flex flex-wrap gap-2" aria-label="Signets">{store.value.bookmarks.filter(item => item <= chapters.length).map(item => <button key={item} className="min-h-11 rounded-xl border border-border px-3 text-sm" onClick={() => go(item)}>Signet {item}</button>)}</div>}
    </header>
    <article className="mt-8 leading-[1.9]" style={{ fontSize: size }}><p className="text-sm text-muted">{chapter.pathTitle}</p><h2 className="mt-2 font-display text-3xl">{chapter.titre}</h2><p className="mt-4 font-medium">{chapter.objectif}</p>{chapter.sections.map(section => <section key={section.titre} className="mt-8"><h3 className="font-display text-2xl">{section.titre}</h3>{section.paragraphes.map(paragraph => <p key={paragraph} className="mt-4">{paragraph}</p>)}</section>)}
      <section className="mt-8 rounded-2xl bg-surface p-5"><h3 className="font-display text-2xl">À retenir</h3><ul className="mt-4 list-disc space-y-2 pl-5">{chapter.retenir.map(item => <li key={item}>{item}</li>)}</ul></section>
      <section className="mt-8"><h3 className="font-display text-2xl">Mise en pratique</h3><p className="mt-4">{chapter.exercice}</p><details className="mt-4 rounded-xl border border-border p-4"><summary className="min-h-11 cursor-pointer">Voir la correction pédagogique</summary><p className="mt-3">{chapter.correction}</p></details><Link className="mt-4 inline-block min-h-11 py-2 font-semibold text-primary underline" href={`/apprendre/${chapter.pathSlug}/${chapter.slug}`}>Ouvrir la leçon et ses exercices interactifs →</Link></section>
      <section className="mt-8"><h3 className="font-display text-2xl">Sources et ressources de la leçon</h3><ul className="mt-4 space-y-3">{chapter.ressources.map(resource => <li key={resource.href}><a href={resource.href} className="text-primary underline" {...(resource.href.startsWith("https://") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{resource.label}</a></li>)}</ul></section>
    </article>
    <nav aria-label="Chapitres du livre" className="mt-10 flex justify-between gap-3 border-t border-border pt-5"><button className="min-h-12 rounded-xl border border-border px-4 disabled:opacity-40" disabled={page === 1} onClick={() => go(page-1)}>← Précédent</button><button className="min-h-12 rounded-xl bg-primary px-4 text-primary-foreground disabled:opacity-40" disabled={page === chapters.length} onClick={() => go(page+1)}>Suivant →</button></nav>
  </div>;
}
