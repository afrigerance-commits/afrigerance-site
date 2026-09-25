import { formatQuoteEmail } from "@/lib/server/notifications";
import { handleSubmission } from "@/lib/server/handleSubmission";
import { parseQuote, validateQuote } from "@/lib/forms/quote";

/** Réception d'une demande de devis : validation serveur puis envoi par email. */
export async function POST(request: Request) {
  return handleSubmission(request, {
    referencePrefix: "DV",
    parse: parseQuote,
    validate: validateQuote,
    format: formatQuoteEmail,
  });
}
