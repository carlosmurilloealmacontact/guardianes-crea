import { useEffect, useState } from "react";

export default function MemoriaCadena({ data, onCompletar }) {
  const items = data.items || [];
  const [longitud, setLongitud] = useState(1);
  const [fase, setFase] = useState("mostrando"); // mostrando | recordando | error
  const [indiceMostrado, setIndiceMostrado] = useState(0);
  const [banco, setBanco] = useState([]);
  const [elegidos, setElegidos] = useState([]);

  const secuencia = items.slice(0, longitud);

  useEffect(() => {
    if (fase !== "mostrando") return;
    if (indiceMostrado >= secuencia.length) {
      setBanco([...secuencia].sort(() => Math.random() - 0.5));
      setElegidos([]);
      setFase("recordando");
      return;
    }
    const timer = setTimeout(() => setIndiceMostrado((i) => i + 1), 900);
    return () => clearTimeout(timer);
  }, [fase, indiceMostrado, secuencia.length]);

  useEffect(() => {
    if (fase === "error") {
      onCompletar?.(`Llegó hasta ${longitud - 1} objeto(s) en la cadena de memoria`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fase]);

  function elegir(item) {
    const siguientes = [...elegidos, item];
    const posicion = siguientes.length - 1;

    if (secuencia[posicion] !== item) {
      setFase("error");
      return;
    }

    setElegidos(siguientes);
    if (siguientes.length === secuencia.length) {
      if (longitud >= items.length) {
        onCompletar?.(`¡Completó toda la cadena de ${items.length} objetos!`);
        setFase("error"); // reutiliza pantalla final
        return;
      }
      setTimeout(() => {
        setLongitud((l) => l + 1);
        setIndiceMostrado(0);
        setFase("mostrando");
      }, 700);
    }
  }

  if (fase === "error") {
    return (
      <div className="juego-resultado">
        <h3>Ronda {longitud} de memoria</h3>
        <p>"Me voy de viaje y me llevo..." — llegaste a recordar {longitud - 1} objeto(s) en orden.</p>
      </div>
    );
  }

  if (fase === "mostrando") {
    return (
      <div className="memoria">
        <p>Memoriza el orden — ronda {longitud}</p>
        <div className="memoria-flash">
          {indiceMostrado < secuencia.length ? secuencia[indiceMostrado] : "..."}
        </div>
      </div>
    );
  }

  return (
    <div className="memoria">
      <p>
        Repite el orden ({elegidos.length}/{secuencia.length})
      </p>
      <div className="memoria-banco">
        {banco.map((item) => (
          <button key={item} onClick={() => elegir(item)} disabled={elegidos.includes(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
