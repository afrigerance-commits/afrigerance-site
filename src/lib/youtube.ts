/** Accepte une vidéo YouTube précise, sans faire confiance à un lien externe déguisé. */
export function extractYoutubeId(input: string): string | null {
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    const host = url.hostname.toLowerCase();
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    let id: string | undefined;
    if (host === "youtu.be" || host === "www.youtu.be") id = url.pathname.split("/")[1];
    else if (["youtube.com", "www.youtube.com", "m.youtube.com", "music.youtube.com"].includes(host)) {
      const segments = url.pathname.split("/").filter(Boolean);
      id = segments[0] === "watch" ? url.searchParams.get("v") ?? undefined
        : ["shorts", "embed", "live"].includes(segments[0]) ? segments[1] : undefined;
    }
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}
