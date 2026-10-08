"use client";

import { useState } from "react";
import { SourcedAudio } from "./sourced-audio";

export function AdhanSettings() {
  const [city, setCity] = useState("makkah");
  return <div className="mt-5 border-t border-border pt-5">
    <label className="flex flex-wrap items-center gap-3 text-sm font-semibold">Écouter l’adhan<select value={city} onChange={event => setCity(event.target.value)} className="rounded-xl border border-border bg-surface px-3 py-2"><option value="makkah">La Mecque · Masjid al-Harâm</option><option value="madinah">Médine · source officielle</option></select></label>
    {city === "makkah" ? <SourcedAudio src="/audio/adhan/makkah-2013.mp3" title="Adhan de La Mecque" credit="Seyfula Islam · CC BY 3.0" sourceUrl="https://commons.wikimedia.org/wiki/File:Adhan,_Great_Mosque_of_Mecca_-_Jan_21,_2013.webm" note="Enregistrement sur place du 21 janvier 2013. Piste audio extraite et convertie en MP3, sans modification des paroles. Ce n’est pas une publication officielle des autorités des Haramain." /> : <div className="mt-4 rounded-2xl border border-gold-500/30 bg-background p-4 text-sm leading-7"><p>L’enregistrement de Médine est en attente de vérification de ses droits de diffusion. Vous pouvez consulter la présentation de la chaîne officielle des imams et muezzins du المسجد النبوي.</p><a className="mt-2 inline-block font-semibold text-primary underline underline-offset-4" href="https://volunteer.prh.gov.sa/ar/almasjed_alnabawi/madina-news/242-youtub" target="_blank" rel="noopener noreferrer">Consulter la source officielle de Médine</a></div>}
    <p className="mt-3 text-sm leading-6 text-muted">Écoute à la demande. Le site ne déclenche pas l’adhan automatiquement lorsque l’application est fermée ou l’écran verrouillé.</p>
  </div>;
}
