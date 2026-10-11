export default function Loading() {
 return <div role="status" aria-live="polite" aria-busy="true" className="mx-auto max-w-4xl px-5 py-12"><p className="text-sm font-medium text-primary">Ouverture de la page…</p><div aria-hidden="true" className="mt-6 space-y-5 motion-safe:animate-pulse"><div className="h-10 w-2/3 rounded-xl bg-accent/15"/><div className="h-40 rounded-2xl bg-surface-muted"/><div className="h-24 rounded-2xl bg-surface-muted"/></div></div>;
}
