import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Niveles from "./pages/Niveles";
import NivelDetail from "./pages/NivelDetail";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/niveles"
          element={
            <ProtectedRoute>
              <Niveles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/niveles/:id"
          element={
            <ProtectedRoute>
              <NivelDetail />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/niveles" replace />} />
      </Routes>
    </AuthProvider>
  );
}
