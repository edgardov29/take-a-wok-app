import React from "react";

export default function ModeTabs({ mode, onChange }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
      <button onClick={() => onChange("study")} aria-pressed={mode === "study"}>Modo Estudio</button>
      <button onClick={() => onChange("ingredientes")} aria-pressed={mode === "ingredientes"}>Ingredientes</button>
      <button onClick={() => onChange("gramajes")} aria-pressed={mode === "gramajes"}>Gramajes</button>
    </div>
  );
}