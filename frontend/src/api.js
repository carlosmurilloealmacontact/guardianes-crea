const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

class ApiError extends Error {
  constructor(status, detail) {
    super(detail || `Error ${status}`);
    this.status = status;
  }
}

async function request(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new ApiError(res.status, data.detail);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  register: (payload) => request("/auth/register", { method: "POST", body: payload }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),
  listarNiveles: (token) => request("/niveles", { token }),
  obtenerNivel: (id, token) => request(`/niveles/${id}`, { token }),
  actualizarProgreso: (actividadId, estado, token) =>
    request(`/progreso/actividades/${actividadId}`, {
      method: "PUT",
      body: { estado },
      token,
    }),
  miProgreso: (token) => request("/progreso/me", { token }),
  obtenerQuiz: (id, token) => request(`/quizzes/${id}`, { token }),
  obtenerQuizPorActividad: (actividadId, token) =>
    request(`/quizzes/by-actividad/${actividadId}`, { token }),
  enviarIntento: (id, respuestas, token) =>
    request(`/quizzes/${id}/intentos`, { method: "POST", body: { respuestas }, token }),
};

export { ApiError };
