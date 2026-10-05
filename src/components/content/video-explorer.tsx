"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import type { Video } from "@/lib/types/content";
import { VideoCard } from "@/components/content/video-card";
import { normalizeSearch } from "@/lib/quran/reading-position";
export function VideoExplorer({ videos }: { videos: Video[] }) {
  const [query,setQuery]=useState("");
  const filtered=videos.filter(video=>normalizeSearch(`${video.titre} ${video.description} ${video.categorie}`).includes(normalizeSearch(query)));
  return <div className="mt-10"><label className="mb-8 flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-3"><Search className="size-4 text-primary" aria-hidden="true"/><span className="sr-only">Rechercher une vidéo</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Rechercher dans les enseignements…" className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none"/></label><p role="status" className="mb-5 text-xs text-muted">{filtered.length} vidéo{filtered.length>1?"s":""}</p><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(video=><VideoCard key={video.slug} video={video}/>)}</div>{!filtered.length&&<p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted">{videos.length?"Aucune vidéo ne correspond à votre recherche.":"Les enseignements vidéo seront affichés ici dès leur publication."}</p>}</div>;
}
