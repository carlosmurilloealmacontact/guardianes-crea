import { useState } from "react";

export default function DibujoCiegas({ data, onCompletar }) {
  const [elegido, setElegido] = useState(null);

  function elegir(clave) {
    setElegido(clave);
    onCompletar?.(`Eligió "${clave}" ante instrucciones ambiguas`);
  }

  if (elegido) {
    const acerto = elegido === data.intencion_real;
    return (
      <div className="juego-resultado">
        <h3>{acerto ? "✓ Coincidió con la intención real" : "✗ No era lo que se quería describir"}</h3>
        <p>{data.mensaje_cierre}</p>
      </div>
    );
  }

  return (
    <div className="dibujo-ciegas">
      <p className="dibujo-instruccion">{data.instrucciones}</p>
      <p className="dibujo-pregunta">Sin poder preguntar nada más, ¿qué crees que te describieron?</p>
      <div className="dibujo-opciones">
        {data.opciones.map((o) => (
          <button key={o.clave} className="dibujo-btn" onClick={() => elegir(o.clave)}>
            <span className="dibujo-emoji">{o.emoji}</span>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
