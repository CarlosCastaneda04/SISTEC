import { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import "./EmpleadoTecnico.css";

const EmpleadoTecnico = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario")); // técnico logueado

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
          {categorias.slice(0, 2).map((nombre, index) => (
            <Col md="3" key={index} className="mb-3">
              <Card className="categoria-card">
                <CardBody className="text-center">
                  <Button color="primary" block>
                    {nombre}
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

        <Row>
          {categorias.slice(2, 4).map((nombre, index) => (
            <Col md="3" key={index + 2} className="mb-3">
              <Card className="categoria-card">
                <CardBody className="text-center">
                  <Button color="primary" block>
                    {nombre}
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

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
                </tr>
              </thead>
              <tbody>
                {solicitudes.length === 0 ? (
                  <tr>
                    <td colSpan="5">No tienes solicitudes asignadas aún</td>
                  </tr>
                ) : (
                  solicitudes.map((item, i) => (
                    <tr key={i}>
                      <td>{item.codigo}</td>
                      <td>{item.solicitud}</td>
                      <td>{item.nombre}</td>
                      <td>{item.estado}</td>
                      <td>{item.fecha}</td>
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
