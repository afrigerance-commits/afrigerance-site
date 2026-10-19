"use client";
import {useEffect,useId,useRef,useState,type FormEvent} from 'react';
import Link from "next/link";
import {useRouter} from 'next/navigation';
import {Mic,MicOff,Search,Square,X} from 'lucide-react';
import {recognitionConstructor,voiceError,type Recognition} from '@/lib/search/voice';
import {AUDIO_FOCUS_EVENT} from '@/components/islamic/sourced-audio';
const unsupported='La dictée directe n’est pas disponible sur cet appareil. Saisissez votre demande ou utilisez le micro de votre clavier, s’il est disponible.';
export function VoiceSearchForm({initialQuery='',collection='',collections=false,action='/recherche',variant='full',onSearch}:{initialQuery?:string;collection?:string;collections?:boolean;action?:string;variant?:'home'|'quick'|'full';onSearch?:()=>void}){
 const [query,setQuery]=useState(initialQuery);const [filter,setFilter]=useState(collection);
 const [supported,setSupported]=useState<boolean|null>(null);const [listening,setListening]=useState(false);
 const [message,setMessage]=useState('');const [lang,setLang]=useState('fr-FR');
 const recognition=useRef<Recognition|null>(null);const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const input=useRef<HTMLInputElement>(null);const router=useRouter();const id=useId();
 function clear(){if(timer.current)clearTimeout(timer.current);timer.current=null;}
 function abort(){clear();const current=recognition.current;recognition.current=null;if(current){current.onstart=null;current.onend=null;current.onresult=null;current.onerror=null;try{current.abort();}catch{}}}
 useEffect(()=>{
  setSupported(!!recognitionConstructor());
  const visibility=()=>{if(document.visibilityState==='hidden'&&recognition.current){abort();setListening(false);setMessage('Dictée arrêtée lorsque l’application a été masquée.');}};
  document.addEventListener('visibilitychange',visibility);
  return()=>{document.removeEventListener('visibilitychange',visibility);abort();};
 },[]);
 // Navigation can reuse this component; update the displayed submitted query.
 useEffect(()=>{abort();setListening(false);setQuery(initialQuery);setFilter(collection);},[initialQuery,collection]);
 function start(){
  if(listening){try{recognition.current?.stop();}catch{abort();setListening(false);}return;}
  const Constructor=recognitionConstructor();if(!Constructor){setMessage(unsupported);return;}
  if(!navigator.onLine){setMessage('Une connexion Internet est nécessaire pour rechercher.');return;}
  abort();let current:Recognition;
  try{current=new Constructor();}catch{setMessage(unsupported);return;}
  recognition.current=current;current.lang=lang;current.continuous=false;current.interimResults=true;current.maxAlternatives=1;
  let transcript='';let failed=false;
  const active=()=>recognition.current===current;
  const expire=()=>{if(!active())return;abort();setListening(false);setMessage('La dictée s’est arrêtée après 20 secondes. Vérifiez le texte ou réessayez.');input.current?.focus();};
  current.onstart=()=>{if(!active())return;clear();timer.current=setTimeout(expire,20000);setMessage('J’écoute… Parlez, puis vérifiez le texte reconnu.');};
  current.onresult=event=>{
   if(!active())return;
   transcript=Array.from({length:event.results.length},(_,i)=>event.results[i][0]?.transcript??'').join(' ').trim().slice(0,120);
   setQuery(transcript);
  };
  current.onerror=event=>{if(!active())return;failed=true;abort();setListening(false);setMessage(voiceError(event.error));};
  current.onend=()=>{if(!active())return;abort();setListening(false);if(!failed)setMessage(transcript?'Texte reconnu. Corrigez-le si besoin, puis appuyez sur Rechercher.':'Aucun texte reconnu. Réessayez ou utilisez la saisie.');input.current?.focus();};
  setListening(true);setMessage('Autorisez le micro si votre navigateur le demande…');
  // Pause recitation and invocation audio so it is not transcribed as the user's request.
  window.dispatchEvent(new CustomEvent(AUDIO_FOCUS_EVENT,{detail:'mirath-voice-search'}));
  timer.current=setTimeout(expire,20000);
  try{current.start();}catch{abort();setListening(false);setMessage('Le service de dictée ne démarre pas. Utilisez la saisie ou le micro du clavier.');}
 }
 function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(listening)return;const q=query.trim();if(q.length<2)return;
  abort();setListening(false);const params=new URLSearchParams({q});if(filter&&collections)params.set('collection',filter);
  router.push(`${action}?${params.toString()}`);onSearch?.();
 }
 return <div className={`voice-search voice-search-${variant}`}>
  <form action={action} onSubmit={submit} className={variant==='home'?'atelier-search voice-search-form':'voice-search-form'} aria-label="Recherche écrite ou vocale">
   <Search className="size-4 shrink-0 text-primary" aria-hidden="true"/>
   <label htmlFor={id} className="sr-only">Votre recherche</label>
   <input ref={input} id={id} name="q" type="search" value={query} onChange={event=>{if(listening){abort();setListening(false);}setQuery(event.target.value);}} onKeyDown={event=>{if(event.key==='Escape'&&listening){event.preventDefault();abort();setListening(false);setMessage('Dictée annulée.');}}} aria-describedby={`${id}-privacy ${id}-status`} dir="auto" required minLength={2} maxLength={120} placeholder="Fajr, une invocation, un ouvrage…"/>
   <button type="button" onClick={start} aria-label={listening?'Terminer la dictée':'Dicter ma recherche'} aria-pressed={listening} className="voice-mic" data-listening={listening} title={supported===false?unsupported:'Dicter ma recherche'}>{listening?<Square className="size-4"/>:supported===false?<MicOff className="size-5"/>:<Mic className="size-5"/>}</button>
   {listening&&<button type="button" aria-label="Annuler la dictée" onClick={()=>{abort();setListening(false);setMessage('Dictée annulée.');}}><X className="size-4"/></button>}
   <button type="submit" aria-label="Rechercher" disabled={listening} className="voice-submit"><Search className="size-4"/><span className="voice-submit-label">Rechercher</span></button>
   {collections&&<label className="voice-collection"><span className="sr-only">Filtrer par recueil</span><select name="collection" aria-label="Filtrer par recueil" value={filter} onChange={event=>setFilter(event.target.value)}><option value="">Toute la plateforme</option><option value="muwatta">Al-Muwatta’</option><option value="boukhari">Al-Bukhârî</option><option value="muslim">Muslim</option></select></label>}
  </form>
  <div className="voice-search-meta"><label>Dictée <select aria-label="Langue de la dictée" value={lang} disabled={listening} onChange={event=>setLang(event.target.value)}><option value="fr-FR">Français</option><option value="ar-SA">العربية</option></select></label><p id={`${id}-privacy`}>Micro à la demande. La voix peut être transmise au service de dictée de votre navigateur. MIRÂTH ne stocke pas l’audio. <Link href="/confidentialite#recherche-vocale">En savoir plus</Link>.</p></div>
  <p id={`${id}-status`} role="status" className="voice-search-status">{message||(supported===false?unsupported:'Parlez, vérifiez le texte, puis recherchez dans les contenus existants.')}</p>
 </div>;
}
