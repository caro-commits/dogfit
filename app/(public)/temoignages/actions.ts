"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";

export async function submitTestimonial(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const ratingRaw = String(formData.get("rating") ?? "").trim();
  const rating = ratingRaw ? Number(ratingRaw) : null;

  if (!name || !content) {
    redirect("/temoignages?status=error");
  }

  if (!isSupabaseConfigured) {
    redirect("/temoignages?status=unavailable");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").insert({
    name,
    title: title || null,
    content,
    rating,
    published: false,
  });

  redirect(error ? "/temoignages?status=error" : "/temoignages?status=success");
}
