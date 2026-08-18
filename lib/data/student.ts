import { createClient } from "@/lib/supabase/server";

type EnrolledCourse = {
  id: string;
  slug: string;
  title: string;
  description: string;
};

export async function getEnrolledCourses() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("enrollments")
    .select("granted_at, course:courses(id, slug, title, description)")
    .order("granted_at", { ascending: false });

  return (data ?? []).map((enrollment) => {
    const course = enrollment.course as unknown as EnrolledCourse | EnrolledCourse[] | null;
    return {
      granted_at: enrollment.granted_at,
      course: Array.isArray(course) ? (course[0] ?? null) : course,
    };
  });
}

export async function getCourseForStudent(courseId: string) {
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

export async function getExercisesForStudent() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("exercises")
    .select("*, course:courses(id, title), submissions(id, status, submitted_at)")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getExerciseForStudent(exerciseId: string) {
  const supabase = await createClient();
  const { data: exercise } = await supabase
    .from("exercises")
    .select("*, course:courses(id, title)")
    .eq("id", exerciseId)
    .single();

  if (!exercise) return null;

  const { data: submissions } = await supabase
    .from("submissions")
    .select("*")
    .eq("exercise_id", exerciseId)
    .order("submitted_at", { ascending: false });

  const submissionsWithCorrections = await Promise.all(
    (submissions ?? []).map(async (submission) => {
      const { data: correction } = await supabase
        .from("corrections")
        .select("*")
        .eq("submission_id", submission.id)
        .maybeSingle();
      return { ...submission, correction };
    }),
  );

  return { exercise, submissions: submissionsWithCorrections };
}

export async function getCorrectionsForStudent() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("corrections")
    .select(
      "*, submission:submissions(id, submitted_at, exercise:exercises(id, title, course:courses(title)))",
    )
    .order("corrected_at", { ascending: false });
  return data ?? [];
}
