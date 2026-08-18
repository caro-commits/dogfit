"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";

export async function createBlogPost(formData: FormData) {
  const supabase = await createClient();
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const published = formData.get("published") === "on";

  await supabase.from("blog_posts").insert({
    title,
    slug: slugify(title),
    excerpt,
    content,
    published,
    published_at: new Date().toISOString(),
  });

  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}
