-- Private account state; null value is a deletion tombstone.
create table if not exists public.reader_state (
  user_id uuid not null references auth.users(id) on delete cascade,
  key text not null check (key ~ '^mirath:(learning:v1:[a-z0-9-]{1,100}|book:v1:[a-z0-9-]{1,100}|quran:(bookmark:[0-9]{1,3}|notes:v1|favorites:v1|last-reading)|reading-plan:v1)$'),
  value text check (octet_length(value) <= 65536),
  revision bigint not null default 1,
  updated_at timestamptz not null default now(),
  primary key(user_id, key)
);
alter table public.reader_state enable row level security;
create policy reader_state_read_own on public.reader_state for select to authenticated using (user_id = auth.uid());
-- Writes only through optimistic concurrency RPC; user id never comes from client.
create or replace function public.sync_reader_state(p_key text, p_value text, p_expected bigint)
returns jsonb language plpgsql security definer set search_path = public as $$
declare current_row public.reader_state; result_row public.reader_state;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text || ':' || p_key, 0));
  select * into current_row from public.reader_state where user_id = auth.uid() and key = p_key;
  if coalesce(current_row.revision, 0) <> p_expected then
    return jsonb_build_object('conflict', true, 'row', to_jsonb(current_row));
  end if;
  insert into public.reader_state(user_id, key, value, revision) values (auth.uid(), p_key, p_value, 1)
  on conflict (user_id,key) do update set value=excluded.value, revision=reader_state.revision+1, updated_at=now()
  returning * into result_row;
  return jsonb_build_object('conflict', false, 'row', to_jsonb(result_row));
end; $$;
revoke all on function public.sync_reader_state(text,text,bigint) from public, anon;
grant execute on function public.sync_reader_state(text,text,bigint) to authenticated;
grant select on public.reader_state to authenticated;
revoke insert, update, delete on public.reader_state from anon, authenticated;
