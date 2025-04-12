import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Row, Col, Input, InputGroup, InputGroupText } from "reactstrap";
import "./MovimientosComponente.css";

const MovimientosComponente = () => {
  const { categoria } = useParams();
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/inventario/categoria/${categoria}`)
      .then((res) => res.json())
      .then((data) => setMovimientos(data))
      .catch((err) => {
        console.error("Error al obtener movimientos:", err);
        setMovimientos([]);
      });
  }, [categoria]);

  return (
    <div className="movimientos-container">
      <h4 className="fw-bold mb-4">
        Movimientos del Componente ({decodeURIComponent(categoria)})
      </h4>

      <div className="movimientos-box p-4 shadow-sm rounded mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
          <strong className="gestion-title">
            Gestión de {decodeURIComponent(categoria)}
          </strong>
          <Row className="w-50 justify-content-end">
            <Col md="8">
              <InputGroup>
                <InputGroupText>
                  <i className="bi bi-search"></i>
                </InputGroupText>
                <Input placeholder={`Buscar en ${categoria}`} />
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
            {movimientos.length === 0 ? (
              <tr>
                <td colSpan="5">No se encontraron movimientos.</td>
              </tr>
            ) : (
              movimientos.map((item, index) => (
                <tr key={index}>
                  <td>{item.lote}</td>
                  <td>{item.nombre}</td>
                  <td>{item.serie}</td>
                  <td>{item.estado}</td>
                  <td>{item.categoria}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default MovimientosComponente;
