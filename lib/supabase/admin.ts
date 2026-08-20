import "server-only";
import { createClient } from "@supabase/supabase-js";

// Client admin — utilise la clé service_role, qui contourne les policies
// RLS. Ne JAMAIS importer ce fichier depuis un composant client ou exposer
// cette clé au navigateur. Réservé aux actions serveur qui gèrent les
// comptes élèves (ex: création de compte depuis l'admin).
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
