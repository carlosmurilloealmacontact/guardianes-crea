import { useState } from "react";

export default function OrdenarPasos({ data, onCompletar }) {
  const pasos = data.pasos || [];
  const [banco] = useState(() => [...pasos].sort(() => Math.random() - 0.5));
  const [colocados, setColocados] = useState([]);
  const [error, setError] = useState(null);

  function elegir(paso) {
    const esperado = pasos[colocados.length];
    if (paso.clave !== esperado.clave) {
      setError(paso.clave);
      setTimeout(() => setError(null), 600);
      return;
    }
    const siguientes = [...colocados, paso];
    setColocados(siguientes);
    if (siguientes.length === pasos.length) {
      onCompletar?.("Armó la apertura en el orden correcto");
    }
  }

  return (
    <div className="ordenar-pasos">
      <p className="ordenar-instruccion">
        Toca los bloques en el orden correcto para armar una apertura que genere confianza.
      </p>

      <div className="ordenar-secuencia">
        {pasos.map((p, i) => (
          <div key={p.clave} className={`ordenar-slot ${colocados[i] ? "ordenar-slot--lleno" : ""}`}>
            {colocados[i] ? colocados[i].texto : `${i + 1}`}
          </div>
        ))}
      </div>

      <div className="ordenar-banco">
        {banco
          .filter((p) => !colocados.find((c) => c.clave === p.clave))
          .map((p) => (
            <button
              key={p.clave}
              className={`ordenar-bloque ${error === p.clave ? "ordenar-bloque--error" : ""}`}
              onClick={() => elegir(p)}
            >
              {p.texto}
            </button>
          ))}
      </div>
    </div>
  );
}
