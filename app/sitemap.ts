import type { MetadataRoute } from "next";
import { getPublishedCourses, getPublishedBlogPosts } from "@/lib/data/public-content";

const baseUrl = "https://www.dogfit-mariedemaris.fr";

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, posts] = await Promise.all([
    getPublishedCourses(),
    getPublishedBlogPosts(),
  ]);

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
