import type { MetadataRoute } from "next";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { createPublicReadClient } from "@/lib/supabase/public-read-client";
import { placeholderCourses, placeholderBlogPosts } from "@/lib/placeholder-data";

const baseUrl = "https://www.dogfit-mariedemaris.fr";

// Regenerate at most once an hour so newly published courses / blog posts
// appear without a redeploy. Crucially, this route must stay cacheable:
// the previous version read Supabase through the cookie-based client, which
// made the sitemap dynamic and ran the queries on every request. On a cold
// Supabase project that took ~10 s and Search Console reported "Impossible
// de récupérer le sitemap". Here we use a cookieless client, guard the
// query with a timeout, and always fall back to the static routes.
export const revalidate = 3600;

const staticRoutes = [
  "",
  "/presentation",
  "/fitness-canin",
  "/cours",
  "/blog",
  "/temoignages",
  "/faq",
  "/contact",
];

type CourseSlug = { slug: string };
type PostSlug = { slug: string; published_at: string };

async function getDynamicEntries(): Promise<{
  courses: CourseSlug[];
  posts: PostSlug[];
}> {
  if (!isSupabaseConfigured) {
    return {
      courses: placeholderCourses.map((c) => ({ slug: c.slug })),
      posts: placeholderBlogPosts.map((p) => ({
        slug: p.slug,
        published_at: p.published_at,
      })),
    };
  }

  try {
    const supabase = createPublicReadClient();
    const query = Promise.all([
      supabase.from("courses").select("slug").eq("published", true),
      supabase
        .from("blog_posts")
        .select("slug, published_at")
        .eq("published", true),
    ]);
    // Generous: with `revalidate` this runs during background regeneration,
    // not inside the crawler's request, so a slow cold start is harmless.
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("sitemap supabase timeout")), 8000),
    );
    const [coursesRes, postsRes] = await Promise.race([query, timeout]);

    const courses = coursesRes.data?.length
      ? (coursesRes.data as CourseSlug[])
      : placeholderCourses.map((c) => ({ slug: c.slug }));
    const posts = postsRes.data?.length
      ? (postsRes.data as PostSlug[])
      : placeholderBlogPosts.map((p) => ({
          slug: p.slug,
          published_at: p.published_at,
        }));
    return { courses, posts };
  } catch {
    // Supabase unreachable / slow — ship the static routes anyway.
    return { courses: [], posts: [] };
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { courses, posts } = await getDynamicEntries();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const courseEntries: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${baseUrl}/cours/${course.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.published_at),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticEntries, ...courseEntries, ...postEntries];
}
