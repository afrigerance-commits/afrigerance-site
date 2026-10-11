import type { Metadata } from "next";
import { getBookAccess } from "@/lib/book-access";
import { Reveal } from "@/components/motion/reveal";

import { BookCatalog } from "@/components/content/book-catalog";
import Link from "next/link";
import { getLibraryBooks } from "@/lib/books/catalog";

export const metadata: Metadata = {
  title: "Bibliothèque islamique numérique",
  description: "Des fiches bibliographiques soigneusement documentées, avec un statut de droits clair pour chaque ouvrage.",
  alternates: { canonical: "/bibliotheque" },
};

export default async function BibliothequePage() {
  const books = await getLibraryBooks();
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="flex flex-col gap-4 text-center">
        <span className="mx-auto text-sm font-medium text-accent-text">Bibliothèque islamique numérique</span>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">Des références documentées</h1>
        <p className="mx-auto max-w-2xl text-muted">
          Chaque ouvrage affiche un statut de droits clair. Aucun fichier n’est mis en téléchargement sans
          vérification préalable de ses droits de diffusion.
        </p>
      </Reveal>
      <div className="mt-8 grid gap-3 rounded-2xl border border-accent/30 bg-surface p-5 text-sm sm:grid-cols-3">
        <p><span className="block font-display text-2xl text-primary">{books.filter(book => getBookAccess(book).mode === "read").length}</span> ouvrages à lire ici</p>
        <p><span className="block font-display text-2xl text-primary">{books.filter(book => getBookAccess(book).mode === "external").length}</span> accès à une source externe</p>
        <p><span className="block font-display text-2xl text-primary">{books.filter(book => getBookAccess(book).mode === "notice").length}</span> notices documentaires</p>
      </div>
      <p className="mt-4 text-sm leading-7 text-muted">Une notice présente l’ouvrage et son édition ; elle ne donne pas accès au livre complet. Les fichiers sont proposés uniquement lorsque leur diffusion est autorisée.</p>
      <div className="mt-8 rounded-2xl border border-accent/30 bg-surface p-5">
        <h2 className="font-display text-xl font-semibold">Commencer à apprendre maintenant</h2>
        <p className="mt-2 text-sm text-muted">Des parcours MIRÂTH sont déjà disponibles, indépendamment de l’accès aux éditions complètes.</p>
        <div className="mt-4 flex flex-wrap gap-3">{[{label: "Fiqh malikite", href: "/fiqh/malikite"}, {label: "Sîra", href: "/sira"}, {label: "Histoires des prophètes", href: "/prophetes"}, {label: "Recueils de hadiths", href: "/hadith"}].map(item => <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center rounded-xl border border-border px-4 text-sm font-semibold text-primary">{item.label} →</Link>)}</div>
      </div>
      <BookCatalog books={books} />
    </div>
  );
}
