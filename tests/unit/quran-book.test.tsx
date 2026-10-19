import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { bookSpreadNumbers, type QuranBookPage } from "@/lib/quran/book";
const {push, player} = vi.hoisted(()=>({push:vi.fn(), player:{playingVerse:null as number|null}}));
vi.mock("next/navigation",()=>({useRouter:()=>({push})}));
vi.mock("@/components/islamic/quran-audio-player",()=>({
  QuranAudioProvider:({children}:{children:React.ReactNode})=>children,
  QuranAudioToolbar:({startVerse}:{startVerse:number})=><div data-testid="audio-start">{startVerse}</div>,
  QuranMiniPlayer:()=>null, QuranAudioModeSelector:()=>null, useQuranAudioContext:()=>player,
}));
vi.mock("@/components/islamic/quran-reading-tools",()=>({
  QuranReadingTools:({children,continuous,controls}:{children:React.ReactNode;continuous:boolean;controls:boolean})=><div data-testid="reading" data-continuous={continuous} data-controls={controls}>{children}</div>,
  QuranVerseContent:({arabic,audioNumber}:{arabic:string;audioNumber:number})=><button data-testid="verse" data-position={audioNumber}>{arabic}</button>,
}));
import { QuranBookReader } from "@/components/islamic/quran-book-reader";
let wide=false;
const pages:QuranBookPage[]=[1,2].map((number)=>({number,juz:1,parts:[{chapter:number,title:`Sourate ${number}`,verses:[{number:1,arabic:`عَرَبِيّ ${number}`,french:`Sens ${number}`,globalNumber:number===1?1:8,position:number}]}]}));
function mount(current=1) {
 vi.stubGlobal('matchMedia',vi.fn(()=>({matches:wide,addEventListener:vi.fn(),removeEventListener:vi.fn()})));
 return render(<QuranBookReader pages={pages} current={current}/>);
}
afterEach(()=>{cleanup();vi.unstubAllGlobals();vi.clearAllMocks();localStorage.clear();wide=false;player.playingVerse=null;});

it("covers every book opening in Arabic order, without invalid pages",()=>{
 for(let n=1;n<=604;n++) {const pair=bookSpreadNumbers(n);expect(pair).toContain(n);expect(pair[0]%2).toBe(1);expect(pair[1]).toBe(pair[0]+1);expect(pair[1]).toBeLessThanOrEqual(604);}
 expect(bookSpreadNumbers(604)).toEqual([603,604]);
 expect(()=>bookSpreadNumbers(0)).toThrow();expect(()=>bookSpreadNumbers(605)).toThrow();
});
it("renders a bound book and selects the requested even page on mobile",()=>{
 mount(2);
 const leaves=screen.getAllByRole('article');
 expect(leaves.map(x=>x.getAttribute('aria-label'))).toEqual(['Page 1','Page 2']);
 expect(leaves[0]).toHaveAttribute('data-current','false');expect(leaves[1]).toHaveAttribute('data-current','true');
 expect(screen.getByRole('group',{name:'Livre du Coran'})).toHaveAttribute('dir','rtl');
 for(const reading of screen.getAllByTestId('reading')) {expect(reading).toHaveAttribute('data-continuous','true');expect(reading).toHaveAttribute('data-controls','false');}
 expect(screen.getByTestId('audio-start')).toHaveTextContent('2');
});
it("turns a double page on desktop and preserves the page selector",()=>{
 wide=true; mount();
 expect(screen.getAllByRole('link',{name:/Pages suivantes/})[0]).toHaveAttribute('href','/coran/lecture/page/3');
 const book=screen.getByRole('group',{name:'Livre du Coran'});
 fireEvent.keyDown(book,{key:'ArrowLeft'});expect(push).toHaveBeenLastCalledWith('/coran/lecture/page/3');
 push.mockClear();fireEvent.keyDown(screen.getAllByTestId('verse')[0],{key:'ArrowLeft'});expect(push).not.toHaveBeenCalled();
 fireEvent.change(screen.getAllByRole('combobox',{name:'Choisir une page du Coran'})[0],{target:{value:'604'}});
 expect(push).toHaveBeenLastCalledWith('/coran/lecture/page/604');
});
it("turns one page with a horizontal swipe and ignores vertical scrolling",()=>{
 mount();const book=screen.getByRole('group',{name:'Livre du Coran'});
 fireEvent.touchStart(book,{touches:[{clientX:40,clientY:100}]});fireEvent.touchEnd(book,{changedTouches:[{clientX:180,clientY:105}]});
 expect(push).toHaveBeenLastCalledWith('/coran/lecture/page/2');
 push.mockClear();fireEvent.touchStart(book,{touches:[{clientX:40,clientY:100}]});fireEvent.touchEnd(book,{changedTouches:[{clientX:50,clientY:300}]});
 expect(push).not.toHaveBeenCalled();
});
it("shows the companion page on mobile when the recitation crosses the page boundary",async()=>{
 const view=mount();player.playingVerse=2;
 await act(async()=>{view.rerender(<QuranBookReader pages={pages} current={1}/>);});
 expect(screen.getByRole('article',{name:'Page 2'})).toHaveAttribute('data-current','true');
 expect(screen.getByRole('article',{name:'Page 1'})).toHaveAttribute('data-current','false');
 expect(screen.queryByRole('button',{name:'Lecture en un bloc'})).toBeNull();
 expect(screen.getByRole('button',{name:'Afficher le tafsir'})).toBeInTheDocument();
});
