import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Niveles() {
  const { token, logout } = useAuth();
  const [niveles, setNiveles] = useState([]);
  const [progreso, setProgreso] = useState([]);
  const [refuerzos, setRefuerzos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  function cargarDatos() {
    setCargando(true);
    setError("");
    Promise.all([api.listarNiveles(token), api.miProgreso(token), api.misRefuerzosRnd(token)])
      .then(([niv, prog, rnd]) => {
        setNiveles(niv);
        setProgreso(prog);
        setRefuerzos(rnd);
      })
      .catch(() => setError("No pudimos cargar tu ruta. Verifica tu conexión e inténtalo de nuevo."))
      .finally(() => setCargando(false));
  }

  useEffect(() => {
    cargarDatos();
  }, [token]);

  function completadasEnNivel(nivel) {
    const idsActividades = nivel.actividades.map((a) => a.id);
    return progreso.filter(
      (p) => idsActividades.includes(p.actividad_id) && p.estado === "completado"
    ).length;
  }

  if (cargando) return <p className="loading">Cargando niveles...</p>;
  if (error) {
    return (
      <div className="page">
        <p className="error">{error}</p>
        <button type="button" onClick={cargarDatos}>Reintentar</button>
      </div>
    );
  }

  const totalActividades = niveles.reduce((acc, n) => acc + n.actividades.length, 0);
  const totalCompletadas = niveles.reduce((acc, n) => acc + completadasEnNivel(n), 0);
  const mensajeMascota =
    totalCompletadas === 0
      ? "¡Vamos, elige un nivel y empecemos!"
      : totalCompletadas === totalActividades && totalActividades > 0
        ? "¡Completaste todo! Eres un Guardián de verdad."
        : "¡Vas muy bien, sigue así!";

  return (
    <div className="page">
      <header className="page-header">
        <div className="brand-companion">
          <img src="/brand/logo.png" alt="Modelo CREA" className="brand-logo" />
          <div className="mascota-companion">
            <img src="/brand/mascota.png" alt="" aria-hidden="true" />
            <span className="mascota-burbuja">{mensajeMascota}</span>
          </div>
        </div>
        <button className="link-button" onClick={logout}>
          Cerrar sesión
        </button>
      </header>

      <div className="niveles-grid">
        {niveles.map((nivel) => {
          const total = nivel.actividades.length;
          const completadas = completadasEnNivel(nivel);
          const disponible = nivel.estado === "completo" && total > 0;

          return (
            <Link
              key={nivel.id}
              to={disponible ? `/niveles/${nivel.id}` : "#"}
              className={`nivel-card ${disponible ? "" : "nivel-card--disabled"}`}
              onClick={(e) => !disponible && e.preventDefault()}
            >
              {disponible && total > 0 && completadas === total && (
                <img src="/brand/badge.png" alt="Nivel completado" className="nivel-badge-icono" />
              )}
              <span className="nivel-numero">
                {nivel.es_transversal ? "Eje transversal" : `Módulo ${nivel.codigo?.replace("M", "") || nivel.numero}`}
              </span>
              <h2>{nivel.nombre}</h2>
              {nivel.principio && <p className="nivel-principio">{nivel.principio}</p>}
              {nivel.duracion_minutos && (
                <p className="nivel-meta">
                  {nivel.duracion_minutos} min · {nivel.momento === "post_sala" ? "Post-sala" : "Pre-sala"}
                </p>
              )}

              {disponible ? (
                <div className="nivel-progreso">
                  <div className="barra">
                    <div
                      className="barra-relleno"
                      style={{ width: `${total ? (completadas / total) * 100 : 0}%` }}
                    />
                  </div>
                  <span>
                    {completadas}/{total} actividades
                  </span>
                </div>
              ) : (
                <span className="badge-gap">Próximamente</span>
              )}
            </Link>
          );
        })}
      </div>
      {refuerzos.length > 0 && (
        <section className="refuerzos-box">
          <h2>Refuerzo del Protocolo RND</h2>
          <p>Completa las rondas espaciadas para consolidar el aprendizaje.</p>
          <ul>
            {refuerzos.map((refuerzo) => (
              <li key={refuerzo.id}>
                <span>
                  Ronda {refuerzo.numero_ronda} · {refuerzo.dias_despues} días · {refuerzo.estado}
                </span>
                {refuerzo.estado !== "completado" && (
                  <button
                    type="button"
                    onClick={() =>
                      api.completarRefuerzoRnd(refuerzo.id, token).then((actualizado) =>
                        setRefuerzos((actuales) => actuales.map((item) =>
                          item.id === actualizado.id ? actualizado : item
                        ))
                      )
                    }
                  >
                    Completar ronda
                  </button>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
