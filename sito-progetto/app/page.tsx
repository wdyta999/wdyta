"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [status, setStatus] = useState("Verifica connessione in corso...");

  useEffect(() => {
    async function checkConnection() {
      const { error } = await supabase.auth.getSession();
      if (error) {
        setStatus("Connessione a Supabase non riuscita: " + error.message);
      } else {
        setStatus("Connesso a Supabase correttamente ✅");
      }
    }
    checkConnection();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-semibold">Sito Voti Attualità</h1>
      <p className="text-neutral-500">Fase 1: struttura base e connessione al database</p>
      <p className="text-sm text-neutral-400">{status}</p>
    </main>
  );
}
