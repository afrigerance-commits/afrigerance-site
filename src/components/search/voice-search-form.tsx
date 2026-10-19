"use client";
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mic, MicOff, Search, Square, X } from 'lucide-react';
import { recognitionConstructor, voiceError, type Recognition } from '@/lib/search/voice';
import { nativeVoice, voicePlatform } from '@/lib/search/native-voice';
import { AUDIO_FOCUS_EVENT } from '@/components/islamic/sourced-audio';

type VoiceMode = 'checking' | 'browser' | 'android' | 'android-update' | 'unsupported' | 'insecure';
const messages = {
  checking: 'Vérification de la dictée…',
  browser: 'Parlez, vérifiez le texte, puis recherchez dans les contenus existants.',
  android: 'Dictée Android : appuyez sur le micro, puis parlez dans la fenêtre du téléphone.',
  'android-update': 'Une mise à jour de l’application est nécessaire pour utiliser la dictée Android. La saisie reste disponible.',
  unsupported: 'La dictée directe n’est pas disponible dans ce navigateur. Consultez l’aide ci-dessous ; la saisie reste disponible.',
  insecure: 'La dictée nécessite une connexion sécurisée. Ouvrez MIRÂTH sur https://miraath.netlify.app.',
};

function detectVoiceMode(): VoiceMode {
  const platform = voicePlatform();
  if (platform !== 'web') return platform;
  if (window.isSecureContext === false) return 'insecure';
  return recognitionConstructor() ? 'browser' : 'unsupported';
}

