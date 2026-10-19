import {act,cleanup,fireEvent,render,screen,waitFor} from '@testing-library/react';
import {afterEach,expect,it,vi} from 'vitest';
import type {Recognition} from '@/lib/search/voice';
const push=vi.hoisted(()=>vi.fn());
const native=vi.hoisted(()=>({voicePlatform:vi.fn(()=> 'web'),nativeVoice:{available:vi.fn(),recognize:vi.fn()}}));
vi.mock('next/navigation',()=>({useRouter:()=>({push})}));
vi.mock('@/lib/search/native-voice',()=>native);
import {VoiceSearchForm} from '@/components/search/voice-search-form';
let recognition:MockRecognition;
class MockRecognition implements Recognition {
 lang='';continuous=true;interimResults=false;maxAlternatives=0;
 onstart:Recognition['onstart']=null;onend:Recognition['onend']=null;onresult:Recognition['onresult']=null;onerror:Recognition['onerror']=null;
 start=vi.fn();stop=vi.fn();abort=vi.fn();constructor(){recognition=this;}
}
function mount(){vi.stubGlobal('SpeechRecognition',MockRecognition);return render(<VoiceSearchForm collections/>);}
afterEach(()=>{cleanup();vi.useRealTimers();vi.unstubAllGlobals();vi.restoreAllMocks();push.mockClear();native.voicePlatform.mockReturnValue('web');native.nativeVoice.available.mockReset();native.nativeVoice.recognize.mockReset();});

it('does not open the microphone until requested, shows editable transcription and never auto searches',()=>{
 const focus=vi.fn();window.addEventListener('mirath:audio-focus',focus);
 mount();expect(focus).not.toHaveBeenCalled();
 fireEvent.click(screen.getByRole('button',{name:'Dicter ma recherche'}));
 expect(recognition.start).toHaveBeenCalledOnce();expect(recognition.lang).toBe('fr-FR');expect(focus).toHaveBeenCalledOnce();
 act(()=>recognition.onresult?.({results:[{isFinal:true,0:{transcript:'les hadiths sur le Fajr'}}]}));
 expect(screen.getByRole('searchbox')).toHaveValue('les hadiths sur le Fajr');expect(push).not.toHaveBeenCalled();
 act(()=>recognition.onend?.());
 fireEvent.change(screen.getByRole('searchbox'),{target:{value:'Fajr Mouwatta'}});
 fireEvent.change(screen.getByRole('combobox',{name:'Filtrer par recueil'}),{target:{value:'muwatta'}});
 fireEvent.click(screen.getByRole('button',{name:'Rechercher'}));
 expect(push).toHaveBeenCalledWith('/recherche?q=Fajr+Mouwatta&collection=muwatta');
 window.removeEventListener('mirath:audio-focus',focus);
});
it('supports Arabic dictation and the prefixed API',()=>{
 vi.stubGlobal('SpeechRecognition',undefined);vi.stubGlobal('webkitSpeechRecognition',MockRecognition);
 render(<VoiceSearchForm/>);fireEvent.change(screen.getByRole('combobox',{name:'Langue de la dictée'}),{target:{value:'ar-SA'}});
 fireEvent.click(screen.getByRole('button',{name:'Dicter ma recherche'}));expect(recognition.lang).toBe('ar-SA');
 act(()=>recognition.onresult?.({results:[{isFinal:true,0:{transcript:'صلاة الفجر'}}]}));act(()=>recognition.onend?.());
 expect(screen.getByRole('searchbox')).toHaveValue('صلاة الفجر');expect(screen.getByRole('searchbox')).toHaveAttribute('dir','auto');
});
it('keeps typing available when recognition is unsupported',()=>{
 vi.stubGlobal('SpeechRecognition',undefined);vi.stubGlobal('webkitSpeechRecognition',undefined);render(<VoiceSearchForm/>);
 fireEvent.click(screen.getByRole('button',{name:'Dicter ma recherche'}));expect(screen.getByRole('status')).toHaveTextContent('pas disponible');
 fireEvent.change(screen.getByRole('searchbox'),{target:{value:'dettes'}});fireEvent.click(screen.getByRole('button',{name:'Rechercher'}));
 expect(push).toHaveBeenCalledWith('/recherche?q=dettes');
});
it('handles microphone refusal without blocking the typed search',()=>{
 mount();fireEvent.click(screen.getByRole('button',{name:'Dicter ma recherche'}));
 act(()=>recognition.onerror?.({error:'not-allowed'}));expect(screen.getByRole('status')).toHaveTextContent('bloqué');
 expect(screen.getByRole('button',{name:'Rechercher'})).not.toBeDisabled();expect(recognition.abort).toHaveBeenCalled();
});
it('aborts on cancellation and ignores late transcripts',()=>{
 mount();fireEvent.click(screen.getByRole('button',{name:'Dicter ma recherche'}));const late=recognition.onresult;
 fireEvent.click(screen.getByRole('button',{name:'Annuler la dictée'}));
 act(()=>late?.({results:[{isFinal:true,0:{transcript:'late text'}}]}));expect(screen.getByRole('searchbox')).toHaveValue('');expect(recognition.abort).toHaveBeenCalled();
});
it('bounds listening to twenty seconds and aborts on unmount',()=>{
 vi.useFakeTimers();const view=mount();fireEvent.click(screen.getByRole('button',{name:'Dicter ma recherche'}));
 act(()=>vi.advanceTimersByTime(20001));expect(recognition.abort).toHaveBeenCalled();expect(screen.getByRole('status')).toHaveTextContent('20 secondes');
 fireEvent.click(screen.getByRole('button',{name:'Dicter ma recherche'}));view.unmount();expect(recognition.abort).toHaveBeenCalled();
});
it('stops on query navigation and when the application is hidden',()=>{
 const view=mount();fireEvent.click(screen.getByRole('button',{name:'Dicter ma recherche'}));const first=recognition;
 view.rerender(<VoiceSearchForm initialQuery="Fajr" collections/>);
 expect(first.abort).toHaveBeenCalled();expect(screen.getByRole('searchbox')).toHaveValue('Fajr');
 fireEvent.click(screen.getByRole('button',{name:'Dicter ma recherche'}));
 vi.spyOn(document,'visibilityState','get').mockReturnValue('hidden');
 fireEvent(document,new Event('visibilitychange'));expect(recognition.abort).toHaveBeenCalled();expect(recognition.onresult).toBeNull();expect(screen.getByRole('status')).toHaveTextContent('masquée');
});

