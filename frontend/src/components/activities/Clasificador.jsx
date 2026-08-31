import { useState } from "react";

export default function Clasificador({ data, onCompletar }) {
  const opciones = data.opciones || [];
  const items = data.items || [];
  const [indice, setIndice] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const item = items[indice];
  const esUltimo = indice === items.length - 1;

  function responder(clave) {
    const correcto = clave === item.correcta;
    if (correcto) setAciertos((a) => a + 1);
    setFeedback({ correcto, elegido: clave });
  }

  function siguiente() {
    setFeedback(null);
    if (esUltimo) {
      onCompletar?.(`${aciertos}/${items.length} clasificadas correctamente`);
    } else {
      setIndice((i) => i + 1);
    }
  }

  const opcionCorrecta = opciones.find((o) => o.clave === item.correcta);

  return (
    <div className="clasificador">
      <p className="semaforo-contador">
        {indice + 1}/{items.length}
      </p>
      <p className="clasificador-texto">"{item.texto}"</p>

      {!feedback ? (
        <div className="clasificador-opciones">
          {opciones.map((o) => (
            <button key={o.clave} className="clasificador-btn" onClick={() => responder(o.clave)}>
              <span className="clasificador-emoji">{o.emoji}</span>
              {o.label}
            </button>
          ))}
        </div>
      ) : (
        <div className={`semaforo-feedback ${feedback.correcto ? "es-correcto" : "es-incorrecto"}`}>
          <p>
            {feedback.correcto
              ? "✓ Correcto"
              : `✗ Era "${opcionCorrecta?.label}" ${opcionCorrecta?.emoji}`}
          </p>
          {item.explicacion && <p>{item.explicacion}</p>}
          <button onClick={siguiente}>{esUltimo ? "Ver resultado" : "Siguiente"}</button>
        </div>
      )}
    </div>
  );
}
