import { formatContactEmail } from "@/lib/server/notifications";
import { handleSubmission } from "@/lib/server/handleSubmission";
import { parseContact, validateContactMessage } from "@/lib/forms/contact";

/** Réception d'un message de contact : validation serveur puis envoi par email. */
export async function POST(request: Request) {
  return handleSubmission(request, {
    referencePrefix: "CT",
    parse: parseContact,
    validate: validateContactMessage,
    format: formatContactEmail,
  });
}
