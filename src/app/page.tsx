import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, BookOpen, Library, Check, Headphones, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { HomeHero } from "@/components/home/hero";
import { PrayerClock } from "@/components/islamic/prayer-clock";
import { ReadingResume } from "@/components/islamic/reading-resume";
import { FeaturedGateways } from "@/components/content/featured-gateways";
import { ArticleCard } from "@/components/content/article-card";
import { BookCard } from "@/components/content/book-card";
import { VideoCard } from "@/components/content/video-card";
import { getPublishedArticles } from "@/lib/data/published-articles";
import { getPublishedVideos } from "@/lib/data/published-videos";
import { books } from "@/lib/data/books";
import { learningPaths } from "@/lib/data/learning-paths";
import { getChapters } from "@/lib/quran/data";

export default async function HomePage() {
  const [articles, videos] = await Promise.all([getPublishedArticles(), getPublishedVideos()]);
  return <>
    <HomeHero />
    <PrayerClock />
    <div className="premium-container"><ReadingResume chapters={getChapters()} /></div>
    <FeaturedGateways />
    <section className="premium-section border-b border-border">
      <div className="premium-container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start"><Reveal><p className="eyebrow">Une lecture qui vous accompagne</p><h2 className="section-title mt-5">Prenez le temps.<br /><span className="text-primary">Gardez le fil.</span></h2><p className="mt-6 max-w-md leading-8 text-muted">Une sourate, une voix, un verset. L’essentiel reste devant vous, et votre dernière lecture vous attend lorsque vous revenez.</p><Button asChild className="mt-7"><Link href="/coran/1">Essayer le lecteur <ArrowUpRight /></Link></Button></Reveal></div>
        <div className="space-y-12 sm:space-y-16">
          {[{number:"01",title:"Lire avec clarté",text:"Texte arabe, traduction française et taille ajustable. Activez le code couleur du tajwîd selon votre besoin.",Icon:BookOpen},{number:"02",title:"Écouter sans perdre le verset",text:"Choisissez votre récitateur. Le verset en cours est mis en évidence et les commandes restent accessibles dans le mini lecteur.",Icon:Headphones},{number:"03",title:"Revenir là où vous étiez",text:"Posez un signet ou reprenez votre dernière position de lecture. Ces repères sont conservés sur votre appareil.",Icon:Bookmark}].map(({number,title,text,Icon})=><Reveal key={number} className="story-step grid grid-cols-[auto_1fr] gap-6 border-t border-border pt-8"><span className="font-display text-5xl text-accent/65">{number}</span><div><Icon className="mb-5 size-6 text-primary" strokeWidth={1.4} aria-hidden="true" /><h3 className="font-display text-3xl tracking-tight">{title}</h3><p className="mt-4 max-w-lg leading-8 text-muted">{text}</p></div></Reveal>)}
        </div>
      </div>
    </section>
    <section className="source-section relative overflow-hidden bg-emerald-900 text-ivory-50">
      <div className="premium-container grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2">
        <Reveal className="relative overflow-hidden rounded-[2rem]"><Image src="/images/mirath/hadith_etude.webp" alt="Illustration de livres sans titres sur une table d’étude" width={1536} height={1024} sizes="(min-width:1024px) 45vw, 90vw" className="w-full object-cover" /><span className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-emerald-900/90 px-4 py-2 text-xs">Les sources font partie de la lecture.</span></Reveal>
        <Reveal><p className="eyebrow text-gold-500">La confiance se documente</p><h2 className="section-title mt-5">Un savoir transmis.<br /><span className="text-gold-500">Des références visibles.</span></h2><p className="mt-6 max-w-lg leading-8 text-ivory-50/80">Les éditions sont identifiées. Les traductions sont distinguées du texte arabe. Quand une information doit être vérifiée, son statut est annoncé.</p><ul className="mt-7 space-y-4 text-sm text-ivory-50/90">{["Sources et éditions indiquées","Attributions discutées signalées","Fiqh : référentiel malikite"].map(s=><li key={s} className="flex gap-3"><Check className="size-4 shrink-0 text-gold-500" aria-hidden="true" />{s}</li>)}</ul><Link href="/a-propos/politique-editoriale" className="editorial-link mt-8 inline-flex items-center gap-3 text-sm text-gold-500">Lire notre politique éditoriale <ArrowUpRight className="size-4" /></Link></Reveal>
      </div>
    </section>
    <section className="premium-container premium-section">
      <Reveal className="section-heading"><div><p className="eyebrow">Votre point de départ</p><h2 className="section-title mt-4">Un premier pas suffit.</h2></div><p className="max-w-sm leading-7 text-muted">Choisissez un parcours de découverte. Chaque étape mène à une ressource accessible.</p></Reveal>
      <div className="mt-12 grid gap-0 border-t border-border md:grid-cols-3">{learningPaths.map((path,i)=><Reveal key={path.slug} delay={i*.07}><Link href={`/apprendre/${path.slug}`} className="path-card group flex h-full flex-col border-b border-border py-8 md:border-r md:px-7"><span className="text-xs text-accent-text">PARCOURS 0{i+1} · {path.etapes.length} ÉTAPES</span><h3 className="mt-5 max-w-xs font-display text-2xl leading-tight">{path.titre}</h3><p className="mt-4 flex-1 text-sm leading-7 text-muted">{path.description}</p><span className="mt-7 inline-flex items-center gap-3 text-sm font-semibold text-primary">Découvrir le parcours <ArrowRight className="size-4 transition-transform group-hover:translate-x-2" /></span></Link></Reveal>)}</div>
    </section>
    {videos.length>0&&<section className="premium-section border-y border-border bg-surface"><div className="premium-container"><Reveal className="section-heading"><div><p className="eyebrow">Écouter & approfondir</p><h2 className="section-title mt-4">La parole en partage.</h2></div><Link href="/videos" className="editorial-link inline-flex items-center gap-2 text-sm text-primary">Toutes les vidéos <ArrowUpRight className="size-4" /></Link></Reveal><div className={videos.length === 1 ? "mt-10" : "mt-10 grid gap-7 md:grid-cols-3"}>{videos.slice(0,3).map(v=><VideoCard key={v.slug} video={v} featured={videos.length === 1}/>)}</div></div></section>}
    {articles.length>0&&<section className="premium-container premium-section"><Reveal className="section-heading"><div><p className="eyebrow">À lire</p><h2 className="section-title mt-4">Les derniers articles.</h2></div><Link href="/blog" className="editorial-link inline-flex items-center gap-2 text-sm text-primary">Tous les articles <ArrowUpRight className="size-4" /></Link></Reveal><div className="mt-10 grid gap-7 md:grid-cols-3">{articles.slice(0,3).map(a=><ArticleCard key={a.slug} article={a}/>)}</div></section>}
    <section className="premium-section border-t border-border"><div className="premium-container"><Reveal className="section-heading"><div><p className="eyebrow flex items-center gap-2"><Library className="size-4" /> La bibliothèque</p><h2 className="section-title mt-4">Des ouvrages à découvrir.</h2></div><Link href="/bibliotheque" className="editorial-link inline-flex items-center gap-2 text-sm text-primary">Ouvrir la bibliothèque <ArrowUpRight className="size-4" /></Link></Reveal><div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">{books.slice(0,6).map(book=><Reveal key={book.slug}><BookCard book={book}/></Reveal>)}</div></div></section>
    <section className="premium-container pb-20"><Reveal className="invitation-panel relative overflow-hidden rounded-[2rem] bg-primary px-6 py-12 text-primary-foreground sm:px-12 sm:py-16"><p className="text-xs font-semibold uppercase tracking-[.2em] opacity-70">MIRÂTH · Accès libre</p><div className="mt-5 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end"><h2 className="max-w-xl font-display text-4xl leading-tight tracking-tight sm:text-5xl">Faites une place au savoir,<br />dans votre quotidien.</h2><Button asChild size="lg" variant="accent"><Link href="/apprendre">Choisir mon parcours <ArrowUpRight /></Link></Button></div></Reveal></section>
  </>;
}
