"use client";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { LocateFixed, MapPin, Moon, RefreshCw, Sun, Sunrise, Sunset } from "lucide-react";
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
  return <section className="prayer-section" id="horaires-prieres" aria-labelledby="prayer-title">
    <div className="premium-container">
      <div className="prayer-heading"><div><span className="eyebrow">LES CINQ PRIÈRES</span><h2 id="prayer-title">Le temps de se retrouver.</h2></div><span className="prayer-heading-arabic" lang="ar" dir="rtl">أوقات الصلاة</span></div>
      <Reveal><div className="prayer-panel" aria-busy={loading}>
        <div className="prayer-top"><div className="prayer-location"><MapPin size={18}/><div><strong>{place.name}</strong><span>{dateLabel}</span></div></div><div className="prayer-controls"><label className="prayer-city"><span>Ville</span><select value={place.id} onChange={event=>{const city=prayerCities.find(item=>item.id===event.target.value);if(city){setPlace(city);setLocationMessage("")}}}>{place.id==="position"&&<option value="position">Ma position</option>}{prayerCities.map(city=><option key={city.id} value={city.id}>{city.name}</option>)}</select></label><button className="prayer-locate" onClick={locate} disabled={locating}><LocateFixed size={17}/><span>{locating?"Localisation…":"Me localiser"}</span></button></div></div>
        {locationMessage&&<p className="prayer-location-message" role="status">{locationMessage}</p>}
        <div className="prayer-body"><div className="prayer-next">
          <div className="prayer-dial"><svg viewBox="0 0 240 240" aria-hidden="true"><circle className="prayer-ring-track" cx="120" cy="120" r="108"/><circle className="prayer-ring-progress" cx="120" cy="120" r="108" pathLength="100" strokeDasharray="100" strokeDashoffset={100-(state?.progress??0)*100}/></svg><div className="prayer-dial-inner"><span>PROCHAINE PRIÈRE</span><strong>{state?.next.name??"—"}</strong><span className="prayer-next-arabic" lang="ar" dir="rtl">{state?.next.arabic??""}</span><span className="prayer-next-time">{state?format(new Date(state.next.at).toISOString()):loading?"Chargement…":"Indisponible"}{state&&schedule&&state.next.date!==schedule.today.date&&<small>demain</small>}</span></div></div>
          <div className="prayer-countdown" aria-label={state?`Prochaine prière dans ${Math.floor(state.seconds/3600)} heures et ${Math.floor(state.seconds%3600/60)} minutes`:"Compte à rebours"}>{["heures","minutes","secondes"].map((label,index)=><div key={label}><strong>{countdown?.[index]??"—"}</strong><span>{label}</span></div>)}</div>
        </div><div className="prayer-schedule"><div className="prayer-schedule-heading"><h3>Vos rendez-vous du jour</h3><span>{schedule?`${schedule.today.timezone} · 24 h`:"Heure locale"}</span></div>
          {error?<div className="prayer-error" role="alert"><p>{error}</p><button onClick={()=>setRefresh(value=>value+1)}><RefreshCw size={16}/> Réessayer</button></div>:<div className="prayer-times-grid">{prayerDefinitions.map((prayer,index)=>{const Icon=iconFor(prayer.icon);const upcoming=state?.next.key===prayer.key&&state.next.date===schedule?.today.date;const passed=schedule&&now&&Date.parse(schedule.today.times[prayer.key])<=now;return <div key={prayer.key} className={`prayer-time-card ${upcoming?"is-next":""} ${passed?"is-past":""}`} style={{animationDelay:`${index*65}ms`}}><div className="prayer-card-top"><Icon size={23}/><span lang="ar" dir="rtl">{prayer.arabic}</span></div><span className="prayer-name">{prayer.name}</span><time dateTime={schedule?.today.times[prayer.key]}>{schedule?format(schedule.today.times[prayer.key]):"— : —"}</time><span className="prayer-card-status">{upcoming?"À venir":passed?"Horaire passé":prayer.key==="Fajr"?"Début de Sobh":""}</span></div>})}</div>}
          <div className="prayer-sunrise"><Sunrise size={17}/><span>Lever du soleil</span><strong>{schedule?format(schedule.today.sunrise):"— : —"}</strong></div>
        </div></div>
        <div className="prayer-settings"><label><span>Méthode de calcul</span><select value={method} onChange={event=>setMethod(Number(event.target.value))}>{prayerMethods.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}</select></label><p>Calcul de ‘Asr : ombre simple. Horaires calculés ; vérifiez les ajustements de votre mosquée. Ils n’indiquent pas l’heure de l’iqâma.</p><a href="https://aladhan.com/calculation-methods" target="_blank" rel="noopener noreferrer">Source : AlAdhan</a></div>
      </div></Reveal>
    </div>
  </section>;
}
