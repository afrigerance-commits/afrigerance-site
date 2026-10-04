import { handleSubmission } from "@/lib/server/handleSubmission";
import { parseContact, validateContactMessage } from "@/lib/forms/contact";
import { contactToRecord } from "@/lib/requests/records";

/** Réception d'un message de contact : validation serveur, enregistrement, puis notification. */
export async function POST(request: Request) {
  return handleSubmission(request, {
    type: "contact",
    referencePrefix: "CT",
    parse: parseContact,
    validate: validateContactMessage,
    toRecord: contactToRecord,
  });
}
