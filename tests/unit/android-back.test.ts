import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {expect,it} from 'vitest';
const {JSDOM}=createRequire(import.meta.url)('jsdom');
const script=readFileSync('android/app/src/main/assets/mirath-back-navigation.js','utf8');
function page(){const dom=new JSDOM('<main></main>',{url:'https://miraath.netlify.app/',runScripts:'outside-only'});const window=dom.window as Window & typeof globalThis;window.eval(script);return {window};}
const back=(w:Window)=> (w as unknown as {__mirathAndroidBack:{handle():string}}).__mirathAndroidBack.handle();
it('preserves framework history metadata across push and replace',()=>{
 const dom=page(),w=dom.window;const tree={segment:'coran'};
 w.history.pushState({__NA:true,tree},'', '/coran');
 expect(w.history.state).toMatchObject({__NA:true,tree,__mirathAndroidBackIndex:1});
 w.history.replaceState({__NA:true,tree,other:'kept'},'', '/coran?mode=arabic');
 expect(w.history.state).toMatchObject({__NA:true,tree,other:'kept',__mirathAndroidBackIndex:1});dom.window.close();
});
it('returns through actual browser history without reloading and stops at root',async()=>{
 const dom=page(),w=dom.window;w.eval('window.fixture="kept"');
 w.history.pushState({__NA:true},'','/coran');w.history.pushState({__NA:true},'','/coran/1');
 const pop=()=>new Promise<void>(resolve=>w.addEventListener('popstate',()=>resolve(),{once:true}));
 let done=pop();expect(back(w as unknown as Window)).toBe('navigated');await done;
 expect(w.location.pathname).toBe('/coran');expect(w.eval('fixture')).toBe('kept');
 done=pop();expect(back(w as unknown as Window)).toBe('navigated');await done;
 expect(w.location.pathname).toBe('/');expect(back(w as unknown as Window)).toBe('root');dom.window.close();
});
it('dismisses an open layer before changing the route',async()=>{
 const dom=page(),w=dom.window;w.history.pushState({__NA:true},'','/hadith');
 const layer=w.document.createElement('div');layer.setAttribute('role','dialog');layer.dataset.state='open';layer.getClientRects=()=>[{}] as unknown as DOMRectList;w.document.body.append(layer);
 w.document.addEventListener('keydown',e=>{if(e.key==='Escape')layer.remove();});
 expect(back(w as unknown as Window)).toBe('dismissed');expect(w.location.pathname).toBe('/hadith');
 expect(w.document.querySelector('[role=dialog]')).toBeNull();dom.window.close();
});
it('coexists with a framework history wrapper and installs only once',()=>{
 const dom=page(),w=dom.window;const original=w.history.pushState.bind(w.history);
 w.history.pushState=(state,title,url)=>original({...state,__NA:true},title,url);
 w.eval(script);w.history.pushState({tree:'kept'},'','/invocations');
 expect(w.history.state).toMatchObject({tree:'kept',__NA:true,__mirathAndroidBackIndex:1});dom.window.close();
});
