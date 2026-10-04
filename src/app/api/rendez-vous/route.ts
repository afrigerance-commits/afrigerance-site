import { handleSubmission } from "@/lib/server/handleSubmission";
import { parseAppointment, validateAppointment } from "@/lib/forms/appointment";
import { appointmentToRecord } from "@/lib/requests/records";

/** Réception d'une demande de rendez-vous : validation serveur, enregistrement, puis notification. */
export async function POST(request: Request) {
  return handleSubmission(request, {
    type: "rendez-vous",
    referencePrefix: "RV",
    parse: parseAppointment,
    validate: (data) => validateAppointment(data),
    toRecord: appointmentToRecord,
  });
}
