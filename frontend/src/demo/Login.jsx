import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (!nombre.trim()) return;
    login(nombre.trim());
    navigate("/niveles");
  }

  return (
    <div className="auth-page">
      <img src="/brand/mascota.png" alt="" className="auth-mascota" aria-hidden="true" />
      <img src="/brand/logo.png" alt="Modelo CREA" className="auth-logo" />
      <form className="auth-card" onSubmit={onSubmit}>
        <h1>Guardianes CREA</h1>
        <p className="subtitle">
          Demo de vista previa — escribe tu nombre para probar los niveles. Tu progreso se guarda
          solo en este navegador.
        </p>

        <input
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          autoFocus
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
