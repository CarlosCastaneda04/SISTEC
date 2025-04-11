import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../ServiciosTecnicos.css"; // reutilizamos estilos

function ServiciosEmpleado() {
  const navigate = useNavigate();
  const [solicitudes, setSolicitudes] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    if (!usuario) return;

    const obtenerSolicitudes = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/solicitudes/cliente/${usuario.id}`
        );
        const data = await res.json();

        if (res.ok) {
          const ultimas = data
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
            .slice(0, 10);
          setSolicitudes(ultimas);
        } else {
          alert("Error al cargar solicitudes recientes.");
        }
      } catch (error) {
        console.error(error);
        alert("No se pudo conectar al servidor.");
      }
    };

    obtenerSolicitudes();
  }, [usuario]);

  return (
    <div className="servicios-container">
      <h2>Área de Trabajo</h2>

      {/* Tarjeta de acción */}
      <div className="grid-servicios" style={{ marginTop: "20px" }}>
        <div className="tarjeta" onClick={() => navigate("/diagnostico")}>
          Diagnóstico de fallas
        </div>
      </div>

      {/* Botón agregar solicitud */}
      <div
        className="boton-agregar"
        style={{ marginBottom: "30px", textAlign: "right" }}
      >
        <button onClick={() => navigate("/agregar-solicitud")}>
          + Agregar Solicitud
        </button>
      </div>

      {/* Tabla de solicitudes */}
      <div
        className="tabla-wrapper"
        style={{ maxWidth: "100%", overflowX: "auto" }}
      >
        <div className="tabla-titulo">Mis últimas 10 solicitudes</div>
        <table className="tabla-solicitudes">
          <thead>
            <tr>
              <th>Código</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.length === 0 ? (
              <tr>
                <td colSpan="4">No tienes solicitudes registradas aún.</td>
              </tr>
            ) : (
              solicitudes.map((s, i) => (
                <tr key={i}>
                  <td>{s.codigo || `SL-${String(s.id).padStart(3, "0")}`}</td>
                  <td>{s.solicitud || s.descripcion}</td>
                  <td>{s.estado}</td>
                  <td>{new Date(s.fecha).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServiciosEmpleado;
