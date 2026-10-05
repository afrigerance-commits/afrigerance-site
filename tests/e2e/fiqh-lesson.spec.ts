import { test, expect } from "@playwright/test";

test("les cours en attente de validation ne sont pas proposés comme disponibles",async({page})=>{
  await page.goto("/fiqh/malikite");
  await expect(page.getByText("Les leçons sont en cours de vérification",{exact:false})).toBeVisible();
  await expect(page.getByRole("link",{name:/L’eau et la purification/})).toHaveCount(0);
});
for(const route of ["/fiqh/malikite/purification/leau-et-la-purification","/fiqh/malikite/purification/introduction-madhhab-malikite"]){
  test(`le brouillon ${route} reste inaccessible au public`,async({page})=>{
    const response=await page.goto(route);
    expect(response?.status()).toBe(404);
    await expect(page.getByText("Contenu de démonstration",{exact:false})).toHaveCount(0);
  });
}
