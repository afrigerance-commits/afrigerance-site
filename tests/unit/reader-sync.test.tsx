import {act,cleanup,render,screen,waitFor} from "@testing-library/react";
import {afterEach,beforeEach,expect,it,vi} from "vitest";
const mocks=vi.hoisted(()=>({getUser:vi.fn(),select:vi.fn(),rpc:vi.fn(),authChange:undefined as undefined|((event:string,session:any)=>void)}));
vi.mock("@/lib/supabase/env",()=>({isSupabaseConfigured:true}));
vi.mock("@/lib/supabase/client",()=>({createClient:()=>({auth:{getUser:mocks.getUser,onAuthStateChange:(callback:any)=>{mocks.authChange=callback;return {data:{subscription:{unsubscribe:vi.fn()}}};}},from:()=>({select:()=>({eq:mocks.select})}),rpc:mocks.rpc})}));
import {ReaderSyncProvider,ReaderSyncPanel} from "@/components/account/reader-sync";
import {setStorageAccount} from "@/lib/account/storage";
beforeEach(()=>{localStorage.clear();setStorageAccount(null);mocks.getUser.mockResolvedValue({data:{user:{id:"alice"}}});mocks.select.mockResolvedValue({data:[],error:null});mocks.rpc.mockReset();});
afterEach(()=>{cleanup();setStorageAccount(null);localStorage.clear();});
it("does not upload guest notes and preserves local changes on a revision conflict",async()=>{
 const key="mirath:quran:notes:v1",prefix=`mirath:account:alice:${key}`;
 localStorage.setItem(key,'{"guest":"private"}');localStorage.setItem(prefix,'{"alice":"local"}');localStorage.setItem(`${prefix}:dirty`,"true");localStorage.setItem(`${prefix}:revision`,"1");
 const row={user_id:"alice",key,value:'{"alice":"remote"}',revision:2,updated_at:"2026-10-11"};
 mocks.select.mockResolvedValue({data:[row],error:null});mocks.rpc.mockResolvedValue({data:{conflict:true,row},error:null});
 render(<ReaderSyncProvider><ReaderSyncPanel/></ReaderSyncProvider>);
 await waitFor(()=>expect(screen.getByText("Deux versions différentes de vos données de lecture.")).toBeInTheDocument());
 expect(mocks.rpc).toHaveBeenCalledWith("sync_reader_state",{p_key:key,p_value:'{"alice":"local"}',p_expected:1});
 expect(localStorage.getItem(prefix)).toBe('{"alice":"local"}');expect(localStorage.getItem(key)).toBe('{"guest":"private"}');
});
it("discards a fetch result after changing accounts",async()=>{
 let complete!:(value:any)=>void;mocks.select.mockImplementation(()=>new Promise(resolve=>{complete=resolve;}));
 render(<ReaderSyncProvider><ReaderSyncPanel/></ReaderSyncProvider>);
 await waitFor(()=>expect(mocks.select).toHaveBeenCalled());
 act(()=>mocks.authChange?.("SIGNED_OUT",null));
 await act(async()=>{complete({data:[{user_id:"alice",key:"mirath:quran:notes:v1",value:"old-account",revision:1}],error:null});});
 expect(localStorage.getItem("mirath:account:alice:mirath:quran:notes:v1")).toBeNull();
 expect(screen.getByText("Mode sans compte : données de cet appareil.")).toBeInTheDocument();
});
