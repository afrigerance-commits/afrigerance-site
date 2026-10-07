import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookCover } from "@/components/content/book-cover";
import { getBookAccess } from "@/lib/book-access";
import type { Book } from "@/lib/types/content";

export function BookCard({ book, compact = false }: { book: Book; compact?: boolean }) {
  const access = getBookAccess(book);
  return <Link href={`/bibliotheque/${book.slug}`} className="group block h-full">
    <Card className={`gateway-card flex h-full overflow-hidden ${compact ? "flex-row items-start p-4" : "flex-col"}`}>
      <div className={compact ? "w-24 shrink-0 sm:w-20 lg:w-24" : "rounded-t-xl bg-surface-muted p-3"}><BookCover book={book} /></div>
      <CardContent className={`flex min-w-0 flex-1 flex-col gap-3 ${compact ? "p-0 pl-4" : "pt-4"}`}>
        <Badge variant={access.mode === "notice" ? "muted" : "success"} className="w-fit text-xs">{access.label}</Badge>
        <h3 className="font-display text-lg font-semibold leading-snug">{book.titreFrancais}</h3>
        <p className="text-sm leading-6 text-muted">{book.auteur}</p>
        <p className="text-xs leading-5 text-muted">{book.discipline}</p>
        <p className="mt-auto text-sm font-medium text-primary">{access.mode === "notice" ? "Voir la notice" : "Voir les accès"}</p>
        {!compact && <p className="text-xs leading-5 text-muted">Visuel MIRÂTH · couverture d’édition non reproduite</p>}
      </CardContent>
    </Card>
  </Link>;
}
