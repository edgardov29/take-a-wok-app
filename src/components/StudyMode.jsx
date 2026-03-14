// src/components/StudyMode.jsx
import React, { useMemo, useState } from "react";
import { flattenIngredients, countIngredientsRecursively } from "../utils/ingredients";

export default function StudyMode({ platos }) {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);

  if (!platos?.length) return <p>No hay platos para estudiar</p>;

  const plato = platos[index];

  const flat = useMemo(() => flattenIngredients(plato.ingredientes || []), [plato]);
  const totalCount = useMemo(() => countIngredientsRecursively(plato.ingredientes || []), [plato]);

  // generar opciones mezclando nombres aplanados y algunos distractores simples
  const opciones = useMemo(() => {
    const nombresUnicos = Array.from(new Set(flat.map(f => f.nombre)));
    // si hay menos de 6, rellenar con nombres de otros platos
    const extras = [];
    if (nombresUnicos.length < 6) {
      platos.forEach(p => {
        if (p !== plato) {
          (p.ingredientes || []).forEach(i => {
            if (!nombresUnicos.includes(i.nombre) && extras.length < 6) extras.push(i.nombre);
          });
        }
      });
    }
    const pool = [...nombresUnicos, ...extras].slice(0, 6);
    // mezclar
    return pool.sort(() => Math.random() - 0.5);
  }, [flat, platos, plato]);

  function verificar(nombre) {
    const pertenece = flat.some(f => f.nombre === nombre);
    setFeedback(pertenece ? "✅ Correcto" : "❌ Incorrecto");
  }

  function siguiente() {
    setFeedback(null);
    setIndex((index + 1) % platos.length);
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3>{plato.plato} — {totalCount} ingredientes</h3>

      <p style={{ marginTop: 8, marginBottom: 8 }}>Ingredientes (incluyendo anidados)</p>
      <ul style={{ maxHeight: 160, overflow: "auto", paddingLeft: 16 }}>
        {flat.map(f => (
          <li key={f.key}>{f.path}{f.cantidad ? ` — ${f.cantidad}` : ""}</li>
        ))}
      </ul>

      <div style={{ marginTop: 12 }}>
        <p>Selecciona si el ingrediente pertenece al plato</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {opciones.map(o => (
            <button key={o} onClick={() => verificar(o)}>{o}</button>
          ))}
        </div>
        {feedback && <p style={{ marginTop: 8 }}>{feedback}</p>}
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={siguiente}>Siguiente plato</button>
      </div>
    </div>
  );
}