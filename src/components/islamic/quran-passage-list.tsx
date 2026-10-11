'use client';
import { useEffect,useState } from 'react';
import { QuranVerseContent } from './quran-reading-tools';
import { QuranVerseRow } from './quran-verse-row';
import { QuranJuzMarker } from './quran-juz-marker';
import { useQuranAudioContext } from './quran-audio-player';
import type { VerseReadingLocation } from '@/lib/quran/reading-location';
type Verse={number:number;arabic:string;french:string};
const batch=30;
export function QuranPassageList({chapter,verses,locations}:{chapter:number;verses:Verse[];locations:VerseReadingLocation[]}) {
 const [count,setCount]=useState(batch);
 const player=useQuranAudioContext();
 useEffect(()=>{
  const revealHash=()=>{
   const match=/^#verset-(\d+)$/.exec(location.hash);if(!match)return;
   const index=verses.findIndex(v=>v.number===Number(match[1]));if(index<0)return;
   setCount(n=>Math.max(n,index+1));
   const frame=requestAnimationFrame(()=>document.getElementById(`verset-${match[1]}`)?.scrollIntoView({block:'center'}));
   return frame;
  };
  let frame=revealHash();const change=()=>{if(frame)cancelAnimationFrame(frame);frame=revealHash();};
  window.addEventListener('hashchange',change);return()=>{if(frame)cancelAnimationFrame(frame);window.removeEventListener('hashchange',change);};
 },[verses]);
 useEffect(()=>{
  const index=verses.findIndex(v=>v.number===player.playingVerse);
  if(index>=0)setCount(n=>Math.max(n,index+5));
 },[player.playingVerse,verses]);
 return <><div className="mushaf-sheet mt-5 flex flex-col gap-1 rounded-[1.5rem] border border-gold-600/20 bg-[#fffcf5] px-2 py-2 shadow-sm dark:bg-emerald-950/20 sm:px-4">{verses.slice(0,count).map((v,i)=><div key={v.number}>
 {(locations[i].startsJuz || i===0) && <QuranJuzMarker number={locations[i].juz} kind={locations[i].startsJuz?'start':'continued'} />}
 <QuranVerseRow verseNumber={v.number}><QuranVerseContent chapter={chapter} number={v.number} arabic={v.arabic} french={v.french}/></QuranVerseRow>
 {locations[i].endsJuz && <QuranJuzMarker number={locations[i].juz} kind="end" />}
 </div>)}</div>{count<verses.length && <div className="my-5 flex flex-wrap items-center gap-3"><p role="status" className="w-full text-sm text-muted">{Math.min(count,verses.length)} versets affichés sur {verses.length}. La récitation continue sur toute la sourate.</p><button className="min-h-11 rounded-xl bg-primary px-5 py-3 text-primary-foreground" onClick={()=>setCount(n=>Math.min(n+batch,verses.length))}>Afficher les versets suivants</button><button className="min-h-11 rounded-xl border border-border px-5 py-3" onClick={()=>setCount(verses.length)}>Afficher toute la sourate</button></div>}</>;
}
