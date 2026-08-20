import { getCoursesByFormula } from "@/lib/data/admin";
import { AdminCourseList } from "@/components/admin-course-list";

export const metadata = { title: "Admin — Fitness" };

export default async function AdminFitnessPage() {
  const courses = await getCoursesByFormula("fitness");
  return <AdminCourseList title="Fitness" formula="fitness" courses={courses} />;
}
