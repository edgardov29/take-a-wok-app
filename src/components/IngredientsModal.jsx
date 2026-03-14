// src/components/IngredientsModal.jsx
import React from "react";
import styles from "./styles/Modal.module.css";
import { flattenIngredients } from "../utils/ingredients";

function RenderIngredientes({ ingredientes, level = 0 }) {
  if (!ingredientes || ingredientes.length === 0) return null;
  return (
    <ul style={{ marginLeft: level * 12, paddingLeft: 8 }}>
      {ingredientes.map((i, idx) => (
        <li key={`${i.nombre}-${level}-${idx}`} style={{ marginBottom: 6 }}>
          <div>
            <strong>{i.nombre}</strong>{i.cantidad ? ` — ${i.cantidad}` : ""}
          </div>
          {Array.isArray(i.ingredientes) && i.ingredientes.length > 0 && (
            <RenderIngredientes ingredientes={i.ingredientes} level={level + 1} />
          )}
        </li>
      ))}
    </ul>
  );
}

export default function IngredientsModal({ plato, onClose }) {
  const ingredientes = plato.ingredientes || [];

  function copiarPlano() {
    const flat = flattenIngredients(ingredientes);
    const text = flat.map(i => `${i.path}${i.cantidad ? ` — ${i.cantidad}` : ""}`).join("\n");
    navigator.clipboard.writeText(text).then(() => {
      // feedback mínimo
      console.log("Ingredientes copiados");
    });
  }

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <header className={styles.header}>
          <h3>{plato.plato}</h3>
          <button onClick={onClose} aria-label="Cerrar">✕</button>
        </header>

        <div className={styles.body}>
          <RenderIngredientes ingredientes={ingredientes} />
        </div>

        <footer className={styles.footer}>
          <button onClick={copiarPlano}>Copiar ingredientes</button>
          <button onClick={onClose}>Cerrar</button>
        </footer>
      </div>
    </div>
  );
}