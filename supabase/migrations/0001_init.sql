-- Bayt Al-'Ilm — schéma initial
-- Convention : tout accès en lecture/écriture passe par Row Level Security (RLS).
-- Aucune autorisation ne doit reposer uniquement sur le frontend.

create extension if not exists pgcrypto;

-- ============================================================================
-- ENUMS
-- ============================================================================

create type user_role as enum (
  'administrateur',
  'redacteur',
  'verificateur',
  'responsable_scientifique',
  'membre'
);

create type editorial_status as enum (
  'brouillon',
  'references_a_completer',
  'en_cours_de_verification',
  'verifie',
  'approuve',
  'publie',
  'a_reviser',
  'archive'
);

create type source_type as enum (
  'coran',
  'hadith',
  'avis_juridique',
  'recit_historique',
  'explication_pedagogique',
  'contenu_editorial'
);

create type book_rights_status as enum (
  'librement_diffusable',
  'diffusion_autorisee',
  'consultation_externe',
  'droits_non_verifies'
);

create type referenceable_content_type as enum (
  'article',
  'lesson',
  'sira_event',
  'scholar',
  'course'
);

-- ============================================================================
-- UTILITAIRES
-- ============================================================================

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================================
-- UTILISATEURS, PROFILS, RÔLES
-- ============================================================================

-- "users" est fourni par Supabase (auth.users). "profiles" l'étend.
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger profiles_set_updated_at
  before update on profiles
  for each row execute function set_updated_at();

-- Un même utilisateur peut cumuler plusieurs rôles.
create table user_roles (
  user_id uuid not null references profiles (id) on delete cascade,
  role user_role not null,
  granted_by uuid references profiles (id),
  granted_at timestamptz not null default now(),
  primary key (user_id, role)
);

-- Documentation des capacités associées à chaque rôle (utilisée par l'UI d'administration).
create table permissions (
  id uuid primary key default gen_random_uuid(),
  role user_role not null,
  capability text not null,
  description text,
  unique (role, capability)
);

-- Fonctions utilitaires pour les politiques RLS, en SECURITY DEFINER pour
-- pouvoir lire user_roles indépendamment des politiques de cette table.
create or replace function auth_has_role(check_role user_role)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from user_roles
    where user_id = auth.uid() and role = check_role
  );
$$;

create or replace function auth_is_staff()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from user_roles
    where user_id = auth.uid()
      and role in ('administrateur', 'redacteur', 'verificateur', 'responsable_scientifique')
  );
$$;

create or replace function auth_can_publish()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from user_roles
    where user_id = auth.uid()
      and role in ('administrateur', 'responsable_scientifique')
  );
$$;

-- ============================================================================
-- TAXONOMIE
-- ============================================================================

create table disciplines (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  name_arabic text,
  description text,
  position integer not null default 0
);

create table categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text
);

create table tags (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null
);

-- ============================================================================
-- SOURCES ET RÉFÉRENCES DOCUMENTAIRES
-- ============================================================================

-- Une entité bibliographique (un livre, un recueil de hadith, le Coran...).
create table sources (
  id uuid primary key default gen_random_uuid(),
  type source_type not null,
  titre text not null,
  auteur text,
  langue text,
  edition text,
  created_at timestamptz not null default now()
);

-- Une citation précise d'une source (page, verset, numéro de hadith...).
-- La numérotation d'un hadith variant selon l'édition, les champs
-- bibliographiques (édition, volume, chapitre) priment sur le numéro seul.
create table source_references (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references sources (id) on delete restrict,
  volume text,
  page text,
  chapitre text,
  numero_hadith text,
  sourate text,
  verset text,
  lien_externe text,
  grade_authenticite text,
  a_verifier boolean not null default true,
  verificateur_id uuid references profiles (id),
  date_verification date,
  created_at timestamptz not null default now()
);

-- Table de jonction polymorphe : relie un contenu (article, leçon, événement de
-- la Sîra, fiche de savant, cours) à une ou plusieurs références.
create table content_references (
  id uuid primary key default gen_random_uuid(),
  content_type referenceable_content_type not null,
  content_id uuid not null,
  source_reference_id uuid not null references source_references (id) on delete cascade,
  unique (content_type, content_id, source_reference_id)
);

create index idx_content_references_content on content_references (content_type, content_id);

-- ============================================================================
-- ARTICLES (BLOG)
-- ============================================================================

create table articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  titre text not null,
  resume text,
  contenu_html text not null default '',
  category_id uuid references categories (id),
  author_id uuid references profiles (id),
  cover_image_url text,
  temps_lecture_minutes integer,
  statut editorial_status not null default 'brouillon',
  is_demo boolean not null default false,
  scheduled_at timestamptz,
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table article_tags (
  article_id uuid not null references articles (id) on delete cascade,
  tag_id uuid not null references tags (id) on delete cascade,
  primary key (article_id, tag_id)
);

create trigger articles_set_updated_at
  before update on articles
  for each row execute function set_updated_at();

create index idx_articles_statut on articles (statut);
create index idx_articles_category on articles (category_id);

-- ============================================================================
-- SAVANTS ET GRANDES FIGURES
-- ============================================================================

