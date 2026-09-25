import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/afrigerance-logo.png";
import { routes, site } from "@/content/site";

type LogoProps = {
  /** Classes de hauteur : la largeur suit le ratio du fichier original. */
  className?: string;
  /** Largeur maximale affichée, utilisée pour choisir la résolution servie. */
  width: number;
  eager?: boolean;
};

/** Logo original (fichier fourni, uniquement recadré) renvoyant vers l'accueil. */
export function Logo({ className, width, eager = false }: LogoProps) {
  return (
    <Link
      href={routes.home}
      aria-label={`${site.name}, retour à l’accueil`}
      className="inline-flex shrink-0 rounded-sm"
    >
      <Image
        src={logo}
        alt={`${site.name} — ${site.tagline}`}
        width={width}
        height={Math.round((width * logo.height) / logo.width)}
        loading={eager ? "eager" : "lazy"}
        className={`w-auto ${className ?? ""}`}
      />
    </Link>
  );
}
