"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LearningQuestion } from "@/lib/types/content";
import { completeLearningLesson } from "@/lib/learning-progress";

export function LessonReview({ path, lesson, allowed, questions, next }: { path: string; lesson: string; allowed: string[]; questions: LearningQuestion[]; next?: { href: string; titre: string } }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const [validated, setValidated] = useState(false);
  const [stored, setStored] = useState(true);
  const allAnswered = questions.every((_, index) => answers[index] !== undefined);
  const score = questions.filter((question, index) => answers[index] === question.answer).length;
  return <section aria-labelledby="review-title" className="mt-10 rounded-3xl border border-accent/30 bg-surface p-5 sm:p-8">
    <p className="eyebrow">Vérifier ma compréhension</p><h2 id="review-title" className="mt-3 font-display text-3xl">Deux questions pour retenir.</h2>
    <p className="mt-3 text-base leading-7 text-muted">Répondez, consultez les explications, puis validez la leçon lorsque les deux réponses sont correctes.</p>
    <form onSubmit={event => { event.preventDefault(); setChecked(true); }} className="mt-7 space-y-7">
      {questions.map((question, index) => <fieldset key={question.question} className="min-w-0">
        <legend className="mb-3 text-base font-semibold leading-7">{index + 1}. {question.question}</legend>
        <div className="space-y-2">{question.options.map((option, optionIndex) => <label key={option} className={`flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border p-3 text-base leading-7 transition-colors ${answers[index] === optionIndex ? "border-primary bg-primary/5" : "border-border hover:border-accent"}`}>
          <input type="radio" name={`${lesson}-question-${index}`} value={optionIndex} checked={answers[index] === optionIndex} onChange={() => { setAnswers(current => ({ ...current, [index]: optionIndex })); setChecked(false); setValidated(false); }} className="mt-1.5 size-4 shrink-0 accent-[var(--primary)]" /><span>{option}</span>
        </label>)}</div>
        {checked && <div className={`mt-3 rounded-xl border p-4 text-sm leading-7 ${answers[index] === question.answer ? "border-primary/30 bg-primary/5" : "border-accent/50 bg-accent/10"}`}><p className="font-semibold">{answers[index] === question.answer ? "Bonne réponse" : `À revoir : ${question.options[question.answer]}`}</p><p className="mt-1">{question.explanation}</p></div>}
      </fieldset>)}
      <div className="flex flex-wrap items-center gap-3"><Button type="submit" disabled={!allAnswered} variant="outline">Corriger mes réponses</Button>{checked && score === questions.length && !validated && <Button type="button" onClick={() => { setStored(completeLearningLesson(path,lesson,allowed)); setValidated(true); }}>Valider la leçon</Button>}</div>
    </form>
    {checked && <p role="status" className="mt-4 text-base font-medium">{score} / {questions.length} réponses correctes{score < questions.length ? " · Modifiez vos réponses pour réessayer." : " · Vous pouvez valider la leçon."}</p>}
    {validated && <div className="mt-5 rounded-xl border border-primary/25 bg-primary/5 p-4"><p className="flex items-center gap-2 font-semibold text-primary"><CheckCircle2 className="size-5" aria-hidden="true" />Leçon validée</p><p className="mt-2 text-sm leading-6 text-muted">{stored ? "Votre progression est enregistrée sur cet appareil." : "La leçon est validée pour cette session. Le stockage de cet appareil est indisponible."}</p></div>}
    {next && <Link href={next.href} className="editorial-link mt-6 inline-block min-h-11 py-3 text-sm font-semibold text-primary">Leçon suivante : {next.titre}</Link>}
  </section>;
}
