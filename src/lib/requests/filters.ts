/** Lecture sûre des filtres de la liste des demandes (paramètres d'URL). */
import { isRequestStatus, isRequestType, type RequestStatus, type RequestType } from "./types";

export type ListParams = {
  type?: RequestType;
  status?: RequestStatus;
  notificationIssues: boolean;
  from?: string;
  to?: string;
  page: number;
  /** Vrai si les deux dates sont fournies mais inversées (elles sont alors ignorées). */
  invalidDates: boolean;
};

type RawParams = Record<string, string | string[] | undefined>;

function single(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function validDate(value: string | undefined): string | undefined {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  return Number.isNaN(Date.parse(`${value}T00:00:00Z`)) ? undefined : value;
}

export function parseListParams(raw: RawParams): ListParams {
  const type = single(raw.type);
  const status = single(raw.statut);
  let from = validDate(single(raw.du));
  let to = validDate(single(raw.au));
  const invalidDates = Boolean(from && to && from > to);
  if (invalidDates) {
    from = undefined;
    to = undefined;
  }
  const page = Number.parseInt(single(raw.page) ?? "1", 10);
  return {
    type: isRequestType(type) ? type : undefined,
    status: isRequestStatus(status) ? status : undefined,
    notificationIssues: single(raw.notification) === "echec",
    from,
    to,
    page: Number.isFinite(page) && page > 0 ? page : 1,
    invalidDates,
  };
}

/** Construit l'adresse de la liste avec les filtres donnés (pour la pagination et les liens). */
export function listHref(params: Partial<ListParams>): string {
  const query = new URLSearchParams();
  if (params.type) query.set("type", params.type);
  if (params.status) query.set("statut", params.status);
  if (params.notificationIssues) query.set("notification", "echec");
  if (params.from) query.set("du", params.from);
  if (params.to) query.set("au", params.to);
  if (params.page && params.page > 1) query.set("page", String(params.page));
  const search = query.toString();
  return `/admin/demandes${search ? `?${search}` : ""}`;
}
