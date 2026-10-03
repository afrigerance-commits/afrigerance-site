import { randomInt } from "node:crypto";
import { expect, type Browser, type Page } from "@playwright/test";
import { adminPassword, mockResend, testAdmins } from "./settings";

/**
 * Nouveau visiteur avec sa propre adresse IP (le site limite à 5 demandes par adresse en 10 minutes).
 */
export function newVisitor(browser: Browser, viewport = { width: 1440, height: 900 }) {
  const ip = `10.${randomInt(256)}.${randomInt(256)}.${randomInt(1, 255)}`;
  return browser.newContext({ viewport, extraHTTPHeaders: { "X-Forwarded-For": ip } });
}

/** Un humain met plus de 2 secondes à remplir un formulaire : en dessous, l'envoi est refusé comme automatique. */
export async function waitLikeAHuman(page: Page) {
  await page.waitForTimeout(2200);
}

export async function fillContact(page: Page, base: string, { contact = "fatou@exemple.test", subject = "Question" } = {}) {
  await page.goto(`${base}/contact`);
  await page.getByLabel("Votre nom").fill("Fatou Sarr");
  await page.getByLabel("Email ou téléphone").fill(contact);
  await page.getByLabel("Objet").fill(subject);
  await page.getByRole("textbox", { name: "Message" }).fill("Bonjour,\nproposez-vous un contrat de maintenance ?");
  await waitLikeAHuman(page);
}

/** Envoie un message de contact et renvoie la référence affichée au visiteur. */
export async function submitContact(page: Page, base: string, options?: { contact?: string; subject?: string }) {
  await fillContact(page, base, options);
  await page.getByRole("button", { name: "Envoyer le message" }).click();
  return confirmedReference(page, "Message envoyé", /^CT-/);
}

export async function confirmedReference(page: Page, heading: string, pattern: RegExp) {
  await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  return (await page.locator("strong").filter({ hasText: pattern }).innerText()).trim();
}

export async function fillLogin(page: Page, base: string, email: string, password: string) {
  await page.goto(`${base}/admin/connexion`);
  await page.getByLabel("Adresse email").fill(email);
  await page.getByLabel("Mot de passe").fill(password);
  await page.getByRole("button", { name: "Se connecter" }).click();
}

export async function login(page: Page, base: string) {
  await fillLogin(page, base, testAdmins.main.email, adminPassword("main"));
  await page.waitForURL("**/admin/demandes");
}

export async function hasHorizontalScroll(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
}

// ── Faux service d'email ─────────────────────────────────────────────────────

export type MockEmail = {
  mode: string;
  authorization: string | null;
  idempotencyKey: string | null;
  body: { from: string; to: string[]; subject: string; text: string; reply_to?: string };
};

export async function setMailMode(mode: "ok" | "fail" | "slow") {
  await fetch(`${mockResend.url}/__test/mode`, { method: "POST", body: mode });
}

export async function emailsFor(reference: string): Promise<MockEmail[]> {
  const all = (await (await fetch(`${mockResend.url}/__test/emails`)).json()) as MockEmail[];
  return all.filter((email) => email.body.subject?.includes(reference));
}
