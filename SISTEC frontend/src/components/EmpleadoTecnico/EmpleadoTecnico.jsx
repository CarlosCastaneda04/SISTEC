import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap";
import "./EmpleadoTecnico.css"; 

const EmpleadoTecnico = () => {
  const categorias = [
    "Nombre de categoria de solicitud",
    "Nombre de categoria de solicitud",
    "Nombre de categoria de solicitud",
    "Nombre de categoria de solicitud",
  ];

  const data = [
    {
      codigo: "DF-2025-001",
      solicitud: "Problema de conectividad de red",
      nombre: "Juan Perez",
      estado: "En curso",
      fecha: "31/10/2025",
    },
    {
      codigo: "DF-2025-001",
      solicitud: "Problema de conectividad de red",
      nombre: "Juan Perez",
      estado: "En curso",
      fecha: "31/10/2025",
    },
    {
      codigo: "DF-2025-001",
      solicitud: "Problema de conectividad de red",
      nombre: "Juan Perez",
      estado: "En curso",
      fecha: "31/10/2025",
    },
    {
      codigo: "DF-2025-001",
      solicitud: "Problema de conectividad de red",
      nombre: "Juan Perez",
      estado: "En curso",
      fecha: "31/10/2025",
    },
  ];
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Categorias de las solicitudes</h1>
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
              <span style={{ fontSize: "1.3rem" }}>4</span> solicitudes
              asignadas recientemente
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
                {data.map((item, i) => (
                  <tr key={i}>
                    <td>{item.codigo}</td>
                    <td>{item.solicitud}</td>
                    <td>{item.nombre}</td>
                    <td>{item.estado}</td>
                    <td>{item.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default EmpleadoTecnico;
