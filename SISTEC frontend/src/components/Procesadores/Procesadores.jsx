import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  Input,
  Button,
  Row,
  Col,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import "./Procesadores.css";

const Procesadores = () => {
  const { idLote } = useParams();
  const [procesadores, setProcesadores] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtrados, setFiltrados] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/inventario/lote/${idLote}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProcesadores(data);
          setFiltrados(data);
        } else {
          console.error("La respuesta no es un array:", data);
          setProcesadores([]);
          setFiltrados([]);
        }
      })
      .catch((err) => {
        console.error("Error al cargar componentes del lote:", err);
        setProcesadores([]);
        setFiltrados([]);
      });
  }, [idLote]);

  const handleBuscar = () => {
    const texto = busqueda.toLowerCase();
    const resultado = procesadores.filter((p) =>
      p.nombre.toLowerCase().includes(texto)
    );
    setFiltrados(resultado);
  };

  return (
    <div className="procesadores-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">PROCESADORES - LOTE #{idLote}</h4>
      </div>

      <div className="procesadores-box mb-4 p-4 shadow-sm rounded">
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
          <strong className="gestion-title">Componentes del Lote</strong>
          <Row className="w-50 justify-content-end">
            <Col md="8">
              <InputGroup>
                <InputGroupText>
                  <i className="bi bi-search"></i>
                </InputGroupText>
                <Input
                  placeholder="Buscar Procesador"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md="4">
              <Button
                color="primary"
                className="filtrar-btn"
                onClick={handleBuscar}
              >
                Filtrar
              </Button>
            </Col>
          </Row>
        </div>

        <Table bordered responsive className="tabla-procesadores text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>EXISTENCIAS</th>
              <th>ENTRADAS</th>
              <th>SALIDAS</th>
              <th>PRECIO</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan="7">No hay componentes en este lote.</td>
              </tr>
            ) : (
              filtrados.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.nombre}</td>
                  <td>{item.existencias}</td>
                  <td>{item.entradas}</td>
                  <td>{item.salidas}</td>
                  <td>{item.precio}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Procesadores;
