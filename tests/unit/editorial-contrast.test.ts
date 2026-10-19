import fs from 'node:fs';
import {expect,it} from 'vitest';
const css=fs.readFileSync('src/app/editorial.css','utf8');
function luminance(hex:string){
 const rgb=hex.replace('#','').match(/../g)!.map(n=>parseInt(n,16)/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);
 return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;
}
function contrast(a:string,b:string){const [light,dark]=[luminance(a),luminance(b)].sort((a,b)=>b-a);return(light+.05)/(dark+.05);}
for(const theme of ['light','dark']){
 const body=theme==='light'?css.match(/:root \{([^}]+)\}/)![1]:css.match(/:root\.dark \{([^}]+)\}/)![1];
 const tokens=Object.fromEntries([...body.matchAll(/--([\w-]+):\s*(#[0-9A-Fa-f]{6})/g)].map(m=>[m[1],m[2]]));
 for(const [ink,paper] of [['foreground','background'],['foreground','surface'],['muted','background'],['muted','surface'],['muted','surface-muted'],['accent-text','background'],['accent-text','surface'],['primary-foreground','primary'],['accent-foreground','accent']]){
  it(`${theme}: ${ink} on ${paper} exceeds 4.5:1`,()=>expect(contrast(tokens[ink],tokens[paper])).toBeGreaterThanOrEqual(4.5));
 }
}
it('keeps the book text and small folios readable in both themes',()=>{
 for(const [ink,paper] of [['#1B342E','#FFFDF5'],['#80652F','#FFFDF5'],['#EEE8D6','#1B342C'],['#D8BE83','#1B342C']])expect(contrast(ink,paper)).toBeGreaterThanOrEqual(4.5);
});
