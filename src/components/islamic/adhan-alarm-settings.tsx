"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Capacitor, registerPlugin } from "@capacitor/core";
import type { AdhanEvent } from "@/lib/adhan-calendar";

type Status = { enabled: boolean; exact: boolean; notifications: boolean; next: number; until: number; place: string; lastError: string; alarmVolume: number };
interface NativeAdhan {
  status(): Promise<Status>;
  notifications(): Promise<Status>;
  settings(options: { kind: string }): Promise<void>;
  schedule(options: { events: AdhanEvent[]; place: string }): Promise<Status>;
  disable(): Promise<Status>;
  test(): Promise<void>;
  stop(): Promise<void>;
}
const native = registerPlugin<NativeAdhan>("MirathAdhan");
type Props = { latitude: number; longitude: number; name: string; method: number };

export function AdhanAlarmSettings({ latitude, longitude, name, method }: Props) {
  const android = useSyncExternalStore(() => () => {}, () => Capacitor.getPlatform() === "android", () => false);
  const available = useSyncExternalStore(() => () => {}, () => Capacitor.getPlatform() === "android" && Capacitor.isPluginAvailable("MirathAdhan"), () => false);
  const [status, setStatus] = useState<Status | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const supported = Capacitor.getPlatform() === "android" && Capacitor.isPluginAvailable("MirathAdhan");
    if (!supported) return;
    const refresh = () => { if (document.visibilityState === "visible") native.status().then(setStatus).catch(() => setMessage("Impossible de lire les réglages Android.")); };
    refresh();
    document.addEventListener("visibilitychange", refresh);
    return () => document.removeEventListener("visibilitychange", refresh);
  }, []);
  async function run(action: () => Promise<void>) {
    setBusy(true); setMessage("");
    try { await action(); setStatus(await native.status()); }
    catch (error) { setMessage(error instanceof Error ? error.message : "Opération impossible. Réessayez."); }
    finally { setBusy(false); }
  }
  async function activate() {
    let current = await native.status();
    if (!current.notifications) current = await native.notifications();
    if (!current.notifications) { setMessage("Autorisez les notifications Android pour afficher le bouton Arrêter."); return; }
    if (!current.exact) { setMessage("Autorisez les alarmes et rappels, puis revenez ici et appuyez sur Activer."); await native.settings({ kind: "exact" }); return; }
    const params = new URLSearchParams({ latitude: String(latitude), longitude: String(longitude), method: String(method) });
    const response = await fetch(`/api/adhan-calendar?${params}`, { cache: "no-store" });
    const data = await response.json();
    if (!response.ok || !Array.isArray(data.events)) throw new Error(data.error || "Calendrier indisponible.");
    const result = await native.schedule({ events: data.events, place: name });
    setStatus(result);
    setMessage(`Adhan activé pour ${name}. Vous pouvez verrouiller le téléphone.`);
  }
  const button = "rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold disabled:opacity-50";
  return <div className="mt-5 rounded-2xl border border-gold-500/30 bg-background p-4" id="adhan-automatique">
    <h3 className="font-semibold">Adhan aux heures de prière</h3>
    {!available ? <p className="mt-2 text-sm leading-6 text-muted">{android ? "Installez l’APK MIRÂTH 1.2 pour activer les alarmes de prière. Votre version actuelle permet l’écoute manuelle." : "L’adhan automatique écran verrouillé est disponible dans l’application Android MIRÂTH 1.2. Sur le site, utilisez le lecteur ci-dessous."}</p> : <>
      <p className="mt-2 text-sm leading-6">Les cinq prières, selon la ville et la méthode choisies ci-dessus. Enregistrement de La Mecque intégré au téléphone ; aucune connexion nécessaire au moment de la lecture.</p>
      <p className="mt-2 text-sm" role="status">{status?.enabled && status.exact && status.next ? `Activé · ${status.place} · prochain adhan ${new Date(status.next).toLocaleString("fr-FR")}` : "Adhan automatique inactif"}</p>
      {status && <dl className="mt-4 grid grid-cols-2 gap-2 text-sm"><div className="rounded-xl border border-border bg-surface p-3"><dt className="text-xs text-muted">Notifications</dt><dd className="mt-1 font-semibold">{status.notifications ? "Autorisées" : "À autoriser"}</dd></div><div className="rounded-xl border border-border bg-surface p-3"><dt className="text-xs text-muted">Alarmes et rappels</dt><dd className="mt-1 font-semibold">{status.exact ? "Autorisés" : "À autoriser"}</dd></div><div className="rounded-xl border border-border bg-surface p-3"><dt className="text-xs text-muted">Son des alarmes</dt><dd className="mt-1 font-semibold">{status.alarmVolume > 0 ? "Volume actif" : "Volume à zéro"}</dd></div><div className="rounded-xl border border-border bg-surface p-3"><dt className="text-xs text-muted">Ville enregistrée</dt><dd className="mt-1 font-semibold">{status.place || "Aucune"}</dd></div></dl>}
      {status?.enabled && status.place !== name && <p role="status" className="mt-3 rounded-xl border border-accent/40 p-3 text-sm">Vous avez choisi {name}. Actualisez les alarmes pour remplacer le calendrier de {status.place}.</p>}
      {status?.enabled && status.until > 0 && <p className="mt-2 text-sm text-muted">Calendrier enregistré jusqu’au {new Date(status.until).toLocaleDateString("fr-FR")}. Renouvelez-le avant cette date ou après un changement de ville.</p>}
      {status && !status.exact && <p className="mt-2 text-sm">Les alarmes et rappels doivent être autorisés dans Android.</p>}
      {status && (!status.notifications || status.alarmVolume === 0) && <p className="mt-2 text-sm">{!status.notifications ? "Notifications désactivées. " : ""}{status.alarmVolume === 0 ? "Le volume des alarmes est à zéro." : ""}</p>}
      <div className="mt-4 flex flex-wrap gap-2">
        <button className={button} disabled={busy} onClick={() => run(activate)}>{busy ? "Patientez…" : status?.enabled ? "Actualiser les alarmes" : "Activer l’adhan"}</button>
        <button className={button} disabled={busy || !status?.exact || !status.notifications} onClick={() => run(async () => { await native.test(); setMessage("Test programmé dans 15 secondes. Verrouillez le téléphone pour vérifier le son."); })}>Tester écran verrouillé</button>
        <button className={button} disabled={busy} onClick={() => run(async () => { await native.stop(); })}>Arrêter le son / annuler le test</button>
        {status?.enabled && <button className={button} disabled={busy} onClick={() => run(async () => { setStatus(await native.disable()); setMessage("Adhan désactivé."); })}>Désactiver</button>}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {[['exact', 'Alarmes et rappels'], ['notifications', 'Notifications'], ['volume', 'Volume des alarmes'], ['battery', 'Réglages Android']].map(([kind, label]) => <button key={kind} className="underline underline-offset-4" onClick={() => run(() => native.settings({ kind }))}>{label}</button>)}
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">Le son utilise le volume des alarmes. Le mode « Ne pas déranger » et les restrictions de batterie peuvent le bloquer. Après un arrêt forcé dans Android, rouvrez MIRÂTH et actualisez les alarmes.</p>
      {status?.lastError && <p className="mt-2 text-sm" role="alert">{status.lastError}</p>}
    </>}
    {message && <p className="mt-3 text-sm leading-6" role="status">{message}</p>}
  </div>;
}
