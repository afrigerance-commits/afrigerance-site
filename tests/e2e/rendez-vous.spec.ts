/**
 * Demande de rendez-vous : formulaire, validation (navigateur et serveur), enregistrement,
 * email au gestionnaire et affichage dans l'administration.
 */
import { randomUUID } from "node:crypto";
import { expect, test, type Page } from "@playwright/test";
import { closeDb, requestCount, resetRequests, value } from "./support/db";
import { confirmedReference, emailsFor, login, newVisitor, setMailMode, waitLikeAHuman } from "./support/helpers";
import { servers } from "./support/settings";

test.describe.configure({ mode: "serial" });
test.beforeAll(resetRequests);
test.afterAll(closeDb);

/** Date AAAA-MM-JJ dans `days` jours (Dakar est à l'heure UTC toute l'année). */
function inDays(days: number) {
  return new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);
}

async function fillAppointment(page: Page, base: string) {
  await page.goto(`${base}/rendez-vous`);
  await page.getByLabel("Présentation d’un projet").check();
  await page.getByRole("radio", { name: "Intégration de solutions technologiques" }).check();
  await page.getByLabel("Visioconférence").check();
  await page.locator("#rdv-slot1Date").fill(inDays(3));
  await page.locator("#rdv-slot1Period").selectOption("matin");
  await page.locator("#rdv-slot2Date").fill(inDays(5));
  await page.locator("#rdv-slot2Period").selectOption("apres-midi");
  await page.getByLabel("Ville").fill("Saint-Louis");
  await page.getByLabel("Nom et prénom").fill("Aminata Fall");
  await page.getByLabel("Entreprise ou organisation").fill("École Test");
  await page.getByLabel("Email").fill("aminata@exemple.test");
  await page.getByLabel("Précisions").fill("Installation de caméras dans deux bâtiments.");
  await waitLikeAHuman(page);
}

let reference = "";

test("demande complète → confirmation avec référence RV-, enregistrée au statut « Nouveau »", async ({ browser }) => {
  const context = await newVisitor(browser);
  const page = await context.newPage();
  await fillAppointment(page, servers.noEmail.url);
  await page.getByRole("button", { name: "Envoyer ma demande de rendez-vous" }).click();
  reference = await confirmedReference(page, "Demande de rendez-vous reçue", /^RV-/);

  expect(reference).toMatch(/^RV-\d{8}-[0-9A-F]{8}$/);
  expect(await value`SELECT type FROM requests WHERE reference = ${reference}`).toBe("rendez-vous");
  expect(await value`SELECT status FROM requests WHERE reference = ${reference}`).toBe("new");
  expect(await value`SELECT jsonb_array_length(answers->'slots') FROM requests WHERE reference = ${reference}`).toBe("2");
  expect(await value`SELECT answers->>'mode' FROM requests WHERE reference = ${reference}`).toBe("visio");
  await context.close();
});

test("formulaire vide → récapitulatif des erreurs, rien n'est envoyé", async ({ browser }) => {
  const context = await newVisitor(browser);
  const page = await context.newPage();
  const before = await requestCount();
  await page.goto(`${servers.noEmail.url}/rendez-vous`);
  await page.getByRole("button", { name: "Envoyer ma demande de rendez-vous" }).click();
  const summary = page.locator("#error-summary-title").locator("xpath=..");
  await expect(summary).toBeFocused();
  for (const label of ["Motif", "Pôle", "Mode de rencontre", "Date du créneau souhaité", "Nom", "Moyen de contact"]) {
    await expect(summary).toContainText(label);
  }
  expect(await requestCount()).toBe(before);
  await context.close();
});

test("date passée → refusée par le navigateur et par le serveur", async ({ browser, request }) => {
  const context = await newVisitor(browser);
  const page = await context.newPage();
  await fillAppointment(page, servers.noEmail.url);
  await page.locator("#rdv-slot1Date").fill(inDays(-2));
  await page.getByRole("button", { name: "Envoyer ma demande de rendez-vous" }).click();
  await expect(page.locator("#rdv-slot1Date-error")).toContainText("à partir de demain");
  await context.close();

  const before = await requestCount();
  const response = await request.post(`${servers.noEmail.url}/api/rendez-vous`, {
    headers: { "X-Forwarded-For": `10.210.0.${Math.floor(Math.random() * 250) + 1}` },
    data: {
      reason: "projet",
      pole: "integration",
      mode: "telephone",
      slot1Date: inDays(-1),
      slot1Period: "matin",
      name: "Test Serveur",
      phone: "+221 77 000 00 00",
      website: "",
      idempotencyKey: randomUUID(),
      elapsedMs: 5000,
    },
  });
  expect(response.status()).toBe(422);
  expect((await response.json()).fieldErrors).toHaveProperty("slot1Date");
  expect(await requestCount()).toBe(before);
});

test("email au gestionnaire : motif, mode, créneaux en toutes lettres, coordonnées et lien vers la fiche", async ({ browser }) => {
  await setMailMode("ok");
  const context = await newVisitor(browser);
  const page = await context.newPage();
  await fillAppointment(page, servers.email.url);
  await page.getByRole("button", { name: "Envoyer ma demande de rendez-vous" }).click();
  const ref = await confirmedReference(page, "Demande de rendez-vous reçue", /^RV-/);
  const id = (await value`SELECT id FROM requests WHERE reference = ${ref}`)!;
  await expect.poll(() => value`SELECT notification_status FROM requests WHERE id = ${id}`).toBe("sent");

  const [email] = await emailsFor(ref);
  expect(email.body.subject).toBe(`Nouvelle demande de rendez-vous ${ref} — Aminata Fall`);
  const day = new Date(`${inDays(3)}T12:00:00Z`).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  for (const expected of [
    "Motif : Présentation d’un projet",
    "Pôle : Intégration de solutions technologiques",
    "Mode de rencontre : Visioconférence",
    `Créneau souhaité : ${day}, matin`,
    "Ville : Saint-Louis",
    "Précisions :\nInstallation de caméras",
    "Entreprise : École Test",
    "Email : aminata@exemple.test",
    `${servers.email.url}/admin/demandes/${id}`,
  ]) {
    expect(email.body.text).toContain(expected);
  }
  expect(email.body.reply_to).toBe("aminata@exemple.test");
  await context.close();
});

test("administration : filtre « Rendez-vous » et fiche avec les créneaux demandés", async ({ browser }) => {
  const context = await newVisitor(browser);
  const page = await context.newPage();
  await login(page, servers.noEmail.url);
  await page.goto(`${servers.noEmail.url}/admin/demandes?type=rendez-vous`);
  await expect(page.locator("tbody tr")).toHaveCount(2);
  await page.getByRole("link", { name: reference }).click();
  const main = page.locator("main");
  for (const expected of ["Rendez-vous", "Présentation d’un projet", "Visioconférence", "matin", "après-midi", "Saint-Louis", "École Test"]) {
    await expect(main).toContainText(expected);
  }
  await context.close();
});
