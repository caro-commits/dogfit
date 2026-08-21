"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addMapPin(formData: FormData) {
  const label = String(formData.get("label") ?? "").trim();
  const latitude = Number(formData.get("latitude"));
  const longitude = Number(formData.get("longitude"));

  if (!label || Number.isNaN(latitude) || Number.isNaN(longitude)) return;

  const supabase = await createClient();
  await supabase.from("map_pins").insert({ label, latitude, longitude });

  revalidatePath("/admin/carte");
  revalidatePath("/cours");
}

export async function deleteMapPin(id: string) {
  const supabase = await createClient();
  await supabase.from("map_pins").delete().eq("id", id);

  revalidatePath("/admin/carte");
  revalidatePath("/cours");
}
