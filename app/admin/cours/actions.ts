"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";

export async function createCourse(formData: FormData) {
  const supabase = await createClient();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price") ?? 0);
  const published = formData.get("published") === "on";
  const formula = String(formData.get("formula") ?? "");

  await supabase.from("courses").insert({
    title,
    slug: slugify(title),
    description,
    price_cents: Math.round(price * 100),
    published,
    formula: formula || null,
  });

  const path = formula === "fitness" ? "/admin/fitness" : "/admin/fondations";
  revalidatePath(path);
  redirect(path);
}
