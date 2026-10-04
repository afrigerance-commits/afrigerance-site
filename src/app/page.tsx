import Link from "next/link";
import { ArrowRight, Search, BookOpen, Compass, Library } from "lucide-react";
import { YoutubeIcon } from "@/components/icons/youtube-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Reveal } from "@/components/motion/reveal";
import { LightDivider } from "@/components/motion/light-divider";
import { ArabicText } from "@/components/islamic/arabic-text";
import { QuranQuote } from "@/components/islamic/quran-quote";
import { DisciplineCard } from "@/components/content/discipline-card";
import { ArticleCard } from "@/components/content/article-card";
import { BookCard } from "@/components/content/book-card";
import { VideoCard } from "@/components/content/video-card";
import { disciplines } from "@/lib/site-config";
import { getPublishedArticles } from "@/lib/data/published-articles";
import { books } from "@/lib/data/books";
import { videos } from "@/lib/data/videos";
import { learningPaths } from "@/lib/data/learning-paths";

export default async function HomePage() {
  const publishedArticles = await getPublishedArticles();
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-[#ded4be] bg-[#f5f0e6] text-ink-950 dark:border-border dark:bg-ink-950 dark:text-ivory-50">
        <div className="pointer-events-none absolute -left-48 top-8 h-[480px] w-[480px] rounded-full bg-[#e7d9b8]/35 blur-3xl dark:bg-emerald-900/20" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 opacity-[.18] dark:opacity-[.08]" style={{ backgroundImage: "radial-gradient(#977b4a 0.7px, transparent 0.7px)", backgroundSize: "24px 24px" }} aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:min-h-[680px] lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:px-8 lg:py-16">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.22em] text-emerald-900 dark:text-gold-500">
                <span className="h-px w-9 bg-gold-600" aria-hidden="true" />
                MIRÂTH <span className="text-gold-700 dark:text-gold-500">✦</span> Une bibliothèque vivante
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-7 font-display text-[clamp(2.85rem,5vw,5.25rem)] font-semibold leading-[1.08] tracking-[-.045em]">
                Un héritage de savoir.
                <span className="mt-1 block text-emerald-900 dark:text-gold-500">Une lumière à transmettre.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 max-w-xl text-base leading-8 text-[#4a5857] dark:text-ivory-50/80 sm:text-lg">
                Coran, recueils de hadith, fiqh malikite et bibliothèque : avancez à votre rythme, avec des références identifiées et des parcours accessibles.
              </p>
            </Reveal>
            <Reveal delay={0.24} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" asChild className="bg-emerald-900 text-ivory-50 hover:bg-emerald-700 dark:bg-gold-500 dark:text-ink-950 dark:hover:bg-gold-600">
                <Link href="/apprendre">Commencer à apprendre <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-[#bfb298] bg-transparent text-emerald-900 hover:bg-white/70 dark:border-ivory-50/30 dark:text-ivory-50 dark:hover:bg-white/10">
                <Link href="/coran">Lire le Coran</Link>
              </Button>
            </Reveal>
            <Reveal delay={0.32} className="mt-9 max-w-xl">
              <form action="/recherche" className="flex items-center gap-2 rounded-xl border border-[#d8ccb5] bg-white/85 p-1.5 shadow-sm dark:border-white/15 dark:bg-white/10">
                <Search className="ml-3 h-4 w-4 shrink-0 text-emerald-900 dark:text-gold-500" aria-hidden="true" />
                <Input name="q" aria-label="Rechercher sur MIRÂTH" placeholder="Un thème, un livre, une sourate…" className="min-w-0 border-0 bg-transparent text-ink-950 placeholder:text-[#69716e] focus-visible:ring-0 dark:text-ivory-50 dark:placeholder:text-ivory-50/60" />
                <Button type="submit" variant="accent" size="sm">Rechercher</Button>
              </form>
            </Reveal>
            <Reveal delay={0.4} className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-[#5d6966] dark:text-ivory-50/65">
              <span>114 sourates</span><span aria-hidden="true">✦</span><span>Trois recueils de hadith</span><span aria-hidden="true">✦</span><span>Ouvrages référencés</span>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="relative mx-auto w-full max-w-[530px]">
            <div className="absolute -inset-3 rounded-t-[46%] rounded-b-[2rem] border border-gold-600/35 dark:border-gold-500/30" aria-hidden="true" />
            <div className="relative aspect-[.94] overflow-hidden rounded-t-[46%] rounded-b-[1.5rem] bg-emerald-900 shadow-[0_28px_70px_-28px_rgba(13,48,41,.52)] lg:aspect-[.84]">
              <div className="absolute inset-0 bg-[url('/images/mirath/hero_arch.svg')] bg-cover bg-center" role="img" aria-label="Arc ornemental et livre ouvert, illustration de la transmission du savoir" />
              <div className="absolute inset-x-6 bottom-5 flex items-center justify-between border-t border-[#dec38a]/35 pt-4 text-[#f5e8c9] sm:inset-x-9 sm:bottom-8">
                <span className="text-[10px] font-semibold uppercase tracking-[.24em] sm:text-xs">Savoir · Sources · Transmission</span>
                <ArabicText className="text-2xl leading-none sm:text-3xl">ميراث</ArabicText>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Accès direct aux sciences islamiques */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-3 text-center">
          <span className="mx-auto inline-flex items-center gap-2 text-sm font-medium text-accent-text">
            <Compass className="h-4 w-4" /> Explorer le savoir
          </span>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Douze sciences islamiques à découvrir</h2>
          <p className="mx-auto max-w-2xl text-muted">
            Du Coran et son exégèse jusqu’à la langue arabe, chaque discipline possède sa propre collection de
            ressources, organisée par thème et par niveau.
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {disciplines.slice(0, 8).map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.05}>
              <DisciplineCard discipline={d} />
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="link" asChild>
            <Link href="/explorer-le-savoir">
              Voir les douze disciplines <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Commencer à apprendre */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col gap-3 text-center">
            <span className="mx-auto inline-flex items-center gap-2 text-sm font-medium text-accent-text">
              <BookOpen className="h-4 w-4" /> Commencer à apprendre
            </span>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">Des parcours pour démarrer sans attendre</h2>
            <p className="mx-auto max-w-2xl text-muted">
              Aucune création de compte n’est nécessaire pour commencer. La connexion devient utile pour sauvegarder
              votre progression et vos favoris.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {learningPaths.map((path, i) => (
              <Reveal key={path.slug} delay={i * 0.05}>
                <Link href={`/apprendre/${path.slug}`} className="group block h-full rounded-xl border border-border bg-background p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-md">
                  <h3 className="font-display text-lg font-semibold">{path.titre}</h3>
                  <p className="mt-2 text-sm text-muted">{path.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {path.etapes.length} étapes <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <LightDivider className="mt-4" />

      {/* Citation coranique */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <QuranQuote
            arabe="وَقُل رَّبِّ زِدْنِي عِلْمًا"
            traduction="Et dis : « Ô mon Seigneur, accrois mes connaissances. »"
            sourate="Tâ-Hâ (20)"
            verset="114"
          />
          <p className="mt-6 text-center">
            <Link href="/coran/20" className="text-sm font-medium text-primary hover:underline">
              Lire la sourate Tâ-Hâ en entier →
            </Link>
          </p>
        </Reveal>
      </section>

      {/* Derniers articles : jamais de brouillons sur la page publique */}
      <section className={publishedArticles.length ? "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" : "hidden"}>
        <Reveal className="mb-12 flex flex-col items-center gap-3 text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Derniers articles</h2>
          <p className="max-w-2xl text-muted">Réflexions, rappels et actualités de la plateforme.</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {publishedArticles.map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.05}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="link" asChild>
            <Link href="/blog">
              Tous les articles <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Bibliothèque */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal className="mb-12 flex flex-col items-center gap-3 text-center">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-text">
              <Library className="h-4 w-4" /> Bibliothèque islamique numérique
            </span>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">Des références soigneusement organisées</h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {books.slice(0, 6).map((book, i) => (
              <Reveal key={book.slug} delay={i * 0.04}>
                <BookCard book={book} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="link" asChild>
              <Link href="/bibliotheque">
                Parcourir la bibliothèque <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Vidéos réelles uniquement */}
      <section className={videos.some((video) => video.youtubeId) ? "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" : "hidden"}>
        <Reveal className="mb-12 flex flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-text">
            <YoutubeIcon className="h-4 w-4" /> Vidéothèque
          </span>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Nos derniers enseignements en vidéo</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {videos.filter((video) => video.youtubeId).map((video, i) => (
            <Reveal key={video.slug} delay={i * 0.05}>
              <VideoCard video={video} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Fondateur */}
      <section className="relative border-t border-border bg-emerald-900 text-ivory-50">
        <LightDivider tone="inverse" className="absolute left-1/2 top-0 max-w-xs -translate-x-1/2 -translate-y-1/2" />
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 lg:px-8">
          <Reveal>
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-gold-500 text-2xl text-ink-950">F</AvatarFallback>
            </Avatar>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Le mot du fondateur</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-2xl text-ivory-50/85">
              « Un espace où la connaissance se transmet avec rigueur, où chaque enseignement est accompagné de ses
              références et où le savoir devient accessible à tous. »
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Button variant="accent" asChild>
              <Link href="/a-propos/fondateur">Découvrir le fondateur</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
