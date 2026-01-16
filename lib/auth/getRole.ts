import { createClient } from "@/lib/supabase/server";

export async function getUserRole() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  const user = userData.user;
  if (!user) return { user: null as null, role: null as null };

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  // If profile missing (first login edge case), treat as user.
  if (error || !profile) return { user, role: "user" as const };

  const role = profile.role === "admin" ? "admin" : "user";
  return { user, role };
}
