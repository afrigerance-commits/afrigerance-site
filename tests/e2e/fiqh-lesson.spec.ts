import { test, expect } from "@playwright/test";

test.describe("Leçon de fiqh et affichage du texte arabe", () => {
  test("affiche le texte coranique en arabe, de droite à gauche, avec sa traduction", async ({ page }) => {
    await page.goto("/fiqh/malikite/purification/leau-et-la-purification");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText("L’eau et la purification");

    const arabicBlock = page.locator('[lang="ar"][dir="rtl"]').first();
    await expect(arabicBlock).toBeVisible();
    await expect(arabicBlock).toHaveAttribute("dir", "rtl");

    await expect(page.getByText("sourate 5, verset 6", { exact: false })).toBeVisible();
  });

  test("navigue d'une leçon à la suivante et affiche la progression", async ({ page }) => {
    await page.goto("/fiqh/malikite/purification/leau-et-la-purification");
    await page.getByRole("link", { name: /Leçon suivante/ }).click();
    await expect(page).toHaveURL(/les-ablutions$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("ablutions");
  });

  test("signale explicitement le statut non publié d'une leçon sourcée", async ({ page }) => {
    await page.goto("/fiqh/malikite/purification/leau-et-la-purification");
    await expect(page.getByText("En cours de vérification")).toBeVisible();
  });

  test("signale explicitement le contenu de démonstration sur une leçon encore non sourcée", async ({ page }) => {
    await page.goto("/fiqh/malikite/purification/introduction-madhhab-malikite");
    await expect(page.getByText("Contenu de démonstration")).toBeVisible();
  });
});
