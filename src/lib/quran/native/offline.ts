import { AUDIO_CACHE, allowedAudioUrl } from "../offline-audio";
import { nativeQuran } from "./bridge";
import type { NativeTrack } from "./playlist";

/** CacheStorage belongs to the WebView; hand downloaded recordings to the service before going offline. */
export async function prepareNativeOffline(tracks: NativeTrack[], cancelled: () => boolean) {
  if (navigator.onLine) return;
  if (typeof caches === "undefined") throw new Error("Téléchargez cette lecture avant de l’écouter hors connexion.");
  const cache = await caches.open(AUDIO_CACHE);
  for (const url of new Set(tracks.filter(t=>!t.silenceMs).map(t=>t.urls[0]))) {
    if(cancelled())return;
    if(!allowedAudioUrl(url))throw new Error("Cette source nécessite une connexion Internet.");
    const response=await cache.match(url);
    if(!response)throw new Error("Téléchargez la lecture complète dans la langue choisie avant de passer hors connexion.");
    const data=await response.blob();
    if(!data.size || data.size>30*1024*1024)throw new Error("Le fichier audio téléchargé est invalide.");
    const base64=await new Promise<string>((resolve,reject)=>{
      const reader=new FileReader();reader.onload=()=>resolve(String(reader.result).split(",")[1]);reader.onerror=()=>reject(new Error("Impossible de lire le fichier téléchargé."));reader.readAsDataURL(data);
    });
    if(cancelled())return;
    await nativeQuran.cacheAudio({url,base64});
  }
}
