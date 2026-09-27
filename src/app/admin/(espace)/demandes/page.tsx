import Link from "next/link";
import { NotificationBadge, StatusBadge, TypeBadge } from "@/components/admin/badges";
import { AlertIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/button";
import { adminText, requestStatusLabels, requestTypeLabels } from "@/content/admin";
import { listHref, parseListParams } from "@/lib/requests/filters";
import { requestStatuses, requestTypes } from "@/lib/requests/types";
import { requireAdmin } from "@/lib/server/auth";
import { formatDateTime } from "@/lib/server/notifications";
import { countNotificationIssues, countRequests, listRequests } from "@/lib/server/requests";

const text = adminText.list;
const filtersText = adminText.filters;
const fieldClass =
  "border-field text-ink mt-1.5 block h-11 w-full rounded-md border bg-white px-3 text-base focus-visible:outline-offset-1";
const labelClass = "text-ink block text-sm font-semibold";

export default async function RequestsPage({ searchParams }: PageProps<"/admin/demandes">) {
  await requireAdmin();
  const params = parseListParams(await searchParams);
  const [{ rows, total, page, pageCount }, issues, overall] = await Promise.all([
    listRequests(params),
    countNotificationIssues(),
    countRequests(),
  ]);
  const columns = text.columns;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-ink text-3xl font-bold tracking-[-0.02em]">{text.title}</h1>
        <p className="text-muted" aria-live="polite">
          {text.count(total)}
        </p>
      </div>

      {issues > 0 ? (
        <div role="status" className="border-danger/40 bg-danger-bg text-danger mt-6 flex flex-wrap items-start gap-3 rounded-md border p-4">
          <AlertIcon className="mt-0.5 size-5 shrink-0" />
          <p className="font-medium">{text.notificationAlert(issues)}</p>
          {!params.notificationIssues ? (
            <Link href={listHref({ notificationIssues: true })} className="rounded-sm font-semibold underline underline-offset-2">
              {text.notificationAlertLink}
            </Link>
          ) : null}
        </div>
      ) : null}

      <form method="get" action="/admin/demandes" aria-labelledby="filters-title" className="mt-6 rounded-lg bg-white p-5 shadow-sm">
        <h2 id="filters-title" className="text-ink text-lg font-bold">
          {filtersText.title}
        </h2>
        {params.invalidDates ? (
          <p role="alert" className="text-danger mt-2 text-sm font-medium">
            {filtersText.invalidDates}
          </p>
        ) : null}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label htmlFor="filter-type" className={labelClass}>
              {filtersText.type}
            </label>
            <select id="filter-type" name="type" defaultValue={params.type ?? ""} className={fieldClass}>
              <option value="">{filtersText.all}</option>
              {requestTypes.map((type) => (
                <option key={type} value={type}>
                  {requestTypeLabels[type]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filter-status" className={labelClass}>
              {filtersText.status}
            </label>
            <select id="filter-status" name="statut" defaultValue={params.status ?? ""} className={fieldClass}>
              <option value="">{filtersText.all}</option>
              {requestStatuses.map((status) => (
                <option key={status} value={status}>
                  {requestStatusLabels[status]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filter-notification" className={labelClass}>
              {filtersText.notification}
            </label>
            <select
              id="filter-notification"
              name="notification"
              defaultValue={params.notificationIssues ? "echec" : ""}
              className={fieldClass}
            >
              <option value="">{filtersText.allNotifications}</option>
              <option value="echec">{filtersText.notificationIssues}</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter-from" className={labelClass}>
              {filtersText.from}
            </label>
            <input id="filter-from" name="du" type="date" defaultValue={params.from} className={fieldClass} />
          </div>
          <div>
            <label htmlFor="filter-to" className={labelClass}>
              {filtersText.to}
            </label>
            <input id="filter-to" name="au" type="date" defaultValue={params.to} className={fieldClass} />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <button type="submit" className={buttonClasses("primary", "md", "min-h-11")}>
            {filtersText.apply}
          </button>
          <Link href="/admin/demandes" className="text-brand-dark rounded-sm font-semibold underline underline-offset-2">
            {filtersText.reset}
          </Link>
        </div>
      </form>

      {rows.length === 0 ? (
        <p className="text-muted mt-8 rounded-lg bg-white p-8 text-center shadow-sm">
          {overall === 0 ? text.emptyAll : text.empty}
        </p>
      ) : (
        <>
          {/* Ordinateur : tableau */}
          <div className="mt-8 hidden overflow-hidden rounded-lg bg-white shadow-sm md:block">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">{text.title}</caption>
              <thead className="border-line bg-surface border-b">
                <tr className="text-muted">
                  <th scope="col" className="px-4 py-3 font-semibold">{columns.reference}</th>
                  <th scope="col" className="px-4 py-3 font-semibold">{columns.receivedAt}</th>
                  <th scope="col" className="px-4 py-3 font-semibold">{columns.type}</th>
                  <th scope="col" className="px-4 py-3 font-semibold">{columns.contact}</th>
                  <th scope="col" className="px-4 py-3 font-semibold">{columns.summary}</th>
                  <th scope="col" className="px-4 py-3 font-semibold">{columns.status}</th>
                  <th scope="col" className="px-4 py-3 font-semibold">{columns.notification}</th>
                </tr>
              </thead>
              <tbody className="divide-line divide-y">
                {rows.map((row) => (
                  <tr key={row.id} className={row.status === "new" ? "bg-brand/[0.03]" : undefined}>
                    <td className="px-4 py-3">
                      <Link href={`/admin/demandes/${row.id}`} className="text-brand-dark rounded-sm font-semibold whitespace-nowrap underline underline-offset-2">
                        {row.reference}
                      </Link>
                    </td>
                    <td className="text-ink px-4 py-3 whitespace-nowrap">{formatDateTime(row.received_at)}</td>
                    <td className="px-4 py-3"><TypeBadge type={row.type} /></td>
                    <td className="text-ink px-4 py-3">
                      <span className="block font-medium">{row.name}</span>
                      {row.company ? <span className="text-muted block">{row.company}</span> : null}
                    </td>
                    <td className="text-ink max-w-[22rem] px-4 py-3">
                      <span className="line-clamp-2">{row.summary}</span>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                    <td className="px-4 py-3"><NotificationBadge status={row.notification_status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Téléphone et tablette : cartes */}
          <ul className="mt-8 space-y-4 md:hidden">
            {rows.map((row) => (
              <li key={row.id} className="rounded-lg bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <TypeBadge type={row.type} />
                  <StatusBadge status={row.status} />
                  <NotificationBadge status={row.notification_status} />
                </div>
                <p className="text-ink mt-3 font-semibold">
                  {row.name}
                  {row.company ? <span className="text-muted font-normal"> · {row.company}</span> : null}
                </p>
                <p className="text-ink mt-1 line-clamp-2">{row.summary}</p>
                <p className="text-muted mt-2 text-sm">
                  {row.reference} · {formatDateTime(row.received_at)}
                </p>
                <Link href={`/admin/demandes/${row.id}`} className={buttonClasses("secondary", "md", "mt-4 w-full min-h-11")}>
                  {text.open}
                  <span className="sr-only"> : {row.reference}</span>
                </Link>
              </li>
            ))}
          </ul>

          {pageCount > 1 ? (
            <nav aria-label={text.page(page, pageCount)} className="mt-6 flex items-center justify-between gap-4">
              {page > 1 ? (
                <Link href={listHref({ ...params, page: page - 1 })} className={buttonClasses("secondary", "md", "min-h-11")}>
                  {text.previous}
                </Link>
              ) : (
                <span />
              )}
              <span className="text-muted text-sm">{text.page(page, pageCount)}</span>
              {page < pageCount ? (
                <Link href={listHref({ ...params, page: page + 1 })} className={buttonClasses("secondary", "md", "min-h-11")}>
                  {text.next}
                </Link>
              ) : (
                <span />
              )}
            </nav>
          ) : null}
        </>
      )}
    </>
  );
}
