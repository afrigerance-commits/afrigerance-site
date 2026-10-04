/**
 * Modèle et validation du formulaire de devis.
 * Utilisé à l'identique dans le navigateur (étape par étape) et sur le serveur (demande complète).
 */
import { quoteForm, validationMessages as m } from "@/content/forms";
import { getPole, isPoleId, poleIds, type PoleId } from "@/content/services";
import {
  checkChoice,
  checkText,
  isValidEmail,
  isValidPhone,
  limits,
  toText,
  toTextList,
  type FieldErrors,
} from "./common";

export type QuoteData = {
  poles: PoleId[];
  /** Prestations cochées par pôle ; seules celles des pôles sélectionnés sont envoyées. */
  prestations: Record<PoleId, string[]>;
  description: string;
  city: string;
  workstations: string;
  infrastructure: string;
  premises: string;
  installation: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  /** Champ piège invisible : doit rester vide (protection contre les robots). */
  website: string;
};

export type QuoteField =
  | "poles"
  | `prestations-${PoleId}`
  | "description"
  | "city"
  | "workstations"
  | "infrastructure"
  | "premises"
  | "installation"
  | "name"
  | "company"
  | "email"
  | "phone"
  | "contact";

export const QUOTE_STEP_COUNT = 4;

export function emptyQuote(initialPoles: PoleId[] = []): QuoteData {
  return {
    poles: initialPoles,
    prestations: { infogerance: [], integration: [] },
    description: "",
    city: "",
    workstations: "",
    infrastructure: "",
    premises: "",
    installation: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    website: "",
  };
}

const fields = quoteForm.fields;

export function allowedPrestations(pole: PoleId): string[] {
  return [...getPole(pole).prestations.map((item) => item.id), fields.prestations.other.value];
}

function validateNeed(data: QuoteData): FieldErrors<QuoteField> {
  const errors: FieldErrors<QuoteField> = {};
  if (data.poles.length === 0 || !data.poles.every(isPoleId)) {
    errors.poles = m.polesRequired;
    return errors;
  }
  for (const pole of data.poles) {
    const selected = data.prestations[pole] ?? [];
    const allowed = allowedPrestations(pole);
    if (selected.length === 0) {
      errors[`prestations-${pole}`] = m.prestationsRequired(getPole(pole).title);
    } else if (!selected.every((id) => allowed.includes(id))) {
      errors[`prestations-${pole}`] = m.invalidChoice;
    }
  }
  return errors;
}

function validateDetails(data: QuoteData): FieldErrors<QuoteField> {
  const errors: FieldErrors<QuoteField> = {
    description: checkText(data.description, {
      required: true,
      min: limits.longTextMin,
      max: limits.longText,
    }),
    city: checkText(data.city, { required: true, max: limits.city }),
  };
  if (data.poles.includes("infogerance")) {
    errors.workstations = checkChoice(data.workstations, fields.workstations.options);
    errors.infrastructure = checkChoice(data.infrastructure, fields.infrastructure.options);
  }
  if (data.poles.includes("integration")) {
    errors.premises = checkChoice(data.premises, fields.premises.options);
    errors.installation = checkChoice(data.installation, fields.installation.options);
  }
  return errors;
}

function validateContact(data: QuoteData): FieldErrors<QuoteField> {
  const errors: FieldErrors<QuoteField> = {
    name: checkText(data.name, { required: true, max: limits.name }),
    company: checkText(data.company, { max: limits.company }),
  };
  if (!data.email && !data.phone) {
    errors.contact = m.contactRequired;
  }
  if (data.email && !isValidEmail(data.email)) errors.email = m.emailInvalid;
  if (data.phone && (data.phone.length > limits.phone || !isValidPhone(data.phone))) {
    errors.phone = m.phoneInvalid;
  }
  return errors;
}

function compact<K extends string>(errors: FieldErrors<K>): FieldErrors<K> {
  return Object.fromEntries(
    Object.entries(errors).filter(([, message]) => Boolean(message)),
  ) as FieldErrors<K>;
}

/** Valide une étape du formulaire (0 : besoin, 1 : détails, 2 : coordonnées). */
export function validateQuoteStep(data: QuoteData, step: number): FieldErrors<QuoteField> {
  if (step === 0) return compact(validateNeed(data));
  if (step === 1) return compact(validateDetails(data));
  if (step === 2) return compact(validateContact(data));
  return {};
}

export function validateQuote(data: QuoteData): FieldErrors<QuoteField> {
  return compact({ ...validateNeed(data), ...validateDetails(data), ...validateContact(data) });
}

/** Étape qui contient un champ donné (pour y revenir en cas d'erreur serveur). */
export function stepOfQuoteField(field: string): number {
  if (field === "poles" || field.startsWith("prestations-")) return 0;
  if (["description", "city", "workstations", "infrastructure", "premises", "installation"].includes(field)) {
    return 1;
  }
  return 2;
}

/**
 * Ne conserve que les réponses utiles à l'envoi : prestations et questions
 * des seuls pôles sélectionnés.
 */
export function toQuotePayload(data: QuoteData): QuoteData {
  const hasInfogerance = data.poles.includes("infogerance");
  const hasIntegration = data.poles.includes("integration");
  return {
    ...data,
    prestations: {
      infogerance: hasInfogerance ? data.prestations.infogerance : [],
      integration: hasIntegration ? data.prestations.integration : [],
    },
    workstations: hasInfogerance ? data.workstations : "",
    infrastructure: hasInfogerance ? data.infrastructure : "",
    premises: hasIntegration ? data.premises : "",
    installation: hasIntegration ? data.installation : "",
  };
}

/** Reconstruit une demande à partir d'un JSON reçu, sans faire confiance à sa forme. */
export function parseQuote(input: unknown): QuoteData {
  const source = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const rawPrestations = (
    source.prestations && typeof source.prestations === "object" ? source.prestations : {}
  ) as Record<string, unknown>;
  const poles = toTextList(source.poles);

  return toQuotePayload({
    poles: poles.filter(isPoleId).length === poles.length ? (poles as PoleId[]) : [],
    prestations: Object.fromEntries(
      poleIds.map((pole) => [pole, toTextList(rawPrestations[pole])]),
    ) as Record<PoleId, string[]>,
    description: toText(source.description),
    city: toText(source.city),
    workstations: toText(source.workstations),
    infrastructure: toText(source.infrastructure),
    premises: toText(source.premises),
    installation: toText(source.installation),
    name: toText(source.name),
    company: toText(source.company),
    email: toText(source.email),
    phone: toText(source.phone),
    website: toText(source.website),
  });
}
