import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Diagnostico.css"; // reutiliza estilos

function MisSolicitudes() {
  const navigate = useNavigate();
  const [solicitudes, setSolicitudes] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    if (!usuario || usuario.rol_id !== 1) return;

    const fetchSolicitudes = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/solicitudes/cliente/${usuario.id}`
        );
        const data = await res.json();

        if (res.ok) {
          setSolicitudes(data);
        } else {
          alert(data.mensaje || "Error al cargar solicitudes");
        }
      } catch (error) {
        console.error(error);
        alert("Error al conectar con el servidor");
      }
    };

    fetchSolicitudes();
  }, []);

  return (
    <div className="diagnostico-container">
      <h2>Mis Solicitudes</h2>

      <div className="tabla-wrapper">
        <div className="tabla-titulo">Todas las Solicitudes</div>
        <table className="tabla-solicitudes">
          <thead>
            <tr>
              <th>Código</th>
              <th>Solicitud</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.length === 0 ? (
              <tr>
                <td colSpan="5">No tienes solicitudes registradas aún</td>
              </tr>
            ) : (
              solicitudes.map((s, i) => (
                <tr key={i}>
                  <td>{s.codigo}</td>
                  <td>{s.solicitud}</td>
                  <td>{s.nombre}</td>
                  <td>{s.estado}</td>
                  <td>{s.fecha}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="boton-agregar">
        <button onClick={() => navigate("/agregar-solicitud")}>
          + Agregar Solicitud
        </button>
      </div>
    </div>
  );
}

export default MisSolicitudes;
