/** Modèle et validation du formulaire de contact (navigateur et serveur). */
import { validationMessages as m } from "@/content/forms";
import {
  checkText,
  isValidEmail,
  isValidPhone,
  limits,
  toText,
  type FieldErrors,
} from "./common";

export type ContactData = {
  name: string;
  /** Email ou numéro de téléphone. */
  contact: string;
  subject: string;
  message: string;
  /** Champ piège invisible : doit rester vide (protection contre les robots). */
  website: string;
};

export type ContactField = "name" | "contact" | "subject" | "message";

export function emptyContact(): ContactData {
  return { name: "", contact: "", subject: "", message: "", website: "" };
}

/** Indique si le moyen de contact saisi est un email ou un téléphone valide. */
export function contactKind(value: string): "email" | "phone" | null {
  if (value.includes("@")) return isValidEmail(value) ? "email" : null;
  return value.length <= limits.phone && isValidPhone(value) ? "phone" : null;
}

export function validateContactMessage(data: ContactData): FieldErrors<ContactField> {
  const errors: FieldErrors<ContactField> = {};
  const name = checkText(data.name, { required: true, max: limits.name });
  if (name) errors.name = name;

  if (!data.contact) errors.contact = m.contactRequired;
  else if (!contactKind(data.contact)) errors.contact = m.contactInvalid;

  const subject = checkText(data.subject, { required: true, max: limits.subject });
  if (subject) errors.subject = subject;

  const message = checkText(data.message, {
    required: true,
    min: limits.longTextMin,
    max: limits.longText,
  });
  if (message) errors.message = message;
  return errors;
}

export function parseContact(input: unknown): ContactData {
  const source = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  return {
    name: toText(source.name),
    contact: toText(source.contact),
    subject: toText(source.subject),
    message: toText(source.message),
    website: toText(source.website),
  };
}
