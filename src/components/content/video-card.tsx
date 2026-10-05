"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Play, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Video } from "@/lib/types/content";

export function VideoCard({ video, featured = false }: { video: Video; featured?: boolean }) {
  const [playing,setPlaying]=useState(false);
  const valid=/^[\w-]{11}$/.test(video.youtubeId);
  return <article id={`video-${video.slug}`} className={cn("group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-editorial)]", featured && "lg:grid lg:grid-cols-[1.1fr_.9fr]")}>
    <div className={cn("relative aspect-video overflow-hidden bg-surface-muted", featured && "lg:aspect-auto lg:min-h-80")}>
      {playing&&valid?<iframe src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`} title={video.titre} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="absolute inset-0 size-full border-0"/>:valid?<button type="button" onClick={()=>setPlaying(true)} aria-label={`Regarder : ${video.titre}`} className="absolute inset-0 size-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`} alt="" width={480} height={360} loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-700 group-hover:scale-105"/>
        <span className="absolute inset-0 flex items-center justify-center bg-ink-950/25"><span className="flex size-14 items-center justify-center rounded-full border border-white/70 bg-white/15 text-white backdrop-blur-sm transition-transform group-hover:scale-110"><Play className="ml-1 size-5" fill="currentColor"/></span></span>
      </button>:<p className="p-6 text-sm text-muted">Vidéo indisponible.</p>}
    </div>
    <div className={cn("flex flex-1 flex-col gap-3 p-5 sm:p-6",featured && "lg:p-10")}><Badge variant="outline" className="w-fit text-[10px]">{video.categorie}</Badge><h3 className="font-display text-xl font-medium leading-snug">{video.titre}</h3><p className="line-clamp-3 text-sm leading-7 text-muted">{video.description}</p><a href={`https://www.youtube.com/watch?v=${video.youtubeId}`} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 pt-3 text-xs font-semibold text-primary">Ouvrir sur YouTube <ArrowUpRight className="size-3.5"/></a><p className="text-[10px] text-muted">Le lecteur YouTube se charge à votre clic.</p></div>
  </article>;
}
