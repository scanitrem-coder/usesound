"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      setMessage("Fehler: " + error.message);
    } else {
      setMessage("Bitte überprüfe deine E-Mail – wir haben dir einen Login-Link gesendet.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-8 rounded-xl w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">
          Mit E-Mail anmelden
        </h1>

        <input
          type="email"
          placeholder="E-Mail eingeben"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
        />

        <button
          type="submit"
          className="w-full bg-emerald-500 text-black font-semibold py-3 rounded-lg"
        >
          Login-Link erhalten
        </button>

        {message && (
          <p className="text-sm text-center text-zinc-400">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
