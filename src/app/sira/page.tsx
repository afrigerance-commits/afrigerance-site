import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { LightDivider } from "@/components/motion/light-divider";
import { Timeline } from "@/components/content/timeline-event";
import { siraEvents } from "@/lib/data/sira";

export const metadata: Metadata = {
  title: "Sîra prophétique",
  description: "Une frise chronologique de la vie du Prophète Muhammad ﷺ, de l’Arabie préislamique au pèlerinage d’adieu.",
  alternates: { canonical: "/sira" },
};

export default function SiraPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="flex flex-col gap-4 text-center">
        <span className="mx-auto text-sm font-medium text-accent-text">Sîra prophétique</span>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">La vie du Prophète ﷺ</h1>
        <p className="mx-auto max-w-2xl text-muted">
          Une traversée chronologique, de l’Arabie avant l’Islam jusqu’au pèlerinage d’adieu. Les récits dont
          l’authenticité est discutée sont signalés comme tels.
        </p>
      </Reveal>
      <LightDivider className="mt-8" />
      <Image
        src="/images/mirath/sira_chronologie.svg"
        alt="Dunes abstraites, étoile géométrique et chemin historique symbolique, sans personnages."
        width={1600}
        height={900}
        className="mx-auto mt-8 max-h-72 w-full max-w-3xl rounded-2xl object-cover"
      />

      <div className="mt-16">
        {siraEvents.some((event) => event.statut === "publie") ? (
          <Timeline events={siraEvents.filter((event) => event.statut === "publie")} />
        ) : (
          <p className="rounded-xl border border-border bg-surface p-6 text-center text-sm text-muted">
            La chronologie est en cours de vérification sur les ouvrages sources. La notice du Nectar cacheté est
            disponible dans la bibliothèque.
          </p>
        )}
      </div>
    </div>
  );
}
