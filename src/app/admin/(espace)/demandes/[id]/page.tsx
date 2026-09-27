import Link from "next/link";
import { notFound } from "next/navigation";
import { resendNotificationAction, updateStatusAction } from "@/app/admin/actions";
import { NotificationBadge, StatusBadge, TypeBadge } from "@/components/admin/badges";
import { PendingButton } from "@/components/admin/ui";
import { AlertIcon, ArrowLeftIcon, CheckCircleIcon } from "@/components/icons";
import { adminText, eventLabels, requestStatusLabels } from "@/content/admin";
import { formatAnswers } from "@/lib/requests/records";
import { isRequestStatus, requestStatuses, type RequestStatus } from "@/lib/requests/types";
import { requireAdmin } from "@/lib/server/auth";
import { formatDateTime } from "@/lib/server/notifications";
import { getRequestDetail, type RequestEvent } from "@/lib/server/requests";

const text = adminText.detail;
const cardClass = "rounded-lg bg-white p-5 shadow-sm sm:p-6";
const cardTitleClass = "text-ink text-lg font-bold";
const linkClass = "text-brand-dark rounded-sm font-semibold underline underline-offset-2";

function eventLabel(event: RequestEvent): string {
  if (event.kind === "status_changed" && event.detail) {
    const [from, to] = event.detail.split(":");
    const label = (value: string) => (isRequestStatus(value) ? requestStatusLabels[value] : value);
    return eventLabels.status_changed(label(from), label(to));
  }
  if (event.kind === "status_changed") return eventLabels.status_changed("?", "?");
  return eventLabels[event.kind];
}

/** Étape suivante mise en avant : Nouveau → En cours → Traité. */
const nextStatus: Record<RequestStatus, RequestStatus | null> = {
  new: "in_progress",
  in_progress: "done",
  done: null,
};

/** Garde le + initial et les chiffres, pour le lien d'appel. */
function dialable(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return phone.trim().startsWith("+") ? `+${digits}` : digits;
}

