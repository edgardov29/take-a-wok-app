// src/components/SectionTabs.jsx
import React from "react";

export default function SectionTabs({ current, onChange }) {
  const sections = [
    { key: "carta", label: "Carta" },
    { key: "entradas", label: "Entradas" },
    { key: "cocina", label: "Cocina" },
    { key: "salsas", label: "Salsas" }
  ];

  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
      {sections.map(s => (
        <button
          key={s.key}
          onClick={() => onChange(s.key)}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: current === s.key ? "2px solid var(--primary, #e94e1b)" : "1px solid #ddd",
            background: current === s.key ? "rgba(233,78,27,0.08)" : "transparent",
            cursor: "pointer"
          }}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}