import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../api.js";

function MisPagos() {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        // ✅ Mandamos el token correctamente en el header
        const res = await api.get("/payByUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // ✅ Guardamos los pagos
        setPagos(res.data);
      } catch (err) {
        console.error("❌ Error al obtener pagos:", err);
      } finally {
        // ✅ Quitamos el "Cargando..." aunque haya error
        setLoading(false);
      }
    };

    fetchPagos();
  }, [token]);

  if (loading) {
    return <p className="text-center mt-10">Cargando tus pagos...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Mis Pagos</h2>

      {pagos.length === 0 ? (
        <p className="text-center text-gray-500">No tienes pagos registrados.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {pagos.map((pago) => (
            <li
              key={pago.id}
              className="py-4 flex justify-between items-center hover:bg-gray-50 transition-all"
            >
              <div>
                <p className="text-lg font-semibold">{pago.nombre}</p>
                <p className="text-sm text-gray-600">{pago.descripcion}</p>
              </div>
              <p className="font-bold text-green-600">${pago.monto}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MisPagos;
