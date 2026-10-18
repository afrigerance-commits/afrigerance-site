import { expect, it } from "vitest";
import { nativePlaylist } from "@/lib/quran/native/playlist";
const verses=[{number:1,globalNumber:7,sourceChapter:1,sourceVerse:7},{number:2,globalNumber:8,sourceChapter:2,sourceVerse:1}];
const defaults={chapter:1,verses,start:1,sequence:true,mode:"both" as const,repeat:"off" as const,reciterId:"ar.alafasy",artist:"Qari",frenchArtist:"Leclerc",arabic:new Map([[1,["ar1"]],[2,["ar2"]]]),french:new Map([[1,["fr1"]],[2,["fr2"]]])};
it("queues Arabic then French for each verse across chapter boundaries without needing JS ended events",()=>{
 const plan=nativePlaylist(defaults);
 expect(plan.tracks.map(t=>t.urls[0])).toEqual(["ar1","fr1","ar2","fr2"]);
 expect(plan.tracks[2]).toMatchObject({chapter:2,sourceVerse:1,verse:2});
 expect(plan.repeat).toBe(false);
});
it("starts at the selected verse and can wrap the whole section",()=>{
 const plan=nativePlaylist({...defaults,start:2,repeat:"surah"});
 expect(plan.startIndex).toBe(2); expect(plan.repeat).toBe(true);expect(plan.tracks).toHaveLength(4);
});
it("repeats both languages of a single verse together",()=>{
 const plan=nativePlaylist({...defaults,start:2,repeat:"verse"});
 expect(plan.tracks.map(t=>t.urls[0])).toEqual(["ar2","fr2"]);expect(plan.repeat).toBe(true);
});
it("supports a single French verse without loading Arabic",()=>{
 expect(nativePlaylist({...defaults,mode:"french",arabic:undefined,sequence:false}).tracks.map(t=>t.urls[0])).toEqual(["fr1"]);
});
it("prebuilds memorization repetitions and clipped silence in the native queue",()=>{
 const plan=nativePlaylist({...defaults,memorization:{from:1,to:2,repetitions:2,delay:3}});
 expect(plan.tracks.filter(t=>!t.silenceMs).map(t=>t.urls[0])).toEqual(["ar1","fr1","ar1","fr1","ar2","fr2","ar2","fr2"]);
 expect(plan.tracks.filter(t=>t.silenceMs)).toHaveLength(3);
 expect(plan.repeat).toBe(false);
});
it("refuses missing translation instead of silently skipping a verse",()=>{
 expect(()=>nativePlaylist({...defaults,french:new Map([[1,["fr1"]]])})).toThrow("verset 2");
});
