import Link from "next/link";
import { Container } from "@/components/container";
import { getPublishedBlogPosts } from "@/lib/data/public-content";

export const metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <Container className="py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise-dark">
        Blog
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-brand-brown sm:text-4xl">
        Conseils fitness canin
      </h1>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5 transition-shadow hover:shadow-md"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-brand-turquoise-dark">
              {new Date(post.published_at).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <h2 className="mt-2 text-lg font-bold text-brand-brown">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-brand-brown/70">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
