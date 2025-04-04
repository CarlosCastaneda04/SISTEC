import './Diagnostico.css';

function Diagnostico() {
  const solicitudes = [
    {
      codigo: 'DF-2025-001',
      solicitud: 'Problema de conectividad de red',
      nombre: 'Juan Perez',
      estado: 'En curso',
      fecha: '31/10/2025'
    },
    // Puedes agregar más objetos si querés más filas
  ];

  return (
    <div className="diagnostico-container">
      <h2>Diagnóstico de fallas</h2>

      <div className="tabla-wrapper">
        <div className="tabla-titulo">Todas las Solicitudes</div>
        <table className="tabla-solicitudes">
          <thead>
            <tr>
              <th>Código</th>
              <th>Solicitud</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((s, i) => (
              <tr key={i}>
                <td>{s.codigo}</td>
                <td>{s.solicitud}</td>
                <td>{s.nombre}</td>
                <td>{s.estado}</td>
                <td>{s.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="boton-agregar">
        <button onClick={() => alert('Aquí iría la lógica para crear una solicitud')}>
          + Agregar Solicitud
        </button>
      </div>
    </div>
  );
}

export default Diagnostico;
