export function safeExternalBookUrl(raw: string): string | null {
  if (!raw.trim()) return null;
  try { const url = new URL(raw); return url.protocol === "https:" && !url.username && !url.password ? url.href : null; } catch { return null; }
}
export function validPdfPath(raw: string, userId?: string) {
  return /^[0-9a-f-]{36}\/[0-9a-f-]{36}\.pdf$/.test(raw) && (!userId || raw.startsWith(`${userId}/`));
}
