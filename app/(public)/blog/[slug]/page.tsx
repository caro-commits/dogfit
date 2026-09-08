import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { getBlogPostBySlug } from "@/lib/data/public-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
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
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: new Date(post.published_at).toISOString(),
      authors: ["Marie Démaris"],
      images: ["/og/dogfit.jpg"],
    },
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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: new Date(post.published_at).toISOString(),
    author: { "@type": "Person", name: "Marie Démaris" },
    publisher: {
      "@type": "Organization",
      name: "DOGFIT",
      logo: {
        "@type": "ImageObject",
        url: "https://www.dogfit-mariedemaris.fr/brand/logo.png",
      },
    },
    mainEntityOfPage: `https://www.dogfit-mariedemaris.fr/blog/${slug}`,
  };

  return (
    <Container className="max-w-3xl py-16">
      <JsonLd data={articleJsonLd} />
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
