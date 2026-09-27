/**
 * Conversion des formulaires validés en demandes à enregistrer,
 * et mise en forme des réponses enregistrées pour l'espace administrateur.
 */
import { contactForm, quoteForm, type Option } from "@/content/forms";
import { getPole, isPoleId } from "@/content/services";
import { contactKind, type ContactData } from "@/lib/forms/contact";
import type { QuoteData } from "@/lib/forms/quote";
import type { RequestType } from "./types";

export type RequestRecord = {
  answers: Record<string, unknown>;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  summary: string;
};

export function quoteToRecord(data: QuoteData): RequestRecord {
  const poleTitles = data.poles.map((pole) => getPole(pole).title);
  return {
    answers: {
      poles: data.poles,
      prestations: data.prestations,
      description: data.description,
      city: data.city,
      workstations: data.workstations,
      infrastructure: data.infrastructure,
      premises: data.premises,
      installation: data.installation,
    },
    name: data.name,
    company: data.company || null,
    email: data.email || null,
    phone: data.phone || null,
    summary: `${poleTitles.join(" + ")} — ${data.city}`,
  };
}

export function contactToRecord(data: ContactData): RequestRecord {
  const kind = contactKind(data.contact);
  return {
    answers: { subject: data.subject, message: data.message },
    name: data.name,
    company: null,
    email: kind === "email" ? data.contact : null,
    phone: kind === "phone" ? data.contact : null,
    summary: data.subject,
  };
}

/** Une réponse mise en forme ; `long` signale un texte libre (description, message). */
export type AnswerRow = { label: string; value: string; long?: boolean };

const quoteFields = quoteForm.fields;
const quoteLabels = quoteForm.summary.labels;

function text(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function list(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function optionLabel(options: readonly Option[], value: unknown): string {
  const raw = text(value);
  return options.find((option) => option.value === raw)?.label ?? raw;
}

function formatQuoteAnswers(answers: Record<string, unknown>): AnswerRow[] {
  const poles = list(answers.poles).filter(isPoleId);
  const prestations = (answers.prestations ?? {}) as Record<string, unknown>;
  const rows: AnswerRow[] = [
    { label: quoteLabels.poles, value: poles.map((pole) => getPole(pole).title).join(", ") },
    ...poles.map((pole) => ({
      label: `${quoteLabels.prestations} (${getPole(pole).title})`,
      value: list(prestations[pole])
        .map((id) =>
          id === quoteFields.prestations.other.value
            ? quoteFields.prestations.other.label
            : (getPole(pole).prestations.find((item) => item.id === id)?.title ?? id),
        )
        .join(", "),
    })),
    { label: quoteLabels.description, value: text(answers.description), long: true },
    { label: quoteLabels.city, value: text(answers.city) },
  ];
  if (poles.includes("infogerance")) {
    rows.push(
      { label: quoteLabels.workstations, value: optionLabel(quoteFields.workstations.options, answers.workstations) },
      { label: quoteLabels.infrastructure, value: optionLabel(quoteFields.infrastructure.options, answers.infrastructure) },
    );
  }
  if (poles.includes("integration")) {
    rows.push(
      { label: quoteLabels.premises, value: optionLabel(quoteFields.premises.options, answers.premises) },
      { label: quoteLabels.installation, value: optionLabel(quoteFields.installation.options, answers.installation) },
    );
  }
  return rows;
}

function formatContactAnswers(answers: Record<string, unknown>): AnswerRow[] {
  return [
    { label: contactForm.fields.subject.label, value: text(answers.subject) },
    { label: contactForm.fields.message.label, value: text(answers.message), long: true },
  ];
}

/** Réponses enregistrées, avec les libellés du formulaire (pour la fiche d'une demande). */
export function formatAnswers(type: RequestType, answers: unknown): AnswerRow[] {
  const source = (answers && typeof answers === "object" ? answers : {}) as Record<string, unknown>;
  if (type === "devis") return formatQuoteAnswers(source);
  if (type === "contact") return formatContactAnswers(source);
  return Object.entries(source).map(([label, value]) => ({
    label,
    value: typeof value === "string" ? value : JSON.stringify(value),
  }));
}
