import { useEffect, useRef, useState } from "react";

const REACCIONES = [
  { emoji: "😠", label: "Molesto/a" },
  { emoji: "😟", label: "Ansioso/a" },
  { emoji: "😐", label: "Indiferente" },
  { emoji: "🙂", label: "Tranquilo/a" },
];

export default function EsperaSilenciosa({ data, onCompletar }) {
  const total = data.segundos || 15;
  const [estado, setEstado] = useState("inicio"); // inicio | esperando | reflexion | listo
  const [restante, setRestante] = useState(total);
  const intervalRef = useRef(null);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  function empezar() {
    setEstado("esperando");
    setRestante(total);
    intervalRef.current = setInterval(() => {
      setRestante((r) => {
        if (r <= 1) {
          clearInterval(intervalRef.current);
          setEstado("reflexion");
          return 0;
        }
        return r - 1;
      });
    }, 1000);
  }

  function elegirReaccion(label) {
    setEstado("listo");
    onCompletar?.(`Reportó sentirse "${label}" durante la espera simulada`);
  }

  if (estado === "inicio") {
    return (
      <div className="espera">
        <p>Vas a experimentar una espera sin ninguna explicación, como la vive un pasajero.</p>
        <button onClick={empezar}>Iniciar espera</button>
      </div>
    );
  }

  if (estado === "esperando") {
    const progreso = ((total - restante) / total) * 100;
    return (
      <div className="espera espera--activa">
        <div className="espera-anillo" style={{ "--progreso": `${progreso}%` }}>
          <span>{restante}s</span>
        </div>
        <p className="espera-silencio">…</p>
      </div>
    );
  }

  if (estado === "reflexion") {
    return (
      <div className="espera">
        <p>¿Cómo te sentiste durante esos segundos de silencio, sin ninguna explicación?</p>
        <div className="espera-reacciones">
          {REACCIONES.map((r) => (
            <button key={r.label} onClick={() => elegirReaccion(r.label)}>
              <span className="espera-emoji">{r.emoji}</span>
              {r.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="espera">
      <p className="espera-mensaje">
        Así se siente un pasajero cuando lo dejas en espera sin avisar. El silencio y las
        instrucciones incompletas erosionan la confianza — cada espera sin explicación cuesta NPS.
      </p>
    </div>
  );
}
