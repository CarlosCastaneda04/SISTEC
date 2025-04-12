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
import { useParams, useNavigate } from "react-router-dom";

export function DiagnosticoSolicitud() {
  const { idSolicitud } = useParams();
  const navigate = useNavigate();
  const [diagnostico, setDiagnostico] = useState("");
  const [solucion, setSolucion] = useState("");
  const [componentes, setComponentes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/solicitudes/${idSolicitud}/componentes-usados`)
      .then((res) => res.json())
      .then(setComponentes)
      .catch((err) =>
        console.error("Error al cargar componentes usados:", err)
      );
  }, [idSolicitud]);

  const enviarDiagnostico = async () => {
    try {
      const res = await fetch(`http://localhost:3000/diagnostico`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_solicitud: parseInt(idSolicitud),
          descripcion: diagnostico,
          solucion: solucion,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Diagnóstico guardado correctamente");
        navigate("/empleado-tecnico");
      } else {
        console.error("Error en la respuesta del servidor:", data);
        alert("Error al guardar el diagnóstico");
      }
    } catch (error) {
      console.error("Error al enviar diagnóstico:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <Container className="mt-4">
      <h4>Diagnóstico para Solicitud #{idSolicitud}</h4>

      <FormGroup>
        <Label>Descripción del Diagnóstico</Label>
        <Input
          type="textarea"
          rows={4}
          value={diagnostico}
          onChange={(e) => setDiagnostico(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label>Solución Propuesta</Label>
        <Input
          type="textarea"
          rows={3}
          value={solucion}
          onChange={(e) => setSolucion(e.target.value)}
        />
      </FormGroup>

      {componentes.length > 0 && (
        <>
          <h5 className="mt-4">Componentes Utilizados</h5>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Cantidad Utilizada</th>
              </tr>
            </thead>
            <tbody>
              {componentes.map((u, i) => (
                <tr key={i}>
                  <td>{u.nombre}</td>
                  <td>{u.categoria}</td>
                  <td>{u.estado}</td>
                  <td>{u.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      <div className="d-flex justify-content-end mt-3">
        <Button color="primary" onClick={enviarDiagnostico}>
          Enviar Diagnóstico
        </Button>
      </div>
    </Container>
  );
}
