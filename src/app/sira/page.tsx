import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { EditorialEmpty } from "@/components/content/editorial-empty";
import { Reveal } from "@/components/motion/reveal";
import { LightDivider } from "@/components/motion/light-divider";
import { Timeline } from "@/components/content/timeline-event";
import { siraEvents } from "@/lib/data/sira";

export const metadata: Metadata = {
  title: "Sîra prophétique",
  description: "Dix étapes documentées de la vie du Prophète Muhammad ﷺ, avec références coraniques et hadiths authentiques.",
  alternates: { canonical: "/sira" },
};

export default function SiraPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="flex flex-col gap-4 text-center">
        <span className="mx-auto text-sm font-medium text-accent-text">Sîra prophétique</span>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">La vie du Prophète ﷺ</h1>
        <p className="mx-auto max-w-2xl text-muted">
          Dix étapes pour commencer, avec des synthèses originales et des références précises. Ce parcours est une sélection de repères, pas une biographie exhaustive. Les commentaires pédagogiques sont distingués des sources.
        </p>
      </Reveal>
      <LightDivider className="mt-8" />
      <Image
        src="/images/mirath/sira_chronologie.svg"
        alt="Dunes abstraites, étoile géométrique et chemin historique symbolique, sans personnages."
        width={1600}
        height={900}
        sizes="(min-width:768px) 768px, 90vw"
        className="mx-auto mt-8 max-h-72 w-full max-w-3xl rounded-2xl object-cover"
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2"><Link href="/prophetes" className="gateway-card rounded-2xl border border-accent/40 bg-surface p-6"><h2 className="font-display text-2xl">Histoires des prophètes</h2><p className="mt-2 text-sm text-muted">25 introductions aux figures coraniques →</p></Link><Link href="/compagnons" className="gateway-card rounded-2xl border border-accent/40 bg-surface p-6"><h2 className="font-display text-2xl">Compagnons et compagnonnes</h2><p className="mt-2 text-sm text-muted">Huit portraits documentés →</p></Link></div>
      <div className="mt-16">
        {siraEvents.some((event) => event.statut === "publie") ? (
          <Timeline events={siraEvents.filter((event) => event.statut === "publie")} />
        ) : (
          <EditorialEmpty title="Revenir aux ouvrages de référence." description="La chronologie est en cours de vérification documentaire. Découvrez dès maintenant la notice bibliographique du Nectar cacheté." href="/bibliotheque/ar-rahiq-al-makhtum" action="Consulter la notice" />
        )}
      </div>
    </div>
  );
}
