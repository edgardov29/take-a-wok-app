import React, { useEffect, useState } from "react";
import { loadData } from "./utils/loadData";
import HeaderBar from "./components/HeaderBar";
import SectionTabs from "./components/SectionTabs";
import RecipeList from "./components/RecipeList";

export default function App() {
  const [data, setData] = useState({
    carta: [],
    entradas: [],
    cocina: [],
    salsas: [],
    meta: {}
  });
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("study");
  const [currentSection, setCurrentSection] = useState("carta");

  useEffect(() => {
    loadData("take-a-wok")
      .then(d => {
        setData(d);
        setLoading(false);
        if (d.meta?.primaryColor) {
          document.documentElement.style.setProperty("--primary", d.meta.primaryColor);
        }
      })
      .catch(err => {
        console.error("Error cargando datos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Cargando datos...</div>;

  // seleccionar array según sección
  const sectionMap = {
    carta: data.carta || [],
    entradas: data.entradas || [],
    cocina: data.cocina || [],
    salsas: data.salsas || []
  };
  const platos = sectionMap[currentSection] || [];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 980, margin: "24px auto", padding: "0 16px" }}>
      <HeaderBar meta={data.meta} mode={mode} onModeChange={setMode} />

      {/* Tabs de sección arriba */}
      <SectionTabs current={currentSection} onChange={setCurrentSection} />

      {/* Muestra la sección seleccionada */}
      <h2 style={{ marginTop: 6, marginBottom: 12, color: "var(--primary, #333)" }}>
        {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
      </h2>

      <RecipeList platos={platos} mode={mode === "study" ? "study" : mode === "ingredientes" ? "ingredientes" : "gramajes"} />
    </div>
  );
}