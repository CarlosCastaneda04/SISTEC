import { useNavigate } from 'react-router-dom';
import './ServiciosTecnicos.css';

function ServiciosTecnicos() {

  const navigate = useNavigate();

  return (
    <div className="servicios-container">
      <h2>Servicios Técnicos</h2>
      <div className="grid-servicios">
        <div className="tarjeta" onClick={() => navigate('/reparacion')}>
          Reparación y <br />mantenimiento de equipos
        </div>

        <div className="tarjeta" onClick={() => navigate('/control-componentes')}>
          Control del uso de<br />componentes
        </div>

        <div className="tarjeta" onClick={() => navigate('/diagnostico')}>
          Diagnóstico de fallas
        </div>

        <div className="tarjeta" onClick={() => navigate('/asignacion')}>
          Asignación y seguimiento<br />de técnicos
        </div>
      </div>

      <div className="boton-agregar">
        <button onClick={() => navigate('/agregar-solicitud')}>
          + Agregar Solicitud
        </button>
      </div>
    </div>
  );
}

export default ServiciosTecnicos;
