import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  return <section className="atelier-hero" aria-labelledby="home-title">
    <div className="premium-container atelier-hero-grid">
      <div className="atelier-hero-copy">
        <p className="eyebrow"><span className="atelier-seal" aria-hidden="true">✧</span> Une bibliothèque. Un héritage.</p>
        <h1 id="home-title">Le savoir éclaire.<br /><em>La lecture transmet.</em></h1>
        <p className="atelier-hero-description">Un espace pour le Coran, les paroles transmises et les chemins du savoir. À votre rythme, avec les sources à portée de main.</p>
        <div className="atelier-hero-actions"><Button asChild size="lg"><Link href="/coran/lecture/page/1"><BookOpen aria-hidden="true" /> Ouvrir le Coran</Link></Button><Link href="/apprendre" className="atelier-text-link">Trouver mon parcours <ArrowUpRight className="size-4" aria-hidden="true" /></Link></div>
        <form action="/recherche" className="atelier-search" role="search"><Search className="size-5" aria-hidden="true" /><input name="q" aria-label="Rechercher sur MIRÂTH" placeholder="Une sourate, un thème, un ouvrage…" minLength={2} maxLength={120} /><button type="submit" aria-label="Lancer la recherche"><ArrowUpRight className="size-5" aria-hidden="true" /></button></form>
      </div>
      <div className="atelier-hero-art">
        <div className="atelier-image-frame"><Image src="/images/mirath/coran_etude.webp" alt="Illustration d’un livre ouvert aux pages vierges, dans une bibliothèque lumineuse" fill sizes="(min-width:1024px) 420px, (min-width:640px) 45vw, 90vw" loading="lazy" className="object-cover" /><span className="atelier-image-shade" aria-hidden="true" /><div className="atelier-image-caption"><span lang="ar" dir="rtl">ميراث</span><p>Lire. Comprendre. Transmettre.</p></div></div>
        <p className="atelier-image-colophon"><span>01 / LE LIVRE OUVERT</span><span>Un moment pour l’essentiel</span></p>
      </div>
    </div>
  </section>;
}
