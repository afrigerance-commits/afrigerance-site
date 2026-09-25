"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { formCommon, quoteForm, type Option, type SubmitErrorCode } from "@/content/forms";
import { getPole, poleIds, servicePoles, type PoleId } from "@/content/services";
import { routes } from "@/content/site";
import type { FieldErrors } from "@/lib/forms/common";
import {
  emptyQuote,
  QUOTE_STEP_COUNT,
  stepOfQuoteField,
  toQuotePayload,
  validateQuote,
  validateQuoteStep,
  type QuoteData,
  type QuoteField,
} from "@/lib/forms/quote";
import { postForm } from "@/lib/forms/submission";
import { ArrowLeftIcon, CheckCircleIcon } from "../icons";
import { ButtonLink, buttonClasses } from "../ui/button";
import {
  ChoiceGroup,
  ErrorSummary,
  Honeypot,
  SubmitAlert,
  SubmitLabel,
  TextArea,
  TextField,
  type ErrorItem,
} from "./fields";

const { fields, steps, buttons, summary } = quoteForm;
type Status = "idle" | "submitting" | "success";

/** Identifiant DOM ciblé par chaque erreur (première case pour un groupe de choix). */
function targetIdOf(field: QuoteField): string {
  const groups: string[] = ["poles", "workstations", "infrastructure", "premises", "installation"];
  if (groups.includes(field) || field.startsWith("prestations-")) return `devis-${field}-0`;
  if (field === "contact") return "devis-email";
  return `devis-${field}`;
}

/** Nom court de chaque champ (celui du récapitulatif), repris dans la liste des erreurs. */
function labelOf(field: QuoteField): string {
  if (field.startsWith("prestations-")) {
    const pole = getPole(field.replace("prestations-", "") as PoleId);
    return `${summary.labels.prestations} (${pole.title})`;
  }
  return summary.labels[field as Exclude<QuoteField, `prestations-${PoleId}`>];
}

function optionLabel(options: readonly Option[], value: string) {
  return options.find((option) => option.value === value)?.label ?? "";
}

function prestationOptions(pole: PoleId): Option[] {
  return [
    ...getPole(pole).prestations.map((item) => ({ value: item.id, label: item.title })),
    fields.prestations.other,
  ];
}

