import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostById } from "@/lib/data/admin";
import { Button } from "@/components/button";
import { updateBlogPost, deleteBlogPost } from "./actions";

export default async function AdminBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) notFound();

  const updateAction = updateBlogPost.bind(null, id);
  const deleteAction = deleteBlogPost.bind(null, id);

  return (
    <div>
      <Link href="/admin/blog" className="text-sm font-medium text-brand-turquoise-dark hover:underline">
        ← Blog
      </Link>
      <h1 className="mt-3 text-2xl font-extrabold text-brand-brown">{post.title}</h1>

      <div className="mt-8 max-w-2xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5">
        <form action={updateAction} className="space-y-4">
          <div>
            <label htmlFor="title" className="text-sm font-semibold text-brand-brown">
              Titre
            </label>
            <input
              id="title"
              name="title"
              defaultValue={post.title}
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
              defaultValue={post.excerpt}
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
              rows={8}
              defaultValue={post.content}
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-brand-brown">
            <input type="checkbox" name="published" defaultChecked={post.published} className="rounded" />
            Publié
          </label>
          <Button type="submit">Enregistrer</Button>
        </form>
        <form action={deleteAction} className="mt-4 border-t border-brand-brown/10 pt-4">
          <button className="text-sm font-medium text-red-600 hover:underline">
            Supprimer cet article
          </button>
        </form>
      </div>
    </div>
  );
}
