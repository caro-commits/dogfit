"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function submitCorrection(submissionId: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const comment = String(formData.get("comment") ?? "").trim();
  const file = formData.get("file") as File | null;

  const { data: submission } = await supabase
    .from("submissions")
    .select("student_id")
    .eq("id", submissionId)
    .single();

  let fileUrl: string | null = null;
  if (file && file.size > 0 && submission) {
    const path = `${submission.student_id}/${submissionId}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("corrections").upload(path, file);
    if (!error) {
      const { data } = supabase.storage.from("corrections").getPublicUrl(path);
      fileUrl = data.publicUrl;
    }
  }

  const { data: existing } = await supabase
    .from("corrections")
    .select("id")
    .eq("submission_id", submissionId)
    .maybeSingle();

  const payload = {
    submission_id: submissionId,
    comment: comment || null,
    file_url: fileUrl,
    corrected_by: user?.id ?? null,
    corrected_at: new Date().toISOString(),
  };

  if (existing) {
    await supabase.from("corrections").update(payload).eq("id", existing.id);
  } else {
    await supabase.from("corrections").insert(payload);
  }

  await supabase.from("submissions").update({ status: "corrected" }).eq("id", submissionId);

  revalidatePath(`/admin/corrections/${submissionId}`);
  revalidatePath("/admin/corrections");
  redirect("/admin/corrections");
}

export async function addAnnotation(submissionId: string, formData: FormData) {
  const supabase = await createClient();
  const timestampSeconds = Number(formData.get("timestamp_seconds") ?? 0);
  const comment = String(formData.get("comment") ?? "").trim();

  if (!comment) return;

  await supabase.from("submission_annotations").insert({
    submission_id: submissionId,
    timestamp_seconds: timestampSeconds,
    comment,
  });

  revalidatePath(`/admin/corrections/${submissionId}`);
}

export async function deleteAnnotation(submissionId: string, annotationId: string) {
  const supabase = await createClient();
  await supabase.from("submission_annotations").delete().eq("id", annotationId);
  revalidatePath(`/admin/corrections/${submissionId}`);
}
