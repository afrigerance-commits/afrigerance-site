import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArabicText } from "@/components/islamic/arabic-text";
import type { Scholar } from "@/lib/types/content";

const categorieLabel: Record<Scholar["categorie"], string> = {
  compagnon: "Compagnon",
  compagnonne: "Compagnonne",
  tabiun: "Tâbi'î",
  imam: "Imam",
  savant: "Savant",
};

export function ScholarCard({ scholar }: { scholar: Scholar }) {
  const initial = scholar.transcriptionFrancaise.charAt(0);
  return (
    <Link href={`/compagnons/${scholar.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col items-center gap-3 p-6 text-center transition-all group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-md">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-xl">{initial}</AvatarFallback>
        </Avatar>
        <Badge variant="outline">{categorieLabel[scholar.categorie]}</Badge>
        <h3 className="font-display text-base font-semibold">{scholar.transcriptionFrancaise}</h3>
        <ArabicText className="text-base text-gold-600 dark:text-gold-500">{scholar.nomArabe}</ArabicText>
      </Card>
    </Link>
  );
}
