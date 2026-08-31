import { useEffect, useRef, useState } from "react";

export default function LecturaInterrupciones({ data, onCompletar }) {
  const palabras = (data.texto || "").split(" ");
  const duracionPalabraMs = data.duracion_palabra_ms || 260;
  const vidaNumeroMs = data.vida_numero_ms || 1800;

  const [indice, setIndice] = useState(0);
  const [numero, setNumero] = useState(null);
  const [valorInput, setValorInput] = useState("");
  const [capturados, setCapturados] = useState(0);
  const [totalNumeros, setTotalNumeros] = useState(0);
  const [terminado, setTerminado] = useState(false);

  const numeroActualRef = useRef(null);
  const terminadoRef = useRef(false);
  const numeroTimeoutRef = useRef(null);
  const spawnTimeoutRef = useRef(null);

  useEffect(() => {
    if (terminado || indice >= palabras.length) return;
    const t = setTimeout(() => setIndice((i) => i + 1), duracionPalabraMs);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indice, terminado]);

  useEffect(() => {
    if (indice >= palabras.length && !terminado) {
      terminadoRef.current = true;
      clearTimeout(numeroTimeoutRef.current);
      clearTimeout(spawnTimeoutRef.current);
      setTerminado(true);
    }
  }, [indice, palabras.length, terminado]);

  useEffect(() => {
    function programarSiguiente() {
      const espera = 1600 + Math.random() * 1400;
      spawnTimeoutRef.current = setTimeout(() => {
        if (terminadoRef.current) return;
        const valor = Math.floor(Math.random() * 90) + 10;
        numeroActualRef.current = valor;
        setNumero(valor);
        setTotalNumeros((t) => t + 1);
        numeroTimeoutRef.current = setTimeout(() => {
          if (terminadoRef.current) return;
          numeroActualRef.current = null;
          setNumero(null);
          programarSiguiente();
        }, vidaNumeroMs);
      }, espera);
    }
    programarSiguiente();
    return () => {
      clearTimeout(spawnTimeoutRef.current);
      clearTimeout(numeroTimeoutRef.current);
    };
  }, [vidaNumeroMs]);

  useEffect(() => {
    if (terminado) {
      onCompletar?.(`${capturados}/${totalNumeros} números anotados sin dejar de leer`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terminado]);

  function onSubmit(e) {
    e.preventDefault();
    if (numeroActualRef.current !== null && Number(valorInput) === numeroActualRef.current) {
      setCapturados((c) => c + 1);
      clearTimeout(numeroTimeoutRef.current);
      numeroActualRef.current = null;
      setNumero(null);
    }
    setValorInput("");
  }

  if (terminado) {
    return (
      <div className="juego-resultado">
        <h3>
          {capturados}/{totalNumeros} números anotados
        </h3>
        <p>Así se siente leer una política mientras digitas datos del pasajero sin detenerte.</p>
      </div>
    );
  }

  return (
    <div className="lectura-interrupciones">
      <p className="lectura-instruccion">
        Sigue leyendo el texto en voz alta (mentalmente) y anota cada número que aparezca sin
        dejar de leer.
      </p>
      <p className="lectura-texto">
        {palabras.slice(0, indice).join(" ")}
        <span className="lectura-cursor">▌</span>
      </p>

      {numero !== null && <div className="lectura-numero-flotante">{numero}</div>}

      <form onSubmit={onSubmit} className="lectura-form">
        <input
          value={valorInput}
          onChange={(e) => setValorInput(e.target.value)}
          placeholder="Número que viste..."
          inputMode="numeric"
        />
        <button type="submit">Anotar</button>
      </form>
      <p className="hint">Capturados: {capturados}</p>
    </div>
  );
}
