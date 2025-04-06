import React from "react";
import {
  Table,
  Input,
  Button,
  Row,
  Col,
  FormGroup,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import "./Procesadores.css";

const Procesadores = () => {
  const procesadores = [
    {
      id: "001",
      nombre: "Procesador Intel i7-12700k",
      existencias: "10",
      entradas: 8,
      salidas: 3,
      precio: "$350.00",
    },
    {
      id: "Floyd 002",
      nombre: "Yahoo",
      existencias: "EN STOCK",
      entradas: 5,
      salidas: 3,
      precio: "$320.00",
    },
    {
      id: "003",
      nombre: "Adobe",
      existencias: "EN STOCK",
      entradas: 12,
      salidas: 3,
      precio: "$230.00",
    },
    {
      id: "004",
      nombre: "Tesla",
      existencias: "EN STOCK",
      entradas: 10,
      salidas: 3,
      precio: "$520.00",
    },
  ];

  return (
    <div className="procesadores-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">PROCESADORES</h4>
        <Button color="primary" className="agregar-btn">
          Agregar Procesador
        </Button>
      </div>

      <div className="procesadores-box mb-4 p-4 shadow-sm rounded">
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
            <Col md="4">
              <Button color="primary" className="filtrar-btn">
                Filtrar
              </Button>
            </Col>
          </Row>
        </div>

        <Table bordered responsive className="tabla-procesadores">
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>EXISTENCIAS</th>
              <th>Entradas</th>
              <th>SALIDAS</th>
              <th>PRECIO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {procesadores.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.existencias}</td>
                <td>{item.entradas}</td>
                <td>{item.salidas}</td>
                <td>{item.precio}</td>
                <td>
                  <Button color="success" size="sm">
                    EDITAR
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Procesadores;
