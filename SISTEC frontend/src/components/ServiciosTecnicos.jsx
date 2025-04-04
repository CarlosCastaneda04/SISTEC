import React from 'react';
import './ServiciosTecnicos.css';

function ServiciosTecnicos() {
  return (
    <div className="servicios-container">
      <h2>Servicios Técnicos</h2>
      <div className="grid-servicios">
        <div className="tarjeta">Reparación y mantenimiento de equipos</div>
        <div className="tarjeta">Control del uso de componentes</div>
        <div className="tarjeta">Diagnóstico de fallas</div>
        <div className="tarjeta">Asignación y seguimiento de técnicos</div>
      </div>

      <div className="boton-agregar">
        <button>＋ Agregar Solicitud</button>
      </div>
    </div>
  );
}

export default ServiciosTecnicos;
