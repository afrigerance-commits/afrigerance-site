export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Tant que Supabase n’est pas configuré (voir .env.example), les pages
 * publiques continuent de fonctionner avec les données locales de
 * src/lib/data/*.ts. Seules l’authentification et l’administration en ont
 * besoin.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
