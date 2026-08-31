import { createContext, useContext, useState } from "react";
import { api } from "./api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => api.obtenerUsuario());

  async function login(nombre) {
    await api.login({ nombre });
    setUsuario({ nombre });
  }

  function logout() {
    api.logout();
    setUsuario(null);
  }

  const token = usuario ? "demo-token" : null;

  return (
    <AuthContext.Provider value={{ token, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
