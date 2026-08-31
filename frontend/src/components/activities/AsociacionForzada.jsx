import { useEffect, useRef, useState } from "react";

export default function AsociacionForzada({ data, onCompletar }) {
  const palabras = data.palabras || [];
  const limiteMs = data.limite_ms || 2000;
  const [indice, setIndice] = useState(0);
  const [valor, setValor] = useState("");
  const [restanteMs, setRestanteMs] = useState(limiteMs);
  const [resultados, setResultados] = useState([]);
  const [terminado, setTerminado] = useState(false);
  const intervalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminado) return;
    setRestanteMs(limiteMs);
    inputRef.current?.focus();

    const inicio = performance.now();
    intervalRef.current = setInterval(() => {
      const transcurrido = performance.now() - inicio;
      const quedan = limiteMs - transcurrido;
      if (quedan <= 0) {
        clearInterval(intervalRef.current);
        avanzar(false);
      } else {
        setRestanteMs(quedan);
      }
    }, 50);

    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indice, terminado]);

  function avanzar(aTiempo) {
    clearInterval(intervalRef.current);
    setResultados((r) => [...r, { palabra: palabras[indice], aTiempo, respuesta: valor }]);
    setValor("");
    if (indice >= palabras.length - 1) {
      setTerminado(true);
    } else {
      setIndice((i) => i + 1);
    }
  }

  useEffect(() => {
    if (terminado) {
      const aTiempo = resultados.filter((r) => r.aTiempo).length;
      onCompletar?.(`${aTiempo}/${palabras.length} respondidas a tiempo`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terminado]);

  function onSubmit(e) {
    e.preventDefault();
    if (!valor.trim()) return;
    avanzar(true);
  }

  if (terminado) {
    const aTiempo = resultados.filter((r) => r.aTiempo).length;
    return (
      <div className="juego-resultado">
        <h3>
          {aTiempo}/{palabras.length} respondidas a tiempo
        </h3>
        <ul className="asociacion-resumen">
          {resultados.map((r, i) => (
            <li key={i}>
              {r.palabra} → {r.respuesta || "(sin respuesta)"} {r.aTiempo ? "✓" : "⏱ tarde"}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const progreso = (restanteMs / limiteMs) * 100;

  return (
    <form className="asociacion" onSubmit={onSubmit}>
      <p className="asociacion-contador">
        Palabra {indice + 1}/{palabras.length}
      </p>
      <div className="asociacion-palabra">{palabras[indice]}</div>
      <div className="asociacion-barra">
        <div className="asociacion-barra-relleno" style={{ width: `${progreso}%` }} />
      </div>
      <input
        ref={inputRef}
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="Primera palabra que se te ocurra..."
        autoComplete="off"
      />
    </form>
  );
}
