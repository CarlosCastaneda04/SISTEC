import React, { useState } from 'react';
import {
  Table,
  Input,
  Button,
  NavLink,
  Row,
  Col
} from 'reactstrap';
import classnames from 'classnames';
import { FaSearch } from 'react-icons/fa';

export default function TecnicosDisponibles() {
  const [activeTab, setActiveTab] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const tecnicos = [
    { nombre: 'Jane Cooper', especialidad: 'Redes', id: 'JC-0053', email: 'jane@microsoft.com', estado: 'Disponible' },
    { nombre: 'Floyd Miles', especialidad: 'redes', id: 'PK-25655', email: 'floyd@yahoo.com', estado: 'No disponible' },
    { nombre: 'Ronald Richards', especialidad: 'redes', id: 'RP-5841856', email: 'ronald@adobe.com', estado: 'Disponible' },
    { nombre: 'Marvin McKinney', especialidad: 'soporte tecnico', id: 'MR-643', email: 'marvin@tesla.com', estado: 'En servicio' },
    { nombre: 'Juan Coller', especialidad: 'Peperoni', id: 'JC-0028', email: 'juan@microsoft.com', estado: 'Disponible' },
    { nombre: 'Ronald Richards', especialidad: 'Hardware', id: 'RP-8548786', email: 'ronald@adobe.com', estado: 'Disponible' },
    { nombre: 'Marvin McKinney', especialidad: 'Soporte Tecnico', id: 'MR-448', email: 'marvin@tesla.com', estado: 'Disponible' },
  ];

  const solicitudes = [
    { codigo: 'DF-2025-001', solicitud: 'Reparación PC', estado: 'Urgente', fecha: '31/10/2025' },
    { codigo: 'DF-2025-002', solicitud: 'Reparación PC', estado: 'Normal', fecha: '31/10/2025' },
    { codigo: 'DF-2025-003', solicitud: 'Reparación PC', estado: 'Baja', fecha: '31/10/2025' },
    { codigo: 'DF-2025-004', solicitud: 'Reparación PC', estado: 'Urgente', fecha: '31/10/2025' },
    { codigo: 'DF-2025-005', solicitud: 'Reparación PC', estado: 'Normal', fecha: '31/10/2025' },
    { codigo: 'DF-2025-006', solicitud: 'Reparación PC', estado: 'Baja', fecha: '31/10/2025' },
  ];

  const estadosColor = {
    'Disponible': 'success',
    'En servicio': 'info',
    'No disponible': 'danger',
  };

  const filtrarTecnicos = () => {
    return tecnicos.filter(t => {
      const coincideBusqueda =
        t.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        t.especialidad.toLowerCase().includes(busqueda.toLowerCase()) ||
        t.id.toLowerCase().includes(busqueda.toLowerCase());
      const coincideTab =
        activeTab === 'todos' ||
        t.estado.toLowerCase() === activeTab;
      return coincideBusqueda && coincideTab;
    });
  };

  return (
    <div className="bg-light min-vh-100 p-4">

      {/* Título */}
      <h4 className="text-center mt-3 mb-4 text-uppercase fw-bold">Técnicos Disponibles</h4>

      {/* Tabs */}
      <div className="d-flex gap-4 border-bottom pb-2 mb-3">
        {['todos', 'disponible', 'en servicio', 'no disponible'].map(tab => (
          <NavLink
            key={tab}
            className={classnames('fw-bold text-capitalize', {
              'text-primary border-bottom border-primary': activeTab === tab
            })}
            style={{ cursor: 'pointer' }}
            onClick={() => toggleTab(tab)}
          >
            {tab === 'todos' ? 'Todos' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </NavLink>
        ))}
      </div>

      {/* Búsqueda y botón */}
      <Row className="align-items-center mb-3">
        <Col md="8" className="d-flex align-items-center">
          <FaSearch className="me-2 text-secondary" />
          <Input
            placeholder="Buscar por nombre, especialidad o ID"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </Col>
        <Col md="4" className="text-end">
          <Button color="primary">Asignar Técnico</Button>
        </Col>
      </Row>

      {/* Tabla de técnicos */}
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Técnico</th>
            <th>Área</th>
            <th>ID</th>
            <th>Correo</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {filtrarTecnicos().map((t, i) => (
            <tr key={i}>
              <td>{t.nombre}</td>
              <td>{t.especialidad}</td>
              <td>{t.id}</td>
              <td>{t.email}</td>
              <td><span className={`badge bg-${estadosColor[t.estado] || 'secondary'}`}>{t.estado}</span></td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Tabla de Solicitudes */}
      <div className="bg-white px-3 py-4 shadow-sm mt-5">
        <h6 className="fw-bold text-secondary mb-3">Solicitudes pendientes de asignación</h6>
        <Table bordered responsive>
          <thead className="table-dark text-white">
            <tr>
              <th>Código</th>
              <th>Solicitud</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((s, i) => (
              <tr key={i}>
                <td>{s.codigo}</td>
                <td>{s.solicitud}</td>
                <td>{s.estado}</td>
                <td>{s.fecha}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
