import { useState } from "react";
import Login from "./Login";
import RegistroUser from "./RegistroUser";

export default function Inicio() {
  const [view, setView] = useState("home");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        {view === "home" && (
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Bienvenido</h1>
            <p className="text-gray-500">Selecciona una opción para continuar</p>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => setView("login")}
                className="bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => setView("register")}
                className="border border-blue-600 text-blue-600 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition duration-300"
              >
                Registrarse
              </button>
            </div>
          </div>
        )}

        {view === "login" && <Login onBack={() => setView("home")} />}
        {view === "register" && <RegistroUser onBack={() => setView("home")} />}
      </div>
    </div>
  );
}
