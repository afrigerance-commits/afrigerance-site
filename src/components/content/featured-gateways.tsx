import Image from "next/image";
import Link from "next/link";
import { BookOpen, ScrollText, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export function FeaturedGateways() {
  return <section id="explorer" className="premium-container py-12 sm:py-16 scroll-mt-24">
    <Reveal className="section-heading"><div><p className="eyebrow">Trois portes d’entrée</p><h2 className="section-title mt-3">À chacun son chemin.</h2></div></Reveal>
    <div className="mt-8 grid gap-5 md:grid-cols-3">
      <Reveal><Link href="/coran" className="gateway-card group relative isolate flex h-full min-h-72 flex-col overflow-hidden rounded-3xl border border-gold-500/30 bg-emerald-950 p-7 text-ivory-50">
        <Image src="/images/cards/open-quran.webp" alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="-z-20 object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.04]" /><div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-emerald-950 via-emerald-950/85 to-emerald-950/45" /><BookOpen className="size-7 text-gold-500" strokeWidth={1.3} aria-hidden="true" />
        <span aria-hidden="true" lang="ar" dir="rtl" className="my-6 font-arabic text-5xl text-gold-500">القرآن</span>
        <h3 className="font-display text-3xl">Le Coran</h3><p className="mt-3 text-base leading-7 text-ivory-50/90">114 sourates, le texte arabe, une traduction et l’écoute par verset.</p><span className="mt-auto pt-6 text-sm font-semibold text-gold-500">Choisir une sourate</span>
      </Link></Reveal>
      <Reveal><Link href="/hadith" className="gateway-card group relative isolate flex h-full min-h-72 flex-col overflow-hidden rounded-3xl bg-emerald-950 p-7 text-ivory-50">
        <Image src="/images/mirath/hadith_etude.webp" alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="-z-20 object-cover opacity-30 transition-transform duration-500 group-hover:scale-[1.03]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-emerald-950 to-emerald-950/30" />
        <ScrollText className="size-7 text-gold-500" strokeWidth={1.3} aria-hidden="true" /><h3 className="mt-6 font-display text-3xl">Les hadiths</h3><p className="mt-3 text-base leading-7 text-ivory-50/90">Al-Muwatta’, Al-Bukhârî et Muslim. Retrouver les paroles et leurs références.</p><span className="mt-auto pt-6 text-sm font-semibold text-gold-500">Explorer les recueils</span>
      </Link></Reveal>
      <Reveal><Link href="/apprendre" className="gateway-card group relative isolate flex h-full min-h-72 flex-col overflow-hidden rounded-3xl border border-accent/40 bg-emerald-950 p-7 text-ivory-50">
        <Image src="/images/cards/old-books.webp" alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="-z-20 object-cover object-center transition-transform duration-700 motion-safe:group-hover:scale-[1.04]" /><div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-emerald-950 via-emerald-950/85 to-emerald-950/45" /><GraduationCap className="size-7 text-gold-500" strokeWidth={1.3} aria-hidden="true" /><p className="mt-6 text-sm font-medium text-gold-500">3 parcours · 9 leçons</p><h3 className="mt-3 font-display text-3xl">Apprendre</h3><p className="mt-3 text-base leading-7 text-ivory-50/90">Al-Fâtiha, l’éthique des dettes et la lecture des sources. Des exercices pour comprendre.</p><span className="mt-auto pt-6 text-sm font-semibold text-gold-500">Trouver mon parcours</span>
      </Link></Reveal>
    </div>
    <details className="mt-5 text-xs text-muted"><summary className="cursor-pointer py-2">Crédits photographiques</summary><p className="mt-2 leading-6">Coran : <a className="underline" href="https://unsplash.com/photos/a-book-open-on-a-table-gwSlgxbZGQY" target="_blank" rel="noopener noreferrer">andy dmoya / Unsplash</a>, licence Unsplash. Livres : <a className="underline" href="https://commons.wikimedia.org/wiki/File:Old_bookshelf_(Unsplash).jpg" target="_blank" rel="noopener noreferrer">Simson Petrol / Wikimedia Commons</a>, CC0. Photographies décoratives ; elles ne sont pas des sources religieuses.</p></details>
  </section>;
}
