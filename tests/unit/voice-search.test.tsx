import {act,cleanup,fireEvent,render,screen} from '@testing-library/react';
import {afterEach,expect,it,vi} from 'vitest';
import type {Recognition} from '@/lib/search/voice';
const push=vi.hoisted(()=>vi.fn());
vi.mock('next/navigation',()=>({useRouter:()=>({push})}));
import {VoiceSearchForm} from '@/components/search/voice-search-form';
let recognition:MockRecognition;
class MockRecognition implements Recognition {
 lang='';continuous=true;interimResults=false;maxAlternatives=0;
 onstart:Recognition['onstart']=null;onend:Recognition['onend']=null;onresult:Recognition['onresult']=null;onerror:Recognition['onerror']=null;
 start=vi.fn();stop=vi.fn();abort=vi.fn();constructor(){recognition=this;}
}
function mount(){vi.stubGlobal('SpeechRecognition',MockRecognition);return render(<VoiceSearchForm collections/>);}
afterEach(()=>{cleanup();vi.useRealTimers();vi.unstubAllGlobals();vi.restoreAllMocks();push.mockClear();});

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
