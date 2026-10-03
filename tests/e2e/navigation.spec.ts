import { test, expect } from "@playwright/test";

test.describe("Navigation principale", () => {
  test("la page d'accueil se charge avec le contenu attendu", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("connaissance se transmet");
    await expect(page.getByRole("link", { name: "Commencer à apprendre" }).first()).toBeVisible();
  });

  test("le lien d'évitement permet d'aller directement au contenu principal", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.getByRole("link", { name: "Aller au contenu principal" });
    await expect(skipLink).toHaveAttribute("href", "#contenu-principal");
  });

  test("navigue vers l'Académie de fiqh malikite depuis l'en-tête", async ({ page, isMobile }) => {
    await page.goto("/");

    if (isMobile) {
      await page.getByRole("button", { name: "Ouvrir le menu" }).click();
      await page.getByRole("link", { name: "Fiqh malikite", exact: true }).click();
    } else {
      await page.getByRole("link", { name: "Fiqh malikite", exact: true }).click();
    }

    await expect(page).toHaveURL(/\/fiqh\/malikite$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("fiqh");
  });

  test("affiche une page 404 soignée pour une route inconnue", async ({ page }) => {
    const response = await page.goto("/cette-page-nexiste-pas");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page introuvable" })).toBeVisible();
  });
});
