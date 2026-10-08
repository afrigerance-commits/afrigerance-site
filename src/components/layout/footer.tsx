import Link from "next/link";
import { YoutubeIcon } from "@/components/icons/youtube-icon";
import { Logo } from "@/components/layout/logo";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/site-config";

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-display text-sm font-semibold text-foreground">{title}</h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-muted transition-colors hover:text-primary">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="premium-container py-16">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 border-b border-border pb-10 lg:flex-row lg:items-end">
          <p className="max-w-xl font-display text-3xl leading-tight tracking-tight sm:text-4xl">Lire. Comprendre.<br /><span className="text-primary">Transmettre.</span></p>
          <nav aria-label="Ressources essentielles" className="flex flex-wrap gap-4 text-sm font-semibold text-primary"><Link href="/coran" className="editorial-link">Coran ↗</Link><Link href="/hadith" className="editorial-link">Hadith ↗</Link><Link href="/videos" className="editorial-link">Vidéos ↗</Link></nav>
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Logo />
            <p className="max-w-sm text-sm text-muted">{siteConfig.description}</p>
            <Link href="/hors-ligne" className="text-sm font-medium text-primary underline underline-offset-4">Mes lectures hors ligne</Link>
            {siteConfig.social.youtube && (
              <Link
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-primary"
              >
                <YoutubeIcon className="h-4 w-4" />
                Chaîne YouTube
              </Link>
            )}
          </div>
          <FooterColumn title="Plateforme" links={siteConfig.nav.footer.plateforme} />
          <FooterColumn title="Ressources" links={siteConfig.nav.footer.ressources} />
          <FooterColumn title="Informations légales" links={siteConfig.nav.footer.legal} />
        </div>
        <Separator className="my-10" />
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Référentiel juridique : école {siteConfig.madhhab.name}.
          </p>
          <p>Conçu pour servir la transmission du savoir.</p>
        </div>
      </div>
    </footer>
  );
}
