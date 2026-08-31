import { useEffect, useRef, useState } from "react";

export default function RespuestaCronometrada({ data, onCompletar }) {
  const total = data.segundos || 30;
  const [restante, setRestante] = useState(total);
  const [respuesta, setRespuesta] = useState("");
  const [enviado, setEnviado] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRestante((r) => {
        if (r <= 1) {
          clearInterval(intervalRef.current);
          finalizar();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finalizar() {
    setEnviado(true);
  }

  function onSubmit(e) {
    e.preventDefault();
    clearInterval(intervalRef.current);
    finalizar();
  }

  useEffect(() => {
    if (!enviado) return;
    const texto = respuesta.toLowerCase();
    const tieneSolucion = (data.palabras_clave_solucion || []).some((p) => texto.includes(p));
    const tieneSeguridad = (data.palabras_clave_seguridad || []).some((p) => texto.includes(p));
    onCompletar?.(
      `${tieneSolucion ? "✓" : "✗"} solución concreta · ${tieneSeguridad ? "✓" : "✗"} frase de seguridad`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enviado]);

  if (enviado) {
    const texto = respuesta.toLowerCase();
    const tieneSolucion = (data.palabras_clave_solucion || []).some((p) => texto.includes(p));
    const tieneSeguridad = (data.palabras_clave_seguridad || []).some((p) => texto.includes(p));
    return (
      <div className="juego-resultado">
        <h3>Tu respuesta:</h3>
        <p className="respuesta-texto">{respuesta || "(no alcanzaste a responder)"}</p>
        <ul className="respuesta-checklist">
          <li>{tieneSolucion ? "✓" : "✗"} Incluyó una solución concreta</li>
          <li>{tieneSeguridad ? "✓" : "✗"} Incluyó una frase que transmite seguridad</li>
        </ul>
      </div>
    );
  }

  return (
    <form className="respuesta-cronometrada" onSubmit={onSubmit}>
      <p className="cronometro-caso">{data.caso}</p>
      <div className={`cronometro ${restante <= 10 ? "cronometro--urgente" : ""}`}>{restante}s</div>
      <textarea
        rows={3}
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
        placeholder="Escribe tu respuesta al pasajero..."
        autoFocus
      />
      <button type="submit">Enviar respuesta</button>
    </form>
  );
}
