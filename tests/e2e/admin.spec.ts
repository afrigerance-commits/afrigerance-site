/**
 * Espace d'administration : accès réservé, connexion, liste et filtres, fiche, statuts,
 * renvoi de notification, déconnexion, affichage mobile, blocage des essais de mot de passe.
 * Serveur utilisé : base de test, envoi d'email non configuré.
 */
import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { closeDb, resetRequests, value } from "./support/db";
import { confirmedReference, fillLogin, hasHorizontalScroll, login, newVisitor, submitContact, waitLikeAHuman } from "./support/helpers";
import { adminPassword, servers, testAdmins } from "./support/settings";

const base = servers.noEmail.url;
const today = new Date().toISOString().slice(0, 10);

test.describe.configure({ mode: "serial" });

let devisRef = "";
let devisId = "";
let contactRef = "";
let context: BrowserContext;
let page: Page;

test.beforeAll(resetRequests);
test.afterAll(async () => {
  await context?.close();
  await closeDb();
});

test("préparation : un devis et un message envoyés depuis le site", async ({ browser }) => {
  const visitor = await newVisitor(browser);
  const p = await visitor.newPage();
  await p.goto(`${base}/devis?pole=infogerance`);
  await p.getByLabel("Gestion du parc informatique").check();
  await p.getByLabel("Cybersécurité").check();
  await p.getByRole("button", { name: "Continuer" }).click();
  await p.getByLabel("Description du besoin").fill("Nous avons 15 postes et souhaitons un suivi régulier, avec sauvegardes.");
  await p.getByLabel("Ville d’intervention").fill("Dakar");
  await p.getByLabel("6 à 20").check();
  await p.getByRole("group", { name: /infrastructure informatique/ }).getByLabel("Oui").check();
  await p.getByRole("button", { name: "Continuer" }).click();
  await p.getByLabel("Nom et prénom").fill("Awa Diop");
  await p.getByLabel("Entreprise ou organisation").fill("Société Test SARL");
  await p.getByLabel("Email").fill("awa@exemple.test");
  await p.getByLabel("Téléphone").fill("+221 77 000 00 00");
  await p.getByRole("button", { name: "Continuer" }).click();
  await waitLikeAHuman(p);
  await p.getByRole("button", { name: "Envoyer ma demande" }).click();
  devisRef = await confirmedReference(p, "Demande envoyée", /^DV-/);
  devisId = (await value`SELECT id FROM requests WHERE reference = ${devisRef}`)!;
  contactRef = await submitContact(p, base, { subject: "Question sur le support" });

  // Envoi d'email non configuré : les deux notifications sont marquées en échec, les demandes conservées.
  await expect
    .poll(() => value`SELECT count(*) FROM requests WHERE notification_status = 'failed'`)
    .toBe("2");
  expect(await value`SELECT notification_error FROM requests WHERE id = ${devisId}`).toContain("non configuré");
  await visitor.close();
});

test.describe("sans connexion", () => {
  test("chaque page de l'administration renvoie vers la connexion, sans aucune donnée", async ({ page }) => {
    for (const path of ["/admin", "/admin/demandes", `/admin/demandes/${devisId}`, "/admin/demandes?type=devis"]) {
      await page.goto(base + path);
      await expect(page).toHaveURL(/\/admin\/connexion/);
      const html = await page.content();
      expect(html).not.toContain(devisRef);
      expect(html).not.toContain("Awa Diop");
    }
  });

  test("requête HTTP directe sans cookie → redirection, aucune donnée", async () => {
    const response = await fetch(`${base}/admin/demandes/${devisId}`, { redirect: "manual" });
    const body = await response.text();
    expect(response.status).toBe(307);
    expect(body).not.toContain(devisRef);
    expect(body).not.toContain("awa@exemple.test");
  });

  test("cookie de session inventé → refusé", async ({ context: fresh, page }) => {
    await fresh.addCookies([
      { name: "afg_admin_session", value: "jeton-invente-par-un-attaquant-1234567890", domain: "localhost", path: "/admin" },
    ]);
    await page.goto(`${base}/admin/demandes/${devisId}`);
    await expect(page).toHaveURL(/\/admin\/connexion/);
  });
});

test("connexion : mauvais mot de passe refusé, bon mot de passe accepté, session sécurisée", async ({ browser }) => {
  context = await newVisitor(browser);
  page = await context.newPage();
  await fillLogin(page, base, testAdmins.main.email, "mauvais-mot-de-passe-000");
  await expect(page.getByRole("alert").filter({ hasText: "incorrect" })).toBeVisible();
  await expect(page).toHaveURL(/\/admin\/connexion/);

  await login(page, base);
  const cookie = (await context.cookies()).find((item) => item.name === "afg_admin_session");
  expect(cookie).toMatchObject({ httpOnly: true, sameSite: "Lax", path: "/admin" });
  // Seule l'empreinte du jeton est stockée en base, jamais le jeton lui-même.
  expect(await value`SELECT count(*) FROM admin_sessions WHERE id = ${cookie!.value}`).toBe("0");
  expect(Number(await value`SELECT count(*) FROM admin_sessions`)).toBeGreaterThan(0);
});

test("liste : les deux demandes et l'alerte des notifications non envoyées", async () => {
  const text = await page.locator("main").innerText();
  expect(text).toContain(devisRef);
  expect(text).toContain(contactRef);
  expect(text).toMatch(/2 demandes dont la notification/);
});

