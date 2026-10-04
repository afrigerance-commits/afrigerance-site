/**
 * Adresse publique du site (variable SITE_URL), utilisée pour les liens absolus :
 * métadonnées, plan du site, robots.txt, liens des emails. Null si absente ou invalide.
 */
export function siteUrl(): URL | null {
  const raw = process.env.SITE_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:" ? url : null;
  } catch {
    return null;
  }
}
