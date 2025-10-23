import { useState } from "react";
import axios from "axios";
import api from "../api";

export default function RegistroUser({ onBack }) {
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", { nombre, usuario, pass });
      setMessage("Usuario registrado con éxito 🎉");
      setNombre("");
      setUsuario("");
      setPass("");
    } catch (err) {
      setMessage("Error al registrar usuario");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Registro</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition duration-300"
        >
          Registrarse
        </button>
        {message && <p className="text-center text-sm mt-2 text-gray-600">{message}</p>}
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
