import { supabase } from "./supabaseClient";

export async function getCalendarTasks() {
  const { data, error } = await supabase.from("calendar").select("*").order("day");

  if (error) throw new Error(error.message);
  return data;
}

export async function addCalendarTask(item: string, day: number) {
  const { data, error } = await supabase.from("calendar").insert([
    {
      item,
      day,
      user_id: "demo", // replace later with actual Auth user
    },
  ]);

  if (error) throw new Error(error.message);
  return data;
}

export async function updateCalendarTaskDay(id: string, day: number) {
  const { data, error } = await supabase
    .from("calendar")
    .update({ day })
    .eq("id", id);

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteCalendarTask(id: string) {
  const { error } = await supabase.from("calendar").delete().eq("id", id);

  if (error) throw new Error(error.message);
}
