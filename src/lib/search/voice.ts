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
  case 'not-allowed':return 'L’accès au micro est bloqué. Dans les réglages de ce site et de votre appareil, autorisez le microphone pour votre navigateur, puis réessayez.';
  case 'service-not-allowed':return 'Le service vocal est bloqué par ce navigateur. Autoriser le micro seul peut ne pas suffire : consultez l’aide pour la dictée ci-dessous.';
  case 'audio-capture':return 'Aucun micro accessible. Vérifiez votre appareil ou utilisez la saisie.';
  case 'no-speech':return 'Aucune parole reconnue. Réessayez en parlant près du micro.';
  case 'network':return 'Le service de dictée est injoignable. Vérifiez la connexion ou utilisez la saisie.';
  case 'language-not-supported':return 'Cette langue de dictée n’est pas disponible sur cet appareil.';
  case 'native-unavailable':return 'Aucun service vocal Android disponible. Activez ou mettez à jour le service de reconnaissance vocale de votre téléphone dans ses paramètres, puis réessayez.';
  case 'busy':return 'Une dictée Android est déjà ouverte. Terminez-la ou fermez-la avec le bouton Retour du téléphone.';
  case 'native-error':return 'Le service vocal Android n’a pas abouti. Vérifiez son accès au micro dans les paramètres du téléphone, puis réessayez.';
  default:return 'La dictée n’a pas abouti. Vous pouvez réessayer ou saisir votre recherche.';
 }
}
