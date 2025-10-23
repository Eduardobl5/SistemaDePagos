import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./components/Inicio.jsx";
import Login from "./components/Login.jsx";
import RegistroUser from "./components/RegistroUser.jsx";
import MisPagos from "./components/MisPagos.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistroUser />} />
        <Route
          path="/misPagos"
          element={
            <ProtectedRoute>
              <MisPagos />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
