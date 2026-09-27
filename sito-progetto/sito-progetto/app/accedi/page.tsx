"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Accedi() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage("Errore: " + error.message);
    } else {
      setMessage("Accesso effettuato correttamente ✅");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 py-12">
      <h1 className="text-2xl font-semibold">Accedi</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-neutral-300 rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-neutral-300 rounded px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white rounded px-3 py-2 disabled:opacity-50"
        >
          {loading ? "Accesso..." : "Accedi"}
        </button>
      </form>
      {message && <p className="text-sm text-neutral-600 text-center max-w-sm">{message}</p>}
    </main>
  );
}
