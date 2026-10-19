// @vitest-environment node
import {expect,it,vi} from 'vitest';
vi.mock('server-only',()=>({}));
import {interpretSearch,matchesIntent} from '@/lib/search/intent';
import {hadithSearchIndex} from '@/lib/search/hadith-index';
import {relevance} from '@/lib/search/match';
it('finds the existing Muwatta Fajr passage from a natural spoken request',()=>{
 const intent=interpretSearch('Peux-tu me trouver les hadiths sur la prière du Fajr dans le Mouwatta');
 expect(intent).toEqual({keywords:'priere fajr',category:'hadith',collection:'muwatta'});
 const results=hadithSearchIndex().filter(r=>matchesIntent(intent,r)&&relevance(intent.keywords,r.searchText!,r.titre)>0);
 expect(results.some(r=>r.href==='/hadith/muwatta/1#hadith-3')).toBe(true);
});
it('maps names and categories to the real collection identifiers',()=>{
 expect(interpretSearch('Les hadiths de Boukhari sur le Fajr').collection).toBe('boukhari');
 expect(interpretSearch('Fajr Mouwatta','muslim').collection).toBe('muslim');
 expect(interpretSearch('Une invocation pour rembourser mes dettes')).toEqual({keywords:'dettes',category:'invocation',collection:''});
 expect(relevance('Moussa','Mûsâ')).toBeGreaterThan(0);
 expect(interpretSearch('Où lire l’histoire de Moussa').keywords).toBe('moussa');
});
it('does not turn unknown words into generated religious answers',()=>{
 const intent=interpretSearch('hadiths licorne');expect(intent.keywords).toBe('licorne');
 expect(hadithSearchIndex().some(r=>matchesIntent(intent,r)&&relevance(intent.keywords,r.searchText!)>0)).toBe(false);
});
