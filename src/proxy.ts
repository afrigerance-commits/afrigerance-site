import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env";

const ADMIN_PREFIX = "/admin";
const ACCOUNT_PREFIX = "/compte";

/**
 * Rafraîchit la session Supabase à chaque requête et protège les espaces
 * /admin et /compte. Fichier `proxy.ts` : Next.js 16 a renommé le fichier
 * middleware.ts historique (voir node_modules/next/dist/docs/01-app/
 * 03-api-reference/03-file-conventions/proxy.md).
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const needsAuth =
    request.nextUrl.pathname.startsWith(ADMIN_PREFIX) || request.nextUrl.pathname.startsWith(ACCOUNT_PREFIX);

  if (!isSupabaseConfigured) {
    if (needsAuth) {
      const url = request.nextUrl.clone();
      url.pathname = "/connexion";
      url.searchParams.set("erreur", "supabase_non_configure");
      return NextResponse.redirect(url);
    }
    return response;
  }

  const supabase = createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (needsAuth && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/connexion";
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  if (request.nextUrl.pathname.startsWith(ADMIN_PREFIX) && user) {
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
    const isStaff = roles?.some((r) =>
      ["administrateur", "redacteur", "verificateur", "responsable_scientifique"].includes(r.role),
    );
    if (!isStaff) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|ico)$).*)"],
};
