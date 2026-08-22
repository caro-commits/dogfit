"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { randomInt } from "node:crypto";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const PASSWORD_CHARS = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789";

function generatePassword(length = 10) {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += PASSWORD_CHARS[randomInt(PASSWORD_CHARS.length)];
  }
  return password;
}

export async function createStudent(formData: FormData) {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!fullName || !email) {
    redirect("/admin/eleves?student_error=1");
  }

  const password = generatePassword();
  const admin = createAdminClient();

  const { error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  });

  if (error) {
    redirect(`/admin/eleves?student_error=${encodeURIComponent(error.message)}`);
  }

  const cookieStore = await cookies();
  cookieStore.set("new_student_email", email, {
    httpOnly: true,
    maxAge: 60,
    path: "/admin/eleves",
  });
  cookieStore.set("new_student_password", password, {
    httpOnly: true,
    maxAge: 60,
    path: "/admin/eleves",
  });

  revalidatePath("/admin/eleves");
  redirect("/admin/eleves?student_created=1");
}

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

export async function updateSuiviDates(courseId: string, formData: FormData) {
  const supabase = await createClient();
  const startDate = String(formData.get("start_date") ?? "").trim();
  const endDate = String(formData.get("end_date") ?? "").trim();
  const paid = formData.get("paid") === "on";

  await supabase
    .from("courses")
    .update({
      start_date: startDate || null,
      end_date: endDate || null,
      paid,
    })
    .eq("id", courseId);

  revalidatePath("/admin/eleves");
  revalidatePath("/admin/calendrier");
}
