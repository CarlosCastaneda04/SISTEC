import React from 'react';
import "./VistaComponente.css"; 
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Table
} from 'reactstrap';
import { FaRegFile } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const categorias = [
  { nombre: 'Procesadores', descripcion: 'Solicitudes de reparación de computadoras', ruta: '/inventario/procesadores' },
  { nombre: 'Memorias RAM', descripcion: 'Solicitudes de reparación de computadoras', ruta: '/inventario/memorias-ram' },
  { nombre: 'Discos Duros', descripcion: 'Solicitudes de reparación de computadoras', ruta: '/inventario/discos-duros' },
  { nombre: 'PROCESADORES', descripcion: 'Solicitudes de reparación de computadoras', ruta: '/inventario/procesadores' },
  { nombre: 'PROCESADORES', descripcion: 'Solicitudes de reparación de computadoras', ruta: '/inventario/procesadores' },
  { nombre: 'PROCESADORES', descripcion: 'Solicitudes de reparación de computadoras', ruta: '/inventario/procesadores' },
  { nombre: 'PROCESADORES', descripcion: 'Solicitudes de reparación de computadoras', ruta: '/inventario/procesadores' },
];

const componentesRecientes = [
  { codigo: 'DF-2025-001', nombre: 'Procesador i7', categoria: 'Procesadores', entradaSalida: '10/5', fecha: '31/10/2025' },
  { codigo: 'DF-2025-002', nombre: 'Reparación PC', categoria: 'Procesadores', entradaSalida: '7/3', fecha: '01/11/2025' },
  { codigo: 'DF-2025-003', nombre: 'Reparación PC', categoria: 'Procesadores', entradaSalida: '5/2', fecha: '02/11/2025' },
  { codigo: 'DF-2025-004', nombre: 'Reparación PC', categoria: 'Procesadores', entradaSalida: '8/1', fecha: '03/11/2025' },
  { codigo: 'DF-2025-005', nombre: 'Reparación PC', categoria: 'Procesadores', entradaSalida: '6/4', fecha: '04/11/2025' },
  { codigo: 'DF-2025-006', nombre: 'Reparación PC', categoria: 'Procesadores', entradaSalida: '9/3', fecha: '05/11/2025' },
];

const VistaComponente = () => {
  const navigate = useNavigate();

  const irAInventario = (ruta) => {
    navigate(ruta);
  };

  return (
    <div className="vistaComp__container">
      <div className="vistaComp__contenido">
        <h1 className="vistaComp__titulo">Categorías de Componentes</h1>
        <Row className="vistaComp__categoriasGrid">
          {categorias.map((cat, i) => (
            <Col xs="12" sm="6" md="4" lg="3" key={i} className="vistaComp__col">
              <Card className="vistaComp__card">
                <CardBody className="text-center">
                  <FaRegFile size={30} className="vistaComp__icono" />
                  <p className="vistaComp__catTitulo">{cat.nombre}</p>
                  <p className="vistaComp__catDesc">{cat.descripcion}</p>
                  <Button className="vistaComp__btn" onClick={() => irAInventario(cat.ruta)}>Ver Inventario</Button>
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
              {componentesRecientes.map((item, i) => (
                <tr key={i}>
                  <td className="fw-bold">{item.codigo}</td>
                  <td>{item.nombre}</td>
                  <td>{item.categoria}</td>
                  <td>{item.entradaSalida}</td>
                  <td>{item.fecha}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default VistaComponente;
