-- Bayt Al-'Ilm — Row Level Security
-- Principe : la publication d'un contenu religieux nécessite une validation
-- humaine explicite (administrateur ou responsable scientifique). Ceci est
-- appliqué en base, pas seulement côté frontend.

-- ============================================================================
-- GARDE-FOU : passage à un statut publié/approuvé réservé aux publicateurs
-- ============================================================================

create or replace function enforce_publish_rights()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.statut in ('publie', 'approuve')
     and (tg_op = 'INSERT' or old.statut is distinct from new.statut)
     and not auth_can_publish() then
    raise exception 'Seul un administrateur ou un responsable scientifique peut approuver ou publier ce contenu.';
  end if;
  return new;
end;
$$;

create trigger articles_enforce_publish before insert or update on articles
  for each row execute function enforce_publish_rights();
create trigger scholars_enforce_publish before insert or update on scholars
  for each row execute function enforce_publish_rights();
create trigger sira_events_enforce_publish before insert or update on sira_events
  for each row execute function enforce_publish_rights();
create trigger courses_enforce_publish before insert or update on courses
  for each row execute function enforce_publish_rights();
create trigger lessons_enforce_publish before insert or update on lessons
  for each row execute function enforce_publish_rights();

-- ============================================================================
-- ACTIVATION RLS
-- ============================================================================

alter table profiles enable row level security;
alter table user_roles enable row level security;
alter table permissions enable row level security;
alter table disciplines enable row level security;
alter table categories enable row level security;
alter table tags enable row level security;
alter table sources enable row level security;
alter table source_references enable row level security;
alter table content_references enable row level security;
alter table articles enable row level security;
alter table article_tags enable row level security;
alter table scholars enable row level security;
alter table sira_events enable row level security;
alter table books enable row level security;
alter table book_rights enable row level security;
alter table videos enable row level security;
alter table courses enable row level security;
alter table course_modules enable row level security;
alter table lessons enable row level security;
alter table learning_paths enable row level security;
alter table learning_path_steps enable row level security;
alter table progress enable row level security;
alter table bookmarks enable row level security;
alter table media enable row level security;
alter table editorial_reviews enable row level security;
alter table content_revisions enable row level security;
alter table audit_logs enable row level security;

-- ============================================================================
-- PROFILS ET RÔLES
-- ============================================================================

create policy profiles_select_all on profiles for select using (true);
create policy profiles_update_own on profiles for update using (id = auth.uid());
create policy profiles_insert_own on profiles for insert with check (id = auth.uid());

create policy user_roles_select_staff on user_roles for select using (auth_is_staff() or user_id = auth.uid());
create policy user_roles_write_admin on user_roles for all
  using (auth_has_role('administrateur')) with check (auth_has_role('administrateur'));

create policy permissions_select_all on permissions for select using (true);
create policy permissions_write_admin on permissions for all
  using (auth_has_role('administrateur')) with check (auth_has_role('administrateur'));

-- ============================================================================
-- TAXONOMIE (lecture publique, écriture réservée au personnel éditorial)
-- ============================================================================

create policy disciplines_select_all on disciplines for select using (true);
create policy disciplines_write_staff on disciplines for all
  using (auth_is_staff()) with check (auth_is_staff());

create policy categories_select_all on categories for select using (true);
create policy categories_write_staff on categories for all
  using (auth_is_staff()) with check (auth_is_staff());

create policy tags_select_all on tags for select using (true);
create policy tags_write_staff on tags for all
  using (auth_is_staff()) with check (auth_is_staff());

-- ============================================================================
-- SOURCES ET RÉFÉRENCES
-- ============================================================================

create policy sources_select_all on sources for select using (true);
create policy sources_write_staff on sources for all
  using (auth_is_staff()) with check (auth_is_staff());

create policy source_references_select_all on source_references for select using (true);
create policy source_references_write_staff on source_references for all
  using (auth_is_staff()) with check (auth_is_staff());

