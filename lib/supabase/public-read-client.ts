import { createClient } from "@supabase/supabase-js";

// Cookieless Supabase client for public, cacheable reads (e.g. the sitemap).
// The cookie-based server client (lib/supabase/server.ts) relies on the
// `cookies()` request API, which forces the calling route to be rendered
// dynamically on every request. Using this client instead keeps a route
// statically cacheable.
export function createPublicReadClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
