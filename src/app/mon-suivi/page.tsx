import type { Metadata } from "next";
import Link from "next/link";
import { ReadingDashboard } from "@/components/quran/reading-dashboard";
import { LearningDashboard } from "@/components/learning/learning-dashboard";
export const metadata: Metadata = { title: "Mon suivi", robots: { index: false } };
export default function TrackingPage() {
  return <div className="premium-container max-w-5xl py-14"><p className="eyebrow">Avancer à mon rythme</p><h1 className="mt-4 font-display text-4xl">Mon suivi</h1><ReadingDashboard /><LearningDashboard /><nav className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-primary"><Link href="/coran">Lire le Coran</Link><Link href="/coran/recherche">Rechercher un verset</Link><Link href="/mes-notes">Mes notes</Link><Link href="/hors-ligne">Mes téléchargements</Link></nav></div>;
}
