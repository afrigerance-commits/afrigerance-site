import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { EditorialStatusBadge, DemoBadge } from "@/components/islamic/reliability-badge";
import { Card } from "@/components/ui/card";
import { fiqhCourses, getFiqhCourse } from "@/lib/data/fiqh";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return fiqhCourses.filter((c) => c.statut === "publie").map((c) => ({ course: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/fiqh/malikite/[course]">): Promise<Metadata> {
  const { course: courseSlug } = await params;
  const course = getFiqhCourse(courseSlug);
  if (!course) return {};
  return { title: course.titre, description: course.description, alternates: { canonical: `/fiqh/malikite/${courseSlug}` } };
}

export default async function FiqhCoursePage({ params }: PageProps<"/fiqh/malikite/[course]">) {
  const { course: courseSlug } = await params;
  const course = getFiqhCourse(courseSlug);
  if (!course) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: course.titre,
          description: course.description,
          provider: { "@type": "EducationalOrganization", name: siteConfig.name, sameAs: siteConfig.url },
          educationalLevel: course.niveau,
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "online",
            numberOfCredits: course.lessons.length,
          },
        }}
      />
      <Link href="/fiqh/malikite" className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> Académie de fiqh malikite
      </Link>
      <Reveal className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <EditorialStatusBadge status={course.statut} />
          {course.demonstration && <DemoBadge />}
        </div>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">{course.titre}</h1>
        <p className="max-w-2xl text-lg text-muted">{course.description}</p>
        <p className="text-sm text-muted">Référentiel : {course.referentielJuridique}</p>
      </Reveal>

      <ol className="mt-12 flex flex-col gap-4">
        {course.lessons.filter((lesson) => lesson.statut === "publie").map((lesson, i) => (
          <Reveal key={lesson.slug} delay={i * 0.05}>
            <Link href={`/fiqh/malikite/${course.slug}/${lesson.slug}`}>
              <Card className="flex items-center justify-between gap-4 p-5 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md">
                <div className="flex items-center gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted font-display text-sm">
                    {i + 1}
                  </span>
                  <div>
                    <h2 className="font-display text-base font-semibold">{lesson.titre}</h2>
                    <p className="text-xs text-muted">{lesson.dureeIndicative}</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted" />
              </Card>
            </Link>
          </Reveal>
        ))}
      </ol>

      <div className="mt-10 flex items-center gap-2 rounded-lg border border-dashed border-border p-4 text-sm text-muted">
        <BookOpen className="h-4 w-4 shrink-0" />
        Ce cours est en cours de vérification documentaire et n’a pas encore reçu l’approbation finale d’un
        responsable scientifique.
      </div>
    </div>
  );
}
