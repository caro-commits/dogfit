"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createExercise(formData: FormData) {
  const supabase = await createClient();
  const courseId = String(formData.get("course_id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const dueDate = String(formData.get("due_date") ?? "");
  const demoVideoUrl = String(formData.get("demo_video_url") ?? "").trim();

  await supabase.from("exercises").insert({
    course_id: courseId,
    title,
    description,
    due_date: dueDate || null,
    demo_video_url: demoVideoUrl || null,
  });

  revalidatePath("/admin/exercices");
  redirect("/admin/exercices");
}

export async function updateExercise(exerciseId: string, formData: FormData) {
  const supabase = await createClient();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const dueDate = String(formData.get("due_date") ?? "");
  const demoVideoUrl = String(formData.get("demo_video_url") ?? "").trim();

  await supabase
    .from("exercises")
    .update({
      title,
      description,
      due_date: dueDate || null,
      demo_video_url: demoVideoUrl || null,
    })
    .eq("id", exerciseId);

  revalidatePath(`/admin/exercices/${exerciseId}`);
  revalidatePath("/admin/exercices");
}

export async function deleteExercise(exerciseId: string) {
  const supabase = await createClient();
  await supabase.from("exercises").delete().eq("id", exerciseId);
  revalidatePath("/admin/exercices");
  redirect("/admin/exercices");
}
