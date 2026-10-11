import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { NativeQuranAudioEngine } from "@/components/islamic/native-quran-audio-engine";
import { useQuranAudioContext } from "@/components/islamic/quran-audio-player";
import type { NativePlaybackState } from "@/lib/quran/native/bridge";
const mock=vi.hoisted(()=>({load:vi.fn(),stop:vi.fn(async()=>{}),pause:vi.fn(async()=>{}),resume:vi.fn(async()=>{}),seek:vi.fn(async()=>{}),setSleep:vi.fn(async(_options:{until:number})=>{}),getState:vi.fn(),remove:vi.fn(),listener:null as null|((s:NativePlaybackState)=>void)}));
vi.mock("@/lib/quran/native/bridge",()=>({nativeQuranAvailable:()=>true,nativeQuran:{...mock,addListener:vi.fn(async(_event:string,listener:(s:NativePlaybackState)=>void)=>{mock.listener=listener;return {remove:mock.remove};})}}));
vi.mock("@/lib/quran/native/offline",()=>({prepareNativeOffline:vi.fn(async()=>{})}));
vi.mock("@/lib/quran/offline-audio",()=>({offlineCatalog:vi.fn(async(_chapter:number,_id:string,_verses:unknown,french:boolean)=>new Map([[1,[french?"fr1":"ar1"]],[2,[french?"fr2":"ar2"]]]))}));
const empty:NativePlaybackState={active:false,paused:false,loading:false,ended:false,position:0,duration:0,tracks:[],sleepUntil:0};
const verses=[{number:1,globalNumber:1},{number:2,globalNumber:2}];
function Controls(){const p=useQuranAudioContext();return <><button onClick={()=>p.playVerse(1,true)}>Écouter</button><button onClick={p.pause}>Pause</button><button onClick={p.resume}>Reprendre</button><button onClick={()=>p.setSleep(5)}>Minuterie</button><output>{p.playingVerse} · {p.phase}</output></>;}
afterEach(()=>{localStorage.clear();vi.clearAllMocks();mock.listener=null;});
it("hands the whole bilingual sequence to Android and follows native transitions without HTML audio",async()=>{
 localStorage.setItem("mirath:quran:audio-mode","both");
 mock.getState.mockResolvedValue(empty);
 mock.load.mockImplementation(async(plan)=>{mock.getState.mockResolvedValue({...empty,active:true,track:plan.tracks[0],tracks:plan.tracks});});
 const view=render(<NativeQuranAudioEngine chapter={1} verses={verses}><Controls/></NativeQuranAudioEngine>);
 await waitFor(()=>expect(mock.listener).not.toBeNull());
 fireEvent.click(screen.getByText("Écouter"));
 await waitFor(()=>expect(mock.load).toHaveBeenCalledOnce());
 const plan=mock.load.mock.calls[0][0];expect(plan.tracks.map((t:{urls:string[]})=>t.urls[0])).toEqual(["ar1","fr1","ar2","fr2"]);
 act(()=>mock.listener!({...empty,active:true,track:plan.tracks[2],tracks:plan.tracks,position:1,duration:5}));
 expect(screen.getByRole("status")).toHaveTextContent("2 · arabic");
 fireEvent.click(screen.getByText("Pause"));expect(mock.pause).toHaveBeenCalled();
 fireEvent.click(screen.getByText("Reprendre"));expect(mock.resume).toHaveBeenCalledOnce();
 fireEvent.click(screen.getByText("Minuterie"));expect(mock.setSleep.mock.calls[0][0].until).toBeGreaterThan(Date.now()+299000);
 view.unmount();await waitFor(()=>expect(mock.remove).toHaveBeenCalled());expect(mock.stop).not.toHaveBeenCalled();
});
it("restores the verse and language of a service still playing after UI recreation",async()=>{
 const track={id:"8:french:0",urls:["fr"],verse:2,globalNumber:8,chapter:2,sourceVerse:1,phase:"french",title:"Verse",artist:"Leclerc",reciterId:"ar.alafasy",audioMode:"both"};
 mock.getState.mockResolvedValue({...empty,active:true,track,tracks:[track]});
 const view=render(<NativeQuranAudioEngine chapter={1} verses={[]}><Controls/></NativeQuranAudioEngine>);
 await waitFor(()=>expect(screen.getByRole("status")).toHaveTextContent("2 · french"));
 expect(mock.load).not.toHaveBeenCalled();view.unmount();expect(mock.stop).not.toHaveBeenCalled();
});
