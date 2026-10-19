export interface SpeechResult { isFinal:boolean; [index:number]:{transcript:string} }
export interface Recognition {
 lang:string; continuous:boolean; interimResults:boolean; maxAlternatives:number;
 onstart:(()=>void)|null; onend:(()=>void)|null;
 onresult:((event:{results:ArrayLike<SpeechResult>})=>void)|null;
 onerror:((event:{error:string})=>void)|null;
 start:()=>void; stop:()=>void; abort:()=>void;
}
export type RecognitionConstructor=new()=>Recognition;
export function recognitionConstructor():RecognitionConstructor|undefined {
 if(typeof window==='undefined')return;
 const browser=window as unknown as {SpeechRecognition?:RecognitionConstructor;webkitSpeechRecognition?:RecognitionConstructor};
 return browser.SpeechRecognition??browser.webkitSpeechRecognition;
}
export function voiceError(code:string){
 switch(code){
  case 'not-allowed':case 'service-not-allowed':return 'Le micro ou le service de dictée est bloqué. Vérifiez les autorisations du navigateur, ou utilisez la saisie.';
  case 'audio-capture':return 'Aucun micro accessible. Vérifiez votre appareil ou utilisez la saisie.';
  case 'no-speech':return 'Aucune parole reconnue. Réessayez en parlant près du micro.';
  case 'network':return 'Le service de dictée est injoignable. Vérifiez la connexion ou utilisez la saisie.';
  case 'language-not-supported':return 'Cette langue de dictée n’est pas disponible sur cet appareil.';
  default:return 'La dictée n’a pas abouti. Vous pouvez réessayer ou saisir votre recherche.';
 }
}
