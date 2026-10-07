import Image from "next/image";
import Link from "next/link";
import { BookOpen, ScrollText, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export function FeaturedGateways() {
  return <section id="explorer" className="premium-container py-12 sm:py-16 scroll-mt-24">
    <Reveal className="section-heading"><div><p className="eyebrow">Trois portes d’entrée</p><h2 className="section-title mt-3">À chacun son chemin.</h2></div></Reveal>
    <div className="mt-8 grid gap-5 md:grid-cols-3">
      <Reveal><Link href="/coran" className="gateway-card group flex h-full min-h-72 flex-col rounded-3xl border border-border bg-surface p-7">
        <BookOpen className="size-7 text-primary" strokeWidth={1.3} aria-hidden="true" />
        <span aria-hidden="true" lang="ar" dir="rtl" className="my-6 font-arabic text-5xl text-primary">القرآن</span>
        <h3 className="font-display text-3xl">Le Coran</h3><p className="mt-3 text-base leading-7 text-muted">114 sourates, le texte arabe, une traduction et l’écoute par verset.</p><span className="mt-auto pt-6 text-sm font-semibold text-primary">Choisir une sourate</span>
      </Link></Reveal>
      <Reveal><Link href="/hadith" className="gateway-card group relative isolate flex h-full min-h-72 flex-col overflow-hidden rounded-3xl bg-emerald-950 p-7 text-ivory-50">
        <Image src="/images/mirath/hadith_etude.webp" alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="-z-20 object-cover opacity-30 transition-transform duration-500 group-hover:scale-[1.03]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-emerald-950 to-emerald-950/30" />
        <ScrollText className="size-7 text-gold-500" strokeWidth={1.3} aria-hidden="true" /><h3 className="mt-6 font-display text-3xl">Les hadiths</h3><p className="mt-3 text-base leading-7 text-ivory-50/90">Al-Muwatta’, Al-Bukhârî et Muslim. Retrouver les paroles et leurs références.</p><span className="mt-auto pt-6 text-sm font-semibold text-gold-500">Explorer les recueils</span>
      </Link></Reveal>
      <Reveal><Link href="/apprendre" className="gateway-card group flex h-full min-h-72 flex-col rounded-3xl border border-accent/40 bg-accent/10 p-7">
        <GraduationCap className="size-7 text-accent-text" strokeWidth={1.3} aria-hidden="true" /><p className="mt-6 text-sm font-medium text-accent-text">3 parcours · 9 leçons</p><h3 className="mt-3 font-display text-3xl">Apprendre</h3><p className="mt-3 text-base leading-7 text-muted">Al-Fâtiha, l’éthique des dettes et la lecture des sources. Des exercices pour comprendre.</p><span className="mt-auto pt-6 text-sm font-semibold text-primary">Trouver mon parcours</span>
      </Link></Reveal>
    </div>
  </section>;
}
