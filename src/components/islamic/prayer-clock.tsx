"use client";
import { useEffect, useState } from "react";
import { AdhanSettings } from "./adhan-settings";
import { Reveal } from "@/components/motion/reveal";
import { LocateFixed, MapPin, Moon, Pause, Play, RefreshCw, SlidersHorizontal, Sun, Sunrise, Sunset } from "lucide-react";
import { localDateKey, prayerCities, prayerDefinitions, prayerMethods, prayerState, type PrayerSchedule } from "@/lib/prayer-times";
type Place={id:string;name:string;latitude:number;longitude:number};
const iconFor=(icon:string)=>icon==="dawn"?Sunrise:icon==="sunset"?Sunset:icon==="moon"?Moon:Sun;
export function PrayerClock(){
  const [place,setPlace]=useState<Place>(prayerCities[0]);
  const [method,setMethod]=useState(3);
  const [schedule,setSchedule]=useState<PrayerSchedule|null>(null);
  const [now,setNow]=useState<number|null>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [locationMessage,setLocationMessage]=useState("");
  const [locating,setLocating]=useState(false);
  const [refresh,setRefresh]=useState(0);
  const [paused,setPaused]=useState(false);
  const [settingsOpen,setSettingsOpen]=useState(false);
  const [reducedMotion,setReducedMotion]=useState(false);
  useEffect(()=>{const media=window.matchMedia("(prefers-reduced-motion: reduce)");const update=()=>setReducedMotion(media.matches);update();media.addEventListener("change",update);return()=>media.removeEventListener("change",update)},[]);
  const dayKey=now&&schedule?localDateKey(now,schedule.today.timezone):"";
  useEffect(()=>{setNow(Date.now());const timer=window.setInterval(()=>setNow(Date.now()),1000);return()=>window.clearInterval(timer)},[]);
  useEffect(()=>{
    const controller=new AbortController();setLoading(true);setError("");setSchedule(null);
    const params=new URLSearchParams({latitude:String(place.latitude),longitude:String(place.longitude),method:String(method)});
    fetch(`/api/prayer-times?${params}`,{signal:controller.signal,cache:"no-store"}).then(async response=>{
      const data=await response.json() as PrayerSchedule & {error?:string};if(!response.ok)throw new Error(data.error||"Horaires indisponibles.");
      if(!data.today?.times?.Fajr||!data.tomorrow?.times?.Fajr||!data.previousIsha)throw new Error("Horaires indisponibles.");
      if(!controller.signal.aborted){setSchedule(data);setNow(Date.now());setLoading(false)}
    }).catch((issue:Error)=>{if(!controller.signal.aborted){setError(issue.message);setLoading(false)}});
    return()=>controller.abort();
  },[place,method,refresh]);
  useEffect(()=>{if(schedule&&dayKey&&dayKey!==schedule.today.date)setRefresh(value=>value+1)},[dayKey,schedule]);
  useEffect(()=>{const resume=()=>{if(document.visibilityState==="visible"){setNow(Date.now());setRefresh(value=>value+1)}};document.addEventListener("visibilitychange",resume);return()=>document.removeEventListener("visibilitychange",resume)},[]);
  function locate(){
    setLocationMessage("");
    if(!navigator.geolocation){setLocationMessage("La localisation n’est pas disponible. Choisissez une ville.");return}
    setLocating(true);
    navigator.geolocation.getCurrentPosition(position=>{
      setPlace({id:"position",name:"Ma position",latitude:position.coords.latitude,longitude:position.coords.longitude});setLocating(false);setLocationMessage("Horaires calculés pour votre position.");
    },()=>{setLocating(false);setLocationMessage("Localisation indisponible ou refusée. Choisissez une ville.")},{timeout:10000,maximumAge:300000});
  }
  const state=schedule&&now?prayerState(schedule,now):null;
  const format=(value:string)=>new Intl.DateTimeFormat("fr-FR",{timeZone:schedule?.today.timezone??"Africa/Dakar",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).format(new Date(value));
  const dateLabel=schedule&&now?new Intl.DateTimeFormat("fr-FR",{timeZone:schedule.today.timezone,weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(now):"Aujourd’hui";
  const countdown=state?[Math.floor(state.seconds/3600),Math.floor(state.seconds%3600/60),state.seconds%60].map(n=>String(n).padStart(2,"0")):null;
  const prayerItems=prayerDefinitions.map(prayer=>({...prayer,at:schedule?.today.times[prayer.key]}));
  const tickerItems=[prayerItems[0],{key:"Sunrise",name:"Lever du soleil",arabic:"",icon:"dawn",at:schedule?.today.sunrise},...prayerItems.slice(1)];
  return <section className="prayer-strip-section" id="horaires-prieres" aria-labelledby="prayer-title">
    <div className="premium-container"><h2 className="sr-only" id="prayer-title">Horaires de prière</h2><Reveal>
      <div className="prayer-strip" aria-busy={loading} data-paused={paused||reducedMotion||settingsOpen}>
        <div className="prayer-strip-place"><MapPin size={16} aria-hidden="true"/><div><strong>{place.name}</strong><span>Horaires calculés</span></div></div>
        <div className="prayer-strip-next" role="group" aria-label="Prochaine prière">
          <div><span>À venir{state&&schedule&&state.next.date!==schedule.today.date?" · demain":""}</span><strong>{state?.next.name??"—"}</strong><time>{state?format(new Date(state.next.at).toISOString()):"— : —"}</time></div>
          <span className="prayer-strip-countdown" aria-label={state?`Dans ${Math.floor(state.seconds/3600)} heures et ${Math.floor(state.seconds%3600/60)} minutes`:"Compte à rebours"}>{countdown?.join(":")??"— : — : —"}</span>
          <span className="prayer-strip-progress" aria-hidden="true"><span style={{transform:`scaleX(${state?.progress??0})`}}/></span>
        </div>
        <div className="prayer-ticker-viewport" tabIndex={reducedMotion?0:undefined}>
          {error?<div className="prayer-strip-error" role="alert"><span>Horaires indisponibles</span><button onClick={()=>setRefresh(value=>value+1)} aria-label="Réessayer de charger les horaires"><RefreshCw size={16}/></button></div>:loading?<span className="prayer-strip-loading" role="status">Chargement des horaires…</span>:<>
            <ul className="sr-only" aria-label="Horaires du jour">{tickerItems.map(item=><li key={item.key}>{item.name} : {item.at?format(item.at):"indisponible"}</li>)}</ul>
            <div className="prayer-ticker-track" aria-hidden="true">{[0,1].map(copy=><div className="prayer-ticker-group" key={copy}>{tickerItems.map(item=>{const Icon=iconFor(item.icon);const upcoming=state?.next.key===item.key&&state.next.date===schedule?.today.date;return <div className={`prayer-ticker-item ${upcoming?"is-next":""}`} key={item.key}><Icon size={16}/><span>{item.name}</span><time dateTime={item.at}>{item.at?format(item.at):"— : —"}</time>{upcoming&&<span className="prayer-ticker-current">À venir</span>}</div>})}</div>)}</div>
          </>}
        </div>
        <div className="prayer-strip-tools">{!reducedMotion&&<button onClick={()=>setPaused(value=>!value)} aria-label={paused?"Reprendre le défilement des horaires":"Mettre en pause le défilement des horaires"} aria-pressed={paused} title={paused?"Reprendre":"Pause"}>{paused?<Play size={16}/>:<Pause size={16}/>}</button>}<button onClick={()=>setSettingsOpen(value=>!value)} aria-label="Réglages des horaires de prière" aria-expanded={settingsOpen} aria-controls="prayer-preferences" title="Ville et méthode de calcul"><SlidersHorizontal size={17}/></button></div>
      </div>
      {settingsOpen&&<div className="prayer-preferences" id="prayer-preferences">
        <div className="prayer-preferences-heading"><strong>{dateLabel}</strong><span>{schedule?.today.timezone??"Heure locale"}</span></div>
        <div className="prayer-preferences-controls"><label><span>Ville</span><select value={place.id} onChange={event=>{const city=prayerCities.find(item=>item.id===event.target.value);if(city){setPlace(city);setLocationMessage("")}}}>{place.id==="position"&&<option value="position">Ma position</option>}{prayerCities.map(city=><option key={city.id} value={city.id}>{city.name}</option>)}</select></label><label><span>Méthode de calcul</span><select value={method} onChange={event=>setMethod(Number(event.target.value))}>{prayerMethods.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}</select></label><button onClick={locate} disabled={locating}><LocateFixed size={17}/>{locating?"Localisation…":"Me localiser"}</button></div>
        <AdhanSettings />
        {locationMessage&&<p role="status">{locationMessage}</p>}{error&&<p role="alert">{error}</p>}
        <p>Calcul de ‘Asr : ombre simple. Vérifiez les ajustements de votre mosquée ; ces horaires n’indiquent pas l’iqâma. <a href="https://aladhan.com/calculation-methods" target="_blank" rel="noopener noreferrer">Source : AlAdhan</a></p>
      </div>}
    </Reveal></div>
  </section>;
}
