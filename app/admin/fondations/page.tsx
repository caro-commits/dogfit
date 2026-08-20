import { getCoursesByFormula } from "@/lib/data/admin";
import { AdminCourseList } from "@/components/admin-course-list";

export const metadata = { title: "Admin — Fondations" };

export default async function AdminFondationsPage() {
  const courses = await getCoursesByFormula("fondations");
  return <AdminCourseList title="Fondations" formula="fondations" courses={courses} />;
}