create policy content_references_select_all on content_references for select using (true);
create policy content_references_write_staff on content_references for all
  using (auth_is_staff()) with check (auth_is_staff());

-- ============================================================================
-- CONTENUS ÉDITORIAUX : lecture publique seulement si publié, sinon personnel
-- ============================================================================

create policy articles_select_published on articles for select using (statut = 'publie');
create policy articles_select_staff on articles for select using (auth_is_staff());
create policy articles_write_staff on articles for all
  using (auth_is_staff()) with check (auth_is_staff());

create policy article_tags_select_all on article_tags for select using (true);
create policy article_tags_write_staff on article_tags for all
  using (auth_is_staff()) with check (auth_is_staff());

create policy scholars_select_published on scholars for select using (statut = 'publie');
create policy scholars_select_staff on scholars for select using (auth_is_staff());
create policy scholars_write_staff on scholars for all
  using (auth_is_staff()) with check (auth_is_staff());

create policy sira_events_select_published on sira_events for select using (statut = 'publie');
create policy sira_events_select_staff on sira_events for select using (auth_is_staff());
create policy sira_events_write_staff on sira_events for all
  using (auth_is_staff()) with check (auth_is_staff());

create policy courses_select_published on courses for select using (statut = 'publie');
create policy courses_select_staff on courses for select using (auth_is_staff());
create policy courses_write_staff on courses for all
  using (auth_is_staff()) with check (auth_is_staff());

create policy course_modules_select_all on course_modules for select using (true);
create policy course_modules_write_staff on course_modules for all
  using (auth_is_staff()) with check (auth_is_staff());

create policy lessons_select_published on lessons for select using (statut = 'publie');
create policy lessons_select_staff on lessons for select using (auth_is_staff());
create policy lessons_write_staff on lessons for all
  using (auth_is_staff()) with check (auth_is_staff());

-- ============================================================================
-- LIVRES, DROITS, VIDÉOS, MÉDIAS (lecture publique)
-- ============================================================================

create policy books_select_all on books for select using (true);
create policy books_write_staff on books for all
  using (auth_is_staff()) with check (auth_is_staff());

create policy book_rights_select_staff on book_rights for select using (auth_is_staff());
create policy book_rights_write_staff on book_rights for all
  using (auth_is_staff()) with check (auth_is_staff());

create policy videos_select_all on videos for select using (true);
create policy videos_write_staff on videos for all
  using (auth_is_staff()) with check (auth_is_staff());

create policy media_select_all on media for select using (true);
create policy media_write_staff on media for all
  using (auth_is_staff()) with check (auth_is_staff());

-- ============================================================================
-- PARCOURS D'APPRENTISSAGE
-- ============================================================================

create policy learning_paths_select_all on learning_paths for select using (true);
create policy learning_paths_write_staff on learning_paths for all
  using (auth_is_staff()) with check (auth_is_staff());

create policy learning_path_steps_select_all on learning_path_steps for select using (true);
create policy learning_path_steps_write_staff on learning_path_steps for all
  using (auth_is_staff()) with check (auth_is_staff());

-- ============================================================================
-- DONNÉES PERSONNELLES (strictement privées au propriétaire)
-- ============================================================================

create policy progress_owner_only on progress for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy bookmarks_owner_only on bookmarks for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ============================================================================
-- WORKFLOW ÉDITORIAL (réservé au personnel)
-- ============================================================================

create policy editorial_reviews_select_staff on editorial_reviews for select using (auth_is_staff());
create policy editorial_reviews_insert_staff on editorial_reviews for insert with check (auth_is_staff());

create policy content_revisions_select_staff on content_revisions for select using (auth_is_staff());
create policy content_revisions_insert_staff on content_revisions for insert with check (auth_is_staff());

create policy audit_logs_select_admin on audit_logs for select using (auth_has_role('administrateur'));
create policy audit_logs_insert_staff on audit_logs for insert with check (auth_is_staff());
