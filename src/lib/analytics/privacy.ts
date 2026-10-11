const publicSections = new Set(['coran','hadiths','hadith','fiqh','sira','prophetes','blog','videos','podcasts','bibliotheque','apprendre','invocations','prieres','horaires','a-propos','contact','confidentialite','mentions-legales']);
export function publicAnalyticsPath(value: unknown): string | null {
  if(typeof value !== 'string' || value.length > 180 || !/^\/(?:[a-z0-9-]+\/?)*$/.test(value)) return null;
  if(value === '/') return value;
  return publicSections.has(value.split('/')[1]) ? value.replace(/\/$/,'') : null;
}
export function trafficSource(referrer: string, origin: string): string {
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if(host === new URL(origin).hostname) return 'Interne';
    if(/(^|\.)(google\.[a-z.]+|bing.com|duckduckgo.com|yahoo.com)$/.test(host)) return 'Moteur de recherche';
    if(/(^|\.)(facebook.com|instagram.com|tiktok.com|t.co|youtube.com|linkedin.com|whatsapp.com)$/.test(host)) return 'Réseaux sociaux';
    return 'Autre site';
  } catch { return 'Direct / inconnu'; }
}
export function deviceType(ua: string): string {
  return /ipad|tablet/i.test(ua) ? 'Tablette' : /mobile|android|iphone/i.test(ua) ? 'Mobile' : 'Ordinateur';
}
export const isUuid = (v: unknown): v is string => typeof v === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
export const analyticsConsentKey = 'mirath:analytics:consent';
export function analyticsIdentity(storage: Storage, now: number) {
  const day = new Date(now).toISOString().slice(0,10);
  let old: { day?: string; visitor?: string; session?: string; last?: number } = {};
  try { const parsed = JSON.parse(storage.getItem('mirath:analytics:identity') || '{}'); old = parsed && typeof parsed === 'object' ? parsed : {}; } catch { /* new identity */ }
  const visitor = old.day === day && isUuid(old.visitor) ? old.visitor : crypto.randomUUID();
  const session = old.day === day && isUuid(old.session) && typeof old.last === 'number' && now >= old.last && now-old.last < 30*60*1000 ? old.session : crypto.randomUUID();
  storage.setItem('mirath:analytics:identity', JSON.stringify({day,visitor,session,last:now}));
  return { visitor, session };
}
