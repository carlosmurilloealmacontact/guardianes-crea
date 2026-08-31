import { useEffect, useRef, useState } from "react";

export default function BuscarDato({ data, onCompletar }) {
  const campos = data.campos || [];
  const preguntas = data.preguntas || [];
  const [indice, setIndice] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const inicioRef = useRef(performance.now());
  const [banco] = useState(() => [...campos].sort(() => Math.random() - 0.5));

  const pregunta = preguntas[indice];
  const esUltima = indice === preguntas.length - 1;

  useEffect(() => {
    inicioRef.current = performance.now();
  }, [indice]);

  function elegir(campo) {
    if (campo.clave === pregunta.clave) {
      setAciertos((a) => a + 1);
    }
    if (esUltima) {
      const segundos = Math.round((performance.now() - inicioRef.current) / 100) / 10;
      onCompletar?.(
        `${aciertos + (campo.clave === pregunta.clave ? 1 : 0)}/${preguntas.length} datos encontrados`
      );
    } else {
      setIndice((i) => i + 1);
    }
  }

  return (
    <div className="buscar-dato">
      <p className="semaforo-contador">
        {indice + 1}/{preguntas.length}
      </p>
      <p className="buscar-pregunta">{pregunta.texto}</p>

      <div className="buscar-registro">
        {banco.map((c) => (
          <button key={c.clave} className="buscar-fila" onClick={() => elegir(c)}>
            <span className="buscar-label">{c.label}</span>
            <span className="buscar-valor">{c.valor}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
