-- Migration 0002 : verrou d'envoi des notifications.
-- Empêche deux envois simultanés de la même notification (double clic, deux onglets).
-- Le verrou est posé au début d'un envoi et levé à la fin ; un verrou de plus de
-- 2 minutes (envoi interrompu) est considéré comme expiré.

ALTER TABLE requests ADD COLUMN notification_claimed_at timestamptz;
