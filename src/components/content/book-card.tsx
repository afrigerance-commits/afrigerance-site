import Link from "next/link";
import { BookMarked } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { rightsStatusLabels } from "@/lib/data/books";
import type { Book } from "@/lib/types/content";

const rightsVariant: Record<Book["droits"], "success" | "default" | "warning" | "muted"> = {
  librement_diffusable: "success",
  diffusion_autorisee: "success",
  consultation_externe: "default",
  droits_non_verifies: "muted",
};

export function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`/bibliotheque/${book.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col transition-all group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-md">
        <div className="flex aspect-[3/4] items-center justify-center rounded-t-xl bg-surface-muted">
          <BookMarked className="h-10 w-10 text-muted" aria-hidden="true" />
        </div>
        <CardContent className="flex flex-1 flex-col gap-2 pt-4">
          <Badge variant={rightsVariant[book.droits]} className="w-fit">
            {rightsStatusLabels[book.droits]}
          </Badge>
          <h3 className="font-display text-base font-semibold leading-snug">{book.titreFrancais}</h3>
          <p className="text-sm text-muted">{book.auteur}</p>
          <p className="mt-auto text-xs text-muted">{book.discipline}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
