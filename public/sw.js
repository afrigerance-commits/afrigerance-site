/* Only public reading documents and same-origin static assets are stored.
 * Authenticated pages, API calls, RSC payloads and external media are excluded. */
const VERSION = "mirath-offline-v1";
const PAGES = `${VERSION}-pages`;
const ASSETS = `${VERSION}-assets`;
const PUBLIC_PAGE = /^\/(?:$|coran(?:\/|$)|hadith(?:\/|$)|invocations(?:\/|$)|fiqh(?:\/|$)|sira(?:\/|$)|blog(?:\/|$)|apprendre(?:\/|$)|hors-ligne$)/;
function isPublicPage(url) {
  return url.origin === self.location.origin && !url.search && PUBLIC_PAGE.test(url.pathname) && !url.pathname.endsWith(".xml");
}
async function boundedPut(name, request, response, limit) {
  const cache = await caches.open(name);
  await cache.put(request, response);
  const keys = await cache.keys();
  for (const key of keys.slice(0, Math.max(0, keys.length - limit))) await cache.delete(key);
}
async function savePage(path) {
  const url = new URL(path, self.location.origin);
  if (!isPublicPage(url)) return;
  // Never save a signed-in visitor's account header or personal information.
  const response = await fetch(url.href, { credentials: "omit", headers: { Accept: "text/html" }, cache: "no-cache" });
  if (!response.ok || response.redirected || !response.headers.get("content-type")?.includes("text/html")) return;
  const html = await response.clone().text();
  await boundedPut(PAGES, url.href, response, 150);
  // The first page may have loaded before this worker controlled the tab.
  const assets = new Set([...html.matchAll(/(?:src|href)="([^"<>]+)"/g)].map((match) => match[1].replaceAll("&amp;", "&")));
  await Promise.allSettled([...assets].map(async (path) => {
    const asset = new URL(path, url);
    if (!isAsset(asset)) return;
    const result = await fetch(asset.href, { credentials: "omit" });
    if (result.ok) {
      if (asset.pathname.endsWith(".css")) {
        const css = await result.clone().text();
        await Promise.allSettled([...css.matchAll(/url\(["']?([^\s)"']+)/g)].map(async (match) => {
          const font = new URL(match[1], asset);
          if (!isAsset(font)) return;
          const response = await fetch(font.href, { credentials: "omit" });
          if (response.ok) await boundedPut(ASSETS, font.href, response, 350);
        }));
      }
      await boundedPut(ASSETS, asset.href, result, 350);
    }
  }));
}
function isAsset(url) {
  return url.origin === self.location.origin && (url.pathname.startsWith("/_next/static/") || /\.(?:woff2?|webp|png|jpg|jpeg|svg|ico)$/.test(url.pathname));
}
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(ASSETS).then((cache) => cache.addAll(["/offline.html", "/brand/mirath-emblem.webp"])).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key.startsWith("mirath-offline-") && key !== PAGES && key !== ASSETS) await caches.delete(key);
    await self.clients.claim();
    await Promise.allSettled([savePage("/"), savePage("/hors-ligne"), savePage("/coran")]);
  })());
});
self.addEventListener("message", (event) => {
  if (event.data?.type === "SAVE_PAGE" && typeof event.data.path === "string") event.waitUntil(savePage(event.data.path).catch(() => {}));
});
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try { return await fetch(request); }
      catch {
        if (isPublicPage(url)) {
          const saved = await (await caches.open(PAGES)).match(url.href);
          if (saved) return saved;
        }
        return (await (await caches.open(ASSETS)).match("/offline.html")) || new Response("Connexion nécessaire", { status: 503 });
      }
    })());
  } else if (isAsset(url)) {
    event.respondWith((async () => {
      const cache = await caches.open(ASSETS);
      const saved = await cache.match(request);
      if (saved) return saved;
      const response = await fetch(request);
      if (response.ok) event.waitUntil(boundedPut(ASSETS, request, response.clone(), 350).catch(() => {}));
      return response;
    })());
  }
});
