import { learningPaths } from "@/lib/data/learning-paths";

/** Composition originale MIRÂTH : ne reproduit aucun PDF fourni. */
export const originalBookSlug = "guide-apprendre-mirath";
export const originalBookChapters = learningPaths.flatMap(path => path.lessons.map(lesson => ({ ...lesson, pathSlug: path.slug, pathTitle: path.titre })));
