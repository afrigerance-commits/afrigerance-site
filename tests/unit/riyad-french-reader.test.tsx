import {expect,it,vi,afterEach} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
vi.mock('next/navigation',()=>({notFound:()=>{throw new Error('not-found');}}));
import Page from '../../src/app/hadith/riyadussalihin/edition-francaise/page';
afterEach(()=>vi.unstubAllEnvs());
it('allows the published source reader without exposing the Arabic drafts',async()=>{
 vi.stubEnv('MIRATH_STUDY_PREVIEW','');const html=renderToStaticMarkup(await Page({searchParams:Promise.resolve({})}));expect(html).toContain('copie');expect(html).toContain('PDF original');
});
it('keeps the original document external and the errata separate',async()=>{
 vi.stubEnv('MIRATH_STUDY_PREVIEW','1');const html=renderToStaticMarkup(await Page({searchParams:Promise.resolve({page:'14'})}));
 expect(html).toContain('fr-jardindesvertueux_Kechrid.pdf#page=14');expect(html).toContain('98:48');expect(html).toContain('https://quran.com/98/5');expect(html).toContain('78:37');expect(html).toContain('copie');
});
it('bounds page navigation to the actual document',async()=>{
 vi.stubEnv('MIRATH_STUDY_PREVIEW','1');
 for(const [value,expected] of [['9999',515],['-8',1],['NaN',1],['Infinity',1],['2.9',2]] as const){const html=renderToStaticMarkup(await Page({searchParams:Promise.resolve({page:value})}));expect(html).toContain(`.pdf#page=${expected}`);}
});
