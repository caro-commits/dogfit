"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function updateBlogPost(postId: string, formData: FormData) {
  const supabase = await createClient();
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const published = formData.get("published") === "on";

  await supabase
    .from("blog_posts")
    .update({ title, excerpt, content, published })
    .eq("id", postId);

  revalidatePath(`/admin/blog/${postId}`);
  revalidatePath("/admin/blog");
}

export async function deleteBlogPost(postId: string) {
  const supabase = await createClient();
  await supabase.from("blog_posts").delete().eq("id", postId);
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}
