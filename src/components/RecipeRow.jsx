// src/components/RecipeRow.jsx
import React from "react";
import styles from "./styles/RecipeList.module.css";
import { countIngredientsRecursively } from "../utils/ingredients";

export default function RecipeRow({ plato, onView, onCopy, onGramaje, mode }) {
  const count = countIngredientsRecursively(plato.ingredientes || []);
  return (
    <li className={styles.row}>
      <div className={styles.info}>
        <div className={styles.name}>{plato.plato}</div>
        <div className={styles.meta}>{count} ingredientes</div>
      </div>

      <div className={styles.actions}>
        <button onClick={onView}>Ver ingredientes</button>
        <button onClick={onCopy}>Copiar ingredientes</button>
        {mode === "gramajes" && <button onClick={onGramaje}>Gramaje</button>}
      </div>
    </li>
  );
}