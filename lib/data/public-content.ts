import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import {
  placeholderCourses,
  placeholderTestimonials,
  placeholderBlogPosts,
  placeholderEvents,
} from "@/lib/placeholder-data";

// Chaque fonction retourne le contenu d'exemple tant que Supabase n'est
// pas configuré (voir lib/supabase/is-configured.ts), ou si la table est
// vide / la requête échoue — pour que le site public reste présentable
// avant la mise en place complète de la base de données.

export async function getPublishedCourses() {
  if (!isSupabaseConfigured) return placeholderCourses;
  const supabase = await createClient();
  const { data } = await supabase
    .from("courses")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: true });
  return data && data.length > 0 ? data : placeholderCourses;
}

export async function getCourseBySlug(slug: string) {
  if (!isSupabaseConfigured) {
    return placeholderCourses.find((c) => c.slug === slug) ?? null;
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("courses")
    .select("*, lessons(*)")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data ?? placeholderCourses.find((c) => c.slug === slug) ?? null;
}

export async function getPublishedTestimonials() {
  if (!isSupabaseConfigured) return placeholderTestimonials;
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  return data && data.length > 0 ? data : placeholderTestimonials;
}

function sortedByDateDesc<T extends { published_at: string }>(posts: T[]) {
  return [...posts].sort((a, b) => b.published_at.localeCompare(a.published_at));
}

export async function getPublishedBlogPosts() {
  if (!isSupabaseConfigured) return sortedByDateDesc(placeholderBlogPosts);
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  return data && data.length > 0 ? data : sortedByDateDesc(placeholderBlogPosts);
}

export async function getBlogPostBySlug(slug: string) {
  if (!isSupabaseConfigured) {
    return placeholderBlogPosts.find((p) => p.slug === slug) ?? null;
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data ?? placeholderBlogPosts.find((p) => p.slug === slug) ?? null;
}

export async function getMapPins() {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("map_pins")
    .select("*")
    .order("created_at", { ascending: true });
  return data ?? [];
}

export async function getEvents() {
  if (!isSupabaseConfigured) return placeholderEvents;
  const supabase = await createClient();
  const { data } = await supabase
    .from("events")
    .select("*")
    .order("starts_at", { ascending: true });
  return data && data.length > 0 ? data : placeholderEvents;
}
