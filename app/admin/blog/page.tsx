import Link from "next/link";
import { getAllBlogPosts } from "@/lib/data/admin";
import { Button } from "@/components/button";
import { createBlogPost } from "./actions";

export const metadata = { title: "Admin — Blog" };

export default async function AdminBlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-brown">Blog</h1>

      <div className="mt-8 divide-y divide-brand-brown/10 rounded-2xl bg-white shadow-sm ring-1 ring-brand-brown/5">
        {posts.length === 0 && (
          <p className="px-6 py-6 text-sm text-brand-brown/60">Aucun article pour l&apos;instant.</p>
        )}
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/admin/blog/${post.id}`}
            className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-brand-turquoise-light/40"
          >
            <p className="font-semibold text-brand-brown">{post.title}</p>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                post.published
                  ? "bg-brand-turquoise-light text-brand-turquoise-dark"
                  : "bg-brand-cream-dark text-brand-brown/60"
              }`}
            >
              {post.published ? "Publié" : "Brouillon"}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 max-w-xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5">
        <h2 className="text-base font-bold text-brand-brown">Nouvel article</h2>
        <form action={createBlogPost} className="mt-4 space-y-4">
          <div>
            <label htmlFor="title" className="text-sm font-semibold text-brand-brown">
              Titre
            </label>
            <input
              id="title"
              name="title"
              required
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="excerpt" className="text-sm font-semibold text-brand-brown">
              Résumé
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              rows={2}
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="content" className="text-sm font-semibold text-brand-brown">
              Contenu
            </label>
            <textarea
              id="content"
              name="content"
              rows={6}
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-brand-brown">
            <input type="checkbox" name="published" className="rounded" />
            Publier immédiatement
          </label>
          <Button type="submit">Créer l&apos;article</Button>
        </form>
      </div>
    </div>
  );
}
