export type QuranAudioMode = "arabic" | "french" | "both";
export function parseAudioMode(value: unknown, legacyFrench = false): QuranAudioMode {
  return value === "arabic" || value === "french" || value === "both" ? value : legacyFrench ? "both" : "arabic";
}
