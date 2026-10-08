import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Lock } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { BookCover } from "@/components/content/book-cover";
import { DemoBadge } from "@/components/islamic/reliability-badge";
import { Badge } from "@/components/ui/badge";
import { books, getBook } from "@/lib/data/books";
import { getBookAccess } from "@/lib/book-access";


export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/bibliotheque/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return {};
  return { title: book.titreFrancais, description: book.presentation, alternates: { canonical: `/bibliotheque/${slug}` } };
}

export default async function BookPage({ params }: PageProps<"/bibliotheque/[slug]">) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();
  const access = getBookAccess(book);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/bibliotheque" className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> Bibliothèque
      </Link>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-[220px_1fr]">
        <Reveal className="flex flex-col gap-3">
          <BookCover book={book} />
          <p className="text-center text-xs text-muted">Visuel éditorial MIRÂTH · ne représente pas la couverture de cette édition</p>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={access.mode === "notice" ? "muted" : "success"}>{access.label}</Badge>
            {book.demonstration && <DemoBadge />}
          </div>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">{book.titreFrancais}</h1>
          <p className="text-muted">{book.titreOriginal}</p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <div>
              <dt className="text-muted">Auteur</dt>
              <dd className="font-medium">{book.auteur}</dd>
            </div>
            <div>
              <dt className="text-muted">Discipline</dt>
              <dd className="font-medium">{book.discipline}</dd>
            </div>
            <div>
              <dt className="text-muted">Langue</dt>
              <dd className="font-medium">{book.langue}</dd>
            </div>
            {book.edition && (
              <div>
                <dt className="text-muted">Édition</dt>
                <dd className="font-medium">{book.edition}</dd>
              </div>
            )}
          </dl>

          <p className="text-foreground/90">{book.presentation}</p>
          {book.slug === "histoires-prophetes-ibn-kathir" && <Link href="/prophetes" className="font-semibold text-primary underline">Lire les fiches originales : histoires des prophètes →</Link>}
          {book.slug === "ar-rahiq-al-makhtum" && <Link href="/sira" className="font-semibold text-primary underline">Lire le parcours de Sîra sur MIRÂTH →</Link>}

          {access.mode === "read" && <a href={access.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 w-fit items-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Lire l’ouvrage</a>}
          <p className="text-sm leading-7 text-muted">{access.mode === "notice" ? "Vous consultez une notice bibliographique. Le texte intégral de cette édition n’est pas disponible sur MIRÂTH." : "L’accès au texte est distinct de sa notice bibliographique."}</p>
          {book.droits === "consultation_externe" && book.lienConsultationExterne && (
            <a
              href={book.lienConsultationExterne}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Consulter sur une source externe <ExternalLink className="h-4 w-4" />
            </a>
          )}

          {book.droits === "droits_non_verifies" && (
            <p className="inline-flex w-fit items-center gap-2 rounded-lg border border-dashed border-border px-4 py-2.5 text-sm text-muted">
              <Lock className="h-4 w-4" /> Les droits de ce fichier n’ont pas encore été vérifiés : aucune lecture ni
              téléchargement n’est proposé.
            </p>
          )}

          {book.referencesBibliographiques && (
            <p className="text-xs text-muted">{book.referencesBibliographiques}</p>
          )}
        </Reveal>
      </div>
    </div>
  );
}
