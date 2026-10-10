import type { Metadata } from "next";
import { PersonalLibrary } from "@/components/quran/personal-library";
export const metadata: Metadata = { title: "Ma bibliothèque personnelle", robots: { index: false } };
export default function PersonalLibraryPage() { return <div className="premium-container max-w-4xl py-8 sm:py-14"><p className="eyebrow">Votre espace personnel</p><h1 className="mt-3 font-display text-4xl text-primary">Ma bibliothèque</h1><p className="mt-4 max-w-xl text-sm leading-7 text-muted">Retrouvez vos lectures, favoris, signets, notes et audios. Ces données restent sur cet appareil ; elles ne sont pas synchronisées avec votre compte.</p><PersonalLibrary/></div>; }
