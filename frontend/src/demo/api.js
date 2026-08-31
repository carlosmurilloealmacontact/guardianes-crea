import { NIVELES } from "./nivelesData";

const PROGRESO_KEY = "crea_demo_progreso";
const USUARIO_KEY = "crea_demo_usuario";

function leerProgreso() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESO_KEY)) || [];
  } catch {
    return [];
  }
}

function guardarProgreso(lista) {
  localStorage.setItem(PROGRESO_KEY, JSON.stringify(lista));
}

function todasLasActividades() {
  return NIVELES.flatMap((n) => n.actividades);
}

export const api = {
  login: async ({ nombre }) => {
    localStorage.setItem(USUARIO_KEY, JSON.stringify({ nombre }));
    return { access_token: "demo-token" };
  },

  obtenerUsuario: () => {
    try {
      return JSON.parse(localStorage.getItem(USUARIO_KEY));
    } catch {
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem(USUARIO_KEY);
  },

  listarNiveles: async () => NIVELES,

  obtenerNivel: async (id) => NIVELES.find((n) => n.id === Number(id)),

  miProgreso: async () => leerProgreso(),

  actualizarProgreso: async (actividadId, estado) => {
    const actividad = todasLasActividades().find((a) => a.id === Number(actividadId));
    const lista = leerProgreso();
    const existente = lista.find((p) => p.actividad_id === Number(actividadId));
    if (existente) {
      existente.estado = estado;
      existente.actualizado_en = new Date().toISOString();
    } else {
      lista.push({
        id: lista.length + 1,
        nivel_id: actividad?.nivel_id,
        actividad_id: Number(actividadId),
        estado,
        actualizado_en: new Date().toISOString(),
      });
    }
    guardarProgreso(lista);
    return existente || lista[lista.length - 1];
  },

  obtenerQuizPorActividad: async (actividadId) => {
    const actividad = todasLasActividades().find((a) => a.id === Number(actividadId));
    return actividad?.contenido?.quiz;
  },

  enviarIntento: async (quizId, respuestas) => {
    const actividad = todasLasActividades().find((a) => a.contenido?.quiz?.id === quizId);
    const quiz = actividad.contenido.quiz;
    const total = quiz.preguntas.length;
    const aciertos = quiz.preguntas.filter(
      (p) => respuestas[p.id] === p.respuesta_correcta
    ).length;
    const score = total ? Math.round((aciertos / total) * 10000) / 100 : 0;

    await api.actualizarProgreso(actividad.id, "completado");

    return { id: Date.now(), score, respuestas, creado_en: new Date().toISOString() };
  },
};
