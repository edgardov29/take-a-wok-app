import React from "react";
import styles from "./styles/HeaderBar.module.css";

export default function HeaderBar({ meta, mode, onModeChange }) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        {meta.logo && <img src={meta.logo} alt={meta.name} className={styles.logo} />}
        <div>
          <div className={styles.title}>{meta.name || "Restaurante"}</div>
          <div className={styles.subtitle}>Carta</div>
        </div>
      </div>

      <nav className={styles.modes}>
        <button
          className={mode === "study" ? styles.active : ""}
          onClick={() => onModeChange("study")}
        >
          Modo Estudio
        </button>
        <button
          className={mode === "ingredientes" ? styles.active : ""}
          onClick={() => onModeChange("ingredientes")}
        >
          Ingredientes
        </button>
        <button
          className={mode === "gramajes" ? styles.active : ""}
          onClick={() => onModeChange("gramajes")}
        >
          Gramajes
        </button>
      </nav>
    </header>
  );
}