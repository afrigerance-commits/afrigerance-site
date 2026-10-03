import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArabicText } from "@/components/islamic/arabic-text";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-5 px-4 text-center">
      <ArabicText className="text-4xl text-gold-600 dark:text-gold-500">404</ArabicText>
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Page introuvable</h1>
      <p className="text-muted">
        Cette page n'existe pas ou a été déplacée. Peut-être cherchez-vous un cours, un article ou une fiche de la
        bibliothèque ?
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="accent" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/recherche">Rechercher</Link>
        </Button>
      </div>
    </div>
  );
}
