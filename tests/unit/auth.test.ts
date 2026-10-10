import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  signUp: vi.fn(), signIn: vi.fn(), resend: vi.fn(), exchange: vi.fn(), verify: vi.fn(), upsert: vi.fn(), from: vi.fn(),
}));
vi.mock("@/lib/supabase/env", () => ({ isSupabaseConfigured: true }));
vi.mock("@/lib/site-config", () => ({ siteConfig: { url: "https://miraath.netlify.app" } }));
vi.mock("@/lib/supabase/server", () => ({ createClient: async () => ({
  auth: { signUp: mocks.signUp, signInWithPassword: mocks.signIn, resend: mocks.resend, exchangeCodeForSession: mocks.exchange, verifyOtp: mocks.verify },
  from: mocks.from,
}) }));
vi.mock("next/navigation", () => ({ redirect: (path: string) => { throw new Error(`REDIRECT:${path}`); } }));
import { signIn, signUp, resendConfirmation } from "@/lib/actions/auth";
import { safeAuthRedirect } from "@/lib/auth/redirect";
import { GET as callback } from "@/app/auth/callback/route";
import { GET as confirm } from "@/app/auth/confirm/route";

const user = { id: "test-user", email: "reader@example.com", user_metadata: { display_name: "Lecteur" } };
const authenticated = { data: { user, session: { user } }, error: null };
function form(values: Record<string, string> = {}) {
  const data = new FormData();
  Object.entries({ email: " reader@example.com ", password: "test-password", displayName: "Lecteur", ...values }).forEach(([key, value]) => data.set(key, value));
  return data;
}
beforeEach(() => {
  vi.resetAllMocks();
  mocks.from.mockReturnValue({ upsert: mocks.upsert });
  mocks.upsert.mockResolvedValue({ error: null });
});
describe("Inscription et connexion", () => {
  it("attend la confirmation sans profil ni redirection lorsqu’aucune session n’est délivrée", async () => {
    mocks.signUp.mockResolvedValue({ data: { user, session: null }, error: null });
    expect(await signUp({}, form())).toHaveProperty("message");
    expect(mocks.from).not.toHaveBeenCalled();
    expect(mocks.signUp).toHaveBeenCalledWith(expect.objectContaining({ email: "reader@example.com", options: { data: { display_name: "Lecteur" }, emailRedirectTo: "https://miraath.netlify.app/auth/callback" } }));
  });
  it("initialise le profil et ouvre le compte si la session est déjà disponible", async () => {
    mocks.signUp.mockResolvedValue(authenticated);
    await expect(signUp({}, form())).rejects.toThrow("REDIRECT:/compte");
    expect(mocks.upsert).toHaveBeenCalledWith({ id: "test-user", display_name: "Lecteur" }, { onConflict: "id", ignoreDuplicates: true });
  });
  it("refuse les données invalides avant de contacter Supabase", async () => {
    expect(await signUp({}, form({ email: "invalid" }))).toHaveProperty("error");
    expect(await signUp({}, form({ displayName: " " }))).toHaveProperty("error");
    expect(await signUp({}, form({ password: "short" }))).toHaveProperty("error");
    expect(mocks.signUp).not.toHaveBeenCalled();
  });
  it("explique une adresse non confirmée", async () => {
    mocks.signIn.mockResolvedValue({ error: { code: "email_not_confirmed" } });
    expect((await signIn({}, form())).error).toMatch(/Confirmez/);
    expect(mocks.from).not.toHaveBeenCalled();
  });
  it("neutralise une redirection externe à la connexion", async () => {
    mocks.signIn.mockResolvedValue(authenticated);
    await expect(signIn({}, form({ redirect: "https://evil.example" }))).rejects.toThrow("REDIRECT:/compte");
  });
  it("signale l’échec de création du profil", async () => {
    mocks.signIn.mockResolvedValue(authenticated);
    mocks.upsert.mockResolvedValue({ error: { code: "42501" } });
    expect(await signIn({}, form())).toHaveProperty("error");
  });
  it("renvoie un lien sans divulguer l’existence d’un compte", async () => {
    mocks.resend.mockResolvedValue({ error: null });
    expect(await resendConfirmation({}, form())).toHaveProperty("message");
    expect(mocks.resend).toHaveBeenCalledWith({ type: "signup", email: "reader@example.com", options: { emailRedirectTo: "https://miraath.netlify.app/auth/callback" } });
  });
  it("gère un renvoi limité ou refusé", async () => {
    mocks.resend.mockResolvedValue({ error: { status: 429 } });
    expect(await resendConfirmation({}, form())).toHaveProperty("error");
  });
});
describe("Retour de confirmation", () => {
  it("échange le code PKCE et élimine les paramètres sensibles", async () => {
    mocks.exchange.mockResolvedValue(authenticated);
    const response = await callback(new Request("https://miraath.netlify.app/auth/callback?code=secret&next=https://evil.example"));
    expect(mocks.exchange).toHaveBeenCalledWith("secret");
    expect(response.headers.get("location")).toBe("https://miraath.netlify.app/compte");
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("referrer-policy")).toBe("no-referrer");
  });
  it("vérifie le token du modèle SSR même depuis un autre navigateur", async () => {
    mocks.verify.mockResolvedValue(authenticated);
    const response = await confirm(new Request("https://miraath.netlify.app/auth/confirm?token_hash=hash&type=email"));
    expect(mocks.verify).toHaveBeenCalledWith({ token_hash: "hash", type: "email" });
    expect(response.headers.get("location")).toBe("https://miraath.netlify.app/compte");
  });
  it("rejette les liens manquants, expirés et les autres types OTP", async () => {
    mocks.exchange.mockResolvedValue({ data: {}, error: { code: "expired" } });
    for (const response of [
      await callback(new Request("https://miraath.netlify.app/auth/callback")),
      await callback(new Request("https://miraath.netlify.app/auth/callback?code=expired")),
      await confirm(new Request("https://miraath.netlify.app/auth/confirm?token_hash=hash&type=recovery")),
    ]) expect(response.headers.get("location")).toBe("https://miraath.netlify.app/connexion?erreur=lien_confirmation");
    expect(mocks.verify).not.toHaveBeenCalled();
  });
});
describe("Destination après connexion", () => {
  it.each(["https://evil.example", "//evil.example", "/\\evil.example", "/%5cevil.example", "/%2fevil.example", "/auth/confirm", "/connexion", "/%00evil", "/%invalid"])("refuse %s", (path) => expect(safeAuthRedirect(path)).toBe("/compte"));
  it("conserve une destination interne", () => expect(safeAuthRedirect("/admin/articles?page=2")).toBe("/admin/articles?page=2"));
});
