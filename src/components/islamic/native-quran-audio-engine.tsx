"use client";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AudioClockContext, QuranAudioContext, type QuranAudioState } from "./quran-audio-player";
import { AUDIO_FOCUS_EVENT } from "./sourced-audio";
import { createAudioClock } from "@/lib/quran/audio-clock";
import { nativeQuran, type NativePlaybackState } from "@/lib/quran/native/bridge";
import { prepareNativeOffline } from "@/lib/quran/native/offline";
import { nativePlaylist, type NativeTrack } from "@/lib/quran/native/playlist";
import { offlineCatalog } from "@/lib/quran/offline-audio";
import { parseAudioMode, type QuranAudioMode } from "@/lib/quran/audio-mode";
import { validMemorization, type MemorizationSettings } from "@/lib/quran/memorization";
import { reciters, defaultReciterId, frenchAudioEdition, type VerseAudioRef } from "@/lib/quran/reciters";

export function NativeQuranAudioEngine({ chapter, verses, children }: { chapter: number; verses: VerseAudioRef[]; children: ReactNode }) {
  const [clock] = useState(createAudioClock);
  const [reciterId, setReciterId] = useState(defaultReciterId);
  const [audioMode, setAudioMode] = useState<QuranAudioMode>("arabic");
  const [repeatMode, setRepeatMode] = useState<"off" | "verse" | "surah">("off");
  const [memorization, setMemorization] = useState<MemorizationSettings | null>(null);
  const [snapshot, setSnapshot] = useState<NativePlaybackState>({ active:false, paused:false, loading:false, ended:false, position:0, duration:0, tracks:[], sleepUntil:0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const localError = useRef<string | null>(null);
  const restoredVerses = useRef<VerseAudioRef[]>([]);
  const [restored, setRestored] = useState<VerseAudioRef[]>([]);
  const stateRef = useRef(snapshot);
  const config = useRef({ reciterId, audioMode, repeatMode, memorization });
  const request = useRef(0);
  const awaitingLoad = useRef(false);
  const sequence = useRef(false);
  const restoreNeeded = useRef(true);
  const mounted = useRef(true);
  const catalogCache = useRef(new Map<string, Promise<Map<number,string[]>>>());
  const effectiveVerses = verses.length ? verses : restored;
  const section = effectiveVerses.some(v => v.sourceChapter !== undefined && v.sourceChapter !== chapter);
  const fail = useCallback((cause: unknown) => { if (mounted.current) { setLoading(false); localError.current=cause instanceof Error ? cause.message : "Le lecteur Android n’a pas pu exécuter cette commande."; setError(localError.current); } }, []);
  const command = useCallback((promise: Promise<unknown>) => { void promise.catch(fail); }, [fail]);
  const stop = useCallback(() => {
    request.current++; awaitingLoad.current = false;
    localError.current=null; setLoading(false); setError(null); clock.update(0,0);
    command(nativeQuran.stop());
  }, [clock,command]);

  useEffect(() => {
    mounted.current = true;
    let cancelled = false;
    const apply = (state: NativePlaybackState) => {
      if (cancelled || awaitingLoad.current) return;
      if (!state.tracks?.length && state.active) state = {...state, tracks:stateRef.current.tracks};
      stateRef.current = state;
      if (state.active && state.track) {
        const unique = new Map<number,VerseAudioRef>();
        for (const t of state.tracks) if (!t.silenceMs && !t.surah) unique.set(t.verse, {number:t.verse,globalNumber:t.globalNumber,sourceChapter:t.chapter,sourceVerse:t.sourceVerse});
        const nextVerses = [...unique.values()];
        if(JSON.stringify(nextVerses)!==JSON.stringify(restoredVerses.current)){restoredVerses.current=nextVerses;setRestored(nextVerses);}
        if(restoreNeeded.current && state.repeat){
          const repeat=state.track.surah || new Set(nextVerses.map(v=>v.number)).size>1 ? "surah" : "verse";
          config.current.repeatMode=repeat;setRepeatMode(repeat);
        }
        // Restore a running service after the Activity/WebView has been recreated.
        if (restoreNeeded.current && config.current.reciterId !== state.track.reciterId) { config.current.reciterId=state.track.reciterId; setReciterId(state.track.reciterId); }
        if (restoreNeeded.current && config.current.audioMode !== state.track.audioMode) { config.current.audioMode=state.track.audioMode; setAudioMode(state.track.audioMode); }
      }
      restoreNeeded.current=false;
      setSnapshot(previous => previous.active===state.active && previous.paused===state.paused && previous.loading===state.loading && previous.track?.id===state.track?.id && previous.error===state.error && previous.sleepUntil===state.sleepUntil ? previous : state);
      clock.update(state.position,state.duration);
      setLoading(state.loading); setError(state.error ?? localError.current);
    };
    try {
      const mode=parseAudioMode(localStorage.getItem("mirath:quran:audio-mode"),localStorage.getItem("mirath:quran:french-audio")==="true");
      config.current.audioMode=mode;
      queueMicrotask(()=>{if(!cancelled)setAudioMode(mode);});
    } catch { /* Preferences are optional. */ }
    const listener = nativeQuran.addListener("playbackState",apply);
    command(listener);
    const refresh = () => { void nativeQuran.getState().then(apply).catch(fail); };
    refresh();
    const onVisibility=()=>{ if(document.visibilityState==="visible") refresh(); };
    const onFocus = (event: Event) => { if ((event as CustomEvent).detail !== nativeQuran) command(nativeQuran.pause()); };
    document.addEventListener("visibilitychange",onVisibility);
    window.addEventListener(AUDIO_FOCUS_EVENT,onFocus);
    return () => {
      cancelled=true; mounted.current=false;
      document.removeEventListener("visibilitychange",onVisibility);
      window.removeEventListener(AUDIO_FOCUS_EVENT,onFocus);
      void listener.then(handle=>handle.remove()).catch(()=>{});
      // A screen/Activity unmount must never stop native background playback.
    };
  },[clock,command,fail]);

  const previousSession=useRef(`${chapter}:${JSON.stringify(verses)}`);
  useEffect(()=>{
    const key=`${chapter}:${JSON.stringify(verses)}`;
    if(key!==previousSession.current){
      const wasEmpty=previousSession.current.endsWith(":[]");
      previousSession.current=key;
      const active=stateRef.current;
      const sameReader=wasEmpty && active.active && active.track && (active.track.surah ? active.track.chapter===chapter : verses.some(v=>v.number===active.track!.verse && v.globalNumber===active.track!.globalNumber));
      if(!sameReader)stop();
    }
  },[chapter,verses,stop]);

  const startQueue = useCallback(async (verseNumber: number, continueSequence = false, preserve?: NativePlaybackState) => {
    const refs=verses.length ? verses : restoredVerses.current;
    const c={...config.current};
    if (!refs.some(v=>v.number===verseNumber) || (c.reciterId==="tvquran.hady-toure" && c.audioMode!=="french")) return;
    const token=++request.current;
    awaitingLoad.current=true; localError.current=null; setLoading(true); setError(null);
    sequence.current=continueSequence;
    try {
      const catalog = (french: boolean) => {
        const key=JSON.stringify([chapter,c.reciterId,refs,french]);
        let promise=catalogCache.current.get(key);
        if(!promise){ promise=offlineCatalog(chapter,c.reciterId,refs,french); catalogCache.current.set(key,promise); promise.catch(()=>catalogCache.current.delete(key)); }
        return promise;
      };
      const [arabic,french]=await Promise.all([c.audioMode!=="french"?catalog(false):undefined,c.audioMode!=="arabic"?catalog(true):undefined]);
      if(token!==request.current || !mounted.current)return;
      const plan=nativePlaylist({chapter,verses:refs,start:verseNumber,sequence:continueSequence,mode:c.audioMode,repeat:c.repeatMode,memorization:c.memorization,reciterId:c.reciterId,artist:reciters.find(r=>r.id===c.reciterId)!.nom,frenchArtist:frenchAudioEdition.name,arabic,french});
      if(preserve?.track){ const i=plan.tracks.findIndex(t=>t.verse===verseNumber && t.phase===preserve.track!.phase && !t.silenceMs); if(i>=0)plan.startIndex=i; }
      await prepareNativeOffline(plan.tracks,()=>token!==request.current || !mounted.current);
      if(token!==request.current || !mounted.current)return;
      await nativeQuran.load({...plan,position:preserve?.position ?? 0,paused:preserve?.paused ?? false,sleepUntil:preserve?.sleepUntil ?? stateRef.current.sleepUntil});
      if(token!==request.current)return;
      awaitingLoad.current=false;
      window.dispatchEvent(new CustomEvent(AUDIO_FOCUS_EVENT,{detail:nativeQuran}));
      const state=await nativeQuran.getState();
      stateRef.current=state; setSnapshot(state); setLoading(state.loading); clock.update(state.position,state.duration);
    }catch(cause){ if(token===request.current){awaitingLoad.current=false; fail(cause); command(nativeQuran.stop());} }
  },[chapter,verses,clock,fail,command]);

  const chooseReciter=(id:string)=>{
    if(!reciters.some(r=>r.id===id && (!section || r.mode!=="surah")))return;
    stop(); config.current.reciterId=id; config.current.memorization=null; setReciterId(id);setMemorization(null);
    if(id==="tvquran.hady-toure" && config.current.audioMode==="both")chooseAudioMode("arabic");
    if(id==="tvquran.hady-toure" && config.current.repeatMode==="verse"){config.current.repeatMode="off";setRepeatMode("off");}
  };
  const chooseAudioMode=(mode:QuranAudioMode)=>{
    if(!["arabic","french","both"].includes(mode) || (mode==="both"&&config.current.reciterId==="tvquran.hady-toure"))return;
    stop();config.current.audioMode=mode;setAudioMode(mode);
    try{localStorage.setItem("mirath:quran:audio-mode",mode);localStorage.setItem("mirath:quran:french-audio",String(mode==="both"));}catch{}
  };
  const playSurah=()=>{
    if(config.current.reciterId!=="tvquran.hady-toure"||config.current.audioMode!=="arabic"||section)return;
    stop();setLoading(true);
    const track:NativeTrack={id:`surah:${chapter}`,urls:[`https://download.tvquran.com/download/recitations/355/280/${String(chapter).padStart(3,"0")}.mp3`],verse:0,globalNumber:0,chapter,sourceVerse:0,phase:"arabic",title:`Coran · sourate ${chapter}`,artist:reciters.find(r=>r.id===config.current.reciterId)!.nom,reciterId:config.current.reciterId,audioMode:"arabic",surah:true};
    command(nativeQuran.load({tracks:[track],startIndex:0,repeat:config.current.repeatMode==="surah"}).then(()=>{window.dispatchEvent(new CustomEvent(AUDIO_FOCUS_EVENT,{detail:nativeQuran}));}));
  };
  const chooseRepeatMode=(mode:"off"|"verse"|"surah")=>{
    if(mode==="verse"&&config.current.reciterId==="tvquran.hady-toure"&&config.current.audioMode!=="french")return;
    const next=config.current.repeatMode===mode?"off":mode;
    config.current.repeatMode=next;config.current.memorization=null;setRepeatMode(next);setMemorization(null);
    const s=stateRef.current;
    if(s.active&&s.track){ if(s.track.surah){ command(nativeQuran.load({tracks:s.tracks,startIndex:0,repeat:next==="surah",position:s.position,paused:s.paused,sleepUntil:s.sleepUntil})); }else void startQueue(s.track.verse,sequence.current,s); }
  };
  const configureMemorization=(settings:MemorizationSettings|null)=>{
    if(settings&&(!validMemorization(settings,effectiveVerses.map(v=>v.number))||(config.current.reciterId==="tvquran.hady-toure"&&config.current.audioMode!=="french")))return;
    stop();config.current.memorization=settings;config.current.repeatMode="off";setMemorization(settings);setRepeatMode("off");
  };
  const value:QuranAudioState={backgroundNative:true,playingChapter:snapshot.track?.chapter,audioMode,chooseAudioMode,seek:seconds=>{if(Number.isFinite(seconds)&&seconds>=0)command(nativeQuran.seek({seconds}));},sleepUntil:snapshot.sleepUntil,setSleep:minutes=>{if([0,5,15,30,60].includes(minutes))command(nativeQuran.setSleep({until:minutes?Date.now()+minutes*60000:0}));},memorization,configureMemorization,section,verses:effectiveVerses,reciterId,chooseReciter,playingVerse:snapshot.active&&!snapshot.track?.surah?snapshot.track?.verse??null:null,playingSurah:snapshot.active&&!!snapshot.track?.surah,paused:snapshot.paused,loading,error,translationEnabled:audioMode==="both",phase:snapshot.track?.phase??"arabic",chooseTranslation:enabled=>chooseAudioMode(enabled?"both":"arabic"),repeatMode,chooseRepeatMode,stop,pause:()=>command(nativeQuran.pause()),resume:()=>command(nativeQuran.resume()),playVerse:(n,continueSequence)=>{command(nativeQuran.pause());void startQueue(n,continueSequence);},playSurah};
  return <AudioClockContext.Provider value={clock}><QuranAudioContext.Provider value={value}>{children}</QuranAudioContext.Provider></AudioClockContext.Provider>;
}
