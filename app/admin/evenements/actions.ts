"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createEvent(formData: FormData) {
  const supabase = await createClient();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const startsAt = String(formData.get("starts_at") ?? "");
  const isPast = formData.get("is_past") === "on";

  await supabase.from("events").insert({
    title,
    description,
    location,
    starts_at: startsAt,
    is_past: isPast,
  });

  revalidatePath("/admin/evenements");
  redirect("/admin/evenements");
}
