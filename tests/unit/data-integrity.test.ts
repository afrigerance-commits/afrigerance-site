import { describe, expect, it } from "vitest";
import { disciplines } from "@/lib/site-config";
import { articles } from "@/lib/data/articles";
import { books } from "@/lib/data/books";
import { scholars } from "@/lib/data/scholars";
import { siraEvents } from "@/lib/data/sira";
import { videos } from "@/lib/data/videos";
import { fiqhCourses } from "@/lib/data/fiqh";
import { learningPaths } from "@/lib/data/learning-paths";

function expectUniqueSlugs(items: { slug: string }[], label: string) {
  const slugs = items.map((i) => i.slug);
  const unique = new Set(slugs);
  expect(unique.size, `${label} contient des slugs en double`).toBe(slugs.length);
}

describe("intégrité des données de démonstration", () => {
  it("expose exactement les douze disciplines attendues par le cahier des charges", () => {
    expect(disciplines).toHaveLength(12);
    expectUniqueSlugs([...disciplines], "disciplines");
  });

  it("n'a pas de slugs en double dans chaque collection de contenu", () => {
    expectUniqueSlugs(articles, "articles");
    expectUniqueSlugs(books, "livres");
    expectUniqueSlugs(scholars, "savants/compagnons");
    expectUniqueSlugs(siraEvents, "événements de la Sîra");
    expectUniqueSlugs(videos, "vidéos");
    expectUniqueSlugs(fiqhCourses, "cours de fiqh");
    expectUniqueSlugs(learningPaths, "parcours d'apprentissage");
  });

  it("chaîne correctement les leçons de chaque cours de fiqh (lessonSuivanteSlug valide)", () => {
    for (const course of fiqhCourses) {
      const lessonSlugs = new Set(course.lessons.map((l) => l.slug));
      for (const lesson of course.lessons) {
        if (lesson.lessonSuivanteSlug) {
          expect(
            lessonSlugs.has(lesson.lessonSuivanteSlug),
            `${course.slug}/${lesson.slug} pointe vers une leçon suivante inexistante`,
          ).toBe(true);
        }
      }
    }
  });

  it("chaîne correctement les événements de la Sîra (evenementSuivantSlug valide)", () => {
    const eventSlugs = new Set(siraEvents.map((e) => e.slug));
    for (const event of siraEvents) {
      if (event.evenementSuivantSlug) {
        expect(
          eventSlugs.has(event.evenementSuivantSlug),
          `${event.slug} pointe vers un événement suivant inexistant`,
        ).toBe(true);
      }
    }
  });

  it("ne marque aucun contenu de démonstration comme publié sans validation humaine", () => {
    // Règle de fiabilité documentaire du cahier des charges : tant qu'un
    // contenu religieux est une donnée de démonstration non relue par le
    // fondateur, il ne doit jamais porter le statut "publie".
    const demoContents = [...articles, ...scholars, ...siraEvents, ...fiqhCourses];
    for (const item of demoContents) {
      if (item.demonstration) {
        expect(item.statut, `"${item.slug}" est une démo marquée publiée`).not.toBe("publie");
      }
    }
  });

  it("ne fournit jamais de lien de téléchargement pour un livre aux droits non vérifiés", () => {
    for (const book of books) {
      if (book.droits === "droits_non_verifies") {
        expect(book.fichierPdf, `${book.slug} a des droits non vérifiés mais propose un fichier`).toBeUndefined();
      }
    }
  });
});
