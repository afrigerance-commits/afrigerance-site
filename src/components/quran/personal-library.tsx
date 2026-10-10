"use client";
import { useState } from "react";
import { QuranBookmarksLibrary } from "./bookmarks-library";
import { NotesLibrary } from "./notes-library";
import { AudioDownloadsLibrary } from "./audio-downloads";
import { OfflineLibrary } from "@/components/offline-library";
import { ReadingResume } from "@/components/islamic/reading-resume";
import type { QuranChapterMeta } from "@/lib/quran/data";
import chapters from "../../../data/quran/chapters-meta.json";
import { QuranFavorites } from "./quran-favorites";
const tabs = ["Récents", "Signets", "Favoris", "Notes", "Téléchargements"] as const;
export function PersonalLibrary() {
  const [tab,setTab] = useState<typeof tabs[number]>("Récents");
  return <section className="mt-7"><div className="flex flex-wrap gap-2" aria-label="Contenu de ma bibliothèque" role="group">{tabs.map(item=><button key={item} type="button" aria-pressed={tab===item} onClick={()=>setTab(item)} className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold ${tab===item ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface"}`}>{item}</button>)}</div>
    <div className="mt-5" aria-live="polite">{tab==="Récents" && <><p className="text-sm leading-7 text-muted">Votre dernière position coranique et les pages enregistrées. Ouvrez une sourate pour retrouver votre lecture ici.</p><ReadingResume chapters={chapters as QuranChapterMeta[]}/><OfflineLibrary/></>}{tab==="Signets" && <QuranBookmarksLibrary/>}{tab==="Favoris" && <QuranFavorites/>}{tab==="Notes" && <NotesLibrary/>}{tab==="Téléchargements" && <AudioDownloadsLibrary/>}</div>
  </section>;
}
