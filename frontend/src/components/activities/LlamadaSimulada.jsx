import { useState } from "react";

const ETIQUETAS = {
  analitico: "Analítico",
  practico: "Práctico",
  expresivo: "Expresivo",
  diplomatico: "Diplomático",
};

export default function LlamadaSimulada({ data, onCompletar }) {
  const [reveladas, setReveladas] = useState([]);
  const [resultado, setResultado] = useState(null);

  function preguntar(indice) {
    if (reveladas.includes(indice)) return;
    setReveladas((r) => [...r, indice]);
  }

  function adivinar(tipo) {
    const correcto = tipo === data.tipo_correcto;
    setResultado({ tipo, correcto });
    onCompletar?.(
      correcto
        ? `Identificó al pasajero correctamente (${ETIQUETAS[tipo]})`
        : `Respondió ${ETIQUETAS[tipo]}, el pasajero era ${ETIQUETAS[data.tipo_correcto]}`
    );
  }

  return (
    <div className="llamada-simulada">
      <div className="llamada-burbuja">{data.introduccion}</div>

      <p className="llamada-instruccion">
        Elige preguntas para conocer más al pasajero, luego identifica su tipo:
      </p>

      <div className="llamada-preguntas">
        {data.preguntas.map((p, i) => (
          <div key={i}>
            <button
              className="llamada-pregunta-btn"
              disabled={reveladas.includes(i)}
              onClick={() => preguntar(i)}
            >
              {p.texto}
            </button>
            {reveladas.includes(i) && <div className="llamada-burbuja llamada-burbuja--sm">{p.respuesta}</div>}
          </div>
        ))}
      </div>

      {!resultado ? (
        <div className="llamada-guess">
          <p>¿Qué tipo de pasajero es?</p>
          <div className="llamada-opciones">
            {data.opciones_tipo.map((tipo) => (
              <button key={tipo} onClick={() => adivinar(tipo)} disabled={reveladas.length === 0}>
                {ETIQUETAS[tipo]}
              </button>
            ))}
          </div>
          {reveladas.length === 0 && (
            <p className="hint">Revela al menos una respuesta antes de adivinar.</p>
          )}
        </div>
      ) : (
        <div className={`juego-resultado ${resultado.correcto ? "es-correcto" : "es-incorrecto"}`}>
          <h3>{resultado.correcto ? "✓ Correcto" : "✗ No era ese"}</h3>
          <p>El pasajero era del tipo: {ETIQUETAS[data.tipo_correcto]}</p>
        </div>
      )}
    </div>
  );
}
