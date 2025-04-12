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

export function CambiarEstadoSolicitud() {
  const { idSolicitud } = useParams();
  const navigate = useNavigate();
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
      setSeleccionados([...seleccionados, { ...componente, cantidad: 1 }]);
    }
  };

  const actualizarCantidad = (id, cantidad) => {
    setSeleccionados((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, cantidad: parseInt(cantidad) || 1 } : c
      )
    );
  };

  const handleGuardar = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/solicitudes/${idSolicitud}/estado`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            estado,
            componentes: seleccionados,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Estado y componentes actualizados correctamente");
        navigate("/empleado-tecnico");
      } else {
        console.error("Error del servidor:", data);
        alert("Error al actualizar la solicitud");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("Ocurrió un error al conectar con el servidor");
    }
  };

  return (
    <Container className="mt-4">
      <h4 className="mb-4">Cambiar Estado de Solicitud #{idSolicitud}</h4>

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
            <th>Seleccionar</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {componentes.map((comp) => {
            const seleccionado = seleccionados.find((c) => c.id === comp.id);
            return (
              <tr key={comp.id}>
                <td>{comp.nombre}</td>
                <td>{comp.estado}</td>
                <td>
                  <Input
                    type="checkbox"
                    checked={!!seleccionado}
                    onChange={() => toggleSeleccion(comp)}
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    disabled={!seleccionado}
                    min="1"
                    value={seleccionado?.cantidad || 1}
                    onChange={(e) =>
                      actualizarCantidad(comp.id, e.target.value)
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end mt-4 gap-3">
        <Button color="primary" onClick={handleGuardar}>
          Guardar Cambios
        </Button>
        <Button color="secondary" outline onClick={() => navigate(-1)}>
          Cancelar
        </Button>
      </div>
    </Container>
  );
}
