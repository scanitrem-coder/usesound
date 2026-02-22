"use client";

import { useState } from "react";

export default function CustomForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);

      // 🔥 гарантированная очистка формы
      form.reset();

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }
  }

  return (
    <div className="w-full">

      {success && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-600/20 border border-emerald-500 text-emerald-400 text-center">
          ✅ Ihre Anfrage wurde erfolgreich gesendet.<br />
          Wir melden uns innerhalb von 24–48 Stunden bei Ihnen.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          type="text"
          placeholder="Ihr Name"
          required
          className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 rounded-lg focus:outline-none focus:border-emerald-500"
        />

        <input
          name="email"
          type="email"
          placeholder="E-Mail"
          required
          className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 rounded-lg focus:outline-none focus:border-emerald-500"
        />

        <textarea
          name="message"
          placeholder="Welcher Stil? Tempo? Länge? Mit Gesang? Welche Botschaft?"
          rows={4}
          required
          className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 rounded-lg focus:outline-none focus:border-emerald-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-600 transition px-6 py-3 rounded-lg font-semibold text-black disabled:opacity-50"
        >
          {loading ? "Wird gesendet..." : "Anfrage senden"}
        </button>

      </form>
    </div>
  );
}
