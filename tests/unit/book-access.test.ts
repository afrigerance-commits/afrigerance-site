import { describe, expect, it } from "vitest";
import { getBookAccess } from "@/lib/book-access";
import { books, getBook } from "@/lib/data/books";
describe("Accès aux ouvrages", () => {
  it("conserve l’ancien accès à Ibn Kathîr sans doubler le catalogue", () => {
    expect(getBook("histoires-prophetes-ibn-kathir")).toBe(getBook("histoires-des-prophetes-ibn-kathir"));
    expect(books.filter(book => book.auteur === "Ibn Kathîr")).toHaveLength(1);
  });
  it("ne propose pas un fichier sans droits ni un droit sans fichier", () => {
    expect(getBookAccess({...books.find(book => book.slug === "mukhtasar-al-akhdari")!,fichierPdf:"/exemple.pdf"}).mode).toBe("notice");
    expect(getBookAccess({...books.find(book => book.slug === "mukhtasar-al-akhdari")!,droits:"diffusion_autorisee"}).mode).toBe("notice");
    expect(getBookAccess({...books.find(book => book.slug === "mukhtasar-al-akhdari")!,droits:"diffusion_autorisee",fichierPdf:"/exemple.pdf"})).toEqual({mode:"read",label:"Lire l’ouvrage",href:"/exemple.pdf"});
  });
  it("sépare la consultation externe de la lecture locale", () => {
    expect(getBookAccess({...books.find(book => book.slug === "mukhtasar-al-akhdari")!,droits:"consultation_externe",lienConsultationExterne:"https://example.org/book"}).mode).toBe("external");
  });
});
