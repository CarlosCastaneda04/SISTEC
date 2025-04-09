import React from 'react';
import { Button, Row, Col, Card, CardBody } from 'reactstrap';
import { FaUser, FaClipboard, FaClock } from 'react-icons/fa';

export default function AsignacionExitosa() {
  const tecnico = {
    nombre: 'Carlos Rodríguez',
    especialidad: 'Especialista en Redes',
    id: 'T001'
  };

  const solicitud = {
    codigo: 'SOL-2023',
    descripcion: 'Reparación de servidor',
    prioridad: 'Urgente'
  };

  const programacion = {
    fecha: '15/06/2023',
    hora: '10:30',
    duracion: '2 horas'
  };

  return (
    <div className="p-5 bg-white rounded shadow-sm" style={{ maxWidth: 900, margin: 'auto' }}>
      <h4 className="text-center fw-bold mb-3">Asignar Exitosa</h4>
      <p className="text-center text-muted mb-4">
        El servicio ha sido asignado correctamente al técnico seleccionado
      </p>

      {/* Botones */}
      <div className="d-flex justify-content-center gap-3 mb-5">
        <Button color="dark">Ver Detalles</Button>
        <Button color="secondary" outline>Volver al Dashboard</Button>
      </div>

      {/* Tarjetas de resumen */}
      <Row className="text-center">
        <Col md={4}>
          <Card className="border-0 bg-light-subtle shadow-sm py-3">
            <CardBody>
              <FaUser className="mb-2" size={20} />
              <h6 className="fw-bold mb-0">Técnico</h6>
              <div className="text-muted">{tecnico.nombre}</div>
              <small className="text-muted">{tecnico.especialidad} • ID: {tecnico.id}</small>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 bg-light-subtle shadow-sm py-3">
            <CardBody>
              <FaClipboard className="mb-2" size={20} />
              <h6 className="fw-bold mb-0">Solicitud</h6>
              <div className="text-muted">{solicitud.codigo}</div>
              <small className="text-muted">{solicitud.descripcion} • {solicitud.prioridad}</small>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 bg-light-subtle shadow-sm py-3">
            <CardBody>
              <FaClock className="mb-2" size={20} />
              <h6 className="fw-bold mb-0">Programación</h6>
              <div className="text-muted">{programacion.fecha} {programacion.hora}</div>
              <small className="text-muted">Duración estimada: {programacion.duracion}</small>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
