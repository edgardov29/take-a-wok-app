import React, { useState } from "react";
import RecipeRow from "./RecipeRow";
import IngredientsModal from "./IngredientsModal";
import GramajePanel from "./GramajePanel";
import styles from "./styles/RecipeList.module.css";

export default function RecipeList({ platos, mode }) {
  const [modalPlato, setModalPlato] = useState(null);
  const [gramajePlato, setGramajePlato] = useState(null);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {platos.map(p => (
          <RecipeRow
            key={p.id}
            plato={p}
            onView={() => setModalPlato(p)}
            onCopy={() => {
              const text = (p.ingredientes || []).map(i => `${i.nombre} — ${i.cantidad || ""}`).join("\n");
              navigator.clipboard.writeText(text).then(() => {
                // simple feedback: browser toast or console
                console.log("Ingredientes copiados");
              });
            }}
            onGramaje={() => setGramajePlato(p)}
            mode={mode}
          />
        ))}
      </ul>

      {modalPlato && (
        <IngredientsModal
          plato={modalPlato}
          onClose={() => setModalPlato(null)}
        />
      )}

      {gramajePlato && (
        <div style={{ marginTop: 16 }}>
          <GramajePanel plato={gramajePlato} onClose={() => setGramajePlato(null)} />
        </div>
      )}
    </div>
  );
}