export function VoiceSearchForm({ initialQuery = '', collection = '', collections = false, action = '/recherche', variant = 'full', onSearch }: {
  initialQuery?: string; collection?: string; collections?: boolean; action?: string;
  variant?: 'home' | 'quick' | 'full'; onSearch?: () => void;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState(collection);
  const [mode, setMode] = useState<VoiceMode>('checking');
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState('');
  const [lang, setLang] = useState('fr-FR');
  const recognition = useRef<Recognition | null>(null);
  const nativeSession = useRef<symbol | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const id = useId();

  function clear() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }
  function abort() {
    clear();
    nativeSession.current = null; // Ignore late results; Android owns its visible speech window.
    const current = recognition.current;
    recognition.current = null;
    if (current) {
      current.onstart = current.onend = current.onresult = current.onerror = null;
      try { current.abort(); } catch { /* The browser may already have stopped. */ }
    }
  }
  function pauseAudio() {
    window.dispatchEvent(new CustomEvent(AUDIO_FOCUS_EVENT, { detail: 'mirath-voice-search' }));
  }
  useEffect(() => {
    setMode(detectVoiceMode());
    const visibility = () => {
      // The system speech activity itself hides the WebView. Only stop browser recognition here.
      if (document.visibilityState === 'hidden' && recognition.current) {
        abort(); setListening(false); setMessage('Dictée arrêtée lorsque l’application a été masquée.');
      }
    };
    document.addEventListener('visibilitychange', visibility);
    return () => { document.removeEventListener('visibilitychange', visibility); abort(); };
  }, []);
  useEffect(() => {
    abort(); setListening(false); setQuery(initialQuery); setFilter(collection); setMessage('');
  }, [initialQuery, collection]);

  async function startAndroid() {
    const session = Symbol('dictation');
    nativeSession.current = session;
    const active = () => nativeSession.current === session;
    setListening(true); setMessage('Ouverture de la dictée Android…');
    try {
      const availability = await nativeVoice.available();
      if (!active()) return;
      if (!availability.available) { setMessage(voiceError('native-unavailable')); return; }
      pauseAudio();
      setMessage('Parlez dans la fenêtre Android. Utilisez Retour pour annuler.');
      const result = await nativeVoice.recognize({ language: lang });
      if (!active()) return;
      if (result.cancelled) setMessage('Dictée annulée.');
      else {
        const text = result.text.trim().slice(0, 120);
        if (text) setQuery(text);
        setMessage(text ? 'Texte reconnu. Corrigez-le si besoin, puis appuyez sur Rechercher.' : voiceError('no-speech'));
      }
    } catch (error) {
      if (active()) setMessage(voiceError(typeof error === 'object' && error && 'code' in error ? String(error.code) : 'native-error'));
    } finally {
      if (active()) { nativeSession.current = null; setListening(false); input.current?.focus(); }
    }
  }

  function start() {
    // Re-check on the click, but keep browser start synchronous to preserve user activation.
    if (nativeSession.current) return;
    if (listening) {
      try { recognition.current?.stop(); } catch { abort(); setListening(false); }
      return;
    }
    const currentMode = detectVoiceMode();
    setMode(currentMode);
    if (currentMode !== 'browser' && currentMode !== 'android') {
      setMessage(messages[currentMode]); input.current?.focus(); return;
    }
    if (!navigator.onLine) { setMessage('Une connexion Internet est nécessaire pour rechercher.'); return; }
    abort();
    if (currentMode === 'android') { void startAndroid(); return; }
    const Constructor = recognitionConstructor();
    if (!Constructor) { setMode('unsupported'); setMessage(messages.unsupported); return; }
    let current: Recognition;
    try { current = new Constructor(); } catch { setMessage(voiceError('service-not-allowed')); return; }
    recognition.current = current;
    current.lang = lang; current.continuous = false; current.interimResults = true; current.maxAlternatives = 1;
    let transcript = '';
    const active = () => recognition.current === current;
    const expire = () => {
      if (!active()) return;
      abort(); setListening(false);
      setMessage('La dictée s’est arrêtée après 20 secondes. Vérifiez le texte ou réessayez.'); input.current?.focus();
    };
    current.onstart = () => {
      if (!active()) return;
      clear(); timer.current = setTimeout(expire, 20000); setMessage('J’écoute… Parlez, puis vérifiez le texte reconnu.');
    };
    current.onresult = event => {
      if (!active()) return;
      transcript = Array.from({ length: event.results.length }, (_, i) => event.results[i][0]?.transcript ?? '').join(' ').trim().slice(0, 120);
      setQuery(transcript);
    };
    current.onerror = event => {
      if (!active()) return;
      abort(); setListening(false); setMessage(voiceError(event.error));
    };
    current.onend = () => {
      if (!active()) return;
      abort(); setListening(false);
      setMessage(transcript ? 'Texte reconnu. Corrigez-le si besoin, puis appuyez sur Rechercher.' : voiceError('no-speech'));
      input.current?.focus();
    };
    setListening(true); setMessage('Autorisez le micro si votre navigateur le demande…');
    pauseAudio(); timer.current = setTimeout(expire, 20000);
    try { current.start(); } catch { abort(); setListening(false); setMessage(voiceError('service-not-allowed')); }
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (listening) return;
    const q = query.trim(); if (q.length < 2) return;
    abort(); setListening(false);
    const params = new URLSearchParams({ q }); if (filter && collections) params.set('collection', filter);
    router.push(`${action}?${params.toString()}`); onSearch?.();
  }
  const unavailable = mode === 'unsupported' || mode === 'android-update' || mode === 'insecure';
  return <div className={`voice-search voice-search-${variant}`}>
    <form action={action} onSubmit={submit} className={variant === 'home' ? 'atelier-search voice-search-form' : 'voice-search-form'} aria-label="Recherche écrite ou vocale">
      <Search className="size-4 shrink-0 text-primary" aria-hidden="true" />
      <label htmlFor={id} className="sr-only">Votre recherche</label>
      <input ref={input} id={id} name="q" type="search" value={query} onChange={event => { if (listening) { abort(); setListening(false); } setQuery(event.target.value); }} onKeyDown={event => {
        if (event.key === 'Escape' && listening && !nativeSession.current) { event.preventDefault(); abort(); setListening(false); setMessage('Dictée annulée.'); }
      }} aria-describedby={`${id}-privacy ${id}-status`} dir="auto" required minLength={2} maxLength={120} placeholder="Fajr, une invocation, un ouvrage…" />
      <button type="button" onClick={start} disabled={mode === 'checking' || (listening && mode === 'android')} aria-label={listening ? (mode === 'android' ? 'Dictée Android en cours' : 'Terminer la dictée') : 'Dicter ma recherche'} aria-pressed={listening} className="voice-mic" data-listening={listening} title={unavailable ? messages[mode] : 'Dicter ma recherche'}>
        {listening ? <Square className="size-4" /> : unavailable ? <MicOff className="size-5" /> : <Mic className="size-5" />}
      </button>
      {listening && mode !== 'android' && <button type="button" aria-label="Annuler la dictée" onClick={() => { abort(); setListening(false); setMessage('Dictée annulée.'); }}><X className="size-4" /></button>}
      <button type="submit" aria-label="Rechercher" disabled={listening} className="voice-submit"><Search className="size-4" /><span className="voice-submit-label">Rechercher</span></button>
      {collections && <label className="voice-collection"><span className="sr-only">Filtrer par recueil</span><select name="collection" aria-label="Filtrer par recueil" value={filter} onChange={event => setFilter(event.target.value)}><option value="">Toute la plateforme</option><option value="muwatta">Al-Muwatta’</option><option value="boukhari">Al-Bukhârî</option><option value="muslim">Muslim</option></select></label>}
    </form>
    <div className="voice-search-meta"><label>Dictée <select aria-label="Langue de la dictée" value={lang} disabled={listening} onChange={event => setLang(event.target.value)}><option value="fr-FR">Français</option><option value="ar-SA">العربية</option></select></label><p id={`${id}-privacy`}>Micro à la demande. La voix peut être transmise au service vocal du navigateur ou du téléphone. MIRÂTH ne stocke pas l’audio. <Link href="/confidentialite#recherche-vocale">En savoir plus</Link>.</p></div>
    <p id={`${id}-status`} role="status" className="voice-search-status">{message || messages[mode]}</p>
    <details className="voice-search-help"><summary>Aide pour la dictée</summary>
      <p>Dans l’application Android, la fenêtre du téléphone gère le micro et la fin de la dictée. Si elle ne s’ouvre pas, vérifiez que l’APK est à jour et qu’un service de reconnaissance vocale est installé et activé.</p>
      <p>Sur le site, le navigateur doit fournir un service de reconnaissance vocale. Si le micro est refusé, vérifiez les autorisations de ce site et celles du navigateur dans les réglages de l’appareil. Si le service est absent ou bloqué, MIRÂTH ne peut pas l’activer à sa place. Vous pouvez utiliser la dictée du clavier si elle est disponible.</p>
    </details>
  </div>;
}
