import {afterEach,expect,it,vi} from 'vitest';
const capacitor=vi.hoisted(()=>({getPlatform:vi.fn(()=> 'web'),isPluginAvailable:vi.fn(()=>false)}));
vi.mock('@capacitor/core',()=>({Capacitor:capacitor,registerPlugin:()=>({})}));
import {voicePlatform} from '@/lib/search/native-voice';
afterEach(()=>{capacitor.getPlatform.mockReturnValue('web');capacitor.isPluginAvailable.mockReturnValue(false);});
it('keeps the browser path on web and iOS',()=>{
 expect(voicePlatform()).toBe('web');capacitor.getPlatform.mockReturnValue('ios');expect(voicePlatform()).toBe('web');
});
it('requires the Android plugin before offering native speech',()=>{
 capacitor.getPlatform.mockReturnValue('android');expect(voicePlatform()).toBe('android-update');
 capacitor.isPluginAvailable.mockReturnValue(true);expect(voicePlatform()).toBe('android');
 expect(capacitor.isPluginAvailable).toHaveBeenCalledWith('MirathVoiceSearch');
});
