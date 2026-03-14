export default function QuestionGramaje({ plato }) {
  return (
    <div>
      <h3>Pregunta Gramaje</h3>
      <p>Plato: {plato?.plato || "Ninguno"}</p>
    </div>
  );
}