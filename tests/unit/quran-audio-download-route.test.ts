// @vitest-environment node
import { afterEach, expect, it, vi } from "vitest";
import { GET } from "@/app/api/quran-audio/route";
afterEach(() => vi.unstubAllGlobals());
it("rejects arbitrary hosts and embedded credentials before any network request", async () => {
  const fetch = vi.fn(); vi.stubGlobal("fetch",fetch);
  for (const source of ["http://localhost/private", "https://evil.test/audio.mp3", "https://user:secret@cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3"]) {
    expect((await GET(new Request(`https://miraath.netlify.app/api/quran-audio?source=${encodeURIComponent(source)}`))).status).toBe(400);
  }
  expect(fetch).not.toHaveBeenCalled();
});
it("streams only successful audio responses and disallows upstream redirects", async () => {
  const fetch = vi.fn(async () => new Response("mp3",{ headers: { "content-type":"audio/mpeg" } })); vi.stubGlobal("fetch",fetch);
  const request = new Request("https://miraath.netlify.app/api/quran-audio?source=https%3A%2F%2Fcdn.islamic.network%2Fquran%2Faudio%2F128%2Far.alafasy%2F1.mp3");
  const response = await GET(request);
  expect(await response.text()).toBe("mp3");
  expect(fetch).toHaveBeenCalledWith(expect.any(String),expect.objectContaining({ redirect:"error", credentials:"omit" }));
  fetch.mockResolvedValueOnce(new Response("bad",{ headers: { "content-type":"text/html" } }));
  expect((await GET(request)).status).toBe(502);
});
