import { test, expect, devices } from "@playwright/test";

test.use({ ...devices["Pixel 7"] });

test("le menu mobile s'ouvre et permet de naviguer", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Fiqh malikite", exact: true })).toBeHidden();

  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  const sheet = page.getByRole("dialog");
  await expect(sheet.getByRole("link", { name: "Bibliothèque" })).toBeVisible();

  await sheet.getByRole("link", { name: "Bibliothèque" }).click();
  await expect(page).toHaveURL(/\/bibliotheque$/);
});

test("aucun débordement horizontal sur la page d'accueil en largeur mobile", async ({ page }) => {
  await page.goto("/");
  const hasHorizontalScroll = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasHorizontalScroll).toBe(false);
});
