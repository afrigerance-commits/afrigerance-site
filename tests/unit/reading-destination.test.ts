import {afterEach,expect,it} from 'vitest';
import chapters from '../../data/quran/chapters-meta.json';
import {readingDestination,saveReadingDestination} from '@/lib/quran/reading-destination';
import {readingPositionKey} from '@/lib/quran/reading-position';
afterEach(()=>localStorage.clear());
it('restores the selected page, Juz and Hizb with its exact verse anchor',()=>{
 for(const type of ['page','juz','hizb'] as const){
  const number=type==='page'?22:type==='juz'?2:3;
  saveReadingDestination({chapter:2,verse:142},type,number);
  const restored=readingDestination(localStorage.getItem(readingPositionKey),chapters);
  expect(restored?.href).toBe(`/coran/lecture/${type}/${number}#verset-2-142`);
 }
});
it('retains old reading data and rejects fabricated portion destinations',()=>{
 expect(readingDestination('{"chapter":2,"verse":42}',chapters)?.href).toBe('/coran/2#verset-42');
 for(const context of [{type:'page',number:604},{type:'evil',number:1},{type:'juz',number:2.5}]){
  expect(readingDestination(JSON.stringify({chapter:2,verse:142,context}),chapters)?.href).toBe('/coran/2#verset-142');
 }
 expect(readingDestination('{"chapter":1,"verse":999}',chapters)).toBeNull();
});
