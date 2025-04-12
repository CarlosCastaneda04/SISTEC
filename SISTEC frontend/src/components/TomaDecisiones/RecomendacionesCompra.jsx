import React from 'react';
import { Container, Table, Button } from 'reactstrap';
import './RecomendacionesCompra.css';

const recomendaciones = [
  { id: 1, nombre: 'Pantalla LCD 4"', stock: 2, demanda: 10 },
  { id: 2, nombre: 'Microcontrolador ATMEGA328', stock: 0, demanda: 7 },
  { id: 3, nombre: 'Capacitor 100uF', stock: 5, demanda: 15 },
];

export default function RecomendacionesCompra() {
  return (
    <Container className="modulo-compra mt-4">
      <h2 className="titulo-modulo">Recomendaciones de Compra</h2>
      <p className="subtitulo-modulo">Análisis basado en demanda y disponibilidad actual de componentes.</p>

      <Table responsive bordered className="tabla-compra">
        <thead>
          <tr>
            <th>Componente</th>
            <th>Stock Actual</th>
            <th>Demanda Estimada</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {recomendaciones.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>{item.stock}</td>
              <td>{item.demanda}</td>
              <td style={{ color: 'red', fontWeight: 'bold' }}>
                {item.stock < item.demanda ? 'Comprar urgente' : 'Stock suficiente'}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="text-end mt-3">
        <Button color="success" className="btn-confirmar">Confirmar compras sugeridas</Button>
      </div>
    </Container>
  );
}
