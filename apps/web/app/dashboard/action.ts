"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/app/lib/supabase/server";
import { taskSchema } from "@/app/lib/validations";

// Add Task
export async function addTask(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;

  const result = taskSchema.safeParse({ title });

  if (!result.success) {
    console.log(result.error.issues[0].message);
    return;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase.from("tasks").insert({
    title: result.data.title,
    is_completed: false,
    user_id: user.id,
  });

  revalidatePath("/dashboard");
}

// Toggle Complete / Undo
export async function toggleTask(id: string, completed: boolean) {
  const supabase = await createClient();

  await supabase
    .from("tasks")
    .update({
      is_completed: !completed,
    })
    .eq("id", id);

  revalidatePath("/dashboard");
}

// Delete Task
export async function deleteTask(id: string) {
  const supabase = await createClient();

  await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

  revalidatePath("/dashboard");
}

export async function updateTask(id: string, formData: FormData) {
  "use server";

  const supabase = await createClient();

  const title = formData.get("title") as string;

  await supabase
    .from("tasks")
    .update({
      title,
    })
    .eq("id", id);

  revalidatePath("/dashboard");
}