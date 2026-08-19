import { createClient } from "@/lib/supabase/server";

export async function getAllCourses() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getCourseWithLessons(courseId: string) {
  const supabase = await createClient();
  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("id", courseId)
    .single();

  if (!course) return null;

  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", courseId)
    .order("position", { ascending: true });

  return { ...course, lessons: lessons ?? [] };
}

export async function getAllExercises() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("exercises")
    .select("*, course:courses(id, title)")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getExerciseWithCourse(exerciseId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("exercises")
    .select("*, course:courses(id, title)")
    .eq("id", exerciseId)
    .single();
  return data ?? null;
}

export async function getSubmissionsToCorrect() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("submissions")
    .select(
      "*, exercise:exercises(id, title, course:courses(title)), student:profiles(id, full_name)",
    )
    .neq("status", "corrected")
    .order("submitted_at", { ascending: true });
  return data ?? [];
}

export async function getSubmissionDetail(submissionId: string) {
  const supabase = await createClient();
  const { data: submission } = await supabase
    .from("submissions")
    .select(
      "*, exercise:exercises(id, title, description, course:courses(id, title)), student:profiles(id, full_name)",
    )
    .eq("id", submissionId)
    .single();

  if (!submission) return null;

  const { data: correction } = await supabase
    .from("corrections")
    .select("*")
    .eq("submission_id", submissionId)
    .maybeSingle();

  return { submission, correction };
}

type EnrollmentCourse = { id: string; title: string };

export async function getStudents() {
  const supabase = await createClient();
  const { data: students } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "student")
    .order("created_at", { ascending: false });

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("id, user_id, course:courses(id, title)");

  const normalizedEnrollments = (enrollments ?? []).map((enrollment) => {
    const course = enrollment.course as unknown as EnrollmentCourse | EnrollmentCourse[] | null;
    return {
      id: enrollment.id as string,
      user_id: enrollment.user_id as string,
      course: Array.isArray(course) ? (course[0] ?? null) : course,
    };
  });

  return (students ?? []).map((student) => ({
    ...student,
    enrollments: normalizedEnrollments.filter((e) => e.user_id === student.id),
  }));
}

export async function getAllBlogPosts() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });
  return data ?? [];
}

export async function getBlogPostById(id: string) {
  const supabase = await createClient();
  const { data } = await supabase.from("blog_posts").select("*").eq("id", id).single();
  return data ?? null;
}

export async function getAllEvents() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("events")
    .select("*")
    .order("starts_at", { ascending: false });
  return data ?? [];
}

export async function getEventById(id: string) {
  const supabase = await createClient();
  const { data } = await supabase.from("events").select("*").eq("id", id).single();
  return data ?? null;
}

export async function getVideos() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("videos")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getDashboardStats() {
  const supabase = await createClient();
  const [{ count: coursesCount }, { count: studentsCount }, { count: pendingCount }, { count: messagesCount }] =
    await Promise.all([
      supabase.from("courses").select("*", { count: "exact", head: true }),
      supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "student"),
      supabase.from("submissions").select("*", { count: "exact", head: true }).neq("status", "corrected"),
      supabase.from("contact_messages").select("*", { count: "exact", head: true }),
    ]);

  return {
    courses: coursesCount ?? 0,
    students: studentsCount ?? 0,
    pending: pendingCount ?? 0,
    messages: messagesCount ?? 0,
  };
}
