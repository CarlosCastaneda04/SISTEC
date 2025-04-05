import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Diagnostico.css";

function Diagnostico() {
  const navigate = useNavigate();
  const [diagnosticos, setDiagnosticos] = useState([]);

  // Obtener solo una vez el usuario logueado
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    if (!usuario || usuario.rol_id !== 1) return; // Solo clientes

    const fetchDiagnosticos = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/diagnostico/cliente/${usuario.id}`
        );
        const data = await res.json();

        if (res.ok) {
          setDiagnosticos(data);
        } else {
          alert(data.mensaje || "Error al cargar diagnósticos");
        }
      } catch (error) {
        console.error(error);
        alert("Error al conectar con el servidor");
      }
    };

    fetchDiagnosticos();
  }, []); // ✅ Solo se ejecuta una vez al montar

  return (
    <div className="diagnostico-container">
      <h2>Diagnóstico de fallas</h2>

      <div className="tabla-wrapper">
        <div className="tabla-titulo">Mis Solicitudes Diagnosticadas</div>
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
            {diagnosticos.length === 0 ? (
              <tr>
                <td colSpan="5">No tienes solicitudes diagnosticadas aún</td>
              </tr>
            ) : (
              diagnosticos.map((s, i) => (
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

export default Diagnostico;
