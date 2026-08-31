import { useEffect, useState } from "react";

const COLORES = [
  { clave: "rojo", label: "Rojo", hex: "#e5484d" },
  { clave: "azul", label: "Azul", hex: "#3b82f6" },
  { clave: "verde", label: "Verde", hex: "#22c55e" },
  { clave: "amarillo", label: "Amarillo", hex: "#eab308" },
];

function generarRonda() {
  const palabra = COLORES[Math.floor(Math.random() * COLORES.length)];
  let tinta = COLORES[Math.floor(Math.random() * COLORES.length)];
  if (tinta.clave === palabra.clave && Math.random() > 0.2) {
    tinta = COLORES[(COLORES.indexOf(tinta) + 1) % COLORES.length];
  }
  const opciones = [...COLORES].sort(() => Math.random() - 0.5);
  return { palabra, tinta, opciones, inicio: performance.now() };
}

export default function StroopGame({ data, onCompletar }) {
  const total = data.rondas || 8;
  const [ronda, setRonda] = useState(() => generarRonda());
  const [numero, setNumero] = useState(1);
  const [aciertos, setAciertos] = useState(0);
  const [tiempos, setTiempos] = useState([]);
  const [terminado, setTerminado] = useState(false);

  function responder(clave) {
    const ms = Math.round(performance.now() - ronda.inicio);
    const correcto = clave === ronda.tinta.clave;
    if (correcto) setAciertos((a) => a + 1);
    setTiempos((t) => [...t, ms]);

    if (numero >= total) {
      setTerminado(true);
    } else {
      setNumero((n) => n + 1);
      setRonda(generarRonda());
    }
  }

  useEffect(() => {
    if (terminado) {
      const promedio = Math.round(tiempos.reduce((a, b) => a + b, 0) / tiempos.length);
      onCompletar?.(`${aciertos}/${total} aciertos · ${promedio}ms promedio`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terminado]);

  if (terminado) {
    const promedio = Math.round(tiempos.reduce((a, b) => a + b, 0) / tiempos.length);
    return (
      <div className="juego-resultado">
        <h3>
          {aciertos}/{total} aciertos
        </h3>
        <p>Tiempo de reacción promedio: {promedio}ms</p>
      </div>
    );
  }

  return (
    <div className="stroop">
      <p className="stroop-instruccion">
        Toca el <strong>color de la tinta</strong>, no lo que dice la palabra. Ronda {numero}/
        {total}
      </p>
      <div className="stroop-palabra" style={{ color: ronda.tinta.hex }}>
        {ronda.palabra.label.toUpperCase()}
      </div>
      <div className="stroop-opciones">
        {ronda.opciones.map((c) => (
          <button
            key={c.clave}
            className="stroop-swatch"
            style={{ background: c.hex }}
            onClick={() => responder(c.clave)}
            aria-label={c.label}
          />
        ))}
      </div>
    </div>
  );
}