create table scholars (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  nom_arabe text not null,
  transcription_francaise text not null,
  categorie text not null check (categorie in ('compagnon', 'compagnonne', 'tabiun', 'imam', 'savant')),
  presentation text,
  chronologie jsonb not null default '[]'::jsonb,
  statut editorial_status not null default 'brouillon',
  is_demo boolean not null default false,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create trigger scholars_set_updated_at
  before update on scholars
  for each row execute function set_updated_at();

-- ============================================================================
-- SÎRA (chronologie)
-- ============================================================================

create table sira_events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  periode text not null,
  titre text not null,
  date_approximative text,
  presentation text,
  contexte text,
  localisation text,
  recits jsonb not null default '[]'::jsonb,
  position integer not null default 0,
  statut editorial_status not null default 'brouillon',
  is_demo boolean not null default false,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create trigger sira_events_set_updated_at
  before update on sira_events
  for each row execute function set_updated_at();

-- ============================================================================
-- LIVRES ET DROITS
-- ============================================================================

create table books (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  titre_original text,
  titre_francais text not null,
  auteur text,
  discipline_id uuid references disciplines (id),
  langue text,
  edition text,
  presentation text,
  table_des_matieres jsonb,
  references_bibliographiques text,
  cover_image_url text,
  pdf_media_id uuid,
  lien_consultation_externe text,
  -- Statut de droits courant, dénormalisé pour un affichage public immédiat.
  -- book_rights (ci-dessous) conserve l'historique complet des vérifications.
  droits book_rights_status not null default 'droits_non_verifies',
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create trigger books_set_updated_at
  before update on books
  for each row execute function set_updated_at();

-- Historique des vérifications de droits : plusieurs vérifications peuvent se
-- succéder dans le temps pour un même livre (changement d'édition, etc.).
create table book_rights (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references books (id) on delete cascade,
  statut book_rights_status not null default 'droits_non_verifies',
  justification text,
  document_url text,
  verified_by uuid references profiles (id),
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create index idx_book_rights_book on book_rights (book_id);

-- ============================================================================
-- VIDÉOS
-- ============================================================================

create table videos (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  titre text not null,
  description text,
  category_id uuid references categories (id),
  youtube_id text,
  duree_minutes integer,
  article_id uuid references articles (id),
  is_demo boolean not null default false,
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create trigger videos_set_updated_at
  before update on videos
  for each row execute function set_updated_at();

-- ============================================================================
-- COURS, MODULES, LEÇONS
-- ============================================================================

create table courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  discipline_id uuid references disciplines (id),
  titre text not null,
  niveau text not null check (niveau in ('debutant', 'intermediaire', 'avance')),
  description text,
  referentiel_juridique text,
  statut editorial_status not null default 'brouillon',
  is_demo boolean not null default false,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create trigger courses_set_updated_at
  before update on courses
  for each row execute function set_updated_at();

create table course_modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses (id) on delete cascade,
  titre text not null,
  position integer not null default 0
);

create table lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses (id) on delete cascade,
  module_id uuid references course_modules (id) on delete set null,
  slug text not null,
  titre text not null,
  objectif_pedagogique text,
  niveau text check (niveau in ('debutant', 'intermediaire', 'avance')),
  duree_indicative text,
  introduction text,
  texte_arabe text,
  traduction_francaise text,
  explication text,
  points_a_retenir jsonb not null default '[]'::jsonb,
  note_pedagogique text,
  position integer not null default 0,
  statut editorial_status not null default 'brouillon',
  is_demo boolean not null default false,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (course_id, slug)
);

create trigger lessons_set_updated_at
  before update on lessons
  for each row execute function set_updated_at();

create index idx_lessons_course on lessons (course_id, position);

-- ============================================================================
-- PARCOURS D'APPRENTISSAGE
-- ============================================================================

create table learning_paths (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  titre text not null,
  description text,
  niveau_requis text not null default 'aucun' check (niveau_requis in ('aucun', 'debutant', 'intermediaire')),
  is_demo boolean not null default false,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create trigger learning_paths_set_updated_at
  before update on learning_paths
  for each row execute function set_updated_at();

create table learning_path_steps (
  id uuid primary key default gen_random_uuid(),
  learning_path_id uuid not null references learning_paths (id) on delete cascade,
  titre text not null,
  lesson_id uuid references lessons (id),
  href_override text,
  position integer not null default 0
);

-- ============================================================================
-- PROGRESSION ET FAVORIS (par utilisateur connecté)
-- ============================================================================

create table progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  lesson_id uuid not null references lessons (id) on delete cascade,
  completed boolean not null default false,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create trigger progress_set_updated_at
  before update on progress
  for each row execute function set_updated_at();

create table bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  content_type referenceable_content_type not null,
  content_id uuid not null,
  created_at timestamptz not null default now(),
  unique (user_id, content_type, content_id)
);

-- ============================================================================
-- MÉDIAS
-- ============================================================================

create table media (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  alt text,
  type text not null check (type in ('image', 'pdf', 'autre')),
  uploaded_by uuid references profiles (id),
  created_at timestamptz not null default now()
);

alter table books
  add constraint books_pdf_media_fk foreign key (pdf_media_id) references media (id) on delete set null;

-- ============================================================================
-- WORKFLOW ÉDITORIAL : REVUES ET VERSIONS
-- ============================================================================

create table editorial_reviews (
  id uuid primary key default gen_random_uuid(),
  content_type referenceable_content_type not null,
  content_id uuid not null,
  reviewer_id uuid not null references profiles (id),
  reviewer_role user_role not null,
  decision editorial_status not null,
  commentaire text,
  created_at timestamptz not null default now()
);

create index idx_editorial_reviews_content on editorial_reviews (content_type, content_id);

create table content_revisions (
  id uuid primary key default gen_random_uuid(),
  content_type referenceable_content_type not null,
  content_id uuid not null,
  editor_id uuid references profiles (id),
  snapshot jsonb not null,
  created_at timestamptz not null default now()
);

create index idx_content_revisions_content on content_revisions (content_type, content_id);

create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles (id),
  action text not null,
  target_type text,
  target_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index idx_audit_logs_actor on audit_logs (actor_id);
