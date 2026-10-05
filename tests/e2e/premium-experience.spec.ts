import { test, expect } from "@playwright/test";

test("la recherche de sourates comprend les accents et peut être réinitialisée",async({page})=>{
  await page.goto("/coran");
  const search=page.getByRole("searchbox",{name:"Rechercher une sourate"});
  await search.fill("112");
  await expect(page.getByRole("status")).toHaveText("1 sourate");
  await expect(page.locator('a[href="/coran/112"]')).toBeVisible();
  await search.fill("introuvablexyz");
  await expect(page.getByText("Aucune sourate ne correspond", {exact:false})).toBeVisible();
  await page.getByRole("button",{name:"Afficher toutes les sourates"}).click();
  await expect(page.getByRole("status")).toHaveText("114 sourates");
});

test("la recherche rapide s'ouvre au clavier et restaure le focus",async({page})=>{
  await page.goto("/");
  await page.getByRole("button",{name:"Rechercher",exact:true}).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("textbox",{name:"Votre recherche"})).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("la reprise de lecture respecte le chapitre et l'ancre stockés",async({page})=>{
  await page.addInitScript(()=>localStorage.setItem("mirath:quran:last-reading",JSON.stringify({chapter:2,verse:5})));
  await page.goto("/coran");
  await expect(page.getByRole("link",{name:/Reprendre ma lecture/})).toHaveAttribute("href","/coran/2#verset-5");
});

test("les signets de hadiths sont persistants et supprimables",async({page})=>{
  await page.goto("/hadith/boukhari/1");
  await page.getByRole("button",{name:"Garder ce hadith",exact:true}).first().click();
  await expect(page.getByRole("button",{name:"Enregistré",exact:true})).toHaveCount(1);
  await page.goto("/hadith");
  await page.getByText("Mes hadiths enregistrés").click();
  await expect(page.locator('details a[href*="#hadith-"]')).toHaveCount(1);
  await page.getByRole("button",{name:/Retirer/}).click();
  await expect(page.getByText("Mes hadiths enregistrés")).toHaveCount(0);
});

for(const width of [390,768,1280,1536]){
 test(`parcours publics sans débordement à ${width}px`,async({page})=>{
   await page.setViewportSize({width,height:900});
   const errors:string[]=[];page.on("pageerror",error=>errors.push(`${page.url()}: ${error.message}`));
   for(const path of ["/","/coran","/coran/1","/hadith","/hadith/boukhari/1","/videos","/bibliotheque","/blog","/apprendre","/sira","/compagnons","/a-propos","/contact"]){
     const response=await page.goto(path);
     expect(response?.status(),path).toBe(200);
     if (path === "/") { await page.emulateMedia({reducedMotion:"reduce"}); await expect(page.locator(".hero-enter").first()).toHaveCSS("animation-name","none"); }
     await expect(page.getByRole("heading",{level:1})).toHaveCount(1);
     expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),path).toBe(true);
   }
   expect(errors).toEqual([]);
 });
}
