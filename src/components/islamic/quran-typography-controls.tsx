"use client";
import { Minus, Plus } from "lucide-react";
import { useDeviceStore } from "@/lib/hooks/use-device-store";
function parseSize(raw:string|null) {const n=Number(raw);return Number.isFinite(n)&&n>=26&&n<=46?n:32;}
export function useQuranTypography(){return useDeviceStore('mirath:quran:font-size',32,parseSize);}
export function QuranTypographyControls(){
 const size=useQuranTypography();
 return <div className="atelier-type-control" role="group" aria-label="Taille du texte arabe"><span>Taille arabe</span><button type="button" aria-label="Réduire le texte arabe" disabled={size.value<=26} onClick={()=>size.save(Math.max(26,size.value-4))}><Minus className="size-4"/></button><output aria-live="polite">{size.value}</output><button type="button" aria-label="Agrandir le texte arabe" disabled={size.value>=46} onClick={()=>size.save(Math.min(46,size.value+4))}><Plus className="size-4"/></button>{size.error&&<p role="status">{size.error}</p>}</div>;
}
