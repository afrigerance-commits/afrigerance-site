import type { Book } from "@/lib/types/content";

/** Disponibilité réelle : le statut de droits seul ne crée pas un fichier. */
export function getBookAccess(book: Book) {
  if ((book.droits === "librement_diffusable" || book.droits === "diffusion_autorisee") && book.fichierPdf) {
    return { mode: "read", label: "Lire l’ouvrage", href: book.fichierPdf } as const;
  }
  if (book.droits === "consultation_externe" && book.lienConsultationExterne) {
    return { mode: "external", label: "Consulter une source", href: book.lienConsultationExterne } as const;
  }
  return { mode: "notice", label: "Notice documentaire", href: `/bibliotheque/${book.slug}` } as const;
}