export default async function RequestDetailPage({
  params,
  searchParams,
}: PageProps<"/admin/demandes/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const { notification } = await searchParams;
  const detail = await getRequestDetail(id);
  if (!detail) notFound();
  const { request, events } = detail;
  const answers = formatAnswers(request.type, request.answers);

  return (
    <>
      <Link href="/admin/demandes" className={`${linkClass} inline-flex items-center gap-2`}>
        <ArrowLeftIcon className="size-4" />
        {text.back}
      </Link>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <h1 className="text-ink text-2xl font-bold tracking-[-0.02em] sm:text-3xl">{request.reference}</h1>
        <TypeBadge type={request.type} />
        <StatusBadge status={request.status} />
      </div>
      <p className="text-muted mt-2">
        {text.receivedAt} {formatDateTime(request.received_at)}
      </p>

      {notification === "envoyee" ? (
        <p role="status" className="border-success/30 bg-success-bg text-success mt-5 flex items-center gap-3 rounded-md border p-4 font-medium">
          <CheckCircleIcon className="size-5 shrink-0" />
          {text.resent}
        </p>
      ) : null}
      {notification === "echec" ? (
        <p role="alert" className="border-danger/40 bg-danger-bg text-danger mt-5 flex items-center gap-3 rounded-md border p-4 font-medium">
          <AlertIcon className="size-5 shrink-0" />
          {text.resendFailed}
        </p>
      ) : null}
      {notification === "en-cours" || notification === "deja-envoyee" ? (
        <p role="status" className="bg-warning-bg text-warning mt-5 flex items-center gap-3 rounded-md p-4 font-medium">
          <AlertIcon className="size-5 shrink-0" />
          {notification === "en-cours" ? text.resendBusy : text.alreadySent}
        </p>
      ) : null}

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="space-y-6">
          <section aria-labelledby="contact-title" className={cardClass}>
            <h2 id="contact-title" className={cardTitleClass}>
              {text.contactTitle}
            </h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-[10rem_1fr]">
              <dt className="text-muted text-sm font-medium">{text.nameLabel}</dt>
              <dd className="text-ink font-medium">{request.name}</dd>
              <dt className="text-muted text-sm font-medium">{text.companyLabel}</dt>
              <dd className={request.company ? "text-ink" : "text-muted italic"}>{request.company ?? text.notProvided}</dd>
              <dt className="text-muted text-sm font-medium">{text.emailLabel}</dt>
              <dd className="break-all">
                {request.email ? (
                  <a href={`mailto:${request.email}`} className={linkClass}>
                    {request.email}
                  </a>
                ) : (
                  <span className="text-muted italic">{text.notProvided}</span>
                )}
              </dd>
              <dt className="text-muted text-sm font-medium">{text.phoneLabel}</dt>
              <dd>
                {request.phone ? (
                  <a href={`tel:${dialable(request.phone)}`} className={linkClass}>
                    {request.phone}
                  </a>
                ) : (
                  <span className="text-muted italic">{text.notProvided}</span>
                )}
              </dd>
            </dl>
          </section>

          <section aria-labelledby="answers-title" className={cardClass}>
            <h2 id="answers-title" className={cardTitleClass}>
              {text.answersTitle}
            </h2>
            <dl className="mt-4 space-y-4">
              {answers.map((row) => (
                <div key={row.label}>
                  <dt className="text-muted text-sm font-medium">{row.label}</dt>
                  <dd className={`mt-1 break-words whitespace-pre-line ${row.value ? "text-ink" : "text-muted italic"}`}>
                    {row.value || text.notProvided}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <div className="space-y-6">
          <section aria-labelledby="status-title" className={cardClass}>
            <h2 id="status-title" className={cardTitleClass}>
              {text.statusTitle}
            </h2>
            <p className="text-ink mt-3 flex items-center gap-2">
              {text.statusIntro} <StatusBadge status={request.status} />
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {requestStatuses
                .filter((status) => status !== request.status)
                .map((status) => (
                  <form key={status} action={updateStatusAction}>
                    <input type="hidden" name="id" value={request.id} />
                    <input type="hidden" name="status" value={status} />
                    <PendingButton
                      variant={nextStatus[request.status] === status ? "primary" : "secondary"}
                      pendingLabel={text.pending}
                      className="w-full"
                    >
                      {text.setStatus(requestStatusLabels[status])}
                    </PendingButton>
                  </form>
                ))}
            </div>
          </section>

          <section aria-labelledby="notification-title" className={cardClass}>
            <h2 id="notification-title" className={cardTitleClass}>
              {text.notificationTitle}
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <NotificationBadge status={request.notification_status} />
              <span className="text-muted text-sm">{text.notificationAttempts(request.notification_attempts)}</span>
            </div>
            {request.notified_at ? (
              <p className="text-ink mt-3 text-sm">
                {text.notifiedAt} {formatDateTime(request.notified_at)}
              </p>
            ) : null}
            {request.notification_status !== "sent" && request.notification_error ? (
              <p className="bg-danger-bg text-danger mt-3 rounded-md p-3 text-sm break-words">
                <span className="font-semibold">{text.lastError}</span> {request.notification_error}
              </p>
            ) : null}
            {request.notification_status !== "sent" ? (
              <form action={resendNotificationAction} className="mt-4">
                <input type="hidden" name="id" value={request.id} />
                <PendingButton variant="secondary" pendingLabel={text.pending} className="w-full">
                  {text.resend}
                </PendingButton>
              </form>
            ) : null}
          </section>

          <section aria-labelledby="history-title" className={cardClass}>
            <h2 id="history-title" className={cardTitleClass}>
              {text.historyTitle}
            </h2>
            <ol className="border-line mt-4 space-y-4 border-l pl-4">
              {events.map((event) => (
                <li key={event.id}>
                  <p className="text-ink text-sm font-medium">{eventLabel(event)}</p>
                  <p className="text-muted text-xs">
                    {formatDateTime(event.occurred_at)} · {event.actor}
                  </p>
                  {event.kind === "notification_failed" && event.detail ? (
                    <p className="text-muted mt-1 text-xs break-words">{event.detail}</p>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </>
  );
}
