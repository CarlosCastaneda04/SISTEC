import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './DashboardReportes.css';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Datos del gráfico
const data = {
  labels: ['Procesadores', 'RAM', 'Discos', 'Motherboard', 'GPU', 'etc'],
  datasets: [
    {
      label: 'Resumen de Inventario',
      data: [10, 15, 8, 12, 5, 7],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    x: {
      beginAtZero: true,
    },
  },
};

function DashboardReportes() {
  return (
    <Container className="dashboard-reportes mt-5">
      <h2 className="text-center mb-4">Resumen de Inventario</h2>

      {/* Gráfico de Barras */}
      <div className="chart-placeholder mb-5">
        <Bar data={data} options={options} />
      </div>

      {/* Sección de Reportes */}
      <h4 className="mb-3">REPORTES</h4>

      <Row className="mb-5">
        {[...Array(3)].map((_, idx) => (
          <Col key={idx} sm="6" md="4">
            <Card className="shadow-sm service-card mb-3">
              <CardBody>
                <CardTitle tag="h6">{idx === 0 ? 'Inventario' : idx === 1 ? 'Solicitudes' : 'Técnicos'}</CardTitle>
                <p>Solicitud de repacion de de computadoras</p>
                <Button color="primary" size="sm">Ver reportes</Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Tabla de Reportes Recientes */}
      <h4 className="mb-3">REPORTES RECIENTES</h4>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-secondary">
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                <td>DF-2025-001</td>
                <td>31/10/2025</td>
                <td>Juan Perez</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default DashboardReportes;
