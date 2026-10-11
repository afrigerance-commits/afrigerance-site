'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { analyticsConsentKey, analyticsIdentity, publicAnalyticsPath, trafficSource } from '@/lib/analytics/privacy';
export function VisitorAnalytics() {
  const path = usePathname();
  const [consent,setConsent] = useState<string | null>(null);
  const [ready,setReady] = useState(false);
  const previous = useRef<string | null>(null);
  const enabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true';
  useEffect(()=>{
    const read=()=>{try{setConsent(localStorage.getItem(analyticsConsentKey));}catch{setConsent('denied');}setReady(true);};
    read(); window.addEventListener('mirath-analytics-consent',read);window.addEventListener('storage',read);
    return ()=>{window.removeEventListener('mirath-analytics-consent',read);window.removeEventListener('storage',read);};
  },[]);
  useEffect(()=>{
    const send=()=>{
      if(!enabled || !ready || consent!=='granted' || navigator.doNotTrack==='1' || (navigator as Navigator & {globalPrivacyControl?:boolean}).globalPrivacyControl || !navigator.onLine) return;
      const safe=publicAnalyticsPath(path);
      if(!safe) {previous.current=null;return;}
      if(document.visibilityState !== 'visible' || previous.current===safe) return;
      const first=previous.current===null;
      previous.current=safe;
      try {
        const ids=analyticsIdentity(localStorage,Date.now());
        const source=first ? trafficSource(document.referrer,location.origin) : 'Interne';
        void fetch('/api/analytics',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:crypto.randomUUID(),path:safe,...ids,source}),keepalive:true,credentials:'omit'}).catch(()=>{});
      } catch { /* Statistics never interrupt reading. */ }
    };
    send();document.addEventListener('visibilitychange',send);window.addEventListener('online',send);
    return ()=>{document.removeEventListener('visibilitychange',send);window.removeEventListener('online',send);};
  },[path,consent,ready,enabled]);
  if(!enabled || !ready || consent || !publicAnalyticsPath(path)) return null;
  const choose=(value:string)=>{try{localStorage.setItem(analyticsConsentKey,value);}catch{}setConsent(value);};
  return <aside aria-label="Choix des statistiques" className="mx-auto w-full max-w-4xl border-t border-accent/25 px-5 py-5 text-sm"><p className="font-semibold">Aider MIRÂTH à progresser</p><p className="mt-1 text-muted">Autorisez-vous les statistiques facultatives de fréquentation ? Vos recherches, notes et données de compte sont exclues.</p><div className="mt-3 flex flex-wrap items-center gap-3"><button onClick={()=>choose('granted')} className="min-h-11 rounded-xl bg-primary px-4 text-primary-foreground">Autoriser</button><button onClick={()=>choose('denied')} className="min-h-11 rounded-xl border border-border px-4">Refuser</button><Link href="/confidentialite" className="py-3 underline">En savoir plus</Link></div></aside>;
}
export function AnalyticsPreferences() {
  const [message,setMessage]=useState('');
  return <div className="mt-3"><button className="min-h-11 rounded-xl border border-border px-4" onClick={()=>{try{localStorage.setItem(analyticsConsentKey,'denied');localStorage.removeItem('mirath:analytics:identity');window.dispatchEvent(new Event('mirath-analytics-consent'));setMessage('Statistiques désactivées sur cet appareil.');}catch{setMessage('Stockage indisponible.');}}}>Désactiver les statistiques</button><button className="ml-3 min-h-11 underline" onClick={()=>{try{localStorage.removeItem(analyticsConsentKey);window.dispatchEvent(new Event('mirath-analytics-consent'));setMessage('Vous pouvez choisir à nouveau en bas de la page.');}catch{setMessage('Stockage indisponible.');}}}>Revoir mon choix</button><p role="status" className="mt-2">{message}</p></div>;
}
