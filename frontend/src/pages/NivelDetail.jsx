import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import Quiz from "../components/Quiz";
import { ACTIVIDADES_INTERACTIVAS } from "../components/activities";

const ETIQUETA_TIPO = {
  rompehielos: "Activación",
  recorderis: "Recordatorio",
  video: "Video",
  interactiva: "Ejercicio interactivo",
  quiz: "Quiz",
  cierre: "Cierre",
};

function youtubeEmbed(url) {
  const match = url?.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function NivelDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const [nivel, setNivel] = useState(null);
  const [progreso, setProgreso] = useState([]);
  const [actividadActivaId, setActividadActivaId] = useState(null);
  const [intentoKey, setIntentoKey] = useState(0);
  const [celebracion, setCelebracion] = useState(null);

  const cargarProgreso = useCallback(() => {
    api.miProgreso(token).then(setProgreso);
  }, [token]);

  useEffect(() => {
    api.obtenerNivel(id, token).then((data) => {
      setNivel(data);
      setActividadActivaId(data.actividades[0]?.id ?? null);
    });
    cargarProgreso();
  }, [id, token, cargarProgreso]);

  useEffect(() => {
    setIntentoKey(0);
    setCelebracion(null);
  }, [actividadActivaId]);

  useEffect(() => {
    if (!celebracion) return;
    const t = setTimeout(() => setCelebracion(null), 4000);
    return () => clearTimeout(t);
  }, [celebracion]);

  async function marcarCompletada(actividadId, mensaje) {
    await api.actualizarProgreso(actividadId, "completado", token);
    cargarProgreso();
    setCelebracion(mensaje || "¡Actividad completada!");
  }

  function estadoDe(actividadId) {
    return progreso.find((p) => p.actividad_id === actividadId)?.estado ?? "pendiente";
  }

  if (!nivel) return <p className="loading">Cargando nivel...</p>;

  const actividadActiva = nivel.actividades.find((a) => a.id === actividadActivaId);

  return (
    <div className="page nivel-detail">
      <Link to="/niveles" className="link-button">
        ← Volver a niveles
      </Link>
      <h1>
        {nivel.es_transversal ? "Eje transversal" : `Módulo ${nivel.codigo?.replace("M", "") || nivel.numero}`} — {nivel.nombre}
      </h1>
      {nivel.duracion_minutos && (
        <p className="nivel-meta">
          {nivel.duracion_minutos} minutos · {nivel.momento === "post_sala" ? "Refuerzo post-sala" : "Preparación pre-sala"}
          {nivel.requiere_certificacion_presencial ? " · Requiere certificación presencial" : ""}
        </p>
      )}
      {nivel.objetivo && <p className="nivel-objetivo">{nivel.objetivo}</p>}
      {nivel.conexion_sala && <p className="nivel-conexion"><strong>Conexión con sala:</strong> {nivel.conexion_sala}</p>}

      <div className="nivel-layout">
        <ol className="actividades-lista">
          {nivel.actividades.map((actividad) => (
            <li key={actividad.id}>
              <button
                className={`actividad-item ${
                  actividad.id === actividadActivaId ? "actividad-item--activa" : ""
                } ${estadoDe(actividad.id) === "completado" ? "actividad-item--completa" : ""}`}
                onClick={() => setActividadActivaId(actividad.id)}
              >
                <span className="actividad-tipo">{ETIQUETA_TIPO[actividad.tipo]}</span>
                <span>{actividad.titulo}</span>
                {estadoDe(actividad.id) === "completado" && <span>✓</span>}
              </button>
            </li>
          ))}
        </ol>

        {actividadActiva && (
          <div className="actividad-detalle">
            <span className="actividad-tipo">{ETIQUETA_TIPO[actividadActiva.tipo]}</span>
            <h2>{actividadActiva.titulo}</h2>

            {actividadActiva.tipo === "video" && actividadActiva.contenido.video_url && (
              <>
                {youtubeEmbed(actividadActiva.contenido.video_url) ? (
                  <iframe
                    className="video-embed"
                    src={youtubeEmbed(actividadActiva.contenido.video_url)}
                    title={actividadActiva.titulo}
                    allowFullScreen
                  />
                ) : (
                  <a href={actividadActiva.contenido.video_url} target="_blank" rel="noreferrer">
                    Ver video
                  </a>
                )}
              </>
            )}

            {(() => {
              const Interactivo = ACTIVIDADES_INTERACTIVAS[actividadActiva.contenido.tipo_interactivo];

              if (actividadActiva.tipo === "quiz") {
                return (
                  <>
                    {actividadActiva.contenido.descripcion && (
                      <p>{actividadActiva.contenido.descripcion}</p>
                    )}
                    <Quiz
                      key={actividadActiva.id}
                      actividadId={actividadActiva.id}
                      onCompletado={(mensaje) => {
                        cargarProgreso();
                        setCelebracion(mensaje);
                      }}
                    />
                  </>
                );
              }

              if (Interactivo) {
                return (
                  <div className="interactivo-wrapper">
                    {estadoDe(actividadActiva.id) === "completado" && (
                      <div className="ya-completada-box">
                        <span className="ya-completada">✓ Ya la completaste antes</span>
                        <button
                          className="link-button"
                          onClick={() => setIntentoKey((k) => k + 1)}
                        >
                          Reiniciar actividad
                        </button>
                      </div>
                    )}
                    <Interactivo
                      key={`${actividadActiva.id}-${intentoKey}`}
                      data={actividadActiva.contenido}
                      onCompletar={(mensaje) => marcarCompletada(actividadActiva.id, mensaje)}
                    />
                  </div>
                );
              }

              return (
                <>
                  {actividadActiva.contenido.descripcion && (
                    <p>{actividadActiva.contenido.descripcion}</p>
                  )}
                  <button
                    onClick={() => marcarCompletada(actividadActiva.id)}
                    disabled={estadoDe(actividadActiva.id) === "completado"}
                  >
                    {estadoDe(actividadActiva.id) === "completado"
                      ? "Completada"
                      : "Marcar como completada"}
                  </button>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {celebracion && (
        <div className="celebracion-toast" onClick={() => setCelebracion(null)}>
          <img src="/brand/mascota.png" alt="" aria-hidden="true" />
          <span>{celebracion}</span>
        </div>
      )}
    </div>
  );
}
