"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { appointmentForm, formCommon, type SubmitErrorCode } from "@/content/forms";
import type { FieldErrors } from "@/lib/forms/common";
import {
  emptyAppointment,
  slotDateBounds,
  validateAppointment,
  type AppointmentData,
  type AppointmentField,
} from "@/lib/forms/appointment";
import { postForm } from "@/lib/forms/submission";
import { useSubmissionMeta } from "@/lib/forms/useSubmissionMeta";
import { buttonClasses } from "../ui/button";
import {
  ChoiceGroup,
  ErrorSummary,
  Honeypot,
  SelectField,
  SubmitAlert,
  SubmitLabel,
  SuccessPanel,
  TextArea,
  TextField,
  type ErrorItem,
} from "./fields";

const { fields, labels, sections, buttons } = appointmentForm;
type Status = "idle" | "submitting" | "success";

const choiceFields: AppointmentField[] = ["reason", "pole", "mode"];

/*
 * Bornes du calendrier (de demain à un an) calculées dans le navigateur :
 * le rendu serveur n'en met aucune, ce qui évite tout écart de date entre serveur et visiteur.
 */
type Bounds = { min?: string; max?: string };
const NO_BOUNDS: Bounds = {};
let clientBounds: Bounds | null = null;
const getClientBounds = () => (clientBounds ??= slotDateBounds());
const subscribeNever = () => () => {};

/** Identifiant DOM ciblé par chaque erreur (première case pour un groupe de choix). */
function targetIdOf(field: AppointmentField): string {
  if (choiceFields.includes(field)) return `rdv-${field}-0`;
  if (field === "contact") return "rdv-email";
  return `rdv-${field}`;
}

function Section({ index, title, children }: { index: number; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`rdv-section-${index}`} className="border-line space-y-7 border-t pt-8 first:border-t-0 first:pt-0">
      <h3 id={`rdv-section-${index}`} className="text-ink flex items-center gap-3 text-xl font-semibold tracking-[-0.015em]">
        <span className="text-brand font-mono text-sm">{String(index).padStart(2, "0")}</span>
        {title}
      </h3>
      {children}
    </section>
  );
}

