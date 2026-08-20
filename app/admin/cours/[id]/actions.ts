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
  const formula = String(formData.get("formula") ?? "");
  const paid = formData.get("paid") === "on";
  const startDate = String(formData.get("start_date") ?? "").trim();
  const endDate = String(formData.get("end_date") ?? "").trim();

  await supabase
    .from("courses")
    .update({
      title,
      description,
      price_cents: Math.round(price * 100),
      published,
      formula: formula || null,
      paid,
      start_date: startDate || null,
      end_date: endDate || null,
    })
    .eq("id", courseId);

  revalidatePath(`/admin/cours/${courseId}`);
  revalidatePath("/admin/fondations");
  revalidatePath("/admin/fitness");
}

export async function deleteCourse(courseId: string) {
  const supabase = await createClient();
  const { data: course } = await supabase
    .from("courses")
    .select("formula")
    .eq("id", courseId)
    .single();

  await supabase.from("courses").delete().eq("id", courseId);

  const path = course?.formula === "fitness" ? "/admin/fitness" : "/admin/fondations";
  revalidatePath(path);
  redirect(path);
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
