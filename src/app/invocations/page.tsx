import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HandCoins } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { invocationCollection } from "@/lib/data/invocations";

export const metadata: Metadata = {
  title: "Invocations",
  description: "Invocations et adhkâr documentés, organisés par thème et accompagnés de leurs références.",
  alternates: { canonical: "/invocations" },
};

export default function InvocationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Ad‘iya & adhkâr"
        title="Invocations"
        description="Des invocations documentées, présentées avec leur contexte, leur référence et leur statut d’authenticité."
        divider
      />
      <Reveal>
        <Link
          href={`/invocations/${invocationCollection.slug}`}
          className="group grid overflow-hidden rounded-[1.75rem] border border-gold-500/35 bg-surface shadow-[var(--shadow-editorial)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/70 lg:grid-cols-[.72fr_1.28fr]"
        >
          <div className="relative min-h-64 overflow-hidden bg-emerald-900">
            <Image
              src="/images/mirath/spiritualite_lumiere.svg"
              alt="Illustration éditoriale MIRÂTH pour la collection d’invocations."
              fill
              sizes="(min-width:1024px) 36vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <div className="mb-5 flex size-11 items-center justify-center rounded-full border border-gold-500/40 bg-surface-muted">
              <HandCoins className="size-5 text-accent-text" />
            </div>
            <p className="eyebrow">Collection thématique</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">{invocationCollection.title}</h2>
            <p className="mt-4 max-w-2xl leading-7 text-muted">{invocationCollection.description}</p>
            <div className="mt-7 flex items-center justify-between gap-4 border-t border-border pt-5">
              <span className="text-sm text-muted">{invocationCollection.itemCount} fiches documentées</span>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Explorer <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>
      </Reveal>
    </div>
  );
}
