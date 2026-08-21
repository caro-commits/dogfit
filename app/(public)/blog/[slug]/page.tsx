import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { getBlogPostBySlug } from "@/lib/data/public-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  const description = (post.content as string)
    .replace(/##?\s*/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 155);

  return {
    title: post.title,
    description,
    openGraph: { title: post.title, description, type: "article" },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <Container className="max-w-3xl py-16">
      <p className="text-xs font-medium uppercase tracking-wide text-brand-orange">
        {new Date(post.published_at).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-brand-brown sm:text-4xl">
        {post.title}
      </h1>
      <div className="mt-8 space-y-4 text-base leading-relaxed text-brand-brown/80">
        {(post.content as string)
          .split("\n\n")
          .map((block: string) => block.trim())
          .filter(Boolean)
          .map((block: string, i: number) =>
            block.startsWith("## ") ? (
              <h2
                key={i}
                className="pt-2 text-xl font-bold text-brand-brown"
              >
                {block.slice(3)}
              </h2>
            ) : (
              <p key={i} className="whitespace-pre-line">
                {block}
              </p>
            )
          )}
      </div>
    </Container>
  );
}
