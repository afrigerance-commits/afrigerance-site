import {beforeEach,afterEach,expect,it} from "vitest";
import {getPersonalItem,setPersonalItem,removePersonalItem,setStorageAccount,isSyncKey,accountKeys} from "@/lib/account/storage";
beforeEach(()=>{localStorage.clear();setStorageAccount(null);});
afterEach(()=>{setStorageAccount(null);localStorage.clear();});
it("isolates guest data and two accounts on a shared device",()=>{
 const key="mirath:quran:notes:v1";setPersonalItem(key,"guest");setStorageAccount("alice");expect(getPersonalItem(key)).toBeNull();setPersonalItem(key,"alice-note");setStorageAccount("bob");expect(getPersonalItem(key)).toBeNull();setPersonalItem(key,"bob-note");setStorageAccount("alice");expect(getPersonalItem(key)).toBe("alice-note");setStorageAccount(null);expect(getPersonalItem(key)).toBe("guest");
});
it("keeps deletion pending for synchronization and excludes credentials and audio files",()=>{
 setStorageAccount("alice");const key="mirath:learning:v1:lire-le-coran";setPersonalItem(key,'["lesson"]');removePersonalItem(key);expect(accountKeys("alice")).toEqual([key]);expect(localStorage.getItem(`mirath:account:alice:${key}:dirty`)).toBe("true");expect(isSyncKey("supabase-auth-token")).toBe(false);expect(isSyncKey("mirath:quran:audio-packs:v1")).toBe(false);
});
