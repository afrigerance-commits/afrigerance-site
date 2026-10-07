import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { LessonReview } from "@/components/learning/lesson-review";
import { PathProgress } from "@/components/learning/path-progress";
import { learningKey, parseLearningProgress } from "@/lib/learning-progress";

beforeEach(() => localStorage.clear());
describe("Parcours et validation", () => {
  it("filtre les données invalides et les identifiants d’un autre parcours", () => {
    expect(parseLearningProgress("invalid",["lesson"])).toEqual([]);
    expect(parseLearningProgress(JSON.stringify(["lesson","lesson","unknown",7]),["lesson"])).toEqual(["lesson"]);
  });
  it("enregistre une leçon seulement après les bonnes réponses et actualise le bilan", () => {
    render(<><LessonReview path="test" lesson="lesson" allowed={["lesson"]} questions={[
      { question: "Première question", options: ["Réponse A","Réponse B"], answer: 1, explanation: "Explication B" },
      { question: "Deuxième question", options: ["Réponse C","Réponse D"], answer: 0, explanation: "Explication C" },
    ]} /><PathProgress slug="test" lessons={[{ slug:"lesson",titre:"Leçon test",minutes:5,objectif:"Comprendre" }]} /></>);
    expect(screen.getByRole("button",{name:"Corriger mes réponses"})).toBeDisabled();
    fireEvent.click(screen.getByLabelText("Réponse A")); fireEvent.click(screen.getByLabelText("Réponse C"));
    fireEvent.click(screen.getByRole("button",{name:"Corriger mes réponses"}));
    expect(screen.queryByRole("button",{name:"Valider la leçon"})).toBeNull();
    expect(localStorage.getItem(learningKey("test"))).toBeNull();
    fireEvent.click(screen.getByLabelText("Réponse B"));
    fireEvent.click(screen.getByRole("button",{name:"Corriger mes réponses"}));
    fireEvent.click(screen.getByRole("button",{name:"Valider la leçon"}));
    expect(localStorage.getItem(learningKey("test"))).toBe('["lesson"]');
    expect(screen.getByText("1 / 1 leçons validées")).toBeVisible();
  });
});
