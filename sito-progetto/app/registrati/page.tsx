"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Registrati() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("uomo");
  const [birthPlace, setBirthPlace] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          age: age ? parseInt(age, 10) : null,
          sex,
          birth_place: birthPlace,
          country_of_residence: country,
        },
      },
    });

    setLoading(false);

    if (error) {
      setMessage("Errore: " + error.message);
    } else {
      setMessage(
        "Registrazione avviata! Controlla la tua email per confermare l'account prima di votare."
      );
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 py-12">
      <h1 className="text-2xl font-semibold">Registrati per votare</h1>
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
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-neutral-300 rounded px-3 py-2"
        />
        <input
          type="number"
          placeholder="Età"
          required
          min={13}
          max={120}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border border-neutral-300 rounded px-3 py-2"
        />
        <select
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          className="border border-neutral-300 rounded px-3 py-2"
        >
          <option value="uomo">Uomo</option>
          <option value="donna">Donna</option>
          <option value="altro">Altro</option>
        </select>
        <input
          type="text"
          placeholder="Luogo di nascita"
          required
          value={birthPlace}
          onChange={(e) => setBirthPlace(e.target.value)}
          className="border border-neutral-300 rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Paese di residenza"
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border border-neutral-300 rounded px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white rounded px-3 py-2 disabled:opacity-50"
        >
          {loading ? "Invio..." : "Registrati"}
        </button>
      </form>
      {message && <p className="text-sm text-neutral-600 text-center max-w-sm">{message}</p>}
    </main>
  );
}
