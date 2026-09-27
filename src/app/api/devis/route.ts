import { handleSubmission } from "@/lib/server/handleSubmission";
import { parseQuote, validateQuote } from "@/lib/forms/quote";
import { quoteToRecord } from "@/lib/requests/records";

/** Réception d'une demande de devis : validation serveur, enregistrement, puis notification. */
export async function POST(request: Request) {
  return handleSubmission(request, {
    type: "devis",
    referencePrefix: "DV",
    parse: parseQuote,
    validate: validateQuote,
    toRecord: quoteToRecord,
  });
}
