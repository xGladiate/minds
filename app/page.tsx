import { redirect } from "next/navigation";
import { getUserRole } from "@/lib/auth/getRole";

export default async function IndexPage() {
  const { user, role } = await getUserRole();

  if (!user) redirect("/login");
  if (role === "admin") redirect("/admin");

  redirect("/user");
}
