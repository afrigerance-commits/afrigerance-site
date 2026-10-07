import { describe, expect, it } from "vitest";
import { getBookAccess } from "@/lib/book-access";
import { books } from "@/lib/data/books";
describe("Accès aux ouvrages", () => {
  it("ne propose pas un fichier sans droits ni un droit sans fichier", () => {
    expect(getBookAccess({...books[0],fichierPdf:"/exemple.pdf"}).mode).toBe("notice");
    expect(getBookAccess({...books[0],droits:"diffusion_autorisee"}).mode).toBe("notice");
    expect(getBookAccess({...books[0],droits:"diffusion_autorisee",fichierPdf:"/exemple.pdf"})).toEqual({mode:"read",label:"Lire l’ouvrage",href:"/exemple.pdf"});
  });
  it("sépare la consultation externe de la lecture locale", () => {
    expect(getBookAccess({...books[0],droits:"consultation_externe",lienConsultationExterne:"https://example.org/book"}).mode).toBe("external");
  });
});
