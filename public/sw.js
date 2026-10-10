/* Only public reading documents and same-origin static assets are stored.
 * Authenticated pages, API calls and RSC payloads are excluded. Only explicit
 * Quran audio downloads use a separate personal cache. */
const VERSION = "mirath-offline-v1";
const PAGES = `${VERSION}-pages`;
const ASSETS = `${VERSION}-assets`;
const PUBLIC_PAGE = /^\/(?:$|coran(?:\/|$)|hadith(?:\/|$)|invocations(?:\/|$)|fiqh(?:\/|$)|sira(?:\/|$)|compagnons(?:\/|$)|prophetes(?:\/|$)|routine$|blog(?:\/|$)|apprendre(?:\/|$)|hors-ligne$|mon-suivi$|mes-notes$|ma-bibliotheque$)/;
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
  if (request.method !== "GET") return;
  // Explicit personal downloads only; no automatic caching of external media.
  const personalAudio = url.protocol === "https:" && !url.search && !url.hash && (
    (url.hostname === "everyayah.com" && /^\/data\/[\w-]+\/\d{6}\.mp3$/.test(url.pathname)) ||
    (url.hostname === "cdn.islamic.network" && /^\/quran\/audio\/\d+\/[\w.-]+\/\d+\.mp3$/.test(url.pathname))
  );
  if (personalAudio) {
    event.respondWith((async () => {
      const saved = await (await caches.open("mirath-quran-audio-v1")).match(url.href);
      if (!saved) return fetch(request);
      // Audio elements may request byte ranges even for short verse recordings.
      const range = request.headers.get("range");
      if (!range) return saved;
      const blob = await saved.blob();
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);
      if (!match || (!match[1] && !match[2])) return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${blob.size}` } });
      const start = match[1] ? Number(match[1]) : Math.max(0, blob.size - Number(match[2]));
      const end = match[1] && match[2] ? Math.min(blob.size - 1, Number(match[2])) : blob.size - 1;
      if (start >= blob.size || start > end) return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${blob.size}` } });
      return new Response(blob.slice(start, end + 1), { status: 206, headers: { "Content-Type": blob.type || "audio/mpeg", "Content-Length": String(end - start + 1), "Content-Range": `bytes ${start}-${end}/${blob.size}`, "Accept-Ranges": "bytes" } });
    })());
    return;
  }
  if (url.origin !== self.location.origin) return;
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
