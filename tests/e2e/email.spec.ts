/**
 * Email de notification au gestionnaire, avec un faux service Resend local (aucun vrai email) :
 * contenu complet, lien vers la fiche si SITE_URL est configurée, échec conservé et renvoyable,
 * jamais de seconde demande ni de double email.
 */
import { expect, test, type Browser, type Page } from "@playwright/test";
import { closeDb, requestCount, resetRequests, value } from "./support/db";
import {
  confirmedReference,
  emailsFor,
  login,
  newVisitor,
  setMailMode,
  submitContact,
  waitLikeAHuman,
} from "./support/helpers";
import { mockResend, servers, testAdmins } from "./support/settings";

const withLink = servers.email.url;
const withoutLink = servers.emailNoLink.url;

test.describe.configure({ mode: "serial" });
test.beforeAll(resetRequests);
test.beforeEach(() => setMailMode("ok"));
test.afterAll(closeDb);

async function submitQuote(page: Page, base: string) {
  await page.goto(`${base}/devis`);
  await page.getByRole("checkbox", { name: "Infogérance", exact: true }).check();
  await page.getByRole("checkbox", { name: "Intégration de solutions technologiques", exact: true }).check();
  await page.getByLabel("Gestion du parc informatique").check();
  await page.getByLabel("Sauvegardes").check();
  await page.getByLabel("Vidéosurveillance").check();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByLabel("Description du besoin").fill("15 postes à suivre chaque mois.\nAjouter 4 caméras dans l’entrepôt.");
  await page.getByLabel("Ville d’intervention").fill("Thiès");
  await page.getByLabel("21 à 50").check();
  await page.getByRole("group", { name: /infrastructure informatique/ }).getByLabel("Oui").check();
  await page.getByLabel("Entrepôt ou site industriel").check();
  await page.getByLabel("Installation existante (extension, remplacement ou reprise)").check();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByLabel("Nom et prénom").fill("Moussa Ndiaye");
  await page.getByLabel("Entreprise ou organisation").fill("Logistique Test SA");
  await page.getByLabel("Email").fill("moussa@exemple.test");
  await page.getByLabel("Téléphone").fill("+221 76 111 22 33");
  await page.getByRole("button", { name: "Continuer" }).click();
  await waitLikeAHuman(page);
  await page.getByRole("button", { name: "Envoyer ma demande" }).click();
  return confirmedReference(page, "Demande envoyée", /^DV-/);
}

async function idOf(reference: string) {
  return (await value`SELECT id FROM requests WHERE reference = ${reference}`)!;
}

function notificationStatus(id: string) {
  return expect.poll(() => value`SELECT notification_status FROM requests WHERE id = ${id}`);
}

async function adminPage(browser: Browser, base: string) {
  const context = await newVisitor(browser);
  const page = await context.newPage();
  await login(page, base);
  return { context, page };
}

test("devis : email complet au gestionnaire, avec le lien vers la fiche (SITE_URL configurée)", async ({ browser }) => {
  const context = await newVisitor(browser);
  const page = await context.newPage();
  const reference = await submitQuote(page, withLink);
  const id = await idOf(reference);
  await notificationStatus(id).toBe("sent");

  const [email] = await emailsFor(reference);
  expect(email.body.subject).toBe(`Nouvelle demande de devis ${reference} — Moussa Ndiaye`);
  for (const expected of [
    `Référence : ${reference}`,
    "(heure de Dakar)",
    "Pôles : Infogérance, Intégration de solutions technologiques",
    "Prestations (Infogérance) : Gestion du parc informatique, Sauvegardes",
    "Prestations (Intégration de solutions technologiques) : Vidéosurveillance",
    "Ville d’intervention : Thiès",
    "Nombre de postes : 21 à 50",
    "Infrastructure existante : Oui",
    "Type de locaux : Entrepôt ou site industriel",
    "Installation : Installation existante",
    "Description du besoin :\n15 postes à suivre chaque mois.\nAjouter 4 caméras",
    "Nom : Moussa Ndiaye",
    "Entreprise : Logistique Test SA",
    "Email : moussa@exemple.test",
    "Téléphone : +221 76 111 22 33",
    `${withLink}/admin/demandes/${id}`,
  ]) {
    expect(email.body.text).toContain(expected);
  }
  expect(email.body.reply_to).toBe("moussa@exemple.test");
  expect(email.body.to).toEqual([mockResend.to]);
  expect(email.body.from).toBe(mockResend.from);
  // La clé ne sert qu'entre le serveur et Resend, dans l'en-tête d'autorisation.
  expect(email.authorization).toBe(`Bearer ${mockResend.apiKey}`);
  expect(JSON.stringify(email.body)).not.toContain(mockResend.apiKey);
  await context.close();
});

test("aucune clé ni variable d'email dans les pages ou les scripts envoyés au navigateur", async ({ request }) => {
  for (const path of ["/devis", "/contact"]) {
    const html = await (await request.get(withLink + path)).text();
    const scripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((match) => match[1]);
    expect(scripts.length).toBeGreaterThan(0);
    for (const source of [html, ...(await Promise.all(scripts.map(async (src) => (await request.get(new URL(src, withLink).toString())).text())))]) {
      expect(source).not.toContain(mockResend.apiKey);
      expect(source).not.toMatch(/RESEND_API_KEY|NOTIFICATION_EMAIL_(FROM|TO)/);
    }
  }
});

