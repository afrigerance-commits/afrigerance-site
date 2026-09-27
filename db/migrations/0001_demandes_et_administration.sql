-- Migration 0001 : demandes des visiteurs et espace administrateur.
-- Appliquée par `npm run db:migrate` (une seule fois, dans une transaction).

-- Demandes reçues depuis le site (devis, contact ; rendez-vous prévu).
CREATE TABLE requests (
  id                     uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference              text NOT NULL UNIQUE,
  type                   text NOT NULL CHECK (type IN ('devis', 'contact', 'rendez-vous')),
  status                 text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'done')),
  -- Réponses du formulaire telles que validées par le serveur.
  answers                jsonb NOT NULL,
  -- Champs recopiés pour la liste et les filtres.
  name                   text NOT NULL,
  company                text,
  email                  text,
  phone                  text,
  summary                text NOT NULL,
  -- Protection contre les doubles soumissions : une clé par formulaire rempli.
  idempotency_key        text NOT NULL UNIQUE,
  -- Empreinte salée de l'adresse IP (jamais l'adresse elle-même), pour limiter les abus.
  ip_hash                text,
  -- Suivi de l'email de notification envoyé au gestionnaire.
  notification_status    text NOT NULL DEFAULT 'pending' CHECK (notification_status IN ('pending', 'sent', 'failed')),
  notification_error     text,
  notification_attempts  integer NOT NULL DEFAULT 0,
  notified_at            timestamptz,
  received_at            timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX requests_received_at_idx ON requests (received_at DESC);
CREATE INDEX requests_type_status_idx ON requests (type, status);
CREATE INDEX requests_notification_idx ON requests (notification_status) WHERE notification_status <> 'sent';
CREATE INDEX requests_ip_recent_idx ON requests (ip_hash, received_at DESC);

-- Historique de chaque demande (création, changements de statut, notifications).
CREATE TABLE request_events (
  id           bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  request_id   uuid NOT NULL REFERENCES requests (id) ON DELETE CASCADE,
  occurred_at  timestamptz NOT NULL DEFAULT now(),
  actor        text NOT NULL,
  kind         text NOT NULL CHECK (kind IN ('created', 'status_changed', 'notification_sent', 'notification_failed')),
  detail       text
);

CREATE INDEX request_events_request_idx ON request_events (request_id, occurred_at);

-- Comptes administrateurs : créés uniquement par `npm run admin:create`.
CREATE TABLE admin_users (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email           text NOT NULL UNIQUE CHECK (email = lower(email)),
  password_hash   text NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now(),
  password_changed_at timestamptz NOT NULL DEFAULT now(),
  last_login_at   timestamptz
);

-- Sessions : seul le hachage SHA-256 du jeton est stocké, le jeton reste dans le cookie.
CREATE TABLE admin_sessions (
  id          text PRIMARY KEY,
  user_id     uuid NOT NULL REFERENCES admin_users (id) ON DELETE CASCADE,
  created_at  timestamptz NOT NULL DEFAULT now(),
  expires_at  timestamptz NOT NULL,
  user_agent  text
);

CREATE INDEX admin_sessions_user_idx ON admin_sessions (user_id);

-- Tentatives de connexion, pour bloquer les essais répétés de mots de passe.
CREATE TABLE admin_login_attempts (
  id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email         text NOT NULL,
  ip_hash       text,
  succeeded     boolean NOT NULL,
  attempted_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX admin_login_attempts_recent_idx ON admin_login_attempts (attempted_at DESC);

-- Réglages internes. Le sel des empreintes IP est tiré au hasard à la création.
CREATE TABLE app_settings (
  key    text PRIMARY KEY,
  value  text NOT NULL
);

INSERT INTO app_settings (key, value)
VALUES ('ip_hash_salt', replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', ''));
