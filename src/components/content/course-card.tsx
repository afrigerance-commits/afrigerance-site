import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { FiqhCourse } from "@/lib/types/content";

const niveauLabel = { debutant: "Débutant", intermediaire: "Intermédiaire", avance: "Avancé" } as const;

export function CourseCard({ course, href }: { course: FiqhCourse; href: string }) {
  return (
    <Link href={href} className="group block h-full">
      <Card className="flex h-full flex-col transition-all group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            <Badge variant="outline">{niveauLabel[course.niveau]}</Badge>
          </div>
          <CardTitle>{course.titre}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between gap-4">
          <p className="text-sm text-muted">{course.description}</p>
          <p className="text-xs text-muted">{course.lessons.length} leçons</p>
        </CardContent>
      </Card>
    </Link>
  );
}