test("filtres par type, statut, dates et notification", async () => {
  const rows = async (query: string) => {
    await page.goto(`${base}/admin/demandes${query}`);
    return page.locator("tbody tr").count();
  };
  expect(await rows("?type=contact")).toBe(1);
  expect(await rows("?type=devis")).toBe(1);
  expect(await rows("?statut=done")).toBe(0);
  await expect(page.locator("main")).toContainText("Aucune demande ne correspond");
  expect(await rows(`?du=${today}&au=${today}`)).toBe(2);
  expect(await rows("?du=2099-01-01")).toBe(0);
  await rows("?du=2026-12-31&au=2026-01-01");
  await expect(page.locator("main")).toContainText("La date de début doit précéder");
  expect(await rows("?notification=echec")).toBe(2);

  await page.goto(`${base}/admin/demandes`);
  await page.getByLabel("Type", { exact: true }).selectOption("devis");
  await page.getByRole("button", { name: "Filtrer" }).click();
  await page.waitForURL(/type=devis/);
  await expect(page.locator("tbody tr")).toHaveCount(1);
});

test("fiche : coordonnées, réponses, échec de notification et historique", async () => {
  await page.getByRole("link", { name: devisRef }).click();
  await page.waitForURL(`**/admin/demandes/${devisId}`);
  const main = page.locator("main");
  for (const expected of [
    "Awa Diop",
    "Société Test SARL",
    "awa@exemple.test",
    "+221 77 000 00 00",
    "Gestion du parc informatique, Cybersécurité",
    "Dakar",
    "6 à 20",
    "Nous avons 15 postes",
    "Échec",
    "Envoi d’email non configuré",
    "Demande reçue depuis le site",
  ]) {
    await expect(main).toContainText(expected);
  }
  await expect(page.locator('a[href="mailto:awa@exemple.test"]')).toHaveCount(1);
  await expect(page.locator('a[href="tel:+221770000000"]')).toHaveCount(1);
});

test("statuts : Nouveau → En cours → Traité, avec l'auteur dans l'historique", async () => {
  await page.getByRole("button", { name: "Passer à « En cours »" }).click();
  await expect(page.getByText("Statut : Nouveau → En cours")).toBeVisible();
  expect(await value`SELECT status FROM requests WHERE id = ${devisId}`).toBe("in_progress");

  await page.getByRole("button", { name: "Passer à « Traité »" }).click();
  await expect(page.getByText("Statut : En cours → Traité")).toBeVisible();
  expect(await value`SELECT status FROM requests WHERE id = ${devisId}`).toBe("done");
  expect(
    await value`SELECT actor FROM request_events WHERE request_id = ${devisId} AND kind = 'status_changed' ORDER BY id DESC LIMIT 1`,
  ).toBe(testAdmins.main.email);
});

test("renvoi de notification alors que l'email n'est pas configuré → échec signalé, aucun faux succès", async () => {
  await page.getByRole("button", { name: "Renvoyer la notification" }).click();
  await page.waitForURL(/notification=echec/);
  await expect(page.locator("main")).toContainText("n’a pas pu être envoyée");
  expect(await value`SELECT notification_status FROM requests WHERE id = ${devisId}`).toBe("failed");
  expect(await value`SELECT notification_attempts FROM requests WHERE id = ${devisId}`).toBe("2");
});

test("affichage mobile (390 px) : cartes et fiche sans défilement horizontal", async ({ browser }) => {
  const mobile = await newVisitor(browser, { width: 390, height: 844 });
  const p = await mobile.newPage();
  await login(p, base);
  await expect(p.locator("ul li").filter({ hasText: /DV-|CT-/ })).toHaveCount(2);
  expect(await hasHorizontalScroll(p)).toBe(false);
  await p.getByRole("link", { name: `Ouvrir : ${devisRef}` }).click();
  await p.waitForURL(`**/${devisId}`);
  expect(await hasHorizontalScroll(p)).toBe(false);
  await mobile.close();
});

test("déconnexion : message affiché, l'ancien jeton ne fonctionne plus", async ({ browser }) => {
  const token = (await context.cookies()).find((item) => item.name === "afg_admin_session")!.value;
  await page.getByRole("button", { name: "Se déconnecter" }).click();
  await page.waitForURL(/deconnexion=1/);
  await expect(page.locator("main")).toContainText("Vous êtes déconnecté");

  const other = await newVisitor(browser);
  await other.addCookies([{ name: "afg_admin_session", value: token, domain: "localhost", path: "/admin" }]);
  const p = await other.newPage();
  await p.goto(`${base}/admin/demandes`);
  await expect(p).toHaveURL(/\/admin\/connexion/);
  await other.close();
});

test("après 5 mauvais mots de passe, le compte est bloqué 15 minutes, même avec le bon", async ({ browser }) => {
  const visitor = await newVisitor(browser);
  const p = await visitor.newPage();
  for (let attempt = 0; attempt < 5; attempt += 1) {
    await fillLogin(p, base, testAdmins.lockout.email, `essai-${attempt}-mauvais-mdp`);
    await expect(p.getByRole("alert").filter({ hasText: /incorrect|Trop/ })).toBeVisible();
  }
  await fillLogin(p, base, testAdmins.lockout.email, adminPassword("lockout"));
  await expect(p.getByRole("alert").filter({ hasText: "Trop de tentatives" })).toBeVisible();
  await expect(p).toHaveURL(/\/admin\/connexion/);
  await visitor.close();
});