it('distinguishes a blocked speech service from a refused microphone',()=>{
 mount();fireEvent.click(screen.getByRole('button',{name:'Dicter ma recherche'}));
 act(()=>recognition.onerror?.({error:'service-not-allowed'}));
 expect(screen.getByRole('status')).toHaveTextContent('Autoriser le micro seul peut ne pas suffire');
 expect(screen.getByText('Aide pour la dictée')).toBeInTheDocument();
});
it('does not try browser speech in an APK that needs a native update',()=>{
 native.voicePlatform.mockReturnValue('android-update');mount();
 fireEvent.click(screen.getByRole('button',{name:'Dicter ma recherche'}));
 expect(screen.getByRole('status')).toHaveTextContent('mise à jour');
 expect(native.nativeVoice.recognize).not.toHaveBeenCalled();
 fireEvent.change(screen.getByRole('searchbox'),{target:{value:'Fajr'}});
 fireEvent.click(screen.getByRole('button',{name:'Rechercher'}));expect(push).toHaveBeenCalledWith('/recherche?q=Fajr');
});
it('uses native Android speech without Web Speech and keeps the session through its system window',async()=>{
 native.voicePlatform.mockReturnValue('android');native.nativeVoice.available.mockResolvedValue({available:true});
 let complete!:(value:{text:string;cancelled:boolean})=>void;
 native.nativeVoice.recognize.mockImplementation(()=>new Promise(resolve=>{complete=resolve;}));
 vi.stubGlobal('SpeechRecognition',undefined);vi.stubGlobal('webkitSpeechRecognition',undefined);
 render(<VoiceSearchForm/>);
 expect(native.nativeVoice.available).not.toHaveBeenCalled();
 fireEvent.change(screen.getByRole('combobox',{name:'Langue de la dictée'}),{target:{value:'ar-SA'}});
 fireEvent.click(screen.getByRole('button',{name:'Dicter ma recherche'}));
 await waitFor(()=>expect(native.nativeVoice.recognize).toHaveBeenCalledWith({language:'ar-SA'}));
 expect(screen.getByRole('button',{name:'Dictée Android en cours'})).toBeDisabled();
 vi.spyOn(document,'visibilityState','get').mockReturnValue('hidden');fireEvent(document,new Event('visibilitychange'));
 vi.useFakeTimers();act(()=>vi.advanceTimersByTime(21000));vi.useRealTimers();
 expect(screen.getByRole('button',{name:'Rechercher'})).toBeDisabled();
 await act(async()=>complete({text:'صلاة الفجر',cancelled:false}));
 expect(screen.getByRole('searchbox')).toHaveValue('صلاة الفجر');expect(push).not.toHaveBeenCalled();
 fireEvent.click(screen.getByRole('button',{name:'Rechercher'}));expect(push).toHaveBeenCalledWith('/recherche?q=%D8%B5%D9%84%D8%A7%D8%A9+%D8%A7%D9%84%D9%81%D8%AC%D8%B1');
});
it('explains a missing Android recognition provider and permits retry',async()=>{
 native.voicePlatform.mockReturnValue('android');native.nativeVoice.available.mockResolvedValue({available:false});
 render(<VoiceSearchForm/>);fireEvent.click(screen.getByRole('button',{name:'Dicter ma recherche'}));
 await waitFor(()=>expect(screen.getByRole('status')).toHaveTextContent('Aucun service vocal Android'));
 expect(native.nativeVoice.recognize).not.toHaveBeenCalled();expect(screen.getByRole('button',{name:'Rechercher'})).not.toBeDisabled();
 native.nativeVoice.available.mockResolvedValue({available:true});native.nativeVoice.recognize.mockResolvedValue({text:'Fajr',cancelled:false});
 fireEvent.click(screen.getByRole('button',{name:'Dicter ma recherche'}));
 await waitFor(()=>expect(screen.getByRole('searchbox')).toHaveValue('Fajr'));
});
it('preserves the typed query when Android dictation is cancelled',async()=>{
 native.voicePlatform.mockReturnValue('android');native.nativeVoice.available.mockResolvedValue({available:true});
 native.nativeVoice.recognize.mockResolvedValue({text:'',cancelled:true});
 render(<VoiceSearchForm initialQuery="dettes"/>);fireEvent.click(screen.getByRole('button',{name:'Dicter ma recherche'}));
 await waitFor(()=>expect(screen.getByRole('status')).toHaveTextContent('Dictée annulée'));
 expect(screen.getByRole('searchbox')).toHaveValue('dettes');expect(push).not.toHaveBeenCalled();
});
it('shows Android provider failures without preventing manual search',async()=>{
 native.voicePlatform.mockReturnValue('android');native.nativeVoice.available.mockResolvedValue({available:true});
 native.nativeVoice.recognize.mockRejectedValue({code:'network'});
 render(<VoiceSearchForm/>);fireEvent.click(screen.getByRole('button',{name:'Dicter ma recherche'}));
 await waitFor(()=>expect(screen.getByRole('status')).toHaveTextContent('injoignable'));
 expect(screen.getByRole('button',{name:'Rechercher'})).not.toBeDisabled();
});
it('ignores an Android transcript returned after query navigation',async()=>{
 native.voicePlatform.mockReturnValue('android');native.nativeVoice.available.mockResolvedValue({available:true});
 let complete!:(value:{text:string;cancelled:boolean})=>void;
 native.nativeVoice.recognize.mockImplementation(()=>new Promise(resolve=>{complete=resolve;}));
 const view=render(<VoiceSearchForm/>);fireEvent.click(screen.getByRole('button',{name:'Dicter ma recherche'}));
 await waitFor(()=>expect(native.nativeVoice.recognize).toHaveBeenCalledOnce());
 view.rerender(<VoiceSearchForm initialQuery="Fajr"/>);
 await act(async()=>complete({text:'old transcript',cancelled:false}));
 expect(screen.getByRole('searchbox')).toHaveValue('Fajr');expect(push).not.toHaveBeenCalled();
});
it('blocks dictation on an insecure origin and keeps manual input',()=>{
 vi.stubGlobal('isSecureContext',false);mount();
 fireEvent.click(screen.getByRole('button',{name:'Dicter ma recherche'}));
 expect(screen.getByRole('status')).toHaveTextContent('connexion sécurisée');
 expect(screen.getByRole('button',{name:'Rechercher'})).not.toBeDisabled();
});
