import {expect,it} from "vitest";
import {safeExternalBookUrl,validPdfPath} from "@/lib/books/validation";
import {books} from "@/lib/data/books";
import {getBookAccess} from "@/lib/book-access";
import {originalBookChapters,originalBookSlug} from "@/lib/books/original";
it("allows only HTTPS consultation links without embedded credentials",()=>{expect(safeExternalBookUrl("javascript:alert(1)")).toBeNull();expect(safeExternalBookUrl("https://user:secret@example.org")).toBeNull();expect(safeExternalBookUrl("https://example.org/book")).toBe("https://example.org/book");});
it("rejects foreign upload paths and directory traversal",()=>{const owner="11111111-1111-1111-1111-111111111111",path=`${owner}/22222222-2222-2222-2222-222222222222.pdf`;expect(validPdfPath(path,owner)).toBe(true);expect(validPdfPath(path,"33333333-3333-3333-3333-333333333333")).toBe(false);expect(validPdfPath(`${owner}/../file.pdf`)).toBe(false);});
it("provides an actual original reading entry while private supplied editions remain notices",()=>{const book=books.find(book=>book.slug===originalBookSlug)!;expect(getBookAccess(book).href).toBe(`/bibliotheque/${originalBookSlug}/lire`);expect(originalBookChapters).toHaveLength(9);for(const chapter of originalBookChapters){expect(chapter.ressources.length).toBeGreaterThan(0);expect(chapter.questions).toHaveLength(5);}expect(books.filter(book=>book.droits==="droits_non_verifies").every(book=>getBookAccess(book).mode==="notice")).toBe(true);});
