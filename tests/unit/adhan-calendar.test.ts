import { describe, expect, it } from "vitest";
import { parseAdhanCalendar } from "@/lib/adhan-calendar";

const day = (date: number) => ({ timings: Object.fromEntries(["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((key, index) => [key, `2026-10-${String(date).padStart(2, "0")}T${String(6 + index * 3).padStart(2, "0")}:00:00+00:00`])) });
describe("adhan calendar", () => {
  it("keeps five dated prayers, excludes elapsed prayers and sunrise", () => {
    const days = Array.from({ length: 31 }, (_, i) => day(i + 1));
    const result = parseAdhanCalendar(days, Date.parse("2026-10-09T10:00:00Z"));
    expect(result).toHaveLength(3 + 22 * 5);
    expect(result[0]).toEqual({ at: Date.parse("2026-10-09T12:00:00Z"), name: "‘Asr" });
    expect(result.every((item, i) => i === 0 || item.at > result[i - 1].at)).toBe(true);
  });
  it("respects the source UTC offset and rejects an incomplete or malformed calendar", () => {
    const days = Array.from({ length: 31 }, (_, i) => day(i + 1));
    days[0].timings.Fajr = "2026-10-01T06:00:00+03:00";
    expect(parseAdhanCalendar(days, Date.parse("2026-10-01T00:00:00Z"))[0].at).toBe(Date.parse("2026-10-01T03:00:00Z"));
    expect(() => parseAdhanCalendar([], 0)).toThrow();
    days[0].timings.Fajr = "06:00";
    expect(() => parseAdhanCalendar(days, 0)).toThrow();
  });
});
