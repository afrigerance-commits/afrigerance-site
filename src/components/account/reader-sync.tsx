"use client";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { accountKeys, isSyncKey, setStorageAccount, ACCOUNT_STORAGE_EVENT } from "@/lib/account/storage";
import type { Database } from "@/lib/supabase/database.types";

type Row = Database["public"]["Tables"]["reader_state"]["Row"];
interface SyncContext { userId: string | null; status: string; busy: boolean; conflicts: Row[]; sync: () => Promise<void>; importDevice: () => void; acceptRemote: (row: Row) => void; keepLocal: (row: Row) => void; copyLocal: (row: Row) => Promise<void> }
const Context = createContext<SyncContext | null>(null);
export function ReaderSyncProvider({ children }: { children: ReactNode }) {
  const [userId,setUserId] = useState<string|null>(null);
  const [status,setStatus] = useState("Connexion au compte…");
  const [busy,setBusy] = useState(false);
  const [conflicts,setConflicts] = useState<Row[]>([]);
  const busyRef=useRef(false);
  const activeUser=useRef<string|null>(null);
  const clientRef=useRef<ReturnType<typeof createClient>|null>(null);
  function applyRemote(row: Row) {
    const prefix=`mirath:account:${row.user_id}:${row.key}`;
    if (row.value === null) localStorage.removeItem(prefix); else localStorage.setItem(prefix,row.value);
    localStorage.setItem(`${prefix}:revision`,String(row.revision));
    localStorage.removeItem(`${prefix}:dirty`);
  }
  async function sync() {
    const id=activeUser.current, client=clientRef.current;
    if (!id || !client || busyRef.current) return;
    if (!navigator.onLine) { setStatus("Hors connexion : vos modifications seront envoyées au retour du réseau."); return; }
    busyRef.current=true;setBusy(true);
    try {
      const {data,error}=await client.from("reader_state").select("*").eq("user_id",id);
      if(error) throw error;
      if(activeUser.current!==id)return;
      const remote=new Map((data||[]).map(row=>[row.key,row]));
      const found:Row[]=[];
      const keys=new Set([...accountKeys(id),...remote.keys()]);
      for(const key of keys) {
        if(activeUser.current!==id)return;
        const prefix=`mirath:account:${id}:${key}`;
        const row=remote.get(key);
        if(localStorage.getItem(`${prefix}:dirty`)==="true") {
          const value=localStorage.getItem(prefix);
          const expected=Number(localStorage.getItem(`${prefix}:revision`)||0);
          const {data:result,error:writeError}=await client.rpc("sync_reader_state",{p_key:key,p_value:value,p_expected:expected});
          if(writeError)throw writeError;
          if(activeUser.current!==id)return;
          const outcome=result as {conflict:boolean;row:Row};
          if(outcome.conflict) { if(outcome.row) found.push(outcome.row); }
          else {
            localStorage.setItem(`${prefix}:revision`,String(outcome.row.revision));
            // Never discard edits made while this request was running.
            if(localStorage.getItem(prefix)===value)localStorage.removeItem(`${prefix}:dirty`);
          }
        } else if(row) applyRemote(row);
      }
      if(activeUser.current!==id)return;
      setConflicts(found);
      setStatus(found.length ? "Des modifications concurrentes demandent votre choix. Vos versions locales restent conservées." : "Compte synchronisé : lectures, signets, notes, objectifs et leçons.");
      window.dispatchEvent(new Event("storage"));window.dispatchEvent(new Event("mirath-device-storage"));window.dispatchEvent(new Event("mirath-learning-progress"));window.dispatchEvent(new Event("mirath-quran-bookmarks"));
    } catch { if(activeUser.current===id)setStatus("Synchronisation indisponible. Vos données restent sur cet appareil ; vérifiez le réseau ou la configuration du compte."); }
    finally {busyRef.current=false;setBusy(false);}
  }
  useEffect(()=>{
    if(!isSupabaseConfigured){setStatus("Données conservées sur cet appareil, sans compte.");return;}
    const client=createClient();clientRef.current=client;
    let cancelled=false, generation=0;
    const change=(id:string|null)=>{if(cancelled)return;activeUser.current=id;setUserId(id);setConflicts([]);setStorageAccount(id);setStatus(id ? "Vos données de compte sont séparées des lectures sans compte." : "Mode sans compte : données de cet appareil.");};
    const initialGeneration=generation;
    if (!navigator.onLine) {
      void client.auth.getSession().then(({data})=>{if(generation===initialGeneration)change(data.session?.user.id||null);});
    } else {
      void client.auth.getUser().then(({data})=>{ if(generation===initialGeneration)change(data.user?.id||null); }).catch(()=>{if(generation===initialGeneration)change(null);});
    }
    const {data:{subscription}}=client.auth.onAuthStateChange((_event,session)=>{generation++;change(session?.user.id||null);});
    return()=>{cancelled=true;subscription.unsubscribe();activeUser.current=null;setStorageAccount(null);};
  },[]);
  useEffect(()=>{
    if(!userId)return;
    void sync();
    let timer:number|undefined;
    const queue=()=>{window.clearTimeout(timer);timer=window.setTimeout(()=>void sync(),1500);};
    const interval=window.setInterval(()=>void sync(),30000);
    window.addEventListener("online",queue);window.addEventListener(ACCOUNT_STORAGE_EVENT,queue);
    return()=>{window.clearInterval(interval);window.clearTimeout(timer);window.removeEventListener("online",queue);window.removeEventListener(ACCOUNT_STORAGE_EVENT,queue);};
    // Sync reads the active identity from refs and cancels results after account changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userId]);
  function importDevice(){
    if(!userId)return;
    try {
      for(let index=0;index<localStorage.length;index++) {
        const key=localStorage.key(index);if(!key||!isSyncKey(key))continue;
        const prefix=`mirath:account:${userId}:${key}`;
        // Import only missing account entries; never override cloud progress silently.
        if(localStorage.getItem(prefix)===null && localStorage.getItem(`${prefix}:revision`)===null){localStorage.setItem(prefix,localStorage.getItem(key)||"");localStorage.setItem(`${prefix}:dirty`,"true");}
      }
      window.dispatchEvent(new Event("storage"));window.dispatchEvent(new Event("mirath-device-storage"));window.dispatchEvent(new Event("mirath-learning-progress"));void sync();
    }catch{setStatus("Import impossible : stockage local indisponible.");}
  }
  function acceptRemote(row:Row){if(row.user_id!==userId)return;applyRemote(row);setConflicts(current=>current.filter(item=>item.key!==row.key));window.dispatchEvent(new Event("storage"));window.dispatchEvent(new Event("mirath-device-storage"));window.dispatchEvent(new Event("mirath-learning-progress"));}
  async function copyLocal(row:Row){
    try { await navigator.clipboard.writeText(localStorage.getItem(`mirath:account:${row.user_id}:${row.key}`)||""); setStatus("Version locale copiée."); }
    catch { setStatus("Copie indisponible. Exportez vos notes depuis Mes notes avant de choisir une version."); }
  }
  function keepLocal(row:Row){
    if(row.user_id!==userId)return;
    const prefix=`mirath:account:${row.user_id}:${row.key}`;
    localStorage.setItem(`${prefix}:revision`,String(row.revision));localStorage.setItem(`${prefix}:dirty`,"true");setConflicts(current=>current.filter(item=>item.key!==row.key));void sync();
  }
  return <Context.Provider value={{userId,status,busy,conflicts,sync,importDevice,acceptRemote,keepLocal,copyLocal}}>{children}</Context.Provider>;
}
export function ReaderSyncPanel(){
  const context=useContext(Context);if(!context)return null;
  return <section className="mt-6 rounded-2xl border border-accent/30 bg-surface p-5"><h2 className="font-display text-xl">Mes données de lecture</h2><p role="status" className="mt-3 text-sm leading-7">{context.status}</p>{context.userId ? <><p className="mt-2 text-sm text-muted">Les téléchargements audio restent propres à l’appareil. Importer les lectures sans compte ajoute uniquement les éléments absents du compte.</p><div className="mt-4 flex flex-wrap gap-3"><button disabled={context.busy} onClick={()=>void context.sync()} className="min-h-11 rounded-xl bg-primary px-4 text-primary-foreground">{context.busy ? "Synchronisation…" : "Synchroniser maintenant"}</button><button disabled={context.busy} onClick={context.importDevice} className="min-h-11 rounded-xl border border-border px-4">Importer mes lectures sans compte</button></div>{context.conflicts.map(row=><div key={row.key} className="mt-4 rounded-xl border border-border p-4"><p className="text-sm">Deux versions différentes de vos données de lecture.</p><p className="mt-2 text-xs text-muted">Copiez votre version locale avant de la remplacer. Une modification concurrente n’est jamais écrasée automatiquement.</p><button onClick={()=>void context.copyLocal(row)} className="mt-2 min-h-11 text-sm font-semibold text-primary underline">Copier ma version locale</button><button onClick={()=>context.acceptRemote(row)} className="mt-2 min-h-11 text-sm font-semibold text-primary underline">Utiliser la version du compte</button><button onClick={()=>context.keepLocal(row)} className="ml-3 mt-2 min-h-11 text-sm font-semibold text-primary underline">Conserver ma version locale</button></div>)}</> : <a href="/connexion" className="mt-3 inline-block min-h-11 py-2 font-semibold text-primary underline">Se connecter pour synchroniser</a>}</section>;
}
