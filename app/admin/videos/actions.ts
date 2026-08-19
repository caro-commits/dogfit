"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function deleteVideo(videoId: string, path: string) {
  const supabase = await createClient();
  await supabase.storage.from("course-files").remove([path]);
  await supabase.from("videos").delete().eq("id", videoId);
  revalidatePath("/admin/videos");
}
