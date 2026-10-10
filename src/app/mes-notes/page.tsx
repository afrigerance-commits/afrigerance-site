import type { Metadata } from "next";
import { QuranBookmarksLibrary } from "@/components/quran/bookmarks-library";
import { NotesLibrary } from "@/components/quran/notes-library";
export const metadata: Metadata = { title: "Mes notes personnelles", robots: { index: false } };
export default function NotesPage() { return <div className="premium-container max-w-4xl py-14"><p className="eyebrow">Mon carnet de lecture</p><h1 className="mt-4 font-display text-4xl">Mes notes personnelles</h1><p className="mt-4 text-muted">Vos notes sont distinctes des textes religieux et conservées uniquement sur cet appareil.</p><QuranBookmarksLibrary /><NotesLibrary /></div>; }
