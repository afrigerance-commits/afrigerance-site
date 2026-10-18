import { afterEach, expect, it, vi } from "vitest";
import { prepareNativeOffline } from "@/lib/quran/native/offline";
import type { NativeTrack } from "@/lib/quran/native/playlist";
const cacheAudio=vi.hoisted(()=>vi.fn(async()=>{}));
vi.mock("@/lib/quran/native/bridge",()=>({nativeQuran:{cacheAudio},nativeQuranAvailable:()=>true}));
const url="https://everyayah.com/data/Ghamadi_40kbps/001001.mp3";
const track:NativeTrack={id:"1:arabic",urls:[url],verse:1,globalNumber:1,chapter:1,sourceVerse:1,phase:"arabic",title:"Verse",artist:"Qari",reciterId:"everyayah.ghamdi",audioMode:"arabic"};
afterEach(()=>{vi.restoreAllMocks();vi.unstubAllGlobals();cacheAudio.mockClear();});
it("hands an already downloaded recording to Android without another network request",async()=>{
 vi.spyOn(navigator,"onLine","get").mockReturnValue(false);
 vi.stubGlobal("caches",{open:async()=>({match:async()=>({blob:async()=>new Blob(["audio-file"],{type:"audio/mpeg"})})})});
 await prepareNativeOffline([track,track],()=>false);
 expect(cacheAudio).toHaveBeenCalledOnce();expect(cacheAudio).toHaveBeenCalledWith({url,base64:btoa("audio-file")});
});
it("refuses a partial offline pack before starting the queue",async()=>{
 vi.spyOn(navigator,"onLine","get").mockReturnValue(false);
 vi.stubGlobal("caches",{open:async()=>({match:async()=>undefined})});
 await expect(prepareNativeOffline([track],()=>false)).rejects.toThrow("lecture complète");expect(cacheAudio).not.toHaveBeenCalled();
});
it("does not transfer files for online streams or cancelled starts",async()=>{
 vi.spyOn(navigator,"onLine","get").mockReturnValue(true);
 await prepareNativeOffline([track],()=>false);expect(cacheAudio).not.toHaveBeenCalled();
});