export function QuoteForm({ initialPoles }: { initialPoles: PoleId[] }) {
  const [data, setData] = useState<QuoteData>(() => emptyQuote(initialPoles));
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrors<QuoteField>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState<SubmitErrorCode | null>(null);
  const [reference, setReference] = useState("");
  /** Incrémenté à chaque action qui doit déplacer le focus (changement d'étape, erreurs). */
  const [focusRequest, setFocusRequest] = useState<{ target: "heading" | "errors" | "success"; id: number } | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);
  const sendingRef = useRef(false);

  useEffect(() => {
    if (!focusRequest) return;
    const element =
      focusRequest.target === "errors"
        ? summaryRef.current
        : focusRequest.target === "success"
          ? successRef.current
          : headingRef.current;
    formTopRef.current?.scrollIntoView({ block: "start" });
    element?.focus({ preventScroll: true });
  }, [focusRequest]);

  const requestFocus = (target: "heading" | "errors" | "success") =>
    setFocusRequest((previous) => ({ target, id: (previous?.id ?? 0) + 1 }));

  const hasErrors = Object.keys(errors).length > 0;

  function update(patch: Partial<QuoteData>) {
    const next = { ...data, ...patch };
    setData(next);
    // Après une tentative, les messages se mettent à jour au fil de la correction.
    if (hasErrors) setErrors(validateQuoteStep(next, step));
    if (submitError) setSubmitError(null);
  }

  function togglePole(pole: PoleId, checked: boolean) {
    const poles = poleIds.filter((id) => (id === pole ? checked : data.poles.includes(id)));
    update({ poles });
  }

  function togglePrestation(pole: PoleId, value: string, checked: boolean) {
    const current = data.prestations[pole];
    const next = checked ? [...current, value] : current.filter((item) => item !== value);
    update({ prestations: { ...data.prestations, [pole]: next } });
  }

  function goTo(nextStep: number) {
    setErrors({});
    setSubmitError(null);
    setStep(nextStep);
    requestFocus("heading");
  }

  function showErrors(nextErrors: FieldErrors<QuoteField>, atStep: number) {
    setErrors(nextErrors);
    if (atStep !== step) setStep(atStep);
    requestFocus("errors");
  }

  async function submit() {
    const payload = toQuotePayload(data);
    const allErrors = validateQuote(payload);
    const firstField = Object.keys(allErrors)[0];
    if (firstField) {
      const target = stepOfQuoteField(firstField);
      showErrors(validateQuoteStep(payload, target), target);
      return;
    }

    if (sendingRef.current) return;
    sendingRef.current = true;
    setStatus("submitting");
    setSubmitError(null);
    const result = await postForm("/api/devis", payload);
    sendingRef.current = false;

    if (result.ok) {
      setReference(result.reference);
      setStatus("success");
      requestFocus("success");
      return;
    }

    setStatus("idle");
    const serverField = result.fieldErrors ? Object.keys(result.fieldErrors)[0] : undefined;
    if (result.code === "invalid" && serverField) {
      const target = stepOfQuoteField(serverField);
      const stepFields = Object.entries(result.fieldErrors ?? {}).filter(
        ([field]) => stepOfQuoteField(field) === target,
      );
      showErrors(Object.fromEntries(stepFields) as FieldErrors<QuoteField>, target);
      return;
    }
    setSubmitError(result.code);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    if (step < QUOTE_STEP_COUNT - 1) {
      const stepErrors = validateQuoteStep(data, step);
      if (Object.keys(stepErrors).length > 0) {
        showErrors(stepErrors, step);
        return;
      }
      goTo(step + 1);
      return;
    }
    void submit();
  }

  if (status === "success") {
    return (
      <div ref={formTopRef} className="border-success/30 bg-success-bg scroll-mt-6 rounded-lg border p-6 sm:p-8">
        <CheckCircleIcon className="text-success size-10" />
        <h2
          ref={successRef}
          tabIndex={-1}
          className="text-ink mt-4 text-2xl font-bold tracking-[-0.02em] sm:text-3xl"
        >
          {quoteForm.success.title}
        </h2>
        <p className="text-ink mt-3 max-w-[36em] text-lg leading-relaxed">{quoteForm.success.text}</p>
        <p className="text-ink mt-4">
          {formCommon.referenceLabel} <strong className="font-semibold">{reference}</strong>
        </p>
        <ButtonLink href={routes.home} variant="secondary" className="mt-8">
          {quoteForm.success.backHome}
        </ButtonLink>
      </div>
    );
  }

  const errorItems: ErrorItem[] = (Object.entries(errors) as [QuoteField, string][]).map(
    ([field, message]) => ({ label: labelOf(field), message, targetId: targetIdOf(field) }),
  );
  const isSummary = step === QUOTE_STEP_COUNT - 1;
  const pending = status === "submitting";

  return (
    <div ref={formTopRef} className="scroll-mt-6">
      <noscript>
        <p className="border-danger/40 bg-danger-bg text-danger mb-6 rounded-md border p-4 font-medium">
          {quoteForm.noscript}
        </p>
      </noscript>

      <ol aria-label={quoteForm.progressLabel} className="grid grid-cols-4 gap-2 sm:gap-3">
        {steps.map((item, index) => (
          <li key={item.id} aria-current={index === step ? "step" : undefined}>
            <span
              aria-hidden="true"
              className={`block h-1.5 rounded-full ${index <= step ? "bg-brand" : "bg-line"}`}
            />
            <span
              className={`mt-2 hidden text-sm sm:block ${
                index === step ? "text-ink font-semibold" : "text-muted"
              }`}
            >
              {index + 1}. {item.title}
            </span>
          </li>
        ))}
      </ol>

      <form noValidate onSubmit={handleSubmit} aria-labelledby="devis-step-title" className="relative mt-8">
        <p className="text-brand text-sm font-semibold">{quoteForm.stepCounter(step + 1, QUOTE_STEP_COUNT)}</p>
        <h2
          id="devis-step-title"
          ref={headingRef}
          tabIndex={-1}
          className="text-ink mt-1 text-[clamp(1.75rem,1.4rem+1.2vw,2.25rem)] leading-tight font-bold tracking-[-0.025em]"
        >
          {steps[step].title}
        </h2>
        <p className="text-muted mt-2">{isSummary ? summary.intro : formCommon.requiredNote}</p>

        <div className="mt-6">
          <ErrorSummary title={formCommon.errorSummaryTitle} items={errorItems} summaryRef={summaryRef} />
        </div>

        <Honeypot value={data.website} onChange={(website) => update({ website })} />

        <div className="mt-6 space-y-8">
          {step === 0 ? (
            <>
              <ChoiceGroup
                id="devis-poles"
                legend={fields.poles.legend}
                hint={fields.poles.hint}
                type="checkbox"
                options={servicePoles.map((pole) => ({
                  value: pole.id,
                  label: pole.title,
                  description: pole.description,
                }))}
                selected={data.poles}
                onToggle={(value, checked) => togglePole(value as PoleId, checked)}
                error={errors.poles}
              />
              {data.poles.map((pole) => (
                <ChoiceGroup
                  key={pole}
                  id={`devis-prestations-${pole}`}
                  legend={fields.prestations.legend(getPole(pole).title)}
                  hint={fields.prestations.hint}
                  type="checkbox"
                  options={prestationOptions(pole)}
                  selected={data.prestations[pole]}
                  onToggle={(value, checked) => togglePrestation(pole, value, checked)}
                  error={errors[`prestations-${pole}`]}
                />
              ))}
            </>
          ) : null}

          {step === 1 ? (
            <>
              <TextArea
                id="devis-description"
                label={fields.description.label}
                hint={fields.description.hint}
                value={data.description}
                onChange={(description) => update({ description })}
                error={errors.description}
                maxLength={3000}
              />
              <TextField
                id="devis-city"
                label={fields.city.label}
                value={data.city}
                onChange={(city) => update({ city })}
                error={errors.city}
                autoComplete="address-level2"
                maxLength={100}
              />
              {data.poles.includes("infogerance") ? (
                <div className="border-line space-y-8 border-t pt-8">
                  <h3 className="text-ink text-xl font-bold">{getPole("infogerance").title}</h3>
                  <ChoiceGroup
                    id="devis-workstations"
                    legend={fields.workstations.legend}
                    type="radio"
                    columns={3}
                    options={fields.workstations.options}
                    selected={[data.workstations]}
                    onToggle={(workstations) => update({ workstations })}
                    error={errors.workstations}
                  />
                  <ChoiceGroup
                    id="devis-infrastructure"
                    legend={fields.infrastructure.legend}
                    hint={fields.infrastructure.hint}
                    type="radio"
                    columns={3}
                    options={fields.infrastructure.options}
                    selected={[data.infrastructure]}
                    onToggle={(infrastructure) => update({ infrastructure })}
                    error={errors.infrastructure}
                  />
                </div>
              ) : null}
              {data.poles.includes("integration") ? (
                <div className="border-line space-y-8 border-t pt-8">
                  <h3 className="text-ink text-xl font-bold">{getPole("integration").title}</h3>
                  <ChoiceGroup
                    id="devis-premises"
                    legend={fields.premises.legend}
                    type="radio"
                    columns={2}
                    options={fields.premises.options}
                    selected={[data.premises]}
                    onToggle={(premises) => update({ premises })}
                    error={errors.premises}
                  />
                  <ChoiceGroup
                    id="devis-installation"
                    legend={fields.installation.legend}
                    type="radio"
                    columns={1}
                    options={fields.installation.options}
                    selected={[data.installation]}
                    onToggle={(installation) => update({ installation })}
                    error={errors.installation}
                  />
                </div>
              ) : null}
            </>
          ) : null}

          {step === 2 ? (
            <>
              <TextField
                id="devis-name"
                label={fields.name.label}
                value={data.name}
                onChange={(name) => update({ name })}
                error={errors.name}
                autoComplete="name"
                maxLength={100}
              />
              <TextField
                id="devis-company"
                label={fields.company.label}
                value={data.company}
                onChange={(company) => update({ company })}
                error={errors.company}
                optional
                autoComplete="organization"
                maxLength={150}
              />
              <fieldset
                aria-describedby={errors.contact ? "devis-contact-hint devis-contact-error" : "devis-contact-hint"}
                className="space-y-6"
              >
                <legend className="text-ink text-lg font-bold">{fields.contactGroup.legend}</legend>
                <p id="devis-contact-hint" className="text-muted -mt-4 text-sm leading-relaxed">
                  {fields.contactGroup.hint}
                </p>
                {errors.contact ? (
                  <p id="devis-contact-error" className="text-danger -mt-2 text-sm font-medium">
                    {errors.contact}
                  </p>
                ) : null}
                <TextField
                  id="devis-email"
                  label={fields.email.label}
                  type="email"
                  inputMode="email"
                  value={data.email}
                  onChange={(email) => update({ email })}
                  error={errors.email}
                  groupErrorId={errors.contact ? "devis-contact-error" : undefined}
                  optional
                  autoComplete="email"
                  maxLength={254}
                />
                <TextField
                  id="devis-phone"
                  label={fields.phone.label}
                  hint={fields.phone.hint}
                  type="tel"
                  inputMode="tel"
                  value={data.phone}
                  onChange={(phone) => update({ phone })}
                  error={errors.phone}
                  groupErrorId={errors.contact ? "devis-contact-error" : undefined}
                  optional
                  autoComplete="tel"
                  maxLength={30}
                />
              </fieldset>
              <p className="text-muted text-sm leading-relaxed">{formCommon.privacy}</p>
            </>
          ) : null}

          {isSummary ? <QuoteSummary data={toQuotePayload(data)} onEdit={goTo} /> : null}
        </div>

        {isSummary ? (
          <div className="mt-8 space-y-4">
            <p className="text-ink bg-surface rounded-md p-4 leading-relaxed">{summary.pricingNote}</p>
            <p className="text-muted text-sm leading-relaxed">{formCommon.privacy}</p>
          </div>
        ) : null}

        <div className="mt-8" aria-live="polite">
          <SubmitAlert message={submitError ? formCommon.submitErrors[submitError] : null} />
          {pending ? <p className="sr-only">{buttons.submitting}</p> : null}
        </div>

        <div className="border-line mt-8 flex flex-col-reverse gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              disabled={pending}
              className={buttonClasses("secondary")}
            >
              <ArrowLeftIcon className="size-5" />
              {buttons.back}
            </button>
          ) : (
            <span aria-hidden="true" className="hidden sm:block" />
          )}
          <button
            type="submit"
            disabled={pending}
            aria-disabled={pending}
            className={buttonClasses("primary", "lg")}
          >
            {isSummary ? (
              <SubmitLabel pending={pending} label={buttons.submit} pendingLabel={buttons.submitting} />
            ) : (
              buttons.next
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function QuoteSummary({ data, onEdit }: { data: QuoteData; onEdit: (step: number) => void }) {
  const labels = summary.labels;
  const empty = summary.notProvided;
  const sections: { step: number; title: string; rows: [string, string][] }[] = [
    {
      step: 0,
      title: steps[0].title,
      rows: [
        [labels.poles, data.poles.map((pole) => getPole(pole).title).join(", ")],
        ...data.poles.map(
          (pole): [string, string] => [
            `${labels.prestations} (${getPole(pole).title})`,
            data.prestations[pole]
              .map((value) => optionLabel(prestationOptions(pole), value))
              .join(", "),
          ],
        ),
      ],
    },
    {
      step: 1,
      title: steps[1].title,
      rows: [
        [labels.description, data.description],
        [labels.city, data.city],
        ...(data.poles.includes("infogerance")
          ? ([
              [labels.workstations, optionLabel(fields.workstations.options, data.workstations)],
              [labels.infrastructure, optionLabel(fields.infrastructure.options, data.infrastructure)],
            ] as [string, string][])
          : []),
        ...(data.poles.includes("integration")
          ? ([
              [labels.premises, optionLabel(fields.premises.options, data.premises)],
              [labels.installation, optionLabel(fields.installation.options, data.installation)],
            ] as [string, string][])
          : []),
      ],
    },
    {
      step: 2,
      title: steps[2].title,
      rows: [
        [labels.name, data.name],
        [labels.company, data.company],
        [labels.email, data.email],
        [labels.phone, data.phone],
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <section
          key={section.step}
          aria-labelledby={`recap-${section.step}`}
          className="border-line rounded-lg border p-5 sm:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 id={`recap-${section.step}`} className="text-ink text-lg font-bold">
              {section.title}
            </h3>
            <button
              type="button"
              onClick={() => onEdit(section.step)}
              className="text-brand hover:text-brand-dark -my-1 shrink-0 rounded-sm px-1 py-1 font-semibold underline underline-offset-2"
            >
              {buttons.edit}
              <span className="sr-only"> : {section.title}</span>
            </button>
          </div>
          <dl className="mt-4 space-y-3">
            {section.rows.map(([label, value]) => (
              <div key={label} className="grid gap-1 sm:grid-cols-[13rem_1fr] sm:gap-4">
                <dt className="text-muted text-sm font-medium sm:text-base">{label}</dt>
                <dd className={`break-words whitespace-pre-line ${value ? "text-ink" : "text-muted italic"}`}>
                  {value || empty}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
