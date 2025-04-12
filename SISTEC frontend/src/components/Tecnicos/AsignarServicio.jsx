import React, { useEffect, useState } from "react";
import { Button, Input, FormGroup, Label, Row, Col } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";

export default function AsignarServicio() {
  const { idSolicitud } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tecnico: "",
    fecha: "",
    hora: "10:30",
    duracion: "2",
    notas: "",
  });

  const [tecnicos, setTecnicos] = useState([]);
  const [solicitud, setSolicitud] = useState(null);

  useEffect(() => {
    // 1. Obtener la solicitud
    fetch(`http://localhost:3000/solicitudes/${idSolicitud}`)
      .then((res) => {
        if (!res.ok) throw new Error("Solicitud no encontrada");
        return res.json();
      })
      .then((data) => {
        setSolicitud(data);
        // 2. Cargar todos los técnicos (rol 2)
        return fetch(`http://localhost:3000/usuarios/tecnicos`);
      })
      .then((res) => res.json())
      .then((data) => setTecnicos(data))
      .catch((err) => console.error("Error cargando datos:", err));
  }, [idSolicitud]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAsignar = async () => {
    if (!form.tecnico || !form.fecha || !form.duracion) {
      alert("Completa todos los campos requeridos");
      return;
    }

    const inicio = `${form.fecha}T${form.hora}`;
    const fechaInicio = new Date(inicio);
    const fechaFin = new Date(fechaInicio);
    fechaFin.setHours(fechaInicio.getHours() + parseInt(form.duracion));

    const body = {
      id_solicitud: parseInt(idSolicitud),
      id_tecnico: parseInt(form.tecnico),
      fecha_asignacion: fechaInicio.toISOString(),
      fecha_fin: fechaFin.toISOString(),
      notas: form.notas,
    };

    const res = await fetch("http://localhost:3000/asignaciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await res.json();

    if (res.ok) {
      alert("Asignación realizada correctamente");
      navigate("/dashboard-admin");
    } else {
      alert("Error al asignar: " + result.mensaje);
    }
  };

  return (
    <div
      className="p-5 bg-white rounded shadow-sm"
      style={{ maxWidth: 800, margin: "auto" }}
    >
      <h4 className="mb-4 fw-bold text-uppercase">Asignar Servicio</h4>

      <Row className="mb-4">
        <Col md={6}>
          <FormGroup>
            <Label className="fw-bold">Seleccionar Técnico</Label>
            <Input
              type="select"
              name="tecnico"
              value={form.tecnico}
              onChange={handleChange}
            >
              <option value="">Elija un técnico</option>
              {tecnicos.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombre}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>

        <Col md={6}>
          <FormGroup>
            <Label className="fw-bold">Solicitud</Label>
            <Input disabled value={solicitud?.descripcion || ""} />
          </FormGroup>
        </Col>
      </Row>

      <h6 className="fw-bold mb-3 mt-4">Detalles de la Asignación</h6>

      <Row>
        <Col md={4}>
          <FormGroup>
            <Label>Fecha de inicio</Label>
            <Input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label>Hora estimada</Label>
            <Input
              type="time"
              name="hora"
              value={form.hora}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label>Duración (hrs)</Label>
            <Input
              type="number"
              name="duracion"
              min="1"
              value={form.duracion}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
      </Row>

      <FormGroup className="mt-3">
        <Label>Notas</Label>
        <Input
          type="textarea"
          name="notas"
          rows={3}
          placeholder="Agregue instrucciones"
          value={form.notas}
          onChange={handleChange}
        />
      </FormGroup>

      <div className="mt-4 d-flex justify-content-end gap-3">
        <Button color="dark" onClick={handleAsignar}>
          Confirmar
        </Button>
        <Button color="secondary" outline onClick={() => navigate(-1)}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}
