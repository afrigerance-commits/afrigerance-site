import { parseAdhanCalendar } from "@/lib/adhan-calendar";
import { prayerMethods } from "@/lib/prayer-times";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams;
  const latitude = Number(query.get("latitude")), longitude = Number(query.get("longitude"));
  const method = Number(query.get("method") ?? 3);
  if (!query.has("latitude") || !query.has("longitude") || !Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180 || !prayerMethods.some(item => item.id === method)) {
    return Response.json({ error: "Localisation ou méthode invalide." }, { status: 400 });
  }
  try {
    const now = Date.now();
    const date = new Date(now);
    const params = new URLSearchParams({ latitude: String(latitude), longitude: String(longitude), method: String(method), school: "0", iso8601: "true" });
    const months = [0, 1].map(offset => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + offset, 1)));
    const results = await Promise.all(months.map(async month => {
      const response = await fetch(`https://api.aladhan.com/v1/calendar/${month.getUTCFullYear()}/${month.getUTCMonth() + 1}?${params}`, { signal: AbortSignal.timeout(15000), next: { revalidate: 3600 } });
      if (!response.ok) throw new Error("Calendrier indisponible");
      const body = await response.json();
      if (body.code !== 200) throw new Error("Calendrier indisponible");
      return parseAdhanCalendar(body.data, now);
    }));
    const events = results.flat().sort((a, b) => a.at - b.at);
    if (!events.length) throw new Error("Calendrier vide");
    return Response.json({ events }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Impossible de charger le calendrier. Les alarmes déjà enregistrées sont conservées." }, { status: 503 });
  }
}
