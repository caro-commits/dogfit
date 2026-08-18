"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function updateCourse(courseId: string, formData: FormData) {
  const supabase = await createClient();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price") ?? 0);
  const published = formData.get("published") === "on";

  await supabase
    .from("courses")
    .update({
      title,
      description,
      price_cents: Math.round(price * 100),
      published,
    })
    .eq("id", courseId);

  revalidatePath(`/admin/cours/${courseId}`);
  revalidatePath("/admin/cours");
}

export async function deleteCourse(courseId: string) {
  const supabase = await createClient();
  await supabase.from("courses").delete().eq("id", courseId);
  revalidatePath("/admin/cours");
  redirect("/admin/cours");
}

export async function createLesson(courseId: string, formData: FormData) {
  const supabase = await createClient();
  const title = String(formData.get("title") ?? "").trim();
  const videoUrl = String(formData.get("video_url") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const position = Number(formData.get("position") ?? 0);
  const pdf = formData.get("pdf") as File | null;

  let pdfUrl: string | null = null;
  if (pdf && pdf.size > 0) {
    const path = `${courseId}/${Date.now()}-${pdf.name}`;
    const { error } = await supabase.storage.from("course-files").upload(path, pdf);
    if (!error) {
      const { data } = supabase.storage.from("course-files").getPublicUrl(path);
      pdfUrl = data.publicUrl;
    }
  }

  await supabase.from("lessons").insert({
    course_id: courseId,
    title,
    position,
    video_url: videoUrl || null,
    content: content || null,
    pdf_url: pdfUrl,
  });

  revalidatePath(`/admin/cours/${courseId}`);
}

export async function deleteLesson(courseId: string, lessonId: string) {
  const supabase = await createClient();
  await supabase.from("lessons").delete().eq("id", lessonId);
  revalidatePath(`/admin/cours/${courseId}`);
}
