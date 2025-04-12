import React, { useEffect, useState } from "react";
import "./VistaComponente.css";
import { Row, Col, Card, CardBody, Button, Table } from "reactstrap";
import { FaRegFile } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const categorias = [
  {
    nombre: "Procesadores",
    descripcion: "Solicitudes de reparación de computadoras",
  },
  {
    nombre: "Memorias RAM",
    descripcion: "Solicitudes de reparación de computadoras",
  },
  {
    nombre: "Discos Duros",
    descripcion: "Solicitudes de reparación de computadoras",
  },
  {
    nombre: "Tarjetas Gráficas",
    descripcion: "Solicitudes de reparación de computadoras",
  },
  {
    nombre: "Placas Madre",
    descripcion: "Solicitudes de reparación de computadoras",
  },
  {
    nombre: "Fuentes de Poder",
    descripcion: "Solicitudes de reparación de computadoras",
  },
  {
    nombre: "Refrigeración",
    descripcion: "Solicitudes de reparación de computadoras",
  },
];

const VistaComponente = () => {
  const navigate = useNavigate();
  const [componentesRecientes, setComponentesRecientes] = useState([]);

  const irAInventario = (categoria) => {
    navigate(`/MovimientosComponente/${encodeURIComponent(categoria)}`);
  };

  useEffect(() => {
    fetch("http://localhost:3000/inventario/recientes")
      .then((res) => res.json())
      .then((data) => setComponentesRecientes(data))
      .catch((error) => {
        console.error("Error al cargar componentes recientes:", error);
        setComponentesRecientes([]);
      });
  }, []);

  return (
    <div className="vistaComp__container">
      <div className="vistaComp__contenido">
        <h1 className="vistaComp__titulo">Categorías de Componentes</h1>
        <Row className="vistaComp__categoriasGrid">
          {categorias.map((cat, i) => (
            <Col
              xs="12"
              sm="6"
              md="4"
              lg="3"
              key={i}
              className="vistaComp__col"
            >
              <Card className="vistaComp__card">
                <CardBody className="text-center">
                  <FaRegFile size={30} className="vistaComp__icono" />
                  <p className="vistaComp__catTitulo">{cat.nombre}</p>
                  <p className="vistaComp__catDesc">{cat.descripcion}</p>
                  <Button
                    className="vistaComp__btn"
                    onClick={() => irAInventario(cat.nombre)}
                  >
                    Ver Inventario
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

        <h2 className="vistaComp__subtitulo">Componentes Recientes</h2>
        <div className="vistaComp__tablaContainer">
          <Table bordered hover className="vistaComp__tabla text-center">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Entrada/salida</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {componentesRecientes.length === 0 ? (
                <tr>
                  <td colSpan="5">No hay movimientos recientes</td>
                </tr>
              ) : (
                componentesRecientes.map((item, i) => (
                  <tr key={i}>
                    <td className="fw-bold">{item.codigo}</td>
                    <td>{item.nombre}</td>
                    <td>{item.categoria}</td>
                    <td>{item.entradaSalida}</td>
                    <td>{item.fecha}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default VistaComponente;
