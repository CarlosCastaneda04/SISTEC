import React from "react";
import { Container, Table } from "reactstrap";
import "./HistorialCompras.css";

const HistorialCompras = () => {
  const proveedores = [
    {
      nombre: "Juan Perez",
      idTributario: "DF-2025-001",
      telefono: "7436-2384",
      direccion: "2da Av.Sur",
      responsable: "Belen",
    },
    {
      nombre: "Juan Perez",
      idTributario: "DF-2025-001",
      telefono: "7436-2384",
      direccion: "2da Av.Sur",
      responsable: "Belen",
    },
    {
      nombre: "Juan Perez",
      idTributario: "DF-2025-001",
      telefono: "7436-2384",
      direccion: "2da Av.Sur",
      responsable: "Belen",
    },
  ];

  const lotes = [
    {
      id: "DF-2025-001",
      proveedor: "Juan Perez",
      total: 342,
      fecha: "2025-04-09",
    },
    {
      id: "DF-2025-001",
      proveedor: "Juan Perez",
      total: 453,
      fecha: "2025-04-02",
    },
    {
      id: "DF-2025-001",
      proveedor: "Juan Perez",
      total: 745,
      fecha: "2025-04-06",
    },
  ];

  const componentes = [
    {
      codigo: "SKU-234",
      componente: "MOBA",
      cantidad: 230,
      precio: 23.5,
      lote: "DF-2025-001",
    },
    {
      codigo: "SKU-234",
      componente: "Panel IPS",
      cantidad: 150,
      precio: 33.6,
      lote: "DF-2025-001",
    },
    {
      codigo: "SKU-234",
      componente: "Speackers",
      cantidad: 100,
      precio: 75.3,
      lote: "DF-2025-001",
    },
  ];

  return (
    <Container className="historial-container">
      <h2 className="titulo">Historial de Compras</h2>

      <h5 className="seccion">Proveedores</h5>
      <Table bordered className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>ID Tributario</th>
            <th>Telefono</th>
            <th>Direccion</th>
            <th>Responsable</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((p, index) => (
            <tr key={index}>
              <td>{p.nombre}</td>
              <td>{p.idTributario}</td>
              <td>{p.telefono}</td>
              <td>{p.direccion}</td>
              <td>{p.responsable}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h5 className="seccion">Lotes del Proveedor</h5>
      <Table bordered className="tabla">
        <thead>
          <tr>
            <th>ID lote</th>
            <th>Proveedor</th>
            <th>Precio Total</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {lotes.map((lote, index) => (
            <tr key={index}>
              <td>{lote.id}</td>
              <td>{lote.proveedor}</td>
              <td>{lote.total}</td>
              <td>{lote.fecha}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h5 className="seccion">Componentes comprados por lote</h5>
      <Table bordered className="tabla">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Componente</th>
            <th>Cantidad</th>
            <th>P. Unitario</th>
            <th>Lote</th>
          </tr>
        </thead>
        <tbody>
          {componentes.map((c, index) => (
            <tr key={index}>
              <td>{c.codigo}</td>
              <td>{c.componente}</td>
              <td>{c.cantidad}</td>
              <td>{c.precio}</td>
              <td>{c.lote}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default HistorialCompras;
