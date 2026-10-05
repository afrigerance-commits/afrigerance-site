import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  return <section className="mirath-hero relative isolate overflow-hidden">
    <div aria-hidden="true" className="hero-orbit hero-orbit-one" /><div aria-hidden="true" className="hero-orbit hero-orbit-two" />
    <div className="premium-container relative grid items-center gap-12 py-14 sm:py-20 lg:min-h-[760px] lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
      <div className="relative z-10">
        <p className="eyebrow hero-enter">MIRÂTH · Le savoir en partage</p>
        <h1 className="hero-enter mt-7 max-w-2xl font-display text-[clamp(3rem,6.2vw,6rem)] font-medium leading-[1.02] tracking-[-.055em]" style={{ animationDelay: "80ms" }}>Un héritage à lire.<br /><span className="text-primary">Une lumière<br className="hidden lg:block" /> à transmettre.</span></h1>
        <p className="hero-enter mt-7 max-w-lg text-base leading-8 text-muted sm:text-lg" style={{ animationDelay: "160ms" }}>Lire le Coran, écouter ses versets, explorer les hadiths. Un espace francophone pour apprendre, avec les sources à portée de main.</p>
        <div className="hero-enter mt-8 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}><Button asChild size="lg"><Link href="/coran">Ouvrir le Coran <ArrowUpRight /></Link></Button><Button asChild size="lg" variant="outline"><Link href="/hadith">Explorer les hadiths</Link></Button></div>
        <form action="/recherche" className="hero-enter mt-8 flex max-w-lg items-center gap-2 rounded-full border border-border bg-surface/80 p-2" style={{ animationDelay: "320ms" }}>
          <Search aria-hidden="true" className="ml-3 size-4 shrink-0 text-primary" /><input name="q" aria-label="Rechercher sur MIRÂTH" placeholder="Une sourate, un thème, un ouvrage…" className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted" /><button type="submit" aria-label="Lancer la recherche" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:rotate-12"><ArrowUpRight className="size-4" /></button>
        </form>
        <div className="mt-8 flex items-center gap-5 text-xs text-muted"><span>114 sourates</span><span className="h-4 w-px bg-border" /><span>Arabe & français</span><span className="h-4 w-px bg-border" /><span>Accès libre</span></div>
      </div>
      <div className="hero-scene relative mx-auto w-full max-w-[530px]">
        <span aria-hidden="true" className="hero-arch-outline" />
        <div className="hero-arch relative overflow-hidden bg-emerald-900">
          <Image src="/images/mirath/coran_etude.webp" alt="Illustration d’un livre ouvert aux pages vierges dans une bibliothèque baignée de lumière" fill sizes="(min-width: 1024px) 44vw, 90vw" priority className="hero-photo object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#082c26] via-transparent to-[#123f38]/15" />
          <div className="absolute inset-x-7 bottom-8 text-ivory-50"><p lang="ar" dir="rtl" className="font-arabic text-5xl text-gold-500">ميراث</p><p className="mt-3 border-t border-white/25 pt-4 text-[10px] font-medium uppercase tracking-[.24em]">Lire · Comprendre · Transmettre</p></div>
        </div>
        <Link href="/coran/1" className="hero-reading-note absolute -left-3 bottom-20 flex max-w-[230px] items-center gap-3 rounded-2xl border border-white/60 bg-surface p-4 shadow-xl sm:-left-8"><span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-accent/40 font-display text-primary">01</span><span><span className="block text-[10px] uppercase tracking-widest text-muted">Votre première lecture</span><span className="mt-1 block text-sm font-semibold">Sourate Al-Fâtiha</span></span><ArrowUpRight className="size-4 shrink-0 text-primary" /></Link>
        <span className="absolute -right-2 top-12 rounded-full border border-accent/40 bg-background/95 px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-accent-text sm:-right-6">Une bibliothèque vivante</span>
      </div>
    </div>
    <a href="#explorer" className="premium-container flex w-fit items-center gap-3 pb-7 text-xs text-muted"><span className="scroll-cue flex size-8 items-center justify-center rounded-full border border-border"><ArrowDown className="size-3.5" /></span> Découvrir MIRÂTH</a>
  </section>;
}
