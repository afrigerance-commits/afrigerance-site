import Link from "next/link";
import { ArrowRight, Search, BookOpen, Compass, Library } from "lucide-react";
import { YoutubeIcon } from "@/components/icons/youtube-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Reveal } from "@/components/motion/reveal";
import { LightDivider } from "@/components/motion/light-divider";
import { HeroGeometry } from "@/components/islamic/hero-geometry";
import { QuranQuote } from "@/components/islamic/quran-quote";
import { DisciplineCard } from "@/components/content/discipline-card";
import { ArticleCard } from "@/components/content/article-card";
import { BookCard } from "@/components/content/book-card";
import { VideoCard } from "@/components/content/video-card";
import { disciplines, siteConfig } from "@/lib/site-config";
import { articles } from "@/lib/data/articles";
import { books } from "@/lib/data/books";
import { videos } from "@/lib/data/videos";
import { learningPaths } from "@/lib/data/learning-paths";

export default function HomePage() {
  const publishedArticles = articles.filter((article) => article.statut === "publie");
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-ink-950 text-ivory-50">
        <div className="pointer-events-none absolute inset-0 bg-[url('/images/mirath/mirath_hero.svg')] bg-cover bg-center opacity-40" aria-hidden="true" />
        <HeroGeometry />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-28 text-center sm:px-6 sm:py-36 lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-4 py-1.5 text-xs font-medium tracking-wide text-gold-500">
              Fiqh malikite · Coran et Sunna · Sîra prophétique
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Un espace où la connaissance se transmet avec rigueur
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-2xl text-balance text-base text-ivory-50/80 sm:text-lg">
              {siteConfig.description} Chaque enseignement est accompagné de ses références, et le savoir devient
              accessible à tous.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
            <form action="/recherche" className="flex w-full items-center gap-2 rounded-xl bg-white/10 p-1.5 backdrop-blur">
              <Search className="ml-2 h-4 w-4 shrink-0 text-ivory-50/60" />
              <Input
                name="q"
                placeholder="Rechercher un cours, un livre, un article…"
                className="border-0 bg-transparent text-ivory-50 placeholder:text-ivory-50/50 focus-visible:ring-0"
              />
              <Button type="submit" variant="accent" size="sm">
                Rechercher
              </Button>
            </form>
          </Reveal>
          <Reveal delay={0.4} className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="accent" size="lg" asChild>
              <Link href="/apprendre">
                Commencer à apprendre <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-ivory-50/30 text-ivory-50 hover:bg-white/10"
            >
              <Link href="/explorer-le-savoir">Explorer le savoir</Link>
            </Button>
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

      {/* Dernières vidéos */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="mb-12 flex flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-text">
            <YoutubeIcon className="h-4 w-4" /> Vidéothèque
          </span>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Nos derniers enseignements en vidéo</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {videos.map((video, i) => (
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
