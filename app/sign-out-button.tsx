"use client";

import { createClient } from "@/lib/supabase/browser";

export default function SignOutButton() {
  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <button
      onClick={signOut}
      style={{
        padding: "10px 14px",
        borderRadius: 12,
        border: "1px solid #D7E7F0",
        background: "#fff",
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      Sign out
    </button>
  );
}
