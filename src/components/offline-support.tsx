"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function OfflineSupport() {
  const pathname = usePathname();
  const [offline, setOffline] = useState(false);
  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    // Next client navigation uses server-component requests. Offline, use the
    // saved HTML document instead, preserving native links and hash anchors.
    const navigate = (event: MouseEvent) => {
      if (navigator.onLine || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || link.target || link.hasAttribute("download")) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || (url.pathname === location.pathname && url.search === location.search)) return;
      event.preventDefault();
      event.stopPropagation();
      location.assign(url.href);
    };
    document.addEventListener("click", navigate, true);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
      document.removeEventListener("click", navigate, true);
    };
  }, []);
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    let cancelled = false;
    navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" })
      .then(() => navigator.serviceWorker.ready)
      .then((registration) => {
        if (!cancelled && navigator.onLine) registration.active?.postMessage({ type: "SAVE_PAGE", path: pathname });
      }).catch(() => { /* Reading remains usable when caching is unavailable. */ });
    return () => { cancelled = true; };
  }, [pathname]);
  if (!offline) return null;
  return <div role="status" className="fixed left-1/2 top-24 z-50 max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-full border border-gold-500/40 bg-surface px-4 py-2 text-sm shadow-lg">Hors ligne · <a href="/hors-ligne" className="font-semibold underline underline-offset-4">Mes lectures enregistrées</a></div>;
}
