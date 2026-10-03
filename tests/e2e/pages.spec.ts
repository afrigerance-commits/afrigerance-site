/** Pages publiques : affichage aux trois largeurs, liens, menu mobile, présélection du pôle. */
import { expect, test } from "@playwright/test";
import { partners, partnersSection } from "@/content/partners";
import { hero } from "@/content/site";
import { hasHorizontalScroll } from "./support/helpers";
import { servers } from "./support/settings";

const base = servers.noEmail.url;
const publicPages = ["/", "/services", "/devis", "/a-propos", "/contact", "/mentions-legales"];
const widths = [1440, 768, 390];

for (const path of publicPages) {
  for (const width of widths) {
    test(`${path} à ${width} px : un seul titre principal, pas de défilement horizontal, aucune erreur`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("pageerror", (error) => errors.push(error.message));
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(base + path, { waitUntil: "networkidle" });

      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(await hasHorizontalScroll(page)).toBe(false);
      expect(errors).toEqual([]);
    });
  }
}

test("aucun lien vide ou « # », chaque lien interne mène à une page et une ancre existantes", async ({ page, request }) => {
  const destinations = new Set<string>();
  for (const path of publicPages) {
    await page.goto(base + path);
    const hrefs = await page.locator("a[href]").evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""));
    for (const href of hrefs) {
      expect(href, `lien vide sur ${path}`).not.toMatch(/^(#?|javascript:.*)$/);
      if (href.startsWith("/")) destinations.add(href);
      if (href.startsWith("#")) destinations.add(path + href);
    }
  }
  for (const href of destinations) {
    const url = new URL(href, base);
    const response = await request.get(url.toString());
    expect(response.status(), href).toBe(200);
    if (url.hash) expect(await response.text(), `ancre ${href}`).toContain(`id="${url.hash.slice(1)}"`);
  }
});

test("accueil → pôle « Intégration » → section correspondante de la page Services", async ({ page }) => {
  await page.goto(base + "/");
  await page.getByRole("link", { name: /Intégration de solutions technologiques/ }).first().click();
  await page.waitForURL("**/services#integration");
  await expect(page.locator("#integration h2")).toBeVisible();
});

test("menu mobile : s'ouvre, indique la page active, mène à la page choisie puis se ferme", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + "/services");
  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  // Une fois ouvert, le même bouton s'intitule « Fermer le menu ».
  const toggle = page.locator("header button[aria-controls]");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  const menu = page.locator(`[id="${await toggle.getAttribute("aria-controls")}"]`);
  await expect(menu.locator('a[aria-current="page"]')).toHaveText("Nos services");
  await menu.getByRole("link", { name: "À propos" }).click();
  await page.waitForURL("**/a-propos");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("le bouton de devis d'un pôle le présélectionne ; un pôle inconnu dans l'adresse est ignoré", async ({ page }) => {
  await page.goto(base + "/devis?pole=integration");
  await expect(page.getByRole("checkbox", { name: "Intégration de solutions technologiques", exact: true })).toBeChecked();
  await expect(page.getByRole("checkbox", { name: "Infogérance", exact: true })).not.toBeChecked();
  await page.goto(base + "/devis?pole=inconnu");
  await expect(page.locator("input[type=checkbox]:checked")).toHaveCount(0);
});

test("bannière d'accueil : image décorative chargée, ignorée par les lecteurs d'écran", async ({ page }) => {
  test.skip(!hero.image, "Aucune image de bannière configurée (hero.image = null).");
  await page.goto(base + "/");
  const image = page.locator("#hero-title").locator("xpath=ancestor::section").locator('[aria-hidden="true"] img');
  await expect(image).toHaveCount(1);
  await expect(image).toHaveAttribute("alt", "");
  expect(await image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
});

test("« Ils nous font confiance » : masquée sans logo ; sinon chaque logo s'affiche avec le nom du partenaire", async ({ page }) => {
  await page.goto(base + "/");
  const heading = page.getByRole("heading", { name: partnersSection.title });
  if (partners.length === 0) {
    await expect(heading).toHaveCount(0);
    return;
  }
  await expect(heading).toBeVisible();
  for (const partner of partners) {
    const logo = page.getByRole("img", { name: partner.name, exact: true });
    await expect(logo).toBeVisible();
    expect(await logo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0), `logo ${partner.logo}`).toBe(true);
    if (partner.url) {
      const link = page.locator(`a[href="${partner.url}"]`);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
  }
});

test("page inexistante → erreur 404 avec l'en-tête et le pied de page du site", async ({ page }) => {
  const response = await page.goto(base + "/page-qui-n-existe-pas");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("header")).toBeVisible();
  await expect(page.locator("footer")).toBeVisible();
});
