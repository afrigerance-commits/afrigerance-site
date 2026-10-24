import {readFileSync} from 'node:fs';
import {expect,it,vi,afterEach} from 'vitest';
vi.mock('server-only',()=>({}));
afterEach(()=>{vi.unstubAllEnvs();vi.resetModules();});
it('keeps imported editions outside public navigation by default',async()=>{
 vi.stubEnv('MIRATH_STUDY_PREVIEW','');vi.resetModules();
 const {hadithCollections}=await import('../../src/lib/hadith/data');
 expect(hadithCollections.map(c=>c.slug)).toEqual(['muwatta','boukhari','muslim']);
});
it('makes all imported books readable in editorial preview without inventing French or grades',async()=>{
 vi.stubEnv('MIRATH_STUDY_PREVIEW','1');vi.resetModules();
 const {getBooks,getHadithsForBook}=await import('../../src/lib/hadith/data');
 for(const [slug,count,books] of [['bulugh',1557,16],['riyadussalihin',1896,20]] as const){
  const all=getBooks(slug);expect(all).toHaveLength(books);
  const hs=all.flatMap(b=>getHadithsForBook(slug,b.number));expect(hs).toHaveLength(count);
  expect(new Set(hs.map(h=>h.numero)).size).toBe(count);
  for(const h of hs){expect(h.francais).toBe('');expect(h.grade).toBeUndefined();expect(h.sourceReference).toBeTruthy();expect(h.sourceUrl).toMatch(/^https:\/\/sunnah.com\//);}
 }
});
it('retains Risala attribution and readable parts in source order',async()=>{
 const {default:d}=await import('../../data/study/risala');
 expect(d.status).toBe('draft');expect(d.license).toBe('CC BY-NC-SA 4.0');expect(d.chapters).toHaveLength(46);
 d.chapters.forEach((c:{number:number;text:string;title:string},i:number)=>{expect(c.number).toBe(i);expect(c.title).toBeTruthy();expect(c.text.length).toBeGreaterThan(20);expect(c.text).not.toContain('#META#');});
});
