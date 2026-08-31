import { useState } from "react";

const CAMPOS = [
  { clave: "piensa_siente", label: "¿Qué piensa y siente?" },
  { clave: "ve", label: "¿Qué ve?" },
  { clave: "oye", label: "¿Qué oye?" },
  { clave: "dice_hace", label: "¿Qué dice y hace?" },
  { clave: "esfuerzos", label: "Esfuerzos (miedos, frustraciones)" },
  { clave: "resultados", label: "Resultados (metas, deseos)" },
];

export default function MapaEmpatia({ data, onCompletar }) {
  const [respuestas, setRespuestas] = useState({});
  const [comparando, setComparando] = useState(false);

  const completo = CAMPOS.every((c) => (respuestas[c.clave] || "").trim().length > 0);

  function comparar() {
    setComparando(true);
  }

  function finalizar() {
    onCompletar?.("Completó el mapa de empatía y lo comparó con el de referencia");
  }

  return (
    <div className="mapa-empatia">
      <p className="mapa-perfil">{data.perfil}</p>

      <div className="mapa-grid">
        {CAMPOS.map((campo) => (
          <div key={campo.clave} className="mapa-celda">
            <label>{campo.label}</label>
            <textarea
              rows={2}
              value={respuestas[campo.clave] || ""}
              onChange={(e) => setRespuestas({ ...respuestas, [campo.clave]: e.target.value })}
              disabled={comparando}
              placeholder="Escribe tu respuesta..."
            />
            {comparando && (
              <p className="mapa-referencia">
                <strong>Referencia:</strong> {data.referencia[campo.clave]}
              </p>
            )}
          </div>
        ))}
      </div>

      {!comparando ? (
        <button onClick={comparar} disabled={!completo}>
          Comparar con el mapa de referencia
        </button>
      ) : (
        <button onClick={finalizar}>Finalizar actividad</button>
      )}
    </div>
  );
}
