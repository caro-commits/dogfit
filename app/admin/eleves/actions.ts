"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function grantAccess(formData: FormData) {
  const supabase = await createClient();
  const studentId = String(formData.get("student_id") ?? "");
  const courseId = String(formData.get("course_id") ?? "");

  await supabase.from("enrollments").insert({
    user_id: studentId,
    course_id: courseId,
    source: "manual",
  });

  revalidatePath("/admin/eleves");
}

export async function revokeAccess(enrollmentId: string) {
  const supabase = await createClient();
  await supabase.from("enrollments").delete().eq("id", enrollmentId);
  revalidatePath("/admin/eleves");
}
