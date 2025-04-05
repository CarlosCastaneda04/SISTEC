import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { Bar } from 'react-chartjs-2';  // Importa el componente Bar para la gráfica
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registra los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import './DashboardAdmin.css';

function DashboardAdmin() {
  // Datos de ejemplo para la gráfica de barras
  const data = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
      {
        label: 'Solicitudes por día',
        data: [5, 10, 8, 15, 7, 4, 6],  // Datos de ejemplo
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Solicitudes: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Container className="dashboard-admin mt-5">
      <h2 className="text-center mb-4">Resumen de Solicitudes</h2>

      {/* GRÁFICA (ahora con datos de ejemplo) */}
      <div className="chart-placeholder mb-5">
        <Bar data={data} options={options} />
      </div>

      {/* SERVICIOS TÉCNICOS */}
      <h4 className="mb-3">Servicios Técnicos</h4>
      <Row className="mb-5">
        {[...Array(4)].map((_, idx) => (
          <Col key={idx} sm="6" md="3">
            <Card className="shadow-sm service-card mb-3">
              <CardBody>
                <CardTitle tag="h6">Reparación PC</CardTitle>
                <CardText>Solicitudes de mantenimiento</CardText>
                <Button color="primary" size="sm">Ver solicitudes</Button>
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
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                <td>DF-2025-001</td>
                <td>Reparación PC</td>
                <td>Juan Perez</td>
                <td>{i === 1 ? 'Asignado' : i === 3 ? 'Pendiente' : 'En curso'}</td>
                <td>31/10/2025</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default DashboardAdmin;
