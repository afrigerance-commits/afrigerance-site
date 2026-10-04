/** Modèle et validation de la demande de rendez-vous (navigateur et serveur). */
import { appointmentForm, validationMessages as m } from "@/content/forms";
import {
  checkChoice,
  checkText,
  isValidEmail,
  isValidPhone,
  limits,
  toText,
  type FieldErrors,
} from "./common";

const { fields } = appointmentForm;

export type AppointmentData = {
  reason: string;
  pole: string;
  mode: string;
  slot1Date: string;
  slot1Period: string;
  slot2Date: string;
  slot2Period: string;
  city: string;
  comment: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  /** Champ piège invisible : doit rester vide (protection contre les robots). */
  website: string;
};

export type AppointmentField = Exclude<keyof AppointmentData, "website"> | "contact";

export function emptyAppointment(): AppointmentData {
  return {
    reason: "",
    pole: "",
    mode: "",
    slot1Date: "",
    slot1Period: "",
    slot2Date: "",
    slot2Period: "",
    city: "",
    comment: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    website: "",
  };
}

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const DAY_MS = 86_400_000;

/** Date du jour à Dakar (UTC toute l'année), au format AAAA-MM-JJ. */
export function todayInDakar(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

/** Jours d'écart entre deux dates AAAA-MM-JJ. */
function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / DAY_MS);
}

/** Date au format AAAA-MM-JJ, existante, à partir de demain et dans les douze prochains mois. */
export function checkSlotDate(value: string, now: Date = new Date()): string | undefined {
  if (!value) return m.dateRequired;
  if (!DATE_PATTERN.test(value)) return m.dateInvalid;
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) return m.dateInvalid;
  const gap = daysBetween(todayInDakar(now), value);
  if (gap < 1) return m.dateTooSoon;
  if (gap > 366) return m.dateTooFar;
  return undefined;
}

/** Bornes du sélecteur de date (de demain à un an), pour le navigateur. */
export function slotDateBounds(now: Date = new Date()) {
  const today = Date.parse(`${todayInDakar(now)}T00:00:00Z`);
  return {
    min: new Date(today + DAY_MS).toISOString().slice(0, 10),
    max: new Date(today + 366 * DAY_MS).toISOString().slice(0, 10),
  };
}

export function validateAppointment(data: AppointmentData, now: Date = new Date()): FieldErrors<AppointmentField> {
  const errors: FieldErrors<AppointmentField> = {
    reason: checkChoice(data.reason, fields.reason.options),
    pole: checkChoice(data.pole, fields.pole.options),
    mode: checkChoice(data.mode, fields.mode.options),
    slot1Date: checkSlotDate(data.slot1Date, now),
    slot1Period: data.slot1Period ? checkChoice(data.slot1Period, fields.slots.periods) : m.periodRequired,
    city: checkText(data.city, { max: limits.city }),
    comment: checkText(data.comment, { max: 1500 }),
    name: checkText(data.name, { required: true, max: limits.name }),
    company: checkText(data.company, { max: limits.company }),
  };

  // Second créneau facultatif, mais complet s'il est commencé.
  if (data.slot2Date) {
    errors.slot2Date = checkSlotDate(data.slot2Date, now);
    errors.slot2Period = data.slot2Period ? checkChoice(data.slot2Period, fields.slots.periods) : m.periodRequired;
  } else if (data.slot2Period) {
    errors.slot2Date = m.slotDateMissing;
  }

  if (!data.email && !data.phone) errors.contact = m.contactRequired;
  if (data.email && !isValidEmail(data.email)) errors.email = m.emailInvalid;
  if (data.phone && (data.phone.length > limits.phone || !isValidPhone(data.phone))) errors.phone = m.phoneInvalid;

  return Object.fromEntries(Object.entries(errors).filter(([, message]) => Boolean(message))) as FieldErrors<AppointmentField>;
}

export function parseAppointment(input: unknown): AppointmentData {
  const source = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const data = emptyAppointment();
  for (const key of Object.keys(data) as (keyof AppointmentData)[]) data[key] = toText(source[key]);
  return data;
}
