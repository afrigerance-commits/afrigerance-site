import { test, expect } from "@playwright/test";

test("la recherche trouve un contenu connu par mot-clé", async ({ page }) => {
  await page.goto("/recherche?q=purification");
  await expect(page.getByRole("link", { name: /purification/i }).first()).toBeVisible();
});

test("la recherche affiche un message clair en l'absence de résultat", async ({ page }) => {
  await page.goto("/recherche?q=zzzzznotfoundzzzzz");
  await expect(page.getByText("Aucun résultat", { exact: false })).toBeVisible();
});

test("le bouton de thème bascule entre mode clair et mode sombre", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  const toggle = page.getByRole("button", { name: /Activer le mode/ });
  await expect(toggle).toBeVisible();

  const wasDark = await html.evaluate((el) => el.classList.contains("dark"));
  await toggle.click();
  await expect(async () => {
    const isDark = await html.evaluate((el) => el.classList.contains("dark"));
    expect(isDark).toBe(!wasDark);
  }).toPass();
});
