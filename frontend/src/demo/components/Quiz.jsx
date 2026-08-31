import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../AuthContext";

export default function Quiz({ actividadId, onCompletado }) {
  const { token } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado] = useState(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    api.obtenerQuizPorActividad(actividadId, token).then(setQuiz);
  }, [actividadId, token]);

  async function onSubmit(e) {
    e.preventDefault();
    setEnviando(true);
    try {
      const intento = await api.enviarIntento(quiz.id, respuestas, token);
      setResultado(intento);
      onCompletado?.(`Quiz completado: ${intento.score}%`);
    } finally {
      setEnviando(false);
    }
  }

  if (!quiz) return <p className="loading">Cargando quiz...</p>;

  if (resultado) {
    return (
      <div className="quiz-resultado">
        <h3>Resultado: {resultado.score}%</h3>
        <p>
          {resultado.score >= 70
            ? "¡Bien hecho! Superaste el quiz."
            : "Revisa el contenido del nivel y vuelve a intentarlo cuando quieras."}
        </p>
      </div>
    );
  }

  return (
    <form className="quiz" onSubmit={onSubmit}>
      {quiz.preguntas.map((pregunta) => (
        <div key={pregunta.id} className="pregunta">
          <p>{pregunta.enunciado}</p>
          {Object.entries(pregunta.opciones).map(([clave, texto]) => (
            <label key={clave} className="opcion">
              <input
                type="radio"
                name={`pregunta-${pregunta.id}`}
                value={clave}
                checked={respuestas[pregunta.id] === clave}
                onChange={() =>
                  setRespuestas({ ...respuestas, [pregunta.id]: clave })
                }
                required
              />
              {texto}
            </label>
          ))}
        </div>
      ))}
      <button type="submit" disabled={enviando}>
        {enviando ? "Enviando..." : "Enviar respuestas"}
      </button>
    </form>
  );
}
