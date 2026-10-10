import type { Metadata } from "next";
import { AudioDownloadsLibrary } from "@/components/quran/audio-downloads";
import { OfflineLibrary } from "@/components/offline-library";

export const metadata: Metadata = { title: "Mes lectures hors ligne", robots: { index: false, follow: true } };
export default function OfflinePage() {
  return <div className="premium-container max-w-4xl py-16"><p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-700">MIRÂTH à emporter</p><h1 className="font-display text-4xl sm:text-5xl">Mes lectures hors ligne</h1><p className="mt-6 max-w-2xl text-muted">Les pages de lecture consultées sont enregistrées sur cet appareil lorsque vous êtes connecté. Laissez la page se charger avant de couper Internet. Les audios explicitement téléchargés depuis le lecteur sont disponibles hors ligne. Les vidéos et les fonctions de compte demandent Internet.</p><p className="mt-3 text-sm text-muted">Vous pouvez ajouter MIRÂTH à l’écran d’accueil depuis le menu de votre navigateur. L’espace disponible et les réglages du navigateur peuvent limiter ou effacer les lectures enregistrées.</p><AudioDownloadsLibrary /><OfflineLibrary /></div>;
}
