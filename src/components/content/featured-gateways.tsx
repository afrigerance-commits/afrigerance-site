import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, ScrollText, CirclePlay } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const gateways = [
  { href: "/coran", title: "Le Coran", detail: "Lire, écouter et suivre les versets", image: "/images/mirath/coran_etude.webp", alt: "Illustration d’un livre ouvert aux pages vierges dans une bibliothèque", Icon: BookOpen },
  { href: "/hadith", title: "Les hadiths", detail: "Explorer les recueils et leurs sources", image: "/images/mirath/hadith_etude.webp", alt: "Illustration de livres sans titres sur une table d’étude", Icon: ScrollText },
  { href: "/videos", title: "Les vidéos", detail: "Retrouver les enseignements en image", image: "/images/mirath/video_studio.webp", alt: "Illustration d’un studio de vidéo éducative", Icon: CirclePlay },
] as const;

export function FeaturedGateways() {
  return (
    <section id="explorer" className="premium-section relative scroll-mt-20 overflow-hidden border-b border-border bg-surface">
      <div className="pointer-events-none absolute inset-0 geo-pattern" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 max-w-2xl">
          <span className="eyebrow">À chacun son chemin</span>
          <h2 className="section-title mt-4">Le savoir, à votre rythme.</h2>
          <p className="mt-4 leading-7 text-muted">Un texte à lire, une voix à écouter, un enseignement à découvrir.</p>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3 md:items-start">
          {gateways.map(({ href, title, detail, image, alt, Icon }, i) => (
            <Reveal key={href} delay={i * 0.1} className={i===1 ? "md:mt-12" : i===2 ? "md:mt-24" : ""}>
              <Link href={href} className="group relative block overflow-hidden rounded-[1.4rem] border border-border bg-background p-2 shadow-[0_18px_45px_-34px_rgba(9,28,43,.55)] transition-all duration-500 hover:-translate-y-2 hover:border-accent hover:shadow-[0_25px_60px_-30px_rgba(9,28,43,.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                <div className="relative aspect-[1.2] overflow-hidden rounded-[1rem] bg-emerald-900">
                  <Image src={image} alt={alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/30 to-transparent" aria-hidden="true" />
                  <span className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-ink-950/50 text-white backdrop-blur-sm"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                </div>
                <div className="flex items-center justify-between gap-3 px-3 pb-3 pt-5">
                  <div><h3 className="font-display text-2xl font-semibold">{title}</h3><p className="mt-1 text-sm text-muted">{detail}</p></div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-accent-text transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
