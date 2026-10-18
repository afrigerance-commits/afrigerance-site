import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
const push = vi.hoisted(()=>vi.fn());
vi.mock("next/navigation",()=>({useRouter:()=>({push})}));
import { QuranPageNavigation } from "@/components/islamic/quran-page-navigation";
import { QuranPartitionExplorer } from "@/components/islamic/quran-partition-explorer";
afterEach(()=>{cleanup();vi.clearAllMocks();});
it("opens page 1 from the Quran index and allows jumping directly to page 604",()=>{
  render(<QuranPartitionExplorer><p>Sourates</p></QuranPartitionExplorer>);
  fireEvent.click(screen.getByRole("button",{name:"604 pages"}));
  expect(screen.getByRole("link",{name:"Commencer à la page 1"})).toHaveAttribute("href","/coran/lecture/page/1");
  fireEvent.change(screen.getByRole("combobox",{name:"Choisir une page du Coran"}),{target:{value:"604"}});
  expect(push).toHaveBeenCalledWith("/coran/lecture/page/604");
});
it("shows correct neighbouring pages and never navigates beyond the last page",()=>{
  const view=render(<QuranPageNavigation current={22}/>);
  expect(screen.getByRole("link",{name:/Page précédente/})).toHaveAttribute("href","/coran/lecture/page/21");
  expect(screen.getByRole("link",{name:/Page suivante/})).toHaveAttribute("href","/coran/lecture/page/23");
  view.rerender(<QuranPageNavigation current={604}/>);
  expect(screen.queryByRole("link",{name:/Page suivante/})).toBeNull();
});
