/**
 * Expérience et socle technique : animations (et leur désactivation), accordéon de la FAQ,
 * données structurées, plan du site, robots.txt et en-têtes de sécurité.
 */
import { expect, test } from "@playwright/test";
import { allFaqItems } from "@/content/faq";
import { servers } from "./support/settings";

const base = servers.noEmail.url;

test.describe("mouvement", () => {
  test("les sections se révèlent au défilement", async ({ page }) => {
    await page.goto(base + "/");
    await expect(page.locator("html")).toHaveClass(/motion-live/);
    const heading = page.locator("#audiences-title");
    expect(await heading.evaluate((element) => getComputedStyle(element).opacity)).toBe("0");
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toHaveClass(/is-revealed/);
    await expect.poll(() => heading.evaluate((element) => getComputedStyle(element).opacity)).toBe("1");
  });

  test("« réduire les animations » : tout est visible sans défilement, logos en grille fixe", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(base + "/");
    await page.waitForTimeout(500);
    await expect(page.locator("html")).not.toHaveClass(/motion-live/);
    const opacities = await page.locator("[data-reveal]").evaluateAll((elements) =>
      elements.map((element) => getComputedStyle(element).opacity),
    );
    expect(opacities.length).toBeGreaterThan(10);
    expect(opacities.every((opacity) => opacity === "1")).toBe(true);
    await expect(page.locator(".marquee-clone")).toBeHidden();
    expect(await page.locator(".marquee-track").evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
    await context.close();
  });

  test("sans JavaScript : le contenu reste entièrement lisible", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(base + "/");
    for (const id of ["#poles-title", "#demarche-title", "#audiences-title", "#home-faq-title"]) {
      expect(await page.locator(id).evaluate((element) => getComputedStyle(element).opacity), id).toBe("1");
    }
    await context.close();
  });
});

test("FAQ : chaque question s'ouvre au clic et les données structurées reprennent les réponses publiées", async ({ page }) => {
  await page.goto(base + "/faq");
  const first = page.locator("details").first();
  await first.locator("summary").click();
  await expect(first).toHaveAttribute("open", "");
  await expect(first.locator("p").first()).toBeVisible();
  const data = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
  expect(data["@type"]).toBe("FAQPage");
  expect(data.mainEntity).toHaveLength(allFaqItems.length);
});

test("plan du site et robots.txt : adresses absolues avec SITE_URL, administration exclue", async ({ request }) => {
  const withUrl = servers.email.url;
  const sitemap = await (await request.get(`${withUrl}/sitemap.xml`)).text();
  for (const path of ["/", "/services/infogerance", "/services/integration", "/rendez-vous", "/faq"]) {
    expect(sitemap).toContain(`<loc>${new URL(path, withUrl).toString()}</loc>`);
  }
  expect(sitemap).not.toContain("/admin");
  const robots = await (await request.get(`${withUrl}/robots.txt`)).text();
  expect(robots).toContain("Disallow: /admin");
  expect(robots).toContain(`Sitemap: ${withUrl}/sitemap.xml`);
});

test("en-têtes de sécurité sur le site public et l'administration", async ({ request }) => {
  const home = await request.get(base + "/");
  expect(home.headers()["x-content-type-options"]).toBe("nosniff");
  expect(home.headers()["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(home.headers()["x-powered-by"]).toBeUndefined();
  const admin = await request.get(base + "/admin/connexion");
  expect(admin.headers()["x-robots-tag"]).toBe("noindex, nofollow");
  expect(admin.headers()["x-frame-options"]).toBe("DENY");
});

test("image d'aperçu de partage générée", async ({ request }) => {
  const response = await request.get(base + "/opengraph-image");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("image/png");
});

test("charte graphique : bandeau bleu du logo, bandeau anthracite, textes noir et gris, bouton blanc sur le bleu", async ({ page }) => {
  await page.goto(base + "/");
  const styles = (selector: string) =>
    page.locator(selector).first().evaluate((element) => {
      const style = getComputedStyle(element);
      return { background: style.backgroundColor, color: style.color };
    });
  const brand = "rgb(46, 117, 182)";
  const anthracite = "rgb(59, 68, 81)";

  expect((await styles("section[aria-labelledby='hero-title']")).background).toBe(brand);
  expect((await styles("#demarche")).background).toBe(anthracite);
  expect((await styles("section[aria-labelledby='footer-cta-title']")).background).toBe(anthracite);
  expect((await styles("body")).color).toBe("rgb(17, 19, 23)");
  expect((await styles("#audiences-title ~ p")).color).toBe(anthracite);

  const heroButton = await styles("section[aria-labelledby='hero-title'] a[href='/devis']");
  expect(heroButton).toEqual({ background: "rgb(255, 255, 255)", color: "rgb(34, 89, 140)" });
  expect((await styles("header a[href='/devis']")).background).toBe(brand);
});
