import type { ReactNode } from "react";
import { contactPage } from "@/content/pages";
import { contactDetails } from "@/content/site";
import { dialable } from "@/lib/contact";
import { ChatIcon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "./icons";

const labels = contactPage.details;

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="bg-brand/10 text-brand flex size-11 shrink-0 items-center justify-center rounded-full">
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-muted text-sm font-medium">{label}</dt>
        <dd className="text-ink mt-0.5 text-lg break-words">{children}</dd>
      </div>
    </div>
  );
}

const linkClass = "text-brand hover:text-brand-dark rounded-sm font-semibold underline underline-offset-2";

/**
 * Coordonnées confirmées d'AFRIGÉRANCE (src/content/site.ts).
 * Chaque ligne n'apparaît que si la valeur est renseignée ; rien n'est affiché tant qu'aucune n'est confirmée.
 */
export function ContactDetailsList() {
  const { phone, email, whatsapp, address, hours } = contactDetails;
  const hasAny = Boolean(phone || email || whatsapp || address?.length || hours?.length);

  if (!hasAny) return null;

  return (
    <dl className="space-y-6">
      {phone ? (
        <Row icon={<PhoneIcon className="size-5" />} label={labels.phoneLabel}>
          <a href={`tel:${dialable(phone)}`} className={linkClass}>
            {phone}
          </a>
        </Row>
      ) : null}
      {email ? (
        <Row icon={<MailIcon className="size-5" />} label={labels.emailLabel}>
          <a href={`mailto:${email}`} className={linkClass}>
            {email}
          </a>
        </Row>
      ) : null}
      {whatsapp ? (
        <Row icon={<ChatIcon className="size-5" />} label={labels.whatsappLabel}>
          <a
            href={`https://wa.me/${dialable(whatsapp).replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {labels.whatsappAction}
            <span className="sr-only">
              {" "}
              ({whatsapp}, {labels.newTab})
            </span>
          </a>
        </Row>
      ) : null}
      {address?.length ? (
        <Row icon={<MapPinIcon className="size-5" />} label={labels.addressLabel}>
          <address className="not-italic">
            {address.map((lineText) => (
              <span key={lineText} className="block">
                {lineText}
              </span>
            ))}
          </address>
        </Row>
      ) : null}
      {hours?.length ? (
        <Row icon={<ClockIcon className="size-5" />} label={labels.hoursLabel}>
          {hours.map((lineText) => (
            <span key={lineText} className="block">
              {lineText}
            </span>
          ))}
        </Row>
      ) : null}
    </dl>
  );
}
