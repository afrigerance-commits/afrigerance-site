"use client";
import { useEffect, useState } from "react";

export function OfflineLibrary() {
  const [pages, setPages] = useState<{ path: string; title: string }[]>([]);
  const [status, setStatus] = useState("Chargement des lectures enregistrées…");
  const refresh = async () => {
    if (!("caches" in window)) { setStatus("L’enregistrement hors ligne n’est pas disponible dans ce navigateur."); return; }
    try {
      const cache = await caches.open("mirath-offline-v1-pages");
      const keys = await cache.keys();
      const list = await Promise.all(keys.map(async (key) => {
        const html = await (await cache.match(key))?.text();
        const title = new DOMParser().parseFromString(html ?? "", "text/html").title;
        return { path: new URL(key.url).pathname, title: title || new URL(key.url).pathname };
      }));
      setPages(list.filter((page) => page.path !== "/hors-ligne"));
      setStatus(list.length ? "Disponible sur cet appareil" : "Aucune lecture enregistrée pour le moment. Ouvrez une sourate, une invocation ou une leçon avec Internet, puis revenez ici.");
    } catch { setStatus("Le navigateur ne permet pas d’accéder aux lectures enregistrées."); }
  };
  useEffect(() => { void refresh(); }, []);
  return <section className="mt-10"><div className="mb-6 flex flex-wrap items-center justify-between gap-4"><p role="status" className="text-sm text-muted">{status}</p><button onClick={() => void refresh()} className="rounded-full border border-border px-4 py-2 text-sm font-medium">Actualiser la liste</button></div><ul className="grid gap-3 sm:grid-cols-2">{pages.map((page) => <li key={page.path}><a href={page.path} className="block rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-gold-500">{page.title.replace(/ — MIRÂTH$/, "")}</a></li>)}</ul></section>;
}