test("contact : email complet, sans lien quand SITE_URL est absente", async ({ browser }) => {
  const context = await newVisitor(browser);
  const page = await context.newPage();
  const reference = await submitContact(page, withoutLink, { contact: "+221 77 555 44 33", subject: "Contrat de maintenance" });
  await notificationStatus(await idOf(reference)).toBe("sent");

  const [email] = await emailsFor(reference);
  expect(email.body.subject).toBe(`Nouveau message de contact ${reference} — Fatou Sarr`);
  for (const expected of [
    `Référence : ${reference}`,
    "— MESSAGE —",
    "Objet : Contrat de maintenance",
    "Message :\nBonjour,\nproposez-vous",
    "Nom : Fatou Sarr",
    "Email : Non renseigné",
    "Téléphone : +221 77 555 44 33",
    "Renseignez SITE_URL",
  ]) {
    expect(email.body.text).toContain(expected);
  }
  expect(email.body.text).not.toContain("/admin/demandes/");
  // Pas d'adresse email fournie par le visiteur : pas de « Répondre à ».
  expect(email.body.reply_to).toBeUndefined();
  await context.close();
});

test("email en échec : demande conservée et signalée, renvoi depuis l'administration, sans seconde demande", async ({ browser }) => {
  await setMailMode("fail");
  const visitor = await newVisitor(browser);
  const page = await visitor.newPage();
  const before = await requestCount();
  const reference = await submitQuote(page, withLink);
  const id = await idOf(reference);
  await notificationStatus(id).toBe("failed");

  // Le visiteur voit la confirmation d'enregistrement, jamais un « email envoyé ».
  expect((await page.locator("main").innerText()).toLowerCase()).not.toContain("email envoy");
  expect(await value`SELECT notification_error FROM requests WHERE id = ${id}`).toContain("HTTP 500");
  expect(await requestCount()).toBe(before + 1);
  await visitor.close();

  const { context, page: admin } = await adminPage(browser, withLink);
  await expect(admin.locator("main")).toContainText("dont la notification par email n’a pas été envoyée");
  await admin.goto(`${withLink}/admin/demandes/${id}`);
  await expect(admin.locator("main")).toContainText("HTTP 500");

  await setMailMode("ok");
  await admin.getByRole("button", { name: "Renvoyer la notification" }).click();
  await admin.waitForURL(/notification=envoyee/);
  await expect(admin.locator("main")).toContainText("La notification a été envoyée");
  expect(await value`SELECT notification_status FROM requests WHERE id = ${id}`).toBe("sent");
  await expect(admin.getByRole("button", { name: "Renvoyer la notification" })).toHaveCount(0);

  const emails = await emailsFor(reference);
  expect(emails.map((email) => email.mode)).toEqual(["fail", "ok"]);
  expect(emails[0].idempotencyKey).not.toBe(emails[1].idempotencyKey);
  expect(await requestCount()).toBe(before + 1);
  expect(
    await value`SELECT string_agg(kind || ':' || actor, ' > ' ORDER BY id) FROM request_events WHERE request_id = ${id}`,
  ).toBe(`created:Site > notification_failed:Site > notification_sent:${testAdmins.main.email}`);
  await context.close();
});

test("deux renvois simultanés (deux onglets) → un seul email, l'autre onglet est prévenu", async ({ browser }) => {
  await setMailMode("fail");
  const visitor = await newVisitor(browser);
  const reference = await submitContact(await visitor.newPage(), withLink, { subject: "Double renvoi" });
  const id = await idOf(reference);
  await notificationStatus(id).toBe("failed");
  await visitor.close();

  await setMailMode("slow");
  const { context, page: first } = await adminPage(browser, withLink);
  const second = await context.newPage();
  await Promise.all([first.goto(`${withLink}/admin/demandes/${id}`), second.goto(`${withLink}/admin/demandes/${id}`)]);
  const before = (await emailsFor(reference)).length;
  await Promise.all([
    first.getByRole("button", { name: "Renvoyer la notification" }).click(),
    second.getByRole("button", { name: "Renvoyer la notification" }).click(),
  ]);
  await Promise.all([first.waitForURL(/notification=/, { timeout: 15_000 }), second.waitForURL(/notification=/, { timeout: 15_000 })]);
  const outcomes = [first, second].map((p) => new URL(p.url()).searchParams.get("notification")).sort();
  expect(outcomes).toEqual(["en-cours", "envoyee"]);
  expect((await emailsFor(reference)).length).toBe(before + 1);
  await context.close();
});

test("onglet resté ouvert sur « Échec » après un renvoi réussi ailleurs → « déjà envoyée », aucun nouvel email", async ({ browser }) => {
  await setMailMode("fail");
  const visitor = await newVisitor(browser);
  const reference = await submitContact(await visitor.newPage(), withLink, { subject: "Onglet resté ouvert" });
  const id = await idOf(reference);
  await notificationStatus(id).toBe("failed");
  await visitor.close();

  const { context, page } = await adminPage(browser, withLink);
  const staleTab = await context.newPage();
  await staleTab.goto(`${withLink}/admin/demandes/${id}`);
  await page.goto(`${withLink}/admin/demandes/${id}`);
  await setMailMode("ok");
  await page.getByRole("button", { name: "Renvoyer la notification" }).click();
  await page.waitForURL(/notification=envoyee/);
  const afterFirst = (await emailsFor(reference)).length;

  await staleTab.getByRole("button", { name: "Renvoyer la notification" }).click();
  await staleTab.waitForURL(/notification=/);
  expect(new URL(staleTab.url()).searchParams.get("notification")).toBe("deja-envoyee");
  await expect(staleTab.locator("main")).toContainText("déjà été envoyée : aucun nouvel email");
  expect((await emailsFor(reference)).length).toBe(afterFirst);
  expect(await value`SELECT count(*) FROM requests WHERE reference = ${reference}`).toBe("1");
  await context.close();
});
