-- Apply after 0001_init.sql and 0002_rls.sql.
alter table public.books enable row level security;
alter table public.book_rights enable row level security;
alter table public.books add column if not exists published boolean not null default false;
alter table public.books add column if not exists pdf_path text;
alter table public.books add column if not exists page_count integer check (page_count between 1 and 10000);
alter table public.books add column if not exists discipline_label text;
alter table public.books add column if not exists rights_justification text;
alter table public.books add constraint books_public_rights check (not published or droits = 'consultation_externe' or (droits in ('librement_diffusable','diffusion_autorisee') and coalesce(length(trim(rights_justification)),0) >= 20));
drop policy if exists books_select_all on public.books;
create policy books_select_published on public.books for select using (published or auth_is_staff());
-- Only an administrator or scientific lead can publish or certify a right.
create or replace function public.check_book_publication() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if (new.published or new.droits in ('librement_diffusable','diffusion_autorisee'))
     and not (auth_has_role('administrateur') or auth_has_role('responsable_scientifique')) then
    raise exception 'Publication and rights verification require an authorized role';
  end if;
  if new.pdf_path is not null and new.pdf_path !~ '^[0-9a-f-]{36}/[0-9a-f-]{36}\.pdf$' then raise exception 'Invalid PDF path'; end if;
  return new;
end; $$;
create trigger books_check_publication before insert or update on public.books for each row execute function public.check_book_publication();
create or replace function public.record_book_rights() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if tg_op='INSERT' or new.droits is distinct from old.droits or new.rights_justification is distinct from old.rights_justification then
    insert into public.book_rights(book_id,statut,justification,verified_by,verified_at)
    values(new.id,new.droits,new.rights_justification,auth.uid(),case when new.droits in ('librement_diffusable','diffusion_autorisee') then now() else null end);
  end if;
  return new;
end; $$;
create trigger books_record_rights after insert or update on public.books for each row execute function public.record_book_rights();
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('mirath-books','mirath-books',false,31457280,array['application/pdf']) on conflict(id) do nothing;
create policy book_files_staff_read on storage.objects for select to authenticated using(bucket_id='mirath-books' and public.auth_is_staff());
create policy book_files_staff_insert on storage.objects for insert to authenticated with check(bucket_id='mirath-books' and public.auth_is_staff() and (storage.foldername(name))[1]=auth.uid()::text);
create policy book_files_owner_delete on storage.objects for delete to authenticated using(bucket_id='mirath-books' and public.auth_is_staff() and (storage.foldername(name))[1]=auth.uid()::text);
create policy book_files_authorized_read on storage.objects for select using(bucket_id='mirath-books' and exists(select 1 from public.books b where b.pdf_path=name and b.published and b.droits in('librement_diffusable','diffusion_autorisee')));
