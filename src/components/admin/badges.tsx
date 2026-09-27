import {
  notificationStatusLabels,
  requestStatusLabels,
  requestTypeLabels,
} from "@/content/admin";
import type { NotificationStatus, RequestStatus, RequestType } from "@/lib/requests/types";

const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-semibold whitespace-nowrap";

const statusStyles: Record<RequestStatus, string> = {
  new: "bg-brand/10 text-brand-dark",
  in_progress: "bg-warning-bg text-warning",
  done: "bg-success-bg text-success",
};

const notificationStyles: Record<NotificationStatus, string> = {
  pending: "bg-warning-bg text-warning",
  sent: "bg-success-bg text-success",
  failed: "bg-danger-bg text-danger",
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  return <span className={`${base} ${statusStyles[status]}`}>{requestStatusLabels[status]}</span>;
}

export function NotificationBadge({ status }: { status: NotificationStatus }) {
  return (
    <span className={`${base} ${notificationStyles[status]}`}>{notificationStatusLabels[status]}</span>
  );
}

export function TypeBadge({ type }: { type: RequestType }) {
  return <span className={`${base} bg-surface text-ink border-line border`}>{requestTypeLabels[type]}</span>;
}
