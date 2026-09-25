import { validationMessages as m } from "@/content/forms";

/** Erreurs par champ : clé du champ → message affiché. */
export type FieldErrors<K extends string = string> = Partial<Record<K, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s().-]+$/;

export function isValidEmail(value: string): boolean {
  return value.length <= 254 && EMAIL_PATTERN.test(value);
}

export function isValidPhone(value: string): boolean {
  if (!PHONE_PATTERN.test(value)) return false;
  const digits = value.replace(/\D/g, "").length;
  return digits >= 7 && digits <= 15;
}

/** Convertit une valeur reçue (JSON) en texte nettoyé ; tout ce qui n'est pas une chaîne devient vide. */
export function toText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Convertit une valeur reçue en liste de chaînes (sans doublon). */
export function toTextList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((item): item is string => typeof item === "string"))];
}

type TextRule = {
  required?: boolean;
  min?: number;
  max: number;
};

export function checkText(value: string, rule: TextRule): string | undefined {
  if (!value) return rule.required ? m.required : undefined;
  if (rule.min && value.length < rule.min) return m.tooShort(rule.min);
  if (value.length > rule.max) return m.tooLong(rule.max);
  return undefined;
}

export function checkChoice(
  value: string,
  allowed: readonly { value: string }[],
): string | undefined {
  if (!value) return m.choiceRequired;
  return allowed.some((option) => option.value === value) ? undefined : m.invalidChoice;
}

/** Longueurs maximales communes aux formulaires. */
export const limits = {
  name: 100,
  company: 150,
  email: 254,
  phone: 30,
  city: 100,
  subject: 150,
  longText: 3000,
  longTextMin: 10,
} as const;
