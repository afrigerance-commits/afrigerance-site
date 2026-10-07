import { test, expect } from "@playwright/test";

test("les exercices valident le parcours et persistent après navigation", async ({ page }) => {
  await page.goto("/apprendre/lire-le-coran/louange-et-misericorde");
  await page.getByRole("radio", { name:"La miséricorde",exact:true }).check();
  await page.getByRole("radio", { name:"Comme une traduction du sens, avec son traducteur",exact:true }).check();
  await page.getByRole("button", { name:"Corriger mes réponses" }).click();
  await expect(page.getByText("2 / 2 réponses correctes",{exact:false})).toBeVisible();
  await page.getByRole("button", { name:"Valider la leçon" }).click();
  await page.goto("/apprendre/lire-le-coran");
  await expect(page.getByRole("status")).toHaveText("1 / 3 leçons validées");
  await page.reload();
  await expect(page.getByRole("status")).toHaveText("1 / 3 leçons validées");
});

test("la lecture concentrée peut être quittée au clavier", async ({ page }) => {
  await page.goto("/coran/1");
  await page.getByRole("button", { name:"Lecture concentrée", exact:true }).click();
  await expect(page.getByRole("banner")).toBeHidden();
  await expect(page.locator('.reader-focused #verset-1')).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("banner")).toBeVisible();
  await page.getByText("Choisir un récitateur · Mishary Alafasy",{exact:true}).click();
  await expect(page.getByRole("button",{name:"Saoud Al-Shuraim",exact:true})).toBeVisible();
});

for (const width of [360,390,768,1280]) {
  test(`les pages remaniées restent lisibles à ${width}px`, async ({ page }) => {
    await page.setViewportSize({width,height:900});
    await page.emulateMedia({reducedMotion:"reduce"});
    const errors:string[]=[];page.on("pageerror", error=>errors.push(error.message));
    for (const path of ["/","/coran/1","/apprendre","/apprendre/lire-le-coran","/apprendre/lire-le-coran/louange-et-misericorde","/bibliotheque","/invocations/dettes-difficultes-financieres"]) {
      const response=await page.goto(path);
      expect(response?.status(),path).toBe(200);
      await expect(page.getByRole("heading",{level:1})).toHaveCount(1);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),path).toBe(true);
      if(path==="/" && [390,1280].includes(width)) await page.screenshot({path:`test-results/home-${width}.png`,fullPage:true});
      if(path==="/coran/1" && width===390) {
        await expect(page.locator('#verset-1 p[lang="ar"]')).toHaveAttribute("dir","rtl");
        await page.screenshot({path:"test-results/reader-390.png",fullPage:false});
      }
    }
    expect(errors).toEqual([]);
  });
}
