import React, { useState } from 'react';
import {
  Button, Input, FormGroup, Label, Row, Col
} from 'reactstrap';

export default function AsignarServicio() {
  const [form, setForm] = useState({
    tecnico: '',
    solicitud: '',
    fecha: '',
    hora: '10:30',
    duracion: '2',
    notas: ''
  });

  const tecnicos = ['Carlos Rodríguez', 'Ana López', 'Luis Martínez'];
  const solicitudes = ['SOL-2023 - Reparación de servidor', 'SOL-2024 - Configuración de red'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-5 bg-white rounded shadow-sm" style={{ maxWidth: 800, margin: 'auto' }}>
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
              <option value="">Elija un técnico disponible</option>
              {tecnicos.map((t, i) => (
                <option key={i} value={t}>{t}</option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label className="fw-bold">Seleccionar Solicitud</Label>
            <Input
              type="select"
              name="solicitud"
              value={form.solicitud}
              onChange={handleChange}
            >
              <option value="">Elija la solicitud de servicio</option>
              {solicitudes.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </Input>
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
            <Label>Duración estimada (Hora)</Label>
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
        <Label>Comentarios Adicionales</Label>
        <Input
          type="textarea"
          name="notas"
          rows={3}
          placeholder="Agregue instrucciones o información relevante para el técnico"
          value={form.notas}
          onChange={handleChange}
        />
      </FormGroup>

      <div className="mt-4 d-flex justify-content-end gap-3">
        <Button color="dark">Confirmación Asignación</Button>
        <Button color="secondary" outline>Cancelar</Button>
      </div>
    </div>
  );
}
