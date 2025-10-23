import { useState } from "react";
import axios from "axios";
import api from "../api.js";

export default function Login({ onBack }) {
  const [usuario, setUsuario] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { usuario, pass });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.id);
      alert("¡Bienvenido!");
      window.location.href = "/misPagos"; // Redirige al dashboard
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300"
        >
          Entrar
        </button>
      </form>
      <button
        onClick={onBack}
        className="mt-4 text-sm text-gray-500 hover:text-blue-600 block mx-auto"
      >
        ← Volver
      </button>
    </div>
  );
}
