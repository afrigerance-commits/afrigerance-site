import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
export const metadata: Metadata={title:'Statistiques de fréquentation',robots:{index:false,follow:false}};
type Daily={day:string;views:number;visitors:number;sessions:number};
type Ranking={label:string;views:number};
type Report={daily:Daily[];pages:Ranking[];devices:Ranking[];sources:Ranking[]};
function RankingCard({title,rows}:{title:string;rows:Ranking[]}) {
 const max=Math.max(1,...rows.map(r=>r.views));
 return <Card className="min-w-0 p-5"><h2 className="font-display text-lg">{title}</h2>{rows.length ? <ol className="mt-5 space-y-4">{rows.map(r=><li key={r.label}><div className="flex gap-3 text-sm"><span className="min-w-0 flex-1 break-all">{r.label}</span><strong>{r.views.toLocaleString('fr-FR')}</strong></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-muted"><div className="h-full rounded-full bg-accent" style={{width:`${100*r.views/max}%`}} /></div></li>)}</ol> : <p className="mt-4 text-sm text-muted">Aucune donnée sur cette période.</p>}</Card>;
}
export default async function AnalyticsPage({searchParams}:{searchParams:Promise<{periode?:string}>}) {
 const supabase=await createClient();
 const {data:{user}}=await supabase.auth.getUser();if(!user)redirect('/connexion');
 const {data:roles}=await supabase.from('user_roles').select('role').eq('user_id',user.id);
 if(!roles?.some(r=>r.role==='administrateur'))redirect('/admin');
 const params=await searchParams;const days=['1','7','30'].includes(params.periode||'')?Number(params.periode):7;
 const {data,error}=await supabase.rpc('analytics_report',{p_days:days});
 const report=data as Report | null;
 const configured=process.env.NEXT_PUBLIC_ANALYTICS_ENABLED==='true' && Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
 const daily=report?.daily||[];const today=daily.at(-1);
 const views=daily.reduce((n,r)=>n+Number(r.views),0);const sessions=daily.reduce((n,r)=>n+Number(r.sessions),0);
 const avg=Math.round(daily.reduce((n,r)=>n+Number(r.visitors),0)/days*10)/10;
 const max=Math.max(1,...daily.map(r=>Number(r.views)));
 return <div className="space-y-7"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-accent">MIRÂTH · audience</p><h1 className="mt-2 font-display text-3xl">Statistiques de fréquentation</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-muted">Comprendre les lectures pour améliorer la transmission. Données facultatives, sans lien avec les comptes. Journées en heure de Dakar (UTC).</p></div>
 <nav aria-label="Période des statistiques" className="flex flex-wrap gap-2">{[[1,"Aujourd’hui"],[7,'7 jours'],[30,'30 jours']].map(([n,label])=><Link key={n} href={`/admin/statistiques?periode=${n}`} aria-current={days===n?'page':undefined} className={`min-h-11 rounded-xl border px-4 py-3 text-sm ${days===n?'border-primary bg-primary text-primary-foreground':'border-border'}`}>{label}</Link>)}</nav>
 {(!configured || error) && <Card className="border-accent/40 p-5"><h2 className="font-semibold">Suivi en attente d’activation</h2><p className="mt-2 text-sm leading-7">{error?'Les statistiques ne sont pas accessibles : vérifiez la migration Supabase et la connexion.':'La collecte est désactivée dans la configuration du serveur.'} Aucun chiffre fictif n’est affiché. La collecte commencera après activation et accord des visiteurs.</p></Card>}
 {!error && report && <><div className="grid grid-cols-2 gap-3 xl:grid-cols-4">{[['Visiteurs estimés aujourd’hui',today?.visitors||0],['Visiteurs / jour en moyenne',avg],['Visites sur la période',sessions],['Pages vues sur la période',views]].map(([label,value])=><Card key={label} className="p-5"><p className="text-3xl font-semibold">{Number(value).toLocaleString('fr-FR')}</p><p className="mt-2 text-xs leading-5 text-muted">{label}</p></Card>)}</div>
 <Card className="p-5"><h2 className="font-display text-lg">Pages vues chaque jour</h2>{views===0 && <p className="mt-3 text-sm text-muted">Aucune visite mesurée pour le moment.</p>}<div className="mt-5 overflow-x-auto"><table className="w-full text-left text-sm"><caption className="sr-only">Pages vues, visiteurs estimés et visites par jour</caption><thead><tr className="text-muted"><th className="py-3">Jour</th><th>Pages vues</th><th>Visiteurs</th><th>Visites</th></tr></thead><tbody>{daily.map(r=><tr key={r.day} className="border-t border-border"><th className="py-3 pr-3 font-normal whitespace-nowrap">{new Date(r.day+'T12:00:00Z').toLocaleDateString('fr-FR',{day:'2-digit',month:'short',timeZone:'UTC'})}</th><td className="min-w-24 pr-4"><div className="flex items-center gap-2"><span>{r.views}</span><span aria-hidden="true" className="h-1.5 rounded-full bg-accent" style={{width:`${60*r.views/max}px`}} /></div></td><td>{r.visitors}</td><td>{r.sessions}</td></tr>)}</tbody></table></div></Card><div className="grid gap-4 lg:grid-cols-2"><RankingCard title="Pages les plus consultées" rows={report.pages}/><RankingCard title="Appareils · pages vues" rows={report.devices}/><RankingCard title="Provenance des pages vues" rows={report.sources}/></div></>}
 <p className="text-xs leading-6 text-muted">Un visiteur est estimé par navigateur et par jour ; plusieurs appareils peuvent compter plusieurs fois. Une visite recommence après 30 minutes d’inactivité ou au changement de jour. Les visites hors connexion, refus, bloqueurs et robots connus sont exclus. La moyenne quotidienne ne représente pas les personnes uniques sur un mois. Les pays ne sont pas collectés. Les données concernent uniquement les 90 derniers jours ; aucune récupération des visites antérieures à l’installation.</p></div>;
}