export function AppointmentForm() {
  const [data, setData] = useState<AppointmentData>(emptyAppointment);
  const [errors, setErrors] = useState<FieldErrors<AppointmentField>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState<SubmitErrorCode | null>(null);
  const [reference, setReference] = useState("");
  const bounds = useSyncExternalStore(subscribeNever, getClientBounds, () => NO_BOUNDS);
  const [focusRequest, setFocusRequest] = useState<{ target: "errors" | "success" | "form"; id: number } | null>(null);

  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const sendingRef = useRef(false);
  const submission = useSubmissionMeta();

  useEffect(() => {
    if (!focusRequest) return;
    const element =
      focusRequest.target === "errors"
        ? summaryRef.current
        : focusRequest.target === "success"
          ? successRef.current
          : titleRef.current;
    topRef.current?.scrollIntoView({ block: "start" });
    element?.focus({ preventScroll: true });
  }, [focusRequest]);

  const requestFocus = (target: "errors" | "success" | "form") =>
    setFocusRequest((previous) => ({ target, id: (previous?.id ?? 0) + 1 }));

  function update(patch: Partial<AppointmentData>) {
    const next = { ...data, ...patch };
    setData(next);
    if (Object.keys(errors).length > 0) setErrors(validateAppointment(next));
    if (submitError) setSubmitError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || sendingRef.current) return;

    const nextErrors = validateAppointment(data);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      requestFocus("errors");
      return;
    }

    setErrors({});
    setSubmitError(null);
    sendingRef.current = true;
    setStatus("submitting");
    const result = await postForm("/api/rendez-vous", { ...data, ...submission.meta() });
    sendingRef.current = false;

    if (result.ok) {
      setReference(result.reference);
      setStatus("success");
      requestFocus("success");
      return;
    }

    setStatus("idle");
    if (result.code === "invalid" && result.fieldErrors) {
      setErrors(result.fieldErrors as FieldErrors<AppointmentField>);
      requestFocus("errors");
      return;
    }
    setSubmitError(result.code);
  }

  function reset() {
    submission.renew();
    setData(emptyAppointment());
    setErrors({});
    setSubmitError(null);
    setReference("");
    setStatus("idle");
    requestFocus("form");
  }

  if (status === "success") {
    return (
      <div ref={topRef} className="scroll-mt-32">
        <SuccessPanel
          title={appointmentForm.success.title}
          text={appointmentForm.success.text}
          reference={reference}
          referenceLabel={formCommon.referenceLabel}
          headingRef={successRef}
        >
          <button type="button" onClick={reset} className={buttonClasses("secondary", "md")}>
            {buttons.again}
          </button>
        </SuccessPanel>
      </div>
    );
  }

  const errorItems: ErrorItem[] = (Object.entries(errors) as [AppointmentField, string][]).map(([field, message]) => ({
    label: labels[field],
    message,
    targetId: targetIdOf(field),
  }));
  const pending = status === "submitting";

  return (
    <div ref={topRef} className="scroll-mt-32">
      <noscript>
        <p className="border-danger/40 bg-danger-bg text-danger mb-6 rounded-2xl border p-4 font-medium">{appointmentForm.noscript}</p>
      </noscript>
      <h2
        id="rdv-form-title"
        ref={titleRef}
        tabIndex={-1}
        className="text-display text-ink text-[clamp(1.875rem,1.4rem+1.6vw,2.75rem)]"
      >
        {appointmentForm.title}
      </h2>
      <p className="text-muted mt-2">{formCommon.requiredNote}</p>

      <form noValidate onSubmit={handleSubmit} aria-labelledby="rdv-form-title" className="relative mt-8 space-y-10">
        <ErrorSummary title={formCommon.errorSummaryTitle} items={errorItems} summaryRef={summaryRef} />
        <Honeypot value={data.website} onChange={(website) => update({ website })} />

        <Section index={1} title={sections.request}>
          <ChoiceGroup
            id="rdv-reason"
            legend={fields.reason.legend}
            type="radio"
            options={fields.reason.options}
            selected={[data.reason]}
            onToggle={(reason) => update({ reason })}
            error={errors.reason}
          />
          <ChoiceGroup
            id="rdv-pole"
            legend={fields.pole.legend}
            type="radio"
            options={fields.pole.options}
            selected={[data.pole]}
            onToggle={(pole) => update({ pole })}
            error={errors.pole}
            columns={3}
          />
        </Section>

        <Section index={2} title={sections.meeting}>
          <ChoiceGroup
            id="rdv-mode"
            legend={fields.mode.legend}
            hint={fields.mode.hint}
            type="radio"
            options={fields.mode.options}
            selected={[data.mode]}
            onToggle={(mode) => update({ mode })}
            error={errors.mode}
            columns={3}
          />
          <fieldset aria-describedby="rdv-slots-hint" className="space-y-5">
            <legend className="text-ink text-base font-semibold">{fields.slots.legend}</legend>
            <p id="rdv-slots-hint" className="text-muted -mt-3 text-sm leading-relaxed">
              {fields.slots.hint}
            </p>
            {([1, 2] as const).map((slot) => {
              const dateKey = `slot${slot}Date` as const;
              const periodKey = `slot${slot}Period` as const;
              const optional = slot === 2;
              return (
                <div key={slot} className="bg-surface rounded-2xl p-5">
                  <p className="text-ink mb-4 font-medium">{slot === 1 ? fields.slots.first : fields.slots.second}</p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextField
                      id={`rdv-${dateKey}`}
                      label={fields.slots.date}
                      type="date"
                      value={data[dateKey]}
                      onChange={(value) => update({ [dateKey]: value })}
                      error={errors[dateKey]}
                      optional={optional}
                      min={bounds.min}
                      max={bounds.max}
                    />
                    <SelectField
                      id={`rdv-${periodKey}`}
                      label={fields.slots.period}
                      value={data[periodKey]}
                      onChange={(value) => update({ [periodKey]: value })}
                      options={fields.slots.periods}
                      placeholder={formCommon.selectPlaceholder}
                      error={errors[periodKey]}
                      optional={optional}
                    />
                  </div>
                </div>
              );
            })}
          </fieldset>
          <TextField
            id="rdv-city"
            label={fields.city.label}
            hint={fields.city.hint}
            value={data.city}
            onChange={(city) => update({ city })}
            error={errors.city}
            optional
            autoComplete="address-level2"
            maxLength={100}
          />
        </Section>

        <Section index={3} title={sections.contact}>
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              id="rdv-name"
              label={fields.name.label}
              value={data.name}
              onChange={(name) => update({ name })}
              error={errors.name}
              autoComplete="name"
              maxLength={100}
            />
            <TextField
              id="rdv-company"
              label={fields.company.label}
              value={data.company}
              onChange={(company) => update({ company })}
              error={errors.company}
              optional
              autoComplete="organization"
              maxLength={150}
            />
          </div>
          <fieldset aria-describedby={`rdv-contact-hint${errors.contact ? " rdv-contact-error" : ""}`} className="space-y-6">
            <legend className="text-ink text-base font-semibold">{fields.contactGroup.legend}</legend>
            <p id="rdv-contact-hint" className="text-muted -mt-4 text-sm leading-relaxed">
              {fields.contactGroup.hint}
            </p>
            {errors.contact ? (
              <p id="rdv-contact-error" className="text-danger -mt-2 text-sm font-medium">
                {errors.contact}
              </p>
            ) : null}
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField
                id="rdv-email"
                label={fields.email.label}
                type="email"
                inputMode="email"
                value={data.email}
                onChange={(email) => update({ email })}
                error={errors.email}
                groupErrorId={errors.contact ? "rdv-contact-error" : undefined}
                optional
                autoComplete="email"
                maxLength={254}
              />
              <TextField
                id="rdv-phone"
                label={fields.phone.label}
                hint={fields.phone.hint}
                type="tel"
                inputMode="tel"
                value={data.phone}
                onChange={(phone) => update({ phone })}
                error={errors.phone}
                groupErrorId={errors.contact ? "rdv-contact-error" : undefined}
                optional
                autoComplete="tel"
                maxLength={30}
              />
            </div>
          </fieldset>
          <TextArea
            id="rdv-comment"
            label={fields.comment.label}
            hint={fields.comment.hint}
            value={data.comment}
            onChange={(comment) => update({ comment })}
            error={errors.comment}
            maxLength={1500}
            rows={4}
            optional
          />
        </Section>

        <p className="text-muted text-sm leading-relaxed">{formCommon.privacy}</p>

        <div aria-live="polite">
          <SubmitAlert message={submitError ? formCommon.submitErrors[submitError] : null} />
          {pending ? <p className="sr-only">{buttons.submitting}</p> : null}
        </div>

        <button type="submit" disabled={pending} aria-disabled={pending} className={buttonClasses("primary", "lg", "w-full sm:w-auto")}>
          <SubmitLabel pending={pending} label={buttons.submit} pendingLabel={buttons.submitting} />
        </button>
      </form>
    </div>
  );
}
