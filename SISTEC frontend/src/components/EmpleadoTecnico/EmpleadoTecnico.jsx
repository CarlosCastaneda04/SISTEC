import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import "./EmpleadoTecnico.css";

const EmpleadoTecnico = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario")); // técnico logueado
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuario || usuario.rol_id !== 2) return;

    const fetchSolicitudesAsignadas = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/solicitudes/tecnico/${usuario.id}`
        );
        const data = await res.json();

        if (res.ok) {
          setSolicitudes(data);
        } else {
          alert(data.mensaje || "Error al obtener solicitudes asignadas.");
        }
      } catch (error) {
        console.error(error);
        alert("Error al conectar con el servidor.");
      }
    };

    fetchSolicitudesAsignadas();
  }, []);

  const categorias = [
    "Nombre de categoría 1",
    "Nombre de categoría 2",
    "Nombre de categoría 3",
    "Nombre de categoría 4",
  ];

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Categorías de las solicitudes</h1>
          </Col>
        </Row>

        <h3 className="mb-4">Categorías de las solicitudes</h3>

        <Row>
          <div>
            <h5 className="fw-bold mb-3">
              <span style={{ fontSize: "1.3rem" }}>{solicitudes.length}</span>{" "}
              solicitudes asignadas recientemente
            </h5>
            <Table bordered hover responsive>
              <thead style={{ backgroundColor: "#e9e9e9" }}>
                <tr>
                  <th>Código</th>
                  <th>Solicitud</th>
                  <th>Nombre</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.length === 0 ? (
                  <tr>
                    <td colSpan="6">No tienes solicitudes asignadas aún</td>
                  </tr>
                ) : (
                  solicitudes.map((item, i) => (
                    <tr key={i}>
                      <td>{item.codigo}</td>
                      <td>{item.solicitud}</td>
                      <td>{item.nombre}</td>
                      <td>{item.estado}</td>
                      <td>{item.fecha}</td>
                      <td className="text-center">
                        <Button
                          size="sm"
                          color="warning"
                          className="me-2"
                          onClick={() =>
                            navigate(
                              `/tecnico/solicitud/${item.id}/cambiar-estado`
                            )
                          }
                        >
                          Estado / Componentes
                        </Button>
                        <Button
                          size="sm"
                          color="info"
                          onClick={() =>
                            navigate(
                              `/tecnico/solicitud/${item.id}/diagnostico`
                            )
                          }
                        >
                          Diagnóstico
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default EmpleadoTecnico;
