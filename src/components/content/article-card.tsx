import Link from "next/link";
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DemoBadge } from "@/components/islamic/reliability-badge";
import type { Article } from "@/lib/types/content";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/blog/${article.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col transition-all group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-md">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{article.categorie}</Badge>
            {article.demonstration && <DemoBadge />}
          </div>
          <CardTitle className="mt-1">{article.titre}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between gap-4">
          <p className="text-sm text-muted">{article.resume}</p>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <Clock className="h-3.5 w-3.5" />
            {article.tempsLectureMinutes} min de lecture
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
