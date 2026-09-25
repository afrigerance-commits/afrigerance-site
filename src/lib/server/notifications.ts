import "server-only";

import { quoteForm, type Option } from "@/content/forms";
import { getPole } from "@/content/services";
import { site } from "@/content/site";
import type { ContactData } from "@/lib/forms/contact";
import { contactKind } from "@/lib/forms/contact";
import type { QuoteData } from "@/lib/forms/quote";

type Email = { subject: string; text: string; replyTo?: string };

const labels = quoteForm.summary.labels;
const fields = quoteForm.fields;

function optionLabel(options: readonly Option[], value: string): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

function prestationLabel(poleId: QuoteData["poles"][number], id: string): string {
  if (id === fields.prestations.other.value) return "Autre besoin";
  return getPole(poleId).prestations.find((item) => item.id === id)?.title ?? id;
}

function line(label: string, value: string): string {
  return `${label} : ${value || quoteForm.summary.notProvided}`;
}

export function formatQuoteEmail(data: QuoteData, reference: string, receivedAt: Date): Email {
  const poleTitles = data.poles.map((pole) => getPole(pole).title);
  const sections: string[] = [
    `Nouvelle demande de devis reçue sur le site ${site.name}.`,
    line("Référence", reference),
    line("Reçue le", receivedAt.toLocaleString("fr-FR", { timeZone: "Africa/Dakar" })),
    "",
    "— BESOIN —",
    ...data.poles.map(
      (pole) =>
        `${getPole(pole).title} : ${data.prestations[pole].map((id) => prestationLabel(pole, id)).join(", ")}`,
    ),
    line(labels.city, data.city),
  ];

  if (data.poles.includes("infogerance")) {
    sections.push(
      line(labels.workstations, optionLabel(fields.workstations.options, data.workstations)),
      line(labels.infrastructure, optionLabel(fields.infrastructure.options, data.infrastructure)),
    );
  }
  if (data.poles.includes("integration")) {
    sections.push(
      line(labels.premises, optionLabel(fields.premises.options, data.premises)),
      line(labels.installation, optionLabel(fields.installation.options, data.installation)),
    );
  }

  sections.push(
    "",
    "— DESCRIPTION —",
    data.description,
    "",
    "— CONTACT —",
    line(labels.name, data.name),
    line(labels.company, data.company),
    line(labels.email, data.email),
    line(labels.phone, data.phone),
  );

  return {
    subject: `Demande de devis ${reference} — ${poleTitles.join(" + ")} — ${data.name}`,
    text: sections.join("\n"),
    replyTo: data.email || undefined,
  };
}

export function formatContactEmail(data: ContactData, reference: string, receivedAt: Date): Email {
  const kind = contactKind(data.contact);
  return {
    subject: `Message de contact ${reference} — ${data.subject}`,
    text: [
      `Nouveau message reçu via le formulaire de contact du site ${site.name}.`,
      line("Référence", reference),
      line("Reçu le", receivedAt.toLocaleString("fr-FR", { timeZone: "Africa/Dakar" })),
      "",
      line("Nom", data.name),
      line(kind === "email" ? "Email" : "Téléphone", data.contact),
      line("Objet", data.subject),
      "",
      "— MESSAGE —",
      data.message,
    ].join("\n"),
    replyTo: kind === "email" ? data.contact : undefined,
  };
}
