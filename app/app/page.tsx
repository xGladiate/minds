import { redirect } from "next/navigation";
import { getUserRole } from "@/lib/auth/getRole";

export default async function UserDashboard() {
  const { user, role } = await getUserRole();

  if (!user) redirect("/login");
  if (role !== "user") redirect("/admin");

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800 }}>User dashboard</h1>
      <p style={{ opacity: 0.7 }}>{user.email}</p>
    </main>
  );
}
