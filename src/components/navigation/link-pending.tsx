'use client';
import { useLinkStatus } from 'next/link';
export function LinkPending() {
 const {pending}=useLinkStatus();
 return <span aria-hidden="true" className={`pointer-events-none absolute inset-0 rounded-[inherit] border-2 border-accent ${pending?'opacity-100 motion-safe:animate-pulse':'opacity-0'}`} />;
}
