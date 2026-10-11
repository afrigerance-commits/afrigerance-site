import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { siraEvents, getSiraEvent, SIRA_PATH, siraLessonSlugs } from "@/lib/data/sira";
import { LessonReview } from "@/components/learning/lesson-review";
import { PathProgress } from "@/components/learning/path-progress";
import { learningKey } from "@/lib/learning-progress";

beforeEach(() => localStorage.clear());
describe("Parcours Sîra", () => {
  it("préserve les dix anciennes adresses et ne laisse aucune rupture dans la lecture", () => {
    for (const slug of ["naissance-prophete", "debut-revelation", "appel-public", "epreuves-mecquoises", "hegire", "badr", "hudaybiyya", "conquete-mecque", "pelerinage-adieu", "derniers-instants"]) {
      expect(getSiraEvent(slug)).toBeDefined();
    }
    expect(new Set(siraLessonSlugs).size).toBe(siraEvents.length);
    for (let index = 0; index < siraEvents.length - 1; index++) {
      expect(getSiraEvent(siraEvents[index].evenementSuivantSlug!)?.slug).toBe(siraEvents[index + 1].slug);
    }
    expect(getSiraEvent("inconnu")).toBeUndefined();
  });
  it("fournit des chapitres substantiels, documentés et évaluables", () => {
    expect(siraEvents).toHaveLength(42);
    for (const event of siraEvents) {
      const body = event.lesson.sections.flatMap(section => section.paragraphes).join(" ");
      expect(body.split(/\s+/).length, event.slug).toBeGreaterThan(220);
      expect(event.sources.length, event.slug).toBeGreaterThan(0);
      expect(event.vigilance, event.slug).not.toBe("");
      for (const source of event.sources) {
        expect(source.aVerifier).not.toBe(true);
        expect(new URL(source.lienExterne!).hostname).toMatch(/^(sunnah\.com|quran\.com)$/);
      }
      expect(event.lesson.questions).toHaveLength(2);
      for (const question of event.lesson.questions) {
        expect(question.options[question.answer]).toBeDefined();
        expect(new Set(question.options).size).toBe(question.options.length);
        expect(question.explanation).not.toBe("");
      }
    }
  });
  it("valide un vrai quiz, conserve la progression et reprend sur la route Sîra suivante", () => {
    const first = siraEvents[0];
    const metadata = siraEvents.slice(0, 2).map(event => event.lesson);
    render(<><LessonReview path={SIRA_PATH} lesson={first.slug} allowed={siraLessonSlugs} questions={first.lesson.questions} /><PathProgress slug={SIRA_PATH} baseHref="/sira" lessons={metadata} /></>);
    expect(screen.getByRole("link", { name: `Commencer : ${first.titre}` })).toHaveAttribute("href", `/sira/${first.slug}`);
    for (const question of first.lesson.questions) fireEvent.click(screen.getByLabelText(question.options[question.answer]));
    fireEvent.click(screen.getByRole("button", { name: "Corriger mes réponses" }));
    fireEvent.click(screen.getByRole("button", { name: "Valider la leçon" }));
    expect(localStorage.getItem(learningKey(SIRA_PATH))).toBe(JSON.stringify([first.slug]));
    expect(screen.getByRole("link", { name: `Continuer : ${siraEvents[1].titre}` })).toHaveAttribute("href", `/sira/${siraEvents[1].slug}`);
    expect(screen.getByText("1 / 2 leçons validées")).toBeVisible();
  });
});
