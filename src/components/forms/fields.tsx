"use client";

import type { ChangeEvent, ReactNode, RefObject } from "react";
import { formCommon } from "@/content/forms";
import { AlertIcon, SpinnerIcon } from "../icons";

function describedBy(...ids: (string | false | undefined)[]) {
  const value = ids.filter(Boolean).join(" ");
  return value || undefined;
}

const inputBase =
  "mt-2 block w-full rounded-md border bg-white px-4 text-base text-ink placeholder:text-muted focus-visible:outline-offset-1";

function inputState(error?: string) {
  return error ? "border-danger border-2" : "border-field";
}

function Label({ htmlFor, children, optional }: { htmlFor: string; children: ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="text-ink block text-base font-semibold">
      {children}
      {optional ? (
        <span className="text-muted font-normal"> ({formCommon.optional})</span>
      ) : null}
    </label>
  );
}

export function FieldHint({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="text-muted mt-1 text-sm leading-relaxed">
      {children}
    </p>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-danger mt-2 flex items-start gap-2 text-sm font-medium">
      <AlertIcon className="mt-px size-4 shrink-0" />
      <span>{message}</span>
    </p>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  error?: string;
  /** Erreur commune à plusieurs champs (ex. « au moins un moyen de contact »). */
  groupErrorId?: string;
  optional?: boolean;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel";
  maxLength?: number;
};

export function TextField({
  id,
  label,
  value,
  onChange,
  hint,
  error,
  groupErrorId,
  optional,
  type = "text",
  autoComplete,
  inputMode,
  maxLength,
}: TextFieldProps) {
  return (
    <div>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      {hint ? <FieldHint id={`${id}-hint`}>{hint}</FieldHint> : null}
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        required={!optional}
        aria-invalid={error || groupErrorId ? true : undefined}
        aria-describedby={describedBy(hint && `${id}-hint`, error && `${id}-error`, groupErrorId)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        className={`${inputBase} h-12 ${inputState(error)}`}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

type TextAreaProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  error?: string;
  maxLength?: number;
  rows?: number;
};

export function TextArea({ id, label, value, onChange, hint, error, maxLength, rows = 6 }: TextAreaProps) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {hint ? <FieldHint id={`${id}-hint`}>{hint}</FieldHint> : null}
      <textarea
        id={id}
        name={id}
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        required
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hint && `${id}-hint`, error && `${id}-error`)}
        maxLength={maxLength}
        className={`${inputBase} py-3 leading-relaxed ${inputState(error)}`}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export type ChoiceOption = {
  value: string;
  label: string;
  description?: string;
};

type ChoiceGroupProps = {
  /** Préfixe des identifiants ; la première option reçoit `${id}-0` (cible des liens d'erreur). */
  id: string;
  legend: string;
  type: "radio" | "checkbox";
  options: readonly ChoiceOption[];
  selected: readonly string[];
  onToggle: (value: string, checked: boolean) => void;
  hint?: string;
  error?: string;
  columns?: 1 | 2 | 3;
};

const columnClasses = {
  1: "",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
} as const;

export function ChoiceGroup({
  id,
  legend,
  type,
  options,
  selected,
  onToggle,
  hint,
  error,
  columns = 2,
}: ChoiceGroupProps) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <fieldset aria-describedby={describedBy(hint && `${id}-hint`, errorId)}>
      <legend className="text-ink text-base font-semibold">{legend}</legend>
      {hint ? <FieldHint id={`${id}-hint`}>{hint}</FieldHint> : null}
      <FieldError id={`${id}-error`} message={error} />
      <div className={`mt-3 grid gap-3 ${columnClasses[columns]}`}>
        {options.map((option, index) => {
          const inputId = `${id}-${index}`;
          const checked = selected.includes(option.value);
          return (
            <label
              key={option.value}
              htmlFor={inputId}
              className={`flex cursor-pointer items-start gap-3 rounded-md border bg-white p-4 transition-colors hover:border-brand has-checked:border-brand has-checked:bg-brand/5 ${
                error ? "border-danger" : "border-line"
              }`}
            >
              <input
                id={inputId}
                type={type}
                name={id}
                value={option.value}
                checked={checked}
                onChange={(event) => onToggle(option.value, event.target.checked)}
                required={type === "radio"}
                aria-invalid={error ? true : undefined}
                aria-labelledby={option.description ? `${inputId}-label` : undefined}
                aria-describedby={option.description ? `${inputId}-description` : undefined}
                className="accent-brand mt-0.5 size-5 shrink-0"
              />
              <span className="min-w-0">
                <span id={`${inputId}-label`} className="text-ink block font-medium">
                  {option.label}
                </span>
                {option.description ? (
                  <span id={`${inputId}-description`} className="text-muted mt-1 block text-sm leading-relaxed">
                    {option.description}
                  </span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export type ErrorItem = {
  /** Nom du champ concerné, affiché avant le message. */
  label: string;
  message: string;
  /** Identifiant de l'élément à focaliser quand on clique sur l'erreur. */
  targetId: string;
};

export function ErrorSummary({
  title,
  items,
  summaryRef,
}: {
  title: string;
  items: ErrorItem[];
  summaryRef: RefObject<HTMLDivElement | null>;
}) {
  if (items.length === 0) return null;
  return (
    <div
      ref={summaryRef}
      tabIndex={-1}
      aria-labelledby="error-summary-title"
      className="border-danger/40 bg-danger-bg rounded-md border p-5 focus-visible:outline-offset-2"
    >
      <h3 id="error-summary-title" className="text-danger flex items-center gap-2 font-semibold">
        <AlertIcon className="size-5 shrink-0" />
        {title}
      </h3>
      <ul className="text-danger mt-3 list-disc space-y-1.5 pl-6">
        {items.map((item) => (
          <li key={item.targetId + item.message}>
            <a
              href={`#${item.targetId}`}
              onClick={(event) => {
                event.preventDefault();
                document.getElementById(item.targetId)?.focus();
              }}
              className="rounded-sm underline underline-offset-2 hover:no-underline"
            >
              {item.label} : {item.message.charAt(0).toLowerCase() + item.message.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Message d'échec d'envoi, annoncé immédiatement aux lecteurs d'écran. */
export function SubmitAlert({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="border-danger/40 bg-danger-bg text-danger flex items-start gap-3 rounded-md border p-4 font-medium"
    >
      <AlertIcon className="mt-0.5 size-5 shrink-0" />
      <p>{message}</p>
    </div>
  );
}

/** Contenu du bouton d'envoi, avec indicateur de chargement. */
export function SubmitLabel({ pending, label, pendingLabel }: { pending: boolean; label: string; pendingLabel: string }) {
  return pending ? (
    <>
      <SpinnerIcon className="size-5 motion-safe:animate-spin" />
      {pendingLabel}
    </>
  ) : (
    <>{label}</>
  );
}

/** Champ piège invisible pour les robots : les personnes ne le voient pas et ne peuvent pas l'atteindre. */
export function Honeypot({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">{formCommon.honeypotLabel}</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
