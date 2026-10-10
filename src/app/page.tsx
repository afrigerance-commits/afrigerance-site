import Link from "next/link";
import { BookOpen, Check, Library } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { MobileHome } from "@/components/mobile/home";
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
import { getChapters, getChapterVerses } from "@/lib/quran/data";

export default async function HomePage() {
  const [articles, videos] = await Promise.all([getPublishedArticles(), getPublishedVideos()]);
  const verse = getChapterVerses(1)[1];
  return <>
    <div className="app-desktop-home"><HomeHero /></div>
    <MobileHome><PrayerClock /></MobileHome>
    <div className="app-desktop-home">
    <div className="premium-container"><ReadingResume chapters={getChapters()} /></div>
    <section id="lecture-decouverte" className="premium-container scroll-mt-24 py-10 sm:py-14">
      <Reveal className="reading-discovery grid gap-8 rounded-3xl border border-accent/30 bg-surface p-6 sm:p-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-14">
        <div><p className="eyebrow flex items-center gap-2"><BookOpen className="size-4" aria-hidden="true" /> Une première lecture</p><h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">La louange,<br /><span className="text-primary">au commencement.</span></h2><p className="mt-4 text-base leading-7 text-muted">Un verset d’Al-Fâtiha, puis une leçon pour en découvrir le sens.</p></div>
        <div><p lang="ar" dir="rtl" className="quran-quote text-right text-[clamp(1.8rem,3vw,2.8rem)] text-primary">{verse.arabic}</p><p className="mt-4 text-xs font-semibold uppercase tracking-widest text-accent-text">Traduction du sens · Muhammad Hamidullah</p><p className="mt-2 text-lg leading-8">{verse.french}</p><p className="mt-3 text-sm text-muted">Coran · Al-Fâtiha, 1:2 · Texte diffusé par Tanzil</p><div className="mt-6 flex flex-wrap items-center gap-4"><Button asChild><Link href="/apprendre/lire-le-coran/louange-et-misericorde">Comprendre ces versets</Link></Button><Link href="/coran/1#verset-2" className="editorial-link py-3 text-sm font-semibold text-primary">Lire et écouter la sourate</Link></div></div>
      </Reveal>
    </section>
    <FeaturedGateways />
    <section className="premium-container pb-12"><div className="grid gap-5 md:grid-cols-2"><Link href="/routine" className="gateway-card rounded-3xl border border-accent/40 bg-accent/10 p-7"><p className="eyebrow">Un rendez-vous personnel</p><h2 className="mt-3 font-display text-3xl">Ma routine</h2><p className="mt-4 leading-7 text-muted">Homme ou femme, 10, 20 ou 40 minutes : composer un moment de lecture, d’apprentissage et de réflexion, puis suivre sa journée.</p><span className="mt-5 block font-semibold text-primary">Composer ma routine →</span></Link><Link href="/sira" className="gateway-card rounded-3xl border border-border bg-surface p-7"><p className="eyebrow">Lire l’histoire à sa source</p><h2 className="mt-3 font-display text-3xl">Sîra et récits</h2><p className="mt-4 leading-7 text-muted">Dix étapes de la vie du Prophète ﷺ, les figures coraniques et huit portraits de compagnons et compagnonnes.</p><span className="mt-5 block font-semibold text-primary">Découvrir les parcours →</span></Link></div></section>
    {(videos.length > 0 || articles.length > 0) && <section className="border-y border-border bg-surface py-12 sm:py-16"><div className="premium-container">
      <Reveal className="section-heading"><div><p className="eyebrow">La sélection MIRÂTH</p><h2 className="section-title mt-3">À lire. À écouter.</h2></div><Link href="/blog" className="editorial-link py-3 text-sm font-semibold text-primary">Tous les articles</Link></Reveal>
      <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">
        {videos[0] && <VideoCard video={videos[0]} compact />}
        <div className="grid gap-5">{articles.slice(0,2).map(a => <ArticleCard key={a.slug} article={a} />)}{!articles.length && <Link href="/invocations/dettes-difficultes-financieres" className="gateway-card rounded-3xl border border-border p-8"><p className="eyebrow">Invocations</p><h3 className="mt-4 font-display text-3xl">Dettes et difficultés financières</h3><p className="mt-4 leading-7 text-muted">6 invocations et 14 hadiths, avec leurs références et leur contexte.</p></Link>}</div>
      </div>
      {videos.length > 0 && <Link href="/videos" className="editorial-link mt-6 inline-block py-3 text-sm font-semibold text-primary">Voir toutes les vidéos</Link>}
    </div></section>}
    <section className="premium-container py-12 sm:py-16"><Reveal className="section-heading"><div><p className="eyebrow flex items-center gap-2"><Library className="size-4" aria-hidden="true" /> La bibliothèque</p><h2 className="section-title mt-3">Comprendre les ouvrages.</h2><p className="mt-4 max-w-xl leading-7 text-muted">Des notices pour identifier un auteur, une édition et un domaine d’étude. La disponibilité de chaque texte est indiquée.</p></div><Link href="/bibliotheque" className="editorial-link py-3 text-sm font-semibold text-primary">Toutes les notices</Link></Reveal><div className="mt-8 grid gap-5 sm:grid-cols-3">{[books[0], books[3], books[6]].map(book => <BookCard key={book.slug} book={book} compact />)}</div></section>
    <section className="bg-emerald-900 py-12 text-ivory-50 sm:py-16"><div className="premium-container grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16"><Reveal><p className="eyebrow text-gold-500">Notre méthode</p><h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">La confiance<br />se documente.</h2><p className="mt-5 max-w-lg text-base leading-8 text-ivory-50/85">Texte original, traduction du sens et commentaire ont chacun leur place. Vous pouvez retrouver les références et consulter la méthode éditoriale.</p></Reveal><Reveal className="flex flex-col justify-center"><ul className="space-y-4 text-base">{["Sources et éditions identifiées", "Attributions incertaines signalées", "Fiqh présenté dans le référentiel malikite"].map(label => <li key={label} className="flex gap-3"><Check className="mt-1 size-5 shrink-0 text-gold-500" aria-hidden="true" />{label}</li>)}</ul><div className="mt-7 flex flex-wrap gap-5 text-sm font-semibold text-gold-500"><Link href="/a-propos/politique-editoriale" className="editorial-link py-3">Notre politique éditoriale</Link><Link href="/a-propos" className="editorial-link py-3">À propos de MIRÂTH</Link></div></Reveal></div></section>
    </div>
  </>;
}
