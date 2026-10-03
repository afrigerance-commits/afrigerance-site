import { test, expect } from "@playwright/test";

test.describe("Protection des espaces privés", () => {
  test("un visiteur non connecté est redirigé depuis /admin", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/connexion/);
  });

  test("un visiteur non connecté est redirigé depuis /compte", async ({ page }) => {
    await page.goto("/compte");
    await expect(page).toHaveURL(/\/connexion/);
  });
});

test.describe("Bibliothèque — statuts de droits", () => {
  test("un ouvrage aux droits non vérifiés ne propose aucun téléchargement", async ({ page }) => {
    await page.goto("/bibliotheque/ar-risala-ibn-abi-zayd");
    await expect(page.getByText("Droits non vérifiés", { exact: false })).toBeVisible();
    await expect(page.getByRole("link", { name: /Télécharger/i })).toHaveCount(0);
  });
});
