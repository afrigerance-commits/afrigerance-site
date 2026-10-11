-- Private first-party analytics. Requires 0001/0002; no anonymous database writes.
create table public.analytics_page_views (
 id uuid primary key,
 day date not null default (now() at time zone 'UTC')::date,
 visitor uuid not null,
 session uuid not null,
 path text not null check (length(path)<=180 and path ~ '^/([a-z0-9-]+/?)*$'),
 device text not null check (device in ('Mobile','Tablette','Ordinateur')),
 source text not null check (source in ('Interne','Moteur de recherche','Réseaux sociaux','Autre site','Direct / inconnu'))
);
create index analytics_day_idx on public.analytics_page_views(day);
create index analytics_visitor_idx on public.analytics_page_views(day,visitor);
alter table public.analytics_page_views enable row level security;
revoke all on public.analytics_page_views from public, anon, authenticated;

create or replace function public.purge_analytics() returns void
language sql security definer set search_path = '' as $$
 delete from public.analytics_page_views where day < (now() at time zone 'UTC')::date - 89;
$$;
revoke all on function public.purge_analytics() from public, anon, authenticated;
grant execute on function public.purge_analytics() to service_role;

create or replace function public.record_page_view(p_id uuid,p_path text,p_visitor uuid,p_session uuid,p_device text,p_source text)
returns void language plpgsql security definer set search_path = '' as $$
declare d date := (now() at time zone 'UTC')::date;
begin
 -- Serializes each visitor/day, caps repeated requests, and deduplicates retries.
 perform pg_advisory_xact_lock(hashtextextended(p_visitor::text || d::text,0));
 if p_path <> '/' and split_part(p_path,'/',2) not in ('coran','hadiths','hadith','fiqh','sira','prophetes','blog','videos','podcasts','bibliotheque','apprendre','invocations','prieres','horaires','a-propos','contact','confidentialite','mentions-legales') then return; end if;
 if (select count(*) from public.analytics_page_views where day=d and visitor=p_visitor)>=500 then return; end if;
 perform public.purge_analytics();
 insert into public.analytics_page_views(id,day,visitor,session,path,device,source)
 values(p_id,d,p_visitor,p_session,p_path,p_device,p_source) on conflict(id) do nothing;
end;
$$;
revoke all on function public.record_page_view(uuid,text,uuid,uuid,text,text) from public, anon, authenticated;
grant execute on function public.record_page_view(uuid,text,uuid,uuid,text,text) to service_role;

create or replace function public.analytics_report(p_days integer default 7)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare result jsonb; d date := (now() at time zone 'UTC')::date;
begin
 if not exists(select 1 from public.user_roles where user_id=auth.uid() and role='administrateur') then raise exception 'Administrator required' using errcode='42501'; end if;
 if p_days not in (1,7,30) then raise exception 'Invalid period'; end if;
 perform public.purge_analytics();
 with days as (select generate_series(d-p_days+1,d,'1 day'::interval)::date as day),
 daily as (select days.day,count(v.id) as views,count(distinct v.visitor) as visitors,count(distinct v.session) as sessions
 from days left join public.analytics_page_views v on v.day=days.day group by days.day),
 pages as (select path as label,count(*) as views from public.analytics_page_views where day>=d-p_days+1 group by path order by views desc, path limit 10),
 devices as (select device as label,count(*) as views from public.analytics_page_views where day>=d-p_days+1 group by device order by views desc),
 sources as (select source as label,count(*) as views from public.analytics_page_views where day>=d-p_days+1 group by source order by views desc)
 select jsonb_build_object('daily',coalesce((select jsonb_agg(to_jsonb(daily) order by day) from daily),'[]'::jsonb),'pages',coalesce((select jsonb_agg(to_jsonb(pages)) from pages),'[]'::jsonb),'devices',coalesce((select jsonb_agg(to_jsonb(devices)) from devices),'[]'::jsonb),'sources',coalesce((select jsonb_agg(to_jsonb(sources)) from sources),'[]'::jsonb)) into result;
 return result;
end;
$$;
revoke all on function public.analytics_report(integer) from public, anon;
grant execute on function public.analytics_report(integer) to authenticated;
-- For retention even when the site is idle, activate pg_cron in Supabase, then:
-- select cron.schedule('mirath-analytics-retention','17 2 * * *','select public.purge_analytics();');
