import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ArabicText } from "@/components/islamic/arabic-text";
import type { Discipline } from "@/lib/site-config";

export function DisciplineCard({ discipline }: { discipline: Discipline }) {
  return (
    <Link href={`/explorer-le-savoir/${discipline.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col justify-between gap-6 p-6 transition-all group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <ArabicText className="text-2xl text-gold-600 dark:text-gold-500">{discipline.nameArabic}</ArabicText>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-primary" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-xl font-semibold">{discipline.name}</h3>
          <p className="text-sm text-muted">{discipline.description}</p>
        </div>
      </Card>
    </Link>
  );
}
