"use client";
import { useState } from "react";

export default function AdminPage() {
  const [message, setMessage] = useState<string | null>(null);

  async function addFirebaseProvider() {
    const res = await fetch("/api/addProvider", { method: "POST" });
    const data = await res.json();

    if (data.error) {
      setMessage(
        `Erro: ${data.details || "Não foi possível adicionar o provedor."}`
      );
    } else {
      setMessage("Provedor Firebase adicionado com sucesso!");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Painel Administrativo</h1>
      <button
        onClick={addFirebaseProvider}
        style={{ padding: "10px", fontSize: "16px" }}
      >
        Adicionar Firebase ao Supabase
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
