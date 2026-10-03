/**
 * Formulaires publics : une confirmation n'est affichée que si la demande est réellement
 * enregistrée ; robots, doubles clics et pannes de base ne créent ni doublon ni faux succès.
 */
import { randomUUID } from "node:crypto";
import { expect, test } from "@playwright/test";
import { closeDb, requestCount, resetRequests, value } from "./support/db";
import { confirmedReference, fillContact, newVisitor, waitLikeAHuman } from "./support/helpers";
import { servers } from "./support/settings";

const base = servers.noEmail.url;

test.beforeAll(resetRequests);
test.afterAll(closeDb);

test("devis complet : confirmation avec référence, demande enregistrée au statut « Nouveau »", async ({ browser }) => {
  const context = await newVisitor(browser);
  const page = await context.newPage();
  await page.goto(`${base}/devis?pole=infogerance`);
  await page.getByLabel("Gestion du parc informatique").check();
  await page.getByLabel("Cybersécurité").check();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByLabel("Description du besoin").fill("Nous avons 15 postes et souhaitons un suivi régulier, avec sauvegardes.");
  await page.getByLabel("Ville d’intervention").fill("Dakar");
  await page.getByLabel("6 à 20").check();
  await page.getByRole("group", { name: /infrastructure informatique/ }).getByLabel("Oui").check();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByLabel("Nom et prénom").fill("Awa Diop");
  await page.getByLabel("Entreprise ou organisation").fill("Société Test SARL");
  await page.getByLabel("Email").fill("awa@exemple.test");
  await page.getByLabel("Téléphone").fill("+221 77 000 00 00");
  await page.getByRole("button", { name: "Continuer" }).click();
  await waitLikeAHuman(page);
  await page.getByRole("button", { name: "Envoyer ma demande" }).click();
  const reference = await confirmedReference(page, "Demande envoyée", /^DV-/);

  expect(reference).toMatch(/^DV-\d{8}-[0-9A-F]{8}$/);
  expect(await value`SELECT status FROM requests WHERE reference = ${reference}`).toBe("new");
  expect(await value`SELECT answers->>'city' FROM requests WHERE reference = ${reference}`).toBe("Dakar");
  await context.close();
});

test("triple clic sur « Envoyer » → une seule demande enregistrée", async ({ browser }) => {
  const context = await newVisitor(browser);
  const page = await context.newPage();
  await fillContact(page, base, { subject: "Triple clic" });
  const before = await requestCount();
  // Trois clics dans le même instant, avant tout nouvel affichage : le cas le plus difficile.
  await page.evaluate(() => {
    const button = document.querySelector<HTMLButtonElement>("form button[type=submit]")!;
    button.click();
    button.click();
    button.click();
  });
  await confirmedReference(page, "Message envoyé", /^CT-/);
  await page.waitForTimeout(800);
  expect(await requestCount()).toBe(before + 1);
  await context.close();
});

for (const [label, server, expected] of [
  ["base injoignable", servers.databaseDown, "n’a pas pu être enregistrée"],
  ["base non configurée", servers.noDatabase, "pas encore activé"],
] as const) {
  test(`${label} → message d'erreur, aucune confirmation, rien d'enregistré`, async ({ browser }) => {
    const context = await newVisitor(browser);
    const page = await context.newPage();
    const before = await requestCount();
    await fillContact(page, server.url, { subject: `Test ${label}` });
    await page.getByRole("button", { name: "Envoyer le message" }).click();
    const alert = page.locator("div[role=alert]:not(#__next-route-announcer__)");
    await expect(alert).toContainText(expected);
    await expect(page.getByText("Message envoyé")).toHaveCount(0);
    expect(await requestCount()).toBe(before);
    await context.close();
  });
}

test.describe("protections côté serveur (appels directs à l'API)", () => {
  const message = {
    name: "Robot Test",
    contact: "robot@exemple.test",
    subject: "Essai direct",
    message: "Message envoyé directement à l'API, sans passer par le formulaire.",
    website: "",
  };
  const post = (request: import("@playwright/test").APIRequestContext, data: object) =>
    request.post(`${base}/api/contact`, {
      data,
      headers: { "X-Forwarded-For": `10.200.0.${Math.floor(Math.random() * 250) + 1}` },
    });

  test("champ piège rempli, envoi trop rapide ou clé absente → refusé, rien d'enregistré", async ({ request }) => {
    const before = await requestCount();
    const valid = { idempotencyKey: randomUUID(), elapsedMs: 5000 };
    for (const data of [
      { ...message, ...valid, website: "https://spam.exemple" },
      { ...message, ...valid, elapsedMs: 500 },
      { ...message, elapsedMs: 5000 },
    ]) {
      const response = await post(request, data);
      expect(response.status()).toBe(400);
      expect((await response.json()).ok).toBe(false);
    }
    expect(await requestCount()).toBe(before);
  });

  test("données invalides → erreurs par champ (422), rien d'enregistré", async ({ request }) => {
    const before = await requestCount();
    const response = await post(request, { ...message, contact: "pas-un-contact", idempotencyKey: randomUUID(), elapsedMs: 5000 });
    expect(response.status()).toBe(422);
    expect((await response.json()).fieldErrors).toHaveProperty("contact");
    expect(await requestCount()).toBe(before);
  });

  test("même envoi rejoué avec la même clé → même référence, une seule demande", async ({ request }) => {
    const before = await requestCount();
    const data = { ...message, idempotencyKey: randomUUID(), elapsedMs: 5000 };
    const first = await (await post(request, data)).json();
    const second = await (await post(request, data)).json();
    expect(first.ok).toBe(true);
    expect(second.reference).toBe(first.reference);
    expect(await requestCount()).toBe(before + 1);
  });
});
