import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, ApiError } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [modo, setModo] = useState("login");
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      if (modo === "registro") {
        await api.register(form);
      }
      await login(form.email, form.password);
      navigate("/niveles");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Ocurrió un error, intenta de nuevo");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="auth-page">
      <img src="/brand/mascota.png" alt="" className="auth-mascota" aria-hidden="true" />
      <img src="/brand/logo.png" alt="Modelo CREA" className="auth-logo" />
      <form className="auth-card" onSubmit={onSubmit}>
        <h1>Guardianes CREA</h1>
        <p className="subtitle">{modo === "login" ? "Ingresa a tu cuenta" : "Crea tu cuenta"}</p>

        {modo === "registro" && (
          <input
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={cargando}>
          {cargando ? "Cargando..." : modo === "login" ? "Ingresar" : "Registrarme"}
        </button>

        <button
          type="button"
          className="link-button"
          onClick={() => setModo(modo === "login" ? "registro" : "login")}
        >
          {modo === "login" ? "¿No tienes cuenta? Regístrate" : "Ya tengo cuenta"}
        </button>
      </form>
    </div>
  );
}
