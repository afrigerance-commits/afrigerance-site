"use client";
import { useEffect, useRef } from "react";

/** Indicateur natif : pas de ressort ni de rerender React pendant le scroll. */
export function ReadingProgress() {
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    let frame=0;
    const update=()=>{
      if(frame)return;
      frame=requestAnimationFrame(()=>{
        frame=0;
        const range=document.documentElement.scrollHeight-window.innerHeight;
        const value=range>0?Math.max(0,Math.min(1,window.scrollY/range)):0;
        if(ref.current){ref.current.style.transform=`scaleX(${value})`;ref.current.setAttribute("aria-valuenow",String(Math.round(value*100)));}
      });
    };
    const observer=typeof ResizeObserver!=="undefined"?new ResizeObserver(update):null;
    observer?.observe(document.body);
    update();window.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);
    return()=>{cancelAnimationFrame(frame);observer?.disconnect();window.removeEventListener("scroll",update);window.removeEventListener("resize",update);};
  },[]);
  return <div ref={ref} className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent" style={{transform:"scaleX(0)"}} role="progressbar" aria-label="Progression de lecture" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}/>;
}
