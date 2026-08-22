"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function setMessageStatus(
  id: string,
  status: "unread" | "read" | "replied",
) {
  const supabase = await createClient();
  await supabase.from("contact_messages").update({ status }).eq("id", id);
  revalidatePath("/admin/messages");
}
