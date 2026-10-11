import {beforeEach,afterEach,it,expect} from "vitest";
import {render,screen,fireEvent,waitFor,cleanup,act} from "@testing-library/react";
import {OriginalBookReader} from "@/components/books/original-reader";
import {originalBookSlug,originalBookChapters} from "@/lib/books/original";
import {setStorageAccount} from "@/lib/account/storage";
beforeEach(()=>{localStorage.clear();setStorageAccount(null);});
afterEach(()=>{cleanup();setStorageAccount(null);localStorage.clear();});
it("resumes a chapter, saves bookmarks and reloads account-specific positions",async()=>{
 localStorage.setItem(`mirath:book:v1:${originalBookSlug}`,JSON.stringify({page:3,bookmarks:[2]}));
 render(<OriginalBookReader slug={originalBookSlug} chapters={originalBookChapters}/>);
 await waitFor(()=>expect(screen.getByLabelText("Sommaire")).toHaveValue("3"));
 fireEvent.click(screen.getByRole("button",{name:"Marquer ce chapitre"}));
 expect(JSON.parse(localStorage.getItem(`mirath:book:v1:${originalBookSlug}`)!)).toEqual({page:3,bookmarks:[2,3]});
 act(()=>setStorageAccount("other-reader"));
 await waitFor(()=>expect(screen.getByLabelText("Sommaire")).toHaveValue("1"));
 expect(screen.queryByRole("button",{name:"Signet 2"})).toBeNull();
});
