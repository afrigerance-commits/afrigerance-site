import { prayerDefinitions } from "./prayer-times";

export type AdhanEvent = { at: number; name: string };
export function parseAdhanCalendar(days: unknown, now: number): AdhanEvent[] {
  if (!Array.isArray(days) || days.length < 28 || days.length > 31) throw new Error("Calendrier invalide");
  return days.flatMap(day => {
    const timings = day?.timings as Record<string, unknown> | undefined;
    return prayerDefinitions.map(prayer => {
      const value = timings?.[prayer.key];
      if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/.test(value)) throw new Error("Horaire invalide");
      const at = Date.parse(value);
      if (!Number.isFinite(at)) throw new Error("Horaire invalide");
      return { at, name: prayer.name };
    });
  }).filter(event => event.at > now && event.at < now + 65 * 86400000).sort((a, b) => a.at - b.at);
}
