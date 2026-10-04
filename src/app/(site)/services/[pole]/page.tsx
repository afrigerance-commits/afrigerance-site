import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { Check, ShieldAlert } from "lucide-react";
import { FaqList } from "@/components/FaqList";
import { MethodTimeline } from "@/components/home/MethodTimeline";
import { PageTransition } from "@/components/motion/PageTransition";
import { PageHero } from "@/components/PageHero";
import { ButtonArrow, ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PoleIcon, PrestationIcon } from "@/components/ui/service-icons";
import { faqItems } from "@/content/faq";
import { poleDetailPage as text } from "@/content/pages";
import { isPoleId, poleIds, servicePoles } from "@/content/services";
import { routes } from "@/content/site";

export function generateStaticParams() {
  return poleIds.map((pole) => ({ pole }));
}

export async function generateMetadata({ params }: PageProps<"/services/[pole]">): Promise<Metadata> {
  const { pole: id } = await params;
  const pole = servicePoles.find((item) => item.id === id);
  if (!pole) return {};
  return {
    title: pole.title,
    description: `${pole.summary} ${pole.description}`,
    alternates: { canonical: pole.href },
  };
}

export default async function PoleDetailPage({ params }: PageProps<"/services/[pole]">) {
  const { pole: id } = await params;
  if (!isPoleId(id)) notFound();
  const pole = servicePoles.find((item) => item.id === id)!;
  const other = servicePoles.find((item) => item.id !== id)!;

  return (
    <PageTransition>
      <PageHero
        eyebrow={`Pôle ${pole.index}`}
        titleLead={pole.heroLead}
        titleAccent={pole.heroAccent}
        intro={pole.summary}
        crumbs={[{ label: text.crumbServices, href: routes.services }, { label: pole.shortTitle }]}
        aside={
          <div className="w-[22rem] rounded-[1.75rem] bg-white/[0.06] p-6 ring-1 ring-white/15 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="bg-brand flex size-11 items-center justify-center rounded-xl shadow-[0_10px_30px_-8px_rgb(0_102_255/0.9)]">
                <PoleIcon id={pole.id} className="size-5" />
              </span>
              <span className="eyebrow text-sky-soft">{text.prestationsEyebrow}</span>
            </div>
            <ul className="mt-5 space-y-2.5">
              {pole.prestations.map((prestation) => (
                <li key={prestation.id} className="flex items-center gap-3 text-[0.9375rem] text-white/90">
                  <PrestationIcon id={prestation.id} className="text-sky size-4 shrink-0" />
                  {prestation.title}
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={pole.quoteHref} size="lg" arrow magnetic>
            {text.ctaPrimary}
          </ButtonLink>
          <ButtonLink href={text.ctaSecondary.href} size="lg" variant="onDark">
            {text.ctaSecondary.label}
          </ButtonLink>
        </div>
      </PageHero>

      {/* Ce que vous recherchez */}
      <section aria-labelledby="objectives-title" className="bg-white py-24 sm:py-28 lg:py-32">
        <div className="site-container">
          <SectionHeading id="objectives-title" eyebrow={text.objectivesEyebrow} titleLead={text.objectivesTitle(pole.shortTitle)} />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {pole.objectives.map((objective, index) => (
              <li
                key={objective.title}
                data-reveal=""
                style={{ "--i": index } as CSSProperties}
                className="bg-surface flex flex-col rounded-3xl p-7"
              >
                <span className="text-brand font-mono text-sm">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-display text-ink mt-10 text-2xl">{objective.title}</h3>
                <p className="text-muted mt-3 leading-relaxed">{objective.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Prestations */}
      <section aria-labelledby="prestations-title" className="bg-surface py-24 sm:py-28 lg:py-32">
        <div className="site-container">
          <SectionHeading
            id="prestations-title"
            eyebrow={text.prestationsEyebrow}
            titleLead={text.prestationsTitleLead}
            titleAccent={text.prestationsTitleAccent}
          />
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {pole.prestations.map((prestation, index) => (
              <li
                key={prestation.id}
                data-reveal=""
                data-spotlight=""
                style={{ "--i": index % 3 } as CSSProperties}
                className="spotlight group rounded-3xl bg-white p-8 ring-1 ring-ink/[0.07] transition-[translate,box-shadow] duration-700 ease-out-expo hover:-translate-y-1 hover:shadow-[0_30px_60px_-40px_rgb(0_80_204/0.5)]"
              >
                <span className="bg-ink flex size-14 items-center justify-center rounded-2xl text-white transition-[background-color,rotate] duration-500 ease-out-expo group-hover:bg-brand group-hover:-rotate-6">
                  <PrestationIcon id={prestation.id} className="size-6" />
                </span>
                <h3 className="text-ink mt-6 text-xl font-semibold tracking-[-0.015em] sm:text-2xl">{prestation.title}</h3>
                <p className="text-muted mt-3 leading-relaxed">{prestation.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <MethodTimeline id="demarche-pole" />

      {/* Bon à savoir et informations utiles */}
      <section aria-labelledby="notes-title" className="bg-white py-24 sm:py-28 lg:py-32">
        <div className="site-container grid gap-6 lg:grid-cols-2">
          <div data-reveal="" className="bg-surface rounded-[2rem] p-8 sm:p-10">
            <h2 id="notes-title" className="text-display text-ink text-3xl">
              {text.notesTitle}
            </h2>
            <ul className="mt-7 space-y-4">
              {pole.notes.map((note) => (
                <li key={note} className="flex gap-3">
                  <Check aria-hidden="true" className="text-brand mt-1 size-5 shrink-0" strokeWidth={2.25} />
                  <span className="text-ink leading-relaxed">{note}</span>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal="" style={{ "--i": 1 } as CSSProperties} className="bg-surface rounded-[2rem] p-8 sm:p-10">
            <h2 className="text-display text-ink text-3xl">{text.infoTitle}</h2>
            <ul className="mt-7 space-y-3">
              {text.infoItems.map((item, index) => (
                <li key={item} className="flex gap-4">
                  <span className="text-brand font-mono text-sm leading-7">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-ink leading-7">{item}</span>
                </li>
              ))}
            </ul>
            <p className="bg-warning-bg text-warning mt-7 flex items-start gap-3 rounded-2xl p-4 text-sm font-medium">
              <ShieldAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
              {text.warning}
            </p>
          </div>
        </div>
      </section>

      {/* Questions fréquentes */}
      <section aria-labelledby="pole-faq-title" className="bg-white pb-24 sm:pb-28 lg:pb-32">
        <div className="site-container grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <h2 id="pole-faq-title" data-reveal="" className="text-display text-ink text-[clamp(2rem,1.4rem+2vw,3rem)]">
            {text.faqTitle}
          </h2>
          <FaqList items={faqItems([...text.faqIds])} />
        </div>
      </section>

      {/* Appel final propre au pôle et lien vers l'autre pôle */}
      <section aria-labelledby="pole-cta-title" className="bg-white pb-24 sm:pb-28 lg:pb-32">
        <div className="site-container grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div data-reveal="" className="bg-hero grain on-dark relative isolate overflow-hidden rounded-[2rem] p-8 text-white sm:p-12">
            <p className="eyebrow text-sky-soft">{text.ctaEyebrow}</p>
            <h2 id="pole-cta-title" className="text-display mt-5 text-[clamp(2rem,1.3rem+2.4vw,3.5rem)]">
              {text.ctaTitle}
            </h2>
            <p className="text-sky-soft mt-5 max-w-[32em] text-lg leading-relaxed">{text.ctaText}</p>
            <ButtonLink href={pole.quoteHref} size="lg" variant="light" arrow className="mt-8">
              {text.ctaPrimary}
            </ButtonLink>
          </div>
          <Link
            href={other.href}
            data-reveal=""
            data-spotlight=""
            style={{ "--i": 1 } as CSSProperties}
            className="spotlight group/button bg-surface flex flex-col justify-between rounded-[2rem] p-8 ring-1 ring-ink/[0.06] transition-[translate] duration-700 ease-out-expo hover:-translate-y-1 sm:p-10"
          >
            <span className="flex items-center justify-between gap-4">
              <span className="eyebrow text-brand-dark">{text.otherPoleLabel}</span>
              <span className="bg-ink flex size-12 items-center justify-center rounded-full text-white">
                <ButtonArrow />
              </span>
            </span>
            <span className="mt-12 block">
              <span className="text-display text-ink block text-3xl">{other.title}</span>
              <span className="text-muted mt-3 block leading-relaxed">{other.description}</span>
            </span>
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
