"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Search, UserRound } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
const names: Record<string,string> = { coran: "Le Coran", hadith: "Hadiths", videos: "Vidéos", invocations: "Invocations", "ma-bibliotheque": "Ma bibliothèque", "mon-suivi": "Mon suivi", routine: "Ma routine", apprendre: "Apprendre", "hors-ligne": "Téléchargements", "mes-notes": "Mes notes", compte: "Mon compte", connexion: "Connexion", inscription: "Créer un compte" };
export function AppHeader() {
  const path = usePathname(); const router = useRouter();
  if (path.startsWith("/admin")) return null;
  return <header className="app-mobile-header"><div className="flex min-h-16 items-center gap-3 px-4">
    {path !== "/" ? <button type="button" aria-label="Retour" onClick={() => { if (window.history.length > 1) router.back(); else router.push("/"); }} className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"><ArrowLeft className="size-5" /></button> : <Link href="/" className="font-display text-xl font-semibold tracking-wide text-primary">MIRÂTH</Link>}
    {path !== "/" && <span className="min-w-0 flex-1 truncate font-semibold text-primary">{names[path.split("/")[1]] ?? "Explorer MIRÂTH"}</span>}
    <div className="ml-auto flex items-center gap-1"><Link href="/recherche" aria-label="Rechercher" className="flex size-11 items-center justify-center rounded-full"><Search className="size-5" /></Link><ThemeToggle /><Link href="/compte" aria-label="Mon compte" className="flex size-11 items-center justify-center rounded-full"><UserRound className="size-5" /></Link></div>
  </div></header>;
}
