import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AgregarSolicitud.css";

function AgregarSolicitud() {
  const [descripcion, setDescripcion] = useState("");
  const [detalles, setDetalles] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [comentario, setComentario] = useState("");
  const [id_area, setIdArea] = useState("");

  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario")); // cliente logueado

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario || usuario.rol_id !== 1) {
      return alert("Solo un cliente puede crear solicitudes.");
    }

    const solicitud = {
      id_usuario: usuario.id,
      descripcion,
      detalles,
      id_area: parseInt(id_area),
      ubicacion,
      comentario,
    };

    try {
      const res = await fetch("http://localhost:3000/solicitudes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_usuario: solicitud.id_usuario,
          descripcion: solicitud.descripcion,
          id_area: solicitud.id_area,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Solicitud enviada con éxito.");
        navigate("/"); // o redirigir a "Mis Solicitudes"
      } else {
        alert(data.mensaje || "Error al crear la solicitud.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="solicitud-container">
      <h2>Solicitud de Servicio</h2>

      <section>
        <h3>Detalles de la Solicitud</h3>
        <input
          type="text"
          placeholder="Breve descripción del problema"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <textarea
          placeholder="Proporcione información detallada sobre su solicitud"
          value={detalles}
          onChange={(e) => setDetalles(e.target.value)}
        ></textarea>
        <select>
          <option>Seleccionar el nivel de prioridad</option>
          <option value="">Alta</option>
          <option value="1">Baja</option>
          <option value="2">Media</option>
        </select>
        <select
          value={id_area}
          onChange={(e) => setIdArea(e.target.value)}
          required
        >
          <option value="">Seleccione el área</option>
          <option value="1">Informática</option>
          <option value="2">Mantenimiento</option>
          <option value="3">Recursos Humanos</option>
        </select>
        <input
          type="text"
          placeholder="Ubicación de su oficina o número de habitación"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
        />
      </section>

      <section>
        <h3>Información del contacto</h3>
        <input type="text" placeholder={usuario?.nombre || "Nombre"} disabled />
        <input
          type="email"
          placeholder={usuario?.correo || "Correo"}
          disabled
        />
        <input type="text" placeholder="Su número de contacto" />
        <textarea
          placeholder="Agregar su comentario"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        ></textarea>
      </section>

      <div className="botones">
        <button className="cancelar" onClick={() => navigate("/")}>
          Cancelar
        </button>
        <button className="enviar" onClick={handleSubmit}>
          Enviar Solicitud
        </button>
      </div>
    </div>
  );
}

export default AgregarSolicitud;
