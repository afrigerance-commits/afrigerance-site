import { getPersonalItem, setPersonalItem } from '@/lib/account/storage';
import { parseReadingPosition, readingPositionKey, type ReadingPosition } from './reading-position';
import { partitionAt, type PartitionType } from './partitions';
export function saveReadingDestination(position:ReadingPosition,type?:PartitionType,number?:number){
 const value=JSON.stringify({...position,...(type?{context:{type,number}}:{})});
 try {if(getPersonalItem(readingPositionKey)!==value)setPersonalItem(readingPositionKey,value);} catch { /* Reading remains available without storage. */ }
}
export function readingDestination(raw:string|null,chapters:readonly {number:number;versesCount:number}[]) {
 const position=parseReadingPosition(raw,chapters);if(!position)return null;
 let context:{type?:string;number?:number}|undefined;
 try {context=JSON.parse(raw!).context;}catch{}
 const type=context?.type;
 if((type==='juz'||type==='hizb'||type==='page') && Number.isInteger(context?.number) && partitionAt(position.chapter,position.verse,type).number===context!.number){
  const label=type==='juz'?'Juz':type==='hizb'?'Hizb':'Page';
  return {position,href:`/coran/lecture/${type}/${context!.number}#verset-${position.chapter}-${position.verse}`,label:`${label} ${context!.number} · ${position.chapter}:${position.verse}`};
 }
 return {position,href:`/coran/${position.chapter}#verset-${position.verse}`,label:null};
}
