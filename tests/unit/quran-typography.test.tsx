import {cleanup,fireEvent,render,screen,waitFor} from '@testing-library/react';
import {afterEach,expect,it,vi} from 'vitest';
import {QuranTypographyControls,useQuranTypography} from '@/components/islamic/quran-typography-controls';
vi.mock('@/components/islamic/quran-audio-player',()=>({useQuranAudioContext:()=>({playingVerse:null}),QuranAudioModeSelector:()=>null,VersePlayButton:()=>null}));
function Preview(){const type=useQuranTypography();return <p lang="ar" dir="rtl" style={{fontSize:type.value}} data-testid="preview">عَرَبِيّ</p>;}
afterEach(()=>{cleanup();localStorage.clear();});
it('shares the saved font size with all text contexts and bounds the controls',async()=>{
 localStorage.setItem('mirath:quran:font-size','42');render(<><QuranTypographyControls/><Preview/></>);
 await waitFor(()=>expect(screen.getByTestId('preview')).toHaveStyle({fontSize:'42px'}));
 fireEvent.click(screen.getByRole('button',{name:'Agrandir le texte arabe'}));
 expect(screen.getByTestId('preview')).toHaveStyle({fontSize:'46px'});
 expect(screen.getByRole('button',{name:'Agrandir le texte arabe'})).toBeDisabled();
 for(let n=0;n<6;n++)fireEvent.click(screen.getByRole('button',{name:'Réduire le texte arabe'}));
 expect(screen.getByTestId('preview')).toHaveStyle({fontSize:'26px'});
 expect(localStorage.getItem('mirath:quran:font-size')).toBe('26');
});
