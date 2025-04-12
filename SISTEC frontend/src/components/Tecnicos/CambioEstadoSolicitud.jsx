import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  Table,
} from "reactstrap";

export function CambiarEstadoSolicitud({ solicitudId }) {
  const [estado, setEstado] = useState("en curso");
  const [componentes, setComponentes] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/componentes")
      .then((res) => res.json())
      .then(setComponentes)
      .catch((err) => console.error("Error cargando componentes", err));
  }, []);

  const toggleSeleccion = (componente) => {
    const existe = seleccionados.find((c) => c.id === componente.id);
    if (existe) {
      setSeleccionados(seleccionados.filter((c) => c.id !== componente.id));
    } else {
      setSeleccionados([...seleccionados, componente]);
    }
  };

  const handleGuardar = async () => {
    await fetch(`http://localhost:3000/solicitudes/${solicitudId}/estado`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado, componentes: seleccionados }),
    });
    alert("Estado y componentes actualizados");
  };

  return (
    <Container className="mt-4">
      <h4>Cambiar Estado de Solicitud #{solicitudId}</h4>

      <FormGroup>
        <Label>Nuevo Estado</Label>
        <Input
          type="select"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        >
          <option value="en curso">En curso</option>
          <option value="en espera">En espera</option>
          <option value="completado">Completado</option>
        </Input>
      </FormGroup>

      <h5 className="mt-4">Seleccionar Componentes</h5>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Agregar</th>
          </tr>
        </thead>
        <tbody>
          {componentes.map((comp) => (
            <tr key={comp.id}>
              <td>{comp.nombre}</td>
              <td>{comp.estado}</td>
              <td>
                <Input type="checkbox" onChange={() => toggleSeleccion(comp)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button color="primary" onClick={handleGuardar}>
        Guardar Cambios
      </Button>
    </Container>
  );
}
