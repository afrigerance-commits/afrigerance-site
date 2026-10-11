export function createAudioClock() {
 let state={elapsed:0,duration:0};const listeners=new Set<()=>void>();
 return {
  getSnapshot:()=>state,
  subscribe:(fn:()=>void)=>{listeners.add(fn);return()=>{listeners.delete(fn);};},
  update:(elapsed:number,duration:number)=>{const next={elapsed:Number.isFinite(elapsed)?Math.max(0,elapsed):0,duration:Number.isFinite(duration)?Math.max(0,duration):0};if(next.elapsed===state.elapsed&&next.duration===state.duration)return;state=next;listeners.forEach(fn=>fn());}
 };
}
