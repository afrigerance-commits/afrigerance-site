"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { contactForm, formCommon, type SubmitErrorCode } from "@/content/forms";
import type { FieldErrors } from "@/lib/forms/common";
import {
  emptyContact,
  validateContactMessage,
  type ContactData,
  type ContactField,
} from "@/lib/forms/contact";
import { postForm } from "@/lib/forms/submission";
import { useSubmissionMeta } from "@/lib/forms/useSubmissionMeta";
import { CheckCircleIcon } from "../icons";
import { buttonClasses } from "../ui/button";
import {
  ErrorSummary,
  Honeypot,
  SubmitAlert,
  SubmitLabel,
  TextArea,
  TextField,
  type ErrorItem,
} from "./fields";

const { fields, buttons } = contactForm;
type Status = "idle" | "submitting" | "success";

export function ContactForm() {
  const [data, setData] = useState<ContactData>(emptyContact);
  const [errors, setErrors] = useState<FieldErrors<ContactField>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState<SubmitErrorCode | null>(null);
  const [reference, setReference] = useState("");
  const [focusRequest, setFocusRequest] = useState<{ target: "errors" | "success" | "form"; id: number } | null>(null);

  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
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
    element?.focus();
  }, [focusRequest]);

  const requestFocus = (target: "errors" | "success" | "form") =>
    setFocusRequest((previous) => ({ target, id: (previous?.id ?? 0) + 1 }));

  function update(patch: Partial<ContactData>) {
    const next = { ...data, ...patch };
    setData(next);
    if (Object.keys(errors).length > 0) setErrors(validateContactMessage(next));
    if (submitError) setSubmitError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || sendingRef.current) return;

    const nextErrors = validateContactMessage(data);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      requestFocus("errors");
      return;
    }

    setErrors({});
    setSubmitError(null);
    sendingRef.current = true;
    setStatus("submitting");
    const result = await postForm("/api/contact", { ...data, ...submission.meta() });
    sendingRef.current = false;

    if (result.ok) {
      setReference(result.reference);
      setStatus("success");
      requestFocus("success");
      return;
    }

    setStatus("idle");
    if (result.code === "invalid" && result.fieldErrors) {
      setErrors(result.fieldErrors as FieldErrors<ContactField>);
      requestFocus("errors");
      return;
    }
    setSubmitError(result.code);
  }

  function reset() {
    submission.renew();
    setData(emptyContact());
    setErrors({});
    setSubmitError(null);
    setReference("");
    setStatus("idle");
    requestFocus("form");
  }

  if (status === "success") {
    return (
      <div className="border-success/30 bg-success-bg rounded-lg border p-6 sm:p-8">
        <CheckCircleIcon className="text-success size-10" />
        <h2 ref={successRef} tabIndex={-1} className="text-ink mt-4 text-2xl font-bold tracking-[-0.02em]">
          {contactForm.success.title}
        </h2>
        <p className="text-ink mt-3 leading-relaxed">{contactForm.success.text}</p>
        <p className="text-ink mt-4">
          {formCommon.referenceLabel} <strong className="font-semibold">{reference}</strong>
        </p>
        <button type="button" onClick={reset} className={buttonClasses("secondary", "md", "mt-6")}>
          {buttons.again}
        </button>
      </div>
    );
  }

  const errorItems: ErrorItem[] = (Object.entries(errors) as [ContactField, string][]).map(
    ([field, message]) => ({ label: fields[field].label, message, targetId: `contact-${field}` }),
  );
  const pending = status === "submitting";

  return (
    <div>
      <noscript>
        <p className="border-danger/40 bg-danger-bg text-danger mb-6 rounded-md border p-4 font-medium">
          {contactForm.noscript}
        </p>
      </noscript>
      <h2
        id="contact-form-title"
        ref={titleRef}
        tabIndex={-1}
        className="text-ink text-[clamp(1.75rem,1.4rem+1.2vw,2.25rem)] leading-tight font-bold tracking-[-0.025em]"
      >
        {contactForm.title}
      </h2>
      <p className="text-muted mt-2">{formCommon.requiredNote}</p>

      <form noValidate onSubmit={handleSubmit} aria-labelledby="contact-form-title" className="relative mt-6 space-y-6">
        <ErrorSummary title={formCommon.errorSummaryTitle} items={errorItems} summaryRef={summaryRef} />
        <Honeypot value={data.website} onChange={(website) => update({ website })} />
        <TextField
          id="contact-name"
          label={fields.name.label}
          value={data.name}
          onChange={(name) => update({ name })}
          error={errors.name}
          autoComplete="name"
          maxLength={100}
        />
        <TextField
          id="contact-contact"
          label={fields.contact.label}
          hint={fields.contact.hint}
          value={data.contact}
          onChange={(contact) => update({ contact })}
          error={errors.contact}
          autoComplete="email"
          maxLength={254}
        />
        <TextField
          id="contact-subject"
          label={fields.subject.label}
          value={data.subject}
          onChange={(subject) => update({ subject })}
          error={errors.subject}
          maxLength={150}
        />
        <TextArea
          id="contact-message"
          label={fields.message.label}
          hint={fields.message.hint}
          value={data.message}
          onChange={(message) => update({ message })}
          error={errors.message}
          maxLength={3000}
        />
        <p className="text-muted text-sm leading-relaxed">{formCommon.privacy}</p>

        <div aria-live="polite">
          <SubmitAlert message={submitError ? formCommon.submitErrors[submitError] : null} />
          {pending ? <p className="sr-only">{buttons.submitting}</p> : null}
        </div>

        <button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className={buttonClasses("primary", "lg", "w-full sm:w-auto")}
        >
          <SubmitLabel pending={pending} label={buttons.submit} pendingLabel={buttons.submitting} />
        </button>
      </form>
    </div>
  );
}
