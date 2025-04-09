

import React from "react";
import { Table, Row, Col, Input, InputGroup, InputGroupText } from "reactstrap";
import "./MovimientosComponente.css"; 

const MovimientosComponente = () => {
  const movimientos = [
    {
      lote: "001",
      nombre: "Procesador Intel i7-12700k",
      serie: "6526",
      estado: "Disponible",
      categoria: "PROCESADORES",
    },
    {
      lote: "Floyd 002",
      nombre: "Yahoo",
      serie: "929724",
      estado: "No disponible",
      categoria: "PROCESADORES",
    },
    {
      lote: "003",
      nombre: "Adobe",
      serie: "824984",
      estado: "Devolucion",
      categoria: "PROCESADORES",
    },
    {
      lote: "004",
      nombre: "Tesla",
      serie: "84848",
      estado: "Disponible",
      categoria: "PROCESADORES",
    },
  ];

  return (
    <div className="movimientos-container">
      <h4 className="fw-bold mb-4">
        Movimientos del Componente (Nombre del componente)
      </h4>

      <div className="movimientos-box p-4 shadow-sm rounded mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
          <strong className="gestion-title">Gestión de Procesadores</strong>
          <Row className="w-50 justify-content-end">
            <Col md="8">
              <InputGroup>
                <InputGroupText>
                  <i className="bi bi-search"></i>
                </InputGroupText>
                <Input placeholder="Buscar Procesador" />
              </InputGroup>
            </Col>
          </Row>
        </div>

        <Table bordered responsive className="tabla-movimientos">
          <thead>
            <tr>
              <th>LOTE</th>
              <th>NOMBRE</th>
              <th>SERIE</th>
              <th>ESTADO</th>
              <th>CATEGORIA</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.map((item, index) => (
              <tr key={index}>
                <td>{item.lote}</td>
                <td>{item.nombre}</td>
                <td>{item.serie}</td>
                <td>{item.estado}</td>
                <td>{item.categoria}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default MovimientosComponente;
