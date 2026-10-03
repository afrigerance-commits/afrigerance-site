-- Données de démonstration minimales pour une instance Supabase fraîchement
-- migrée. La version publique du site actuelle fonctionne avec des données
-- TypeScript locales (src/lib/data/*.ts) et n'exige pas Supabase pour
-- s'afficher : ce seed sert à amorcer le back-office une fois Supabase
-- branché. Il ne reproduit pas l'intégralité des données de démonstration
-- TypeScript (cours, leçons, événements de la Sîra, etc.) : voir
-- docs/INSTALLATION.md pour le script de migration à écrire lors du
-- branchement réel de l'administration.

insert into disciplines (slug, name, name_arabic, description, position) values
  ('coran-tafsir', 'Coran et Tafsîr', 'القرآن والتفسير', 'Le texte coranique et son exégèse.', 1),
  ('hadith', 'Hadith', 'الحديث', 'Les paroles, actes et approbations du Prophète ﷺ.', 2),
  ('fiqh-malikite', 'Fiqh malikite', 'الفقه المالكي', 'La jurisprudence selon l''école de l''imam Mâlik.', 3),
  ('sira', 'Sîra prophétique', 'السيرة النبوية', 'La biographie du Prophète Muhammad ﷺ.', 4),
  ('histoire-islamique', 'Histoire islamique', 'التاريخ الإسلامي', 'Les grandes périodes de l''histoire musulmane.', 5),
  ('compagnons', 'Vie des compagnons', 'سير الصحابة', 'Les biographies des compagnons et compagnonnes.', 6),
  ('aqida', '''Aqîda', 'العقيدة', 'Les fondements de la croyance islamique.', 7),
  ('spiritualite', 'Spiritualité et purification de l''âme', 'التزكية', 'Le tazkiya.', 8),
  ('akhlaq-adab', 'Akhlâq et Adab', 'الأخلاق والآداب', 'L''éthique du comportement.', 9),
  ('langue-arabe', 'Langue arabe', 'اللغة العربية', 'Les bases de la langue arabe.', 10),
  ('invocations-adhkar', 'Invocations et adhkâr', 'الأدعية والأذكار', 'Les invocations authentiques.', 11),
  ('grandes-figures', 'Grandes figures de l''histoire islamique', 'أعلام الإسلام', 'Imams, savants et figures marquantes.', 12)
on conflict (slug) do nothing;

insert into categories (slug, name) values
  ('reflexions', 'Réflexions'),
  ('histoire-islamique', 'Histoire islamique'),
  ('rappels', 'Rappels'),
  ('spiritualite', 'Spiritualité'),
  ('fiqh', 'Fiqh'),
  ('sira', 'Sîra'),
  ('lecture-et-livres', 'Lecture et livres'),
  ('questions-frequentes', 'Questions fréquentes'),
  ('actualites-de-la-plateforme', 'Actualités de la plateforme')
on conflict (slug) do nothing;

insert into permissions (role, capability, description) values
  ('administrateur', 'gestion_complete', 'Gestion complète de la plateforme.'),
  ('redacteur', 'creation_contenus', 'Création et modification de ses propres contenus.'),
  ('verificateur', 'controle_documentaire', 'Vérification des sources et références avant publication.'),
  ('responsable_scientifique', 'validation_religieuse', 'Validation religieuse finale des contenus.'),
  ('membre', 'espace_personnel', 'Gestion de son espace personnel (favoris, progression).')
on conflict (role, capability) do nothing;

-- Pour attribuer le rôle "administrateur" au premier compte fondateur, après
-- son inscription via Supabase Auth (remplacer l'UUID ci-dessous) :
-- insert into profiles (id, display_name) values ('<uuid-utilisateur>', 'Le fondateur');
-- insert into user_roles (user_id, role) values ('<uuid-utilisateur>', 'administrateur');
