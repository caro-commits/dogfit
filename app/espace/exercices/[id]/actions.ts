"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function submitExercise(exerciseId: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/connexion");

  const content = String(formData.get("content") ?? "").trim();
  const file = formData.get("file") as File | null;

  let fileUrl: string | null = null;
  if (file && file.size > 0) {
    const path = `${user.id}/${exerciseId}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("submissions")
      .upload(path, file);

    if (!uploadError) {
      const { data } = supabase.storage.from("submissions").getPublicUrl(path);
      fileUrl = data.publicUrl;
    }
  }

  await supabase.from("submissions").insert({
    exercise_id: exerciseId,
    student_id: user.id,
    content: content || null,
    file_url: fileUrl,
    status: "submitted",
  });

  revalidatePath(`/espace/exercices/${exerciseId}`);
  revalidatePath("/espace/exercices");
  redirect(`/espace/exercices/${exerciseId}`);
}
