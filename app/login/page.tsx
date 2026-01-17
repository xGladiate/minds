"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";

const BRAND = {
  primary: "#00A0E0",
  bg: "#F8F8F8",
  text: "#0B2233",
  border: "#D7E7F0",
};

export default function LoginPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      window.location.href = "/";
    }
  };
  const signUp = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    alert("Account created. Please sign in.");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: BRAND.bg,
        display: "grid",
        placeItems: "center",
        padding: 24,
        color: BRAND.text,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          border: `1px solid ${BRAND.border}`,
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 10px 30px rgba(11, 34, 51, 0.08)",
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
          Sign in
        </h1>

        <p style={{ fontSize: 14, opacity: 0.75, marginBottom: 16 }}>
          Use your email and password to continue.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        {error && (
          <div style={{ fontSize: 13, color: "#D32F2F", marginBottom: 12 }}>
            {error}
          </div>
        )}

        <button
          onClick={signIn}
          disabled={loading}
          style={{
            ...buttonStyle,
            background: BRAND.primary,
            color: "#fff",
          }}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <button
          onClick={signUp}
          disabled={loading}
          style={{
            ...buttonStyle,
            marginTop: 10,
            background: "#fff",
            color: BRAND.primary,
            border: `1px solid ${BRAND.border}`,
          }}
        >
          Create account
        </button>
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: 12,
  borderRadius: 12,
  border: "1px solid #D7E7F0",
  fontSize: 14,
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "none",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
};
