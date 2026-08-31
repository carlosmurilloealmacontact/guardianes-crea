import { useState } from "react";

const COLORES = { verde: "🟢", amarillo: "🟡", rojo: "🔴" };

export default function SemaforoPregunta({ data, onCompletar }) {
  const preguntas = data.preguntas || [];
  const [indice, setIndice] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [terminado, setTerminado] = useState(false);

  const pregunta = preguntas[indice];
  const esUltima = indice === preguntas.length - 1;

  function responder(color) {
    const correcto = color === pregunta.correcta;
    if (correcto) setAciertos((a) => a + 1);
    setFeedback({ correcto, explicacion: pregunta.explicacion, elegido: color });
  }

  function siguiente() {
    if (esUltima) {
      setTerminado(true);
      onCompletar?.(`${aciertos}/${preguntas.length} preguntas bien clasificadas`);
    } else {
      setFeedback(null);
      setIndice((i) => i + 1);
    }
  }

  if (terminado) {
    return (
      <div className="juego-resultado">
        <h3>
          {aciertos}/{preguntas.length} preguntas bien clasificadas
        </h3>
        <p>Revisaste el semáforo completo de esta tanda de preguntas.</p>
      </div>
    );
  }

  return (
    <div className="semaforo">
      <p className="semaforo-contador">
        Pregunta {indice + 1}/{preguntas.length}
      </p>
      <p className="semaforo-texto">"{pregunta.texto}"</p>

      {!feedback ? (
        <div className="semaforo-botones">
          <button className="semaforo-btn" onClick={() => responder("verde")}>
            🟢 Verde
          </button>
          <button className="semaforo-btn" onClick={() => responder("amarillo")}>
            🟡 Amarillo
          </button>
          <button className="semaforo-btn" onClick={() => responder("rojo")}>
            🔴 Rojo
          </button>
        </div>
      ) : (
        <div className={`semaforo-feedback ${feedback.correcto ? "es-correcto" : "es-incorrecto"}`}>
          <p>
            {feedback.correcto ? "✓ Correcto" : "✗ La respuesta era"}{" "}
            {!feedback.correcto && COLORES[pregunta.correcta]}
          </p>
          <p>{feedback.explicacion}</p>
          <button onClick={siguiente}>{esUltima ? "Ver resultado" : "Siguiente"}</button>
        </div>
      )}
    </div>
  );
}
