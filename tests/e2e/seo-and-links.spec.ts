import { test, expect } from "@playwright/test";

test("les liens publiés dans le sitemap répondent sans erreur", async ({ request }) => {
  test.setTimeout(120_000);
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const urls = [...(await response.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>new URL(match[1]).pathname);
  expect(urls.length).toBeGreaterThan(114);
  for (let index=0;index<urls.length;index+=8) {
    await Promise.all(urls.slice(index,index+8).map(async path=> {
      const result = await request.get(path);
      expect(result.status(),path).toBe(200);
    }));
  }
});

test("les pages principales ont un canonical propre et une image de partage", async ({ request }) => {
  for (const path of ["/", "/coran", "/hadith", "/videos", "/bibliotheque", "/apprendre"]) {
    const response = await request.get(path);
    const html=await response.text();
    const canonical=html.match(/<link rel="canonical" href="([^"]+)"/);
    expect(canonical?.[1],path).toBeTruthy();
    expect(new URL(canonical![1]).pathname).toBe(path);
    expect(new URL(canonical![1]).origin).toBe("https://miraath.netlify.app");
    expect(html).toContain('property="og:image"');
    expect(html).toContain('name="twitter:card" content="summary_large_image"');
  }
  const image=await request.get("/opengraph-image");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
});
