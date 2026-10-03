import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
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

      <div className="mt-16">
        <Timeline events={siraEvents} />
      </div>
    </div>
  );
}
