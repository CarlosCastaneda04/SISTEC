import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import "./DashboardAdmin.css";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

function DashboardAdmin() {
  const [chartData, setChartData] = useState(null);
  const [solicitudes, setSolicitudes] = useState([]);
  const [resumen, setResumen] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar datos para la gráfica
    fetch("http://localhost:3000/api/admin/reportes/solicitudes-por-dia")
      .then((res) => res.json())
      .then((data) => {
        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: "Solicitudes por día",
              data: data.data,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        });
      });

    // Cargar solicitudes recientes
    fetch("http://localhost:3000/api/admin/solicitudes/recientes")
      .then((res) => res.json())
      .then(setSolicitudes);

    // Cargar resumen de estado de solicitudes
    fetch("http://localhost:3000/api/admin/dashboard-resumen")
      .then((res) => res.json())
      .then(setResumen);
  }, []);

  return (
    <Container className="dashboard-admin mt-5">
      <h2 className="text-center mb-4">Resumen de Solicitudes</h2>

      {/* KPIs */}
      {resumen && (
        <Row className="mb-4 text-center">
          <Col md="3">
            <Card>
              <CardBody>
                <h5>Total</h5>
                <p>{resumen.total}</p>
              </CardBody>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <CardBody>
                <h5>Pendientes</h5>
                <p>{resumen.pendientes}</p>
              </CardBody>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <CardBody>
                <h5>En curso</h5>
                <p>{resumen.enCurso}</p>
              </CardBody>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <CardBody>
                <h5>Asignadas</h5>
                <p>{resumen.asignadas}</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}

      {/* GRÁFICA */}
      <div className="chart-placeholder mb-5">
        {chartData && <Bar data={chartData} options={{ responsive: true }} />}
      </div>

      {/* SERVICIOS TÉCNICOS */}
      <h4 className="mb-3">Servicios Técnicos</h4>
      <Row className="mb-5">
        {[
          { label: "Reparación PC", categoria: "pc" },
          { label: "Redes y conectividad", categoria: "red" },
          { label: "Software", categoria: "software" },
          { label: "Otros", categoria: "otros" },
        ].map((servicio, idx) => (
          <Col key={idx} sm="6" md="3">
            <Card className="shadow-sm service-card mb-3">
              <CardBody>
                <CardTitle tag="h6">{servicio.label}</CardTitle>
                <p>
                  Solicitudes relacionadas con {servicio.label.toLowerCase()}
                </p>
                <Button
                  color="primary"
                  size="sm"
                  onClick={() =>
                    navigate(`/solicitudes?categoria=${servicio.categoria}`)
                  }
                >
                  Ver solicitudes
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      {/* TABLA DE SOLICITUDES */}
      <h4 className="mb-3">Solicitudes Recientes</h4>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-secondary">
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
                <td colSpan="5">No hay solicitudes recientes.</td>
              </tr>
            ) : (
              solicitudes.map((s, i) => (
                <tr key={i}>
                  <td>{s.codigo}</td>
                  <td>{s.solicitud}</td>
                  <td>{s.nombre}</td>
                  <td>{s.estado}</td>
                  <td>{s.fecha}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default DashboardAdmin;
