import React from 'react';
import { Container, Table, Badge, Button } from 'reactstrap';
import './EvaluacionTecnicos.css';

const tecnicos = [
  { id: 1, nombre: 'Carlos Rodríguez', casos: 22, promedioHoras: 2.3 },
  { id: 2, nombre: 'Laura Méndez', casos: 18, promedioHoras: 4.8 },
  { id: 3, nombre: 'Mario Gómez', casos: 27, promedioHoras: 1.9 },
];

export default function EvaluacionTecnicos() {
  return (
    <Container className="modulo-evaluacion mt-4">
      <h2 className="titulo-modulo">Evaluación de Técnicos</h2>
      <p className="subtitulo-modulo">Ranking según cantidad de casos y tiempo promedio de resolución.</p>

      <Table bordered responsive className="tabla-evaluacion">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Casos Resueltos</th>
            <th>Tiempo Promedio (hrs)</th>
            <th>Desempeño</th>
          </tr>
        </thead>
        <tbody>
          {tecnicos.map((tec, i) => (
            <tr key={tec.id}>
              <td>{i + 1}</td>
              <td>{tec.nombre}</td>
              <td>{tec.casos}</td>
              <td>{tec.promedioHoras}</td>
              <td>
                {tec.promedioHoras <= 2.5 ? (
                  <Badge color="success">Alto</Badge>
                ) : tec.promedioHoras <= 4 ? (
                  <Badge color="warning">Medio</Badge>
                ) : (
                  <Badge color="danger">Bajo</Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
