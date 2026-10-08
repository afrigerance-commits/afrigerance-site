import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpenCheck, HandCoins, HeartHandshake, ShieldCheck } from "lucide-react";
import { ArabicText } from "@/components/islamic/arabic-text";
import { InvocationAudio } from "@/components/islamic/sourced-audio";
import { InvocationActions } from "@/components/islamic/invocation-actions";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { debtHadiths, debtInvocations, invocationCollection } from "@/lib/data/invocations";

export const metadata: Metadata = {
  title: `${invocationCollection.title} — Invocations`,
  description: invocationCollection.description,
  alternates: { canonical: "/invocations/dettes-difficultes-financieres" },
};

function ReferenceMeta({
  reference,
  authenticity,
  sourceUrl,
}: {
  reference: string;
  authenticity: string;
  sourceUrl: string;
}) {
  return (
    <div className="flex flex-col gap-2 border-t border-border pt-4 text-sm">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline">{reference}</Badge>
        <Badge variant="success">{authenticity}</Badge>
      </div>
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="w-fit text-xs font-semibold text-primary underline-offset-4 hover:underline"
      >
        Vérifier la référence source
      </a>
    </div>
  );
}

export default function DebtInvocationsPage() {
  return (
    <div className="pb-20">
      <section className="relative overflow-hidden border-b border-border bg-emerald-900 text-ivory-50">
        <div className="geo-pattern absolute inset-0 opacity-[0.12]" aria-hidden="true" />
        <div className="premium-container relative grid items-center gap-10 py-14 lg:grid-cols-[1.08fr_.92fr] lg:py-20">
          <div>
            <Link
              href="/invocations"
              className="mb-7 inline-flex items-center gap-2 text-sm text-ivory-50/75 transition-colors hover:text-gold-500"
            >
              <ArrowLeft className="size-4" /> Invocations
            </Link>
            <p className="eyebrow !text-gold-500">Invocations & adhkâr</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Dettes et difficultés financières
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-ivory-50/78 sm:text-lg">
              Une sélection vérifiée d’invocations et de paroles prophétiques sur la dette, la subsistance,
              l’effort licite, l’indulgence et le contentement.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 text-xs">
              <span className="rounded-full border border-gold-500/40 bg-white/5 px-4 py-2">6 invocations</span>
              <span className="rounded-full border border-gold-500/40 bg-white/5 px-4 py-2">14 hadiths</span>
              <span className="rounded-full border border-gold-500/40 bg-white/5 px-4 py-2">Références vérifiées</span>
            </div>
          </div>
          <Reveal className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-4 rounded-[2.25rem] border border-gold-500/30" aria-hidden="true" />
            <div className="overflow-hidden rounded-[2rem] border border-gold-500/40 bg-ink-950 shadow-2xl">
              <Image
                src="/images/mirath/spiritualite_lumiere.svg"
                alt="Illustration éditoriale MIRÂTH évoquant l’invocation, la lumière et le recueillement."
                width={1200}
                height={900}
                className="aspect-[4/3] w-full object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      <main className="premium-container pt-14 sm:pt-18">
        <div className="mb-14 grid gap-4 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Rigueur documentaire", text: "Chaque fiche distingue le texte transmis, la traduction et le commentaire." },
            { icon: HandCoins, title: "Dette & responsabilité", text: "Les textes réunis encouragent le remboursement, l’indulgence et les moyens licites." },
            { icon: HeartHandshake, title: "Sans promesse inventée", text: "Aucune promesse d’enrichissement en sept jours ni répétition non établie n’est attribuée à la Sunna." },
          ].map(({ icon: Icon, title, text }) => (
            <Card key={title} className="border-gold-500/30">
              <CardHeader className="pb-3">
                <Icon className="mb-2 size-5 text-accent-text" />
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted">{text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <section id="invocations" className="scroll-mt-28">
          <PageHeader
            level={2}
            eyebrow="01"
            title="Invocations à réciter"
            description="Le texte arabe est affiché en RTL. Le contexte et le nombre de répétitions ne sont indiqués que lorsqu’ils apparaissent dans la narration retenue."
            divider
          />

          <div className="grid gap-6">
            {debtInvocations.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.035}>
                <article className="overflow-hidden rounded-[1.6rem] border border-gold-500/35 bg-surface shadow-[var(--shadow-editorial)]">
                  <div className="h-1 bg-gradient-to-r from-emerald-900 via-gold-500 to-emerald-900" aria-hidden="true" />
                  <div className="grid gap-0 lg:grid-cols-[.86fr_1.14fr]">
                    <div className="flex flex-col justify-between border-b border-border bg-surface-muted/55 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                      <div>
                        <p className="eyebrow">Invocation {String(index + 1).padStart(2, "0")}</p>
                        <h2 className="mt-3 font-display text-2xl leading-tight">{item.title}</h2>
                        <p className="mt-4 text-sm leading-7 text-muted">{item.context}</p>
                        {item.repetition && (
                          <div className="mt-5 rounded-xl border border-gold-500/30 bg-background p-4">
                            <p className="text-xs font-semibold uppercase tracking-wider text-accent-text">Répétition établie</p>
                            <p className="mt-1 text-sm">{item.repetition}</p>
                          </div>
                        )}
                      </div>
                      <InvocationAudio id={item.id} />
                      <div className="mt-6">
                        <InvocationActions
                          title={item.title}
                          arabic={item.arabic}
                          translation={item.translation}
                          reference={item.reference}
                        />
                      </div>
                    </div>

                    <div className="p-6 sm:p-8">
                      <ArabicText
                        as="p"
                        className="text-pretty text-right text-[1.75rem] leading-[2.15] text-foreground sm:text-[2rem]"
                      >
                        {item.arabic}
                      </ArabicText>
                      <div className="mt-7 border-l-2 border-gold-500 pl-5">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent-text">Sens en français</p>
                        <p className="leading-7">{item.translation}</p>
                      </div>
                      {item.note && (
                        <div className="mt-5 rounded-xl bg-surface-muted p-4 text-sm leading-6 text-muted">
                          <span className="font-semibold text-foreground">Note éditoriale : </span>
                          {item.note}
                        </div>
                      )}
                      <div className="mt-6">
                        <ReferenceMeta
                          reference={item.reference}
                          authenticity={item.authenticity}
                          sourceUrl={item.sourceUrl}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="hadiths" className="mt-24 scroll-mt-28">
          <PageHeader
            level={2}
            eyebrow="02"
            title="Hadiths sur les dettes et la subsistance"
            description="Cette collection est une sélection thématique. Les explications ci-dessous sont éditoriales et sont volontairement séparées des paroles prophétiques."
            divider
          />

          <div className="grid gap-5 lg:grid-cols-2">
            {debtHadiths.map((item, index) => (
              <Reveal key={item.id} delay={(index % 4) * 0.035}>
                <article id={item.id} className="scroll-mt-28 flex h-full flex-col rounded-[1.5rem] border border-gold-500/30 bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/60 hover:shadow-lg sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow">Hadith {String(index + 1).padStart(2, "0")}</p>
                      <h2 className="mt-2 font-display text-xl leading-tight">{item.title}</h2>
                    </div>
                    <BookOpenCheck className="mt-1 size-5 shrink-0 text-accent-text" />
                  </div>

                  <ArabicText as="p" className="mt-6 text-right text-2xl leading-[2] text-foreground">
                    {item.arabic}
                  </ArabicText>

                  <div className="mt-5 rounded-xl border border-border bg-surface-muted/60 p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent-text">Traduction du sens</p>
                    <p className="text-sm leading-7">{item.translation}</p>
                  </div>

                  <div className="mt-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Explication éditoriale</p>
                    <p className="text-sm leading-7 text-muted">{item.explanation}</p>
                  </div>

                  {item.note && (
                    <p className="mt-4 rounded-xl border border-border p-4 text-sm leading-6 text-muted">
                      <span className="font-semibold text-foreground">Précision : </span>{item.note}
                    </p>
                  )}

                  <div className="mt-auto pt-6">
                    <ReferenceMeta reference={item.reference} authenticity={item.authenticity} sourceUrl={item.sourceUrl} />
                    <div className="mt-4">
                      <InvocationActions
                        title={item.title}
                        arabic={item.arabic}
                        translation={item.translation}
                        reference={item.reference}
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mt-20 overflow-hidden rounded-[1.75rem] border border-gold-500/35 bg-emerald-900 p-7 text-ivory-50 shadow-xl sm:p-10">
          <p className="eyebrow !text-gold-500">Précision importante</p>
          <h2 className="mt-3 font-display text-3xl">Ce que cette page ne prétend pas</h2>
          <p className="mt-4 max-w-4xl leading-8 text-ivory-50/78">
            Cette sélection ne signifie pas que toute difficulté financière disparaît après la récitation d’une formule.
            MIRÂTH ne présente aucune promesse d’enrichissement en sept jours et n’attribue pas à la Sunna quatre ou sept
            répétitions après Jumu‘a sans preuve authentique. L’invocation apparentée au récit d’Abû Umâma dans Abû Dâwûd
            1555 n’est pas utilisée ici comme preuve authentique ; la formule correspondante retenue dans cette collection
            est celle authentiquement rapportée dans Sahîh al-Bukhârî 6369.
          </p>
        </section>
      </main>
    </div>
  );
}
