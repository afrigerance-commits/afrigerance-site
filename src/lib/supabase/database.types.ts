/**
 * Types générés à la main à partir de supabase/migrations/0001_init.sql.
 * À régénérer avec `npx supabase gen types typescript --linked` une fois le
 * projet Supabase réellement lié (voir docs/INSTALLATION.md) : ce fichier
 * sert de contrat minimal pour que l’administration compile en toute
 * sécurité de types en attendant. `Relationships: []` est requis par le
 * type générique de @supabase/postgrest-js même sans clé étrangère décrite.
 */

export type EditorialStatusDb =
  | "brouillon"
  | "references_a_completer"
  | "en_cours_de_verification"
  | "verifie"
  | "approuve"
  | "publie"
  | "a_reviser"
  | "archive";

export type UserRoleDb = "administrateur" | "redacteur" | "verificateur" | "responsable_scientifique" | "membre";

export type SourceTypeDb =
  | "coran"
  | "hadith"
  | "avis_juridique"
  | "recit_historique"
  | "explication_pedagogique"
  | "contenu_editorial";

export type BookRightsStatusDb = "librement_diffusable" | "diffusion_autorisee" | "consultation_externe" | "droits_non_verifies";

export type ReferenceableContentType = "article" | "lesson" | "sira_event" | "scholar" | "course";

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string;
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: { id: string; display_name: string; avatar_url?: string | null; bio?: string | null };
        Update: Partial<{ display_name: string; avatar_url: string | null; bio: string | null }>;
        Relationships: [];
      };
      user_roles: {
        Row: { user_id: string; role: UserRoleDb; granted_by: string | null; granted_at: string };
        Insert: { user_id: string; role: UserRoleDb; granted_by?: string | null };
        Update: Partial<{ role: UserRoleDb }>;
        Relationships: [];
      };
      disciplines: {
        Row: { id: string; slug: string; name: string; name_arabic: string | null; description: string | null; position: number };
        Insert: Partial<{ id: string }> & { slug: string; name: string; name_arabic?: string | null; description?: string | null; position?: number };
        Update: Partial<{ slug: string; name: string; name_arabic: string | null; description: string | null; position: number }>;
        Relationships: [];
      };
      categories: {
        Row: { id: string; slug: string; name: string; description: string | null };
        Insert: Partial<{ id: string }> & { slug: string; name: string; description?: string | null };
        Update: Partial<{ slug: string; name: string; description: string | null }>;
        Relationships: [];
      };
      tags: {
        Row: { id: string; slug: string; name: string };
        Insert: Partial<{ id: string }> & { slug: string; name: string };
        Update: Partial<{ slug: string; name: string }>;
        Relationships: [];
      };
      sources: {
        Row: { id: string; type: SourceTypeDb; titre: string; auteur: string | null; langue: string | null; edition: string | null; created_at: string };
        Insert: Partial<{ id: string }> & { type: SourceTypeDb; titre: string; auteur?: string | null; langue?: string | null; edition?: string | null };
        Update: Partial<{ type: SourceTypeDb; titre: string; auteur: string | null; langue: string | null; edition: string | null }>;
        Relationships: [];
      };
      source_references: {
        Row: {
          id: string;
          source_id: string;
          volume: string | null;
          page: string | null;
          chapitre: string | null;
          numero_hadith: string | null;
          sourate: string | null;
          verset: string | null;
          lien_externe: string | null;
          grade_authenticite: string | null;
          a_verifier: boolean;
          verificateur_id: string | null;
          date_verification: string | null;
          created_at: string;
        };
        Insert: Partial<{ id: string; a_verifier: boolean }> & { source_id: string } & Partial<
            Record<"volume" | "page" | "chapitre" | "numero_hadith" | "sourate" | "verset" | "lien_externe" | "grade_authenticite", string | null>
          >;
        Update: Partial<{
          volume: string | null;
          page: string | null;
          chapitre: string | null;
          numero_hadith: string | null;
          sourate: string | null;
          verset: string | null;
          lien_externe: string | null;
          grade_authenticite: string | null;
          a_verifier: boolean;
        }>;
        Relationships: [];
      };
      articles: {
        Row: {
          id: string;
          slug: string;
          titre: string;
          resume: string | null;
          contenu_html: string;
          category_id: string | null;
          author_id: string | null;
          cover_image_url: string | null;
          temps_lecture_minutes: number | null;
          statut: EditorialStatusDb;
          is_demo: boolean;
          scheduled_at: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<{ id: string; statut: EditorialStatusDb; is_demo: boolean }> & {
          slug: string;
          titre: string;
          contenu_html?: string;
          resume?: string | null;
          category_id?: string | null;
          author_id?: string | null;
          cover_image_url?: string | null;
          temps_lecture_minutes?: number | null;
          scheduled_at?: string | null;
          published_at?: string | null;
        };
        Update: Partial<{
          slug: string;
          titre: string;
          resume: string | null;
          contenu_html: string;
          category_id: string | null;
          cover_image_url: string | null;
          temps_lecture_minutes: number | null;
          statut: EditorialStatusDb;
          scheduled_at: string | null;
          published_at: string | null;
        }>;
        Relationships: [];
      };
      scholars: {
        Row: {
          id: string;
          slug: string;
          nom_arabe: string;
          transcription_francaise: string;
          categorie: string;
          presentation: string | null;
          chronologie: unknown;
          statut: EditorialStatusDb;
          is_demo: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<{ id: string; statut: EditorialStatusDb; is_demo: boolean; chronologie: unknown }> & {
          slug: string;
          nom_arabe: string;
          transcription_francaise: string;
          categorie: string;
          presentation?: string | null;
        };
        Update: Partial<{ titre: string; presentation: string | null; statut: EditorialStatusDb; chronologie: unknown }>;
        Relationships: [];
      };
      sira_events: {
        Row: {
          id: string;
          slug: string;
          periode: string;
          titre: string;
          date_approximative: string | null;
          presentation: string | null;
          contexte: string | null;
          localisation: string | null;
          recits: unknown;
          position: number;
          statut: EditorialStatusDb;
          is_demo: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<{ id: string; statut: EditorialStatusDb; is_demo: boolean; position: number; recits: unknown }> & {
          slug: string;
          periode: string;
          titre: string;
        };
        Update: Partial<{
          periode: string;
          titre: string;
          presentation: string | null;
          contexte: string | null;
          statut: EditorialStatusDb;
          position: number;
        }>;
        Relationships: [];
      };
      books: {
        Row: {
          id: string;
          slug: string;
          titre_original: string | null;
          titre_francais: string;
          auteur: string | null;
          discipline_id: string | null;
          langue: string | null;
          edition: string | null;
          presentation: string | null;
          table_des_matieres: unknown;
          references_bibliographiques: string | null;
          cover_image_url: string | null;
          pdf_media_id: string | null;
          lien_consultation_externe: string | null;
          droits: BookRightsStatusDb;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<{ id: string; droits: BookRightsStatusDb }> & { slug: string; titre_francais: string };
        Update: Partial<{ titre_francais: string; presentation: string | null; droits: BookRightsStatusDb }>;
        Relationships: [];
      };
      book_rights: {
        Row: {
          id: string;
          book_id: string;
          statut: BookRightsStatusDb;
          justification: string | null;
          document_url: string | null;
          verified_by: string | null;
          verified_at: string | null;
          created_at: string;
        };
        Insert: Partial<{ id: string; justification: string | null; document_url: string | null }> & {
          book_id: string;
          statut: BookRightsStatusDb;
        };
        Update: Partial<{ statut: BookRightsStatusDb; justification: string | null; document_url: string | null }>;
        Relationships: [];
      };
      videos: {
        Row: {
          id: string;
          slug: string;
          titre: string;
          description: string | null;
          category_id: string | null;
          youtube_id: string | null;
          duree_minutes: number | null;
          article_id: string | null;
          is_demo: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<{ id: string; is_demo: boolean; description: string | null; youtube_id: string | null; published_at: string | null }> & {
          slug: string;
          titre: string;
        };
        Update: Partial<{ titre: string; description: string | null; youtube_id: string | null; published_at: string | null }>;
        Relationships: [];
      };
      courses: {
        Row: {
          id: string;
          slug: string;
          discipline_id: string | null;
          titre: string;
          niveau: string;
          description: string | null;
          referentiel_juridique: string | null;
          statut: EditorialStatusDb;
          is_demo: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<{ id: string; statut: EditorialStatusDb; is_demo: boolean }> & { slug: string; titre: string; niveau: string };
        Update: Partial<{ titre: string; description: string | null; statut: EditorialStatusDb }>;
        Relationships: [];
      };
      lessons: {
        Row: {
          id: string;
          course_id: string;
          module_id: string | null;
          slug: string;
          titre: string;
          objectif_pedagogique: string | null;
          niveau: string | null;
          duree_indicative: string | null;
          introduction: string | null;
          texte_arabe: string | null;
          traduction_francaise: string | null;
          explication: string | null;
          points_a_retenir: unknown;
          note_pedagogique: string | null;
          position: number;
          statut: EditorialStatusDb;
          is_demo: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<{ id: string; statut: EditorialStatusDb; is_demo: boolean; position: number }> & {
          course_id: string;
          slug: string;
          titre: string;
        };
        Update: Partial<{ titre: string; explication: string | null; statut: EditorialStatusDb; position: number }>;
        Relationships: [];
      };
      learning_paths: {
        Row: {
          id: string;
          slug: string;
          titre: string;
          description: string | null;
          niveau_requis: string;
          is_demo: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<{ id: string; is_demo: boolean }> & { slug: string; titre: string };
        Update: Partial<{ titre: string; description: string | null }>;
        Relationships: [];
      };
      progress: {
        Row: { id: string; user_id: string; lesson_id: string; completed: boolean; completed_at: string | null; updated_at: string };
        Insert: { user_id: string; lesson_id: string; completed?: boolean };
        Update: Partial<{ completed: boolean; completed_at: string | null }>;
        Relationships: [];
      };
      bookmarks: {
        Row: { id: string; user_id: string; content_type: ReferenceableContentType; content_id: string; created_at: string };
        Insert: { user_id: string; content_type: ReferenceableContentType; content_id: string };
        Update: Record<string, never>;
        Relationships: [];
      };
      media: {
        Row: { id: string; url: string; alt: string | null; type: string; uploaded_by: string | null; created_at: string };
        Insert: Partial<{ id: string; alt: string | null }> & { url: string; type: string };
        Update: Partial<{ alt: string | null }>;
        Relationships: [];
      };
      editorial_reviews: {
        Row: {
          id: string;
          content_type: ReferenceableContentType;
          content_id: string;
          reviewer_id: string;
          reviewer_role: UserRoleDb;
          decision: EditorialStatusDb;
          commentaire: string | null;
          created_at: string;
        };
        Insert: {
          content_type: ReferenceableContentType;
          content_id: string;
          reviewer_id: string;
          reviewer_role: UserRoleDb;
          decision: EditorialStatusDb;
          commentaire?: string | null;
        };
        Update: Record<string, never>;
        Relationships: [];
      };
      content_revisions: {
        Row: { id: string; content_type: ReferenceableContentType; content_id: string; editor_id: string | null; snapshot: unknown; created_at: string };
        Insert: { content_type: ReferenceableContentType; content_id: string; editor_id?: string | null; snapshot: unknown };
        Update: Record<string, never>;
        Relationships: [];
      };
      audit_logs: {
        Row: { id: string; actor_id: string | null; action: string; target_type: string | null; target_id: string | null; metadata: unknown; created_at: string };
        Insert: { actor_id?: string | null; action: string; target_type?: string | null; target_id?: string | null; metadata?: unknown };
        Update: Record<string, never>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: UserRoleDb;
      editorial_status: EditorialStatusDb;
      source_type: SourceTypeDb;
      book_rights_status: BookRightsStatusDb;
      referenceable_content_type: ReferenceableContentType;
    };
  };
};
