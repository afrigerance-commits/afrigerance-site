import {normalizeSearch} from '@/lib/quran/reading-position';
import {searchTerms} from './match';
const fillers=new Set(['je','veux','voudrais','cherche','chercher','recherche','rechercher','trouve','trouver','moi','montre','montrez','donne','donnez','peux','pouvez','pourrais','pourriez','tu','vous','svp','bonjour','salut','s','il','plait','ou','lire','voir','quelle','quelles','quel','quels','est','sont','ce','qui','que','histoire','histoires','mes','ma','mon','ses','sa','son','me','d','l']);
const collectionNames:Record<string,string>={mouwatta:'muwatta',muwatta:'muwatta',mouatta:'muwatta',mowatta:'muwatta',muwattae:'muwatta',الموطا:'muwatta',موطا:'muwatta',bukhari:'boukhari',boukhari:'boukhari',boukari:'boukhari',البخاري:'boukhari',بخاري:'boukhari',muslim:'muslim',mouslim:'muslim',مسلم:'muslim'};
export type SearchIntent={keywords:string;collection:string;category:'hadith'|'invocation'|'prophet'|''};
export function interpretSearch(query:string,selected=''):SearchIntent{
 const tokens=normalizeSearch(query).replace(/[’']/g,' ').split(/[^\p{L}\p{N}]+/u).filter(Boolean);
 let collection=['muwatta','boukhari','muslim'].includes(selected)?selected:'';
 let category:SearchIntent['category']='';
 if(tokens.some(t=>t==='hadith'||t==='hadiths'))category='hadith';
 else if(tokens.some(t=>t==='invocation'||t==='invocations'||t==='doua'||t==='duaa'))category='invocation';
 else if(tokens.some(t=>t==='prophete'||t==='prophetes'))category='prophet';
 const remaining=tokens.filter(token=>{
  if(collectionNames[token]){if(!collection)collection=collectionNames[token];return false;}
  if(fillers.has(token))return false;
  if(category==='hadith'&&['hadith','hadiths'].includes(token))return false;
  if(category==='invocation'&&['invocation','invocations','doua','duaa'].includes(token))return false;
  if(category==='prophet'&&['prophete','prophetes'].includes(token))return false;
  return true;
 });
 // "rembourser mes dettes" is a topic request, not a quotation containing every filler.
 const keywords=searchTerms(remaining.filter(t=>!(/^rembours/.test(t)&&remaining.some(x=>/^dett/.test(x)))).join(' ')).join(' ');
 return {keywords,collection,category};
}
export function matchesIntent(intent:SearchIntent,result:{type:string;collection?:string}){
 if(intent.collection&&result.collection!==intent.collection)return false;
 if(intent.category==='hadith')return /hadith/i.test(result.type);
 if(intent.category==='invocation')return /^Invocation/.test(result.type);
 if(intent.category==='prophet')return result.type==='Prophète';
 return true;
}
