import React from "react";
import { Table, Input, FormGroup, Label } from "reactstrap";
import "./CategoriaSeleccionada.css";

const CategoriaSeleccionada = () => {
  const solicitudes = [
    "Solicitud de ejemplo",
    "Solicitud de ejemplo",
    "Solicitud de ejemplo",
    "Solicitud de ejemplo",
    "Solicitud de ejemplo",
  ];

  return (
    <div className="solicitud-detalle-container">
      <h5 className="mb-4">Nombre de categoría de solicitud seleccionada</h5>

      <Table responsive className="tabla-solicitudes">
        <thead>
          <tr>
            <th>Detalle de la solicitud</th>
            <th>Piezas</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((solicitud, index) => (
            <tr key={index}>
              <td>{`${index + 1}. ${solicitud}`}</td>
              <td>
                <Input type="select" className="select-input">
                  <option>Elegir Pieza</option>
                  <option>Pieza A</option>
                  <option>Pieza B</option>
                </Input>
              </td>
              <td>
                <Input type="select" className="select-input">
                  <option>En progreso</option>
                  <option>Completado</option>
                  <option>Pendiente</option>
                </Input>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <FormGroup className="comentario-box mt-4">
        <Label for="comentario">
          <strong>Comentario (Opcional)</strong>
        </Label>
        <Input
          id="comentario"
          name="comentario"
          type="textarea"
          placeholder="Añadir comentario"
          className="comentario-textarea"
        />
      </FormGroup>
    </div>
  );
};

export default CategoriaSeleccionada;
