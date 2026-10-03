import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { BookCard } from "@/components/content/book-card";
import { books } from "@/lib/data/books";

export const metadata: Metadata = {
  title: "Bibliothèque islamique numérique",
  description: "Des fiches bibliographiques soigneusement documentées, avec un statut de droits clair pour chaque ouvrage.",
  alternates: { canonical: "/bibliotheque" },
};

export default function BibliothequePage() {
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
      <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {books.map((book, i) => (
          <Reveal key={book.slug} delay={i * 0.04}>
            <BookCard book={book} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
