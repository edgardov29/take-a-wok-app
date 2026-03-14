import React, { useState } from "react";

export default function GramajePanel({ plato, onClose }) {
  const ingredientes = plato.ingredientes || [];
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState(null);

  function generarAleatorio() {
    const idx = Math.floor(Math.random() * ingredientes.length);
    setSelected(ingredientes[idx]?.nombre || "");
    setFeedback(null);
  }

  function validar(valor) {
    const ing = ingredientes.find(i => i.nombre === selected);
    if (!ing) {
      setFeedback("Selecciona un ingrediente");
      return;
    }
    if (String(ing.cantidad) === String(valor).trim()) {
      setFeedback("✅ Correcto");
    } else {
      setFeedback(`❌ Incorrecto. Era ${ing.cantidad || "N/A"}`);
    }
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 6 }}>
      <h4>Pregunta de gramaje — {plato.plato}</h4>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
        <select value={selected} onChange={e => { setSelected(e.target.value); setFeedback(null); }}>
          <option value="">-- seleccionar --</option>
          {ingredientes.map(i => <option key={i.nombre} value={i.nombre}>{i.nombre}</option>)}
        </select>

        <button onClick={generarAleatorio}>Generar aleatorio</button>
        <button onClick={onClose}>Siguiente plato</button>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
        <input placeholder="Ingresa cantidad" id="gramaje-input" />
        <button onClick={() => {
          const val = document.getElementById("gramaje-input").value;
          validar(val);
        }}>Validar</button>
      </div>

      {feedback && <p style={{ marginTop: 8 }}>{feedback}</p>}
    </div>
  );
}