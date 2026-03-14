import { useState } from "react";

export default function QuestionIngredientes({ plato }) {
  const [respuesta, setRespuesta] = useState(null);

  if (!plato) return <p>No hay plato disponible</p>;

  const ingredientes = plato.ingredientes || [];

  function validarSeleccion(nombre) {
    const correcto = ingredientes.some(i => i.nombre === nombre);
    setRespuesta(correcto ? "✅ Correcto" : "❌ Incorrecto");
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Pregunta Ingredientes</h3>
      <p>¿Este ingrediente pertenece al plato <b>{plato.plato}</b>?</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["pollo", "carne", "verduras", "arroz", "fideos"].map(opcion => (
          <button key={opcion} onClick={() => validarSeleccion(opcion)}>
            {opcion}
          </button>
        ))}
      </div>
      {respuesta && <p>{respuesta}</p>}
    </div>
  );
}