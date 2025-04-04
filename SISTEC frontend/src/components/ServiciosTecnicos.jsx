import './ServiciosTecnicos.css';

function ServiciosTecnicos() {
  return (
    <div className="servicios-container">
      <h2 className="titulo-servicios">Servicios Técnicos</h2>

      <div className="grid-servicios">
        <div className="card-servicio">Reparación y mantenimiento de equipos</div>
        <div className="card-servicio">Control del uso de componentes</div>
        <div className="card-servicio">Diagnóstico de fallas</div>
        <div className="card-servicio">Asignación y seguimiento de técnicos</div>
      </div>

      <div className="boton-container">
        <button className="btn-solicitud">+ Agregar Solicitud</button>
      </div>
    </div>
  );
}

export default ServiciosTecnicos;
