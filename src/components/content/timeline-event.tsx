import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import type { SiraEvent } from "@/lib/types/content";

export function Timeline({ events }: { events: SiraEvent[] }) {
  return (
    <ol className="relative flex flex-col gap-10 border-l border-border pl-8 sm:pl-10">
      {events.map((event, index) => (
        <Reveal as="li" key={event.slug} delay={index * 0.05} className="relative">
          <span
            className="absolute -left-[2.55rem] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent bg-background sm:-left-[3.05rem]"
            aria-hidden="true"
          />
          <Link href={`/sira/${event.slug}`} className="group flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-accent-text">{event.periode}</span>
            <h3 className="font-display text-xl font-semibold transition-colors group-hover:text-primary">
              {event.titre}
            </h3>
            <p className="text-sm text-muted">{event.dateApproximative}</p>
            <p className="max-w-2xl text-sm text-muted">{event.presentation}</p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Découvrir <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </Reveal>
      ))}
    </ol>
  );
}
