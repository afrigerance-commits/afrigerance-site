// @vitest-environment node
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import vm from "node:vm";

function worker(online = true) {
  const handlers: Record<string, (event: any) => void> = {};
  const stores = new Map<string, Map<string, Response>>();
  const requests: { url: string; options: any }[] = [];
  const caches = {
    keys: async () => [...stores.keys()], delete: async (name: string) => stores.delete(name),
    open: async (name: string) => {
      if (!stores.has(name)) stores.set(name, new Map());
      const store = stores.get(name)!;
      const key = (r: any) => typeof r === "string" ? r : r.url;
      return { put: async (r: any, response: Response) => { store.set(key(r), response.clone()); }, match: async (r: any) => store.get(key(r))?.clone(), keys: async () => [...store.keys()].map(url => ({ url })), delete: async (r: any) => store.delete(key(r)) };
    },
  };
  vm.runInNewContext(readFileSync("public/sw.js", "utf8"), {
    self: { location: { origin: "https://miraath.netlify.app" }, addEventListener: (name: string, handler: any) => { handlers[name] = handler; } },
    caches, URL, Response,
    fetch: async (input: any, options: any) => {
      const url = typeof input === "string" ? input : input.url;
      requests.push({ url, options });
      if (!online) throw new Error("offline");
      return new Response('<html><title>Al-Fâtiha</title><p>بِسْمِ اللَّهِ</p></html>', { headers: { "content-type": "text/html" } });
    },
  });
  return { handlers, requests, stores, setOnline: (value: boolean) => { online = value; } };
}

describe("Public reading offline cache", () => {
  it("saves anonymous HTML and serves the exact Arabic document offline", async () => {
    const w = worker(); let task: Promise<any>;
    w.handlers.message({ data: { type: "SAVE_PAGE", path: "/coran/1" }, waitUntil: (p: Promise<any>) => { task = p; } });
    await task!;
    expect(w.requests[0].options.credentials).toBe("omit");
    w.setOnline(false);
    w.handlers.fetch({ request: { url: "https://miraath.netlify.app/coran/1", mode: "navigate", method: "GET" }, respondWith: (p: Promise<any>) => { task = p; } });
    expect(await (await task!).text()).toContain("بِسْمِ اللَّهِ");
  });
  it("does not store private routes, API calls, external URLs or RSC query payloads", async () => {
    const w = worker();
    for (const path of ["/admin", "/profil", "/connexion", "/api/prayer-times", "https://other.test/coran/1", "/coran/1?_rsc=123"]) {
      let task: Promise<any>;
      w.handlers.message({ data: { type: "SAVE_PAGE", path }, waitUntil: (p: Promise<any>) => { task = p; } });
      await task!;
    }
    expect(w.requests).toHaveLength(0);
  });
  it("uses a readable fallback for an unsaved page without serving a different reading", async () => {
    const w = worker(false);
    w.stores.set("mirath-offline-v1-assets", new Map([["/offline.html", new Response("Cette page n’est pas encore enregistrée.")]]));
    let task: Promise<any>;
    w.handlers.fetch({ request: { url: "https://miraath.netlify.app/coran/2", mode: "navigate", method: "GET" }, respondWith: (p: Promise<any>) => { task = p; } });
    expect(await (await task!).text()).toContain("pas encore enregistrée");
  });
});
