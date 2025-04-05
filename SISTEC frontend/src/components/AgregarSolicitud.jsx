import './AgregarSolicitud.css';

function AgregarSolicitud() {
  return (
    <div className="solicitud-container">
      <h2>Solicitud de Servicio</h2>

      <section>
        <h3>Detalles de la Solicitud</h3>
        <input type="text" placeholder="Breve descripción del problema" />
        <textarea placeholder="Proporcione información detallada sobre su solicitud"></textarea>
        <select>
          <option>Seleccionar el nivel de prioridad</option>
        </select>
        <select>
          <option>Seleccione la categoría de solicitud</option>
        </select>
        <input type="text" placeholder="Ubicación de su oficina o número de habitación" />
      </section>

      <section>
        <h3>Información del contacto</h3>
        <input type="text" placeholder="Juan Smith" />
        <input type="email" placeholder="juan.smith@company.com" />
        <input type="text" placeholder="Su número de contacto" />
        <textarea placeholder="Agregar su comentario"></textarea>
      </section>

      <div className="botones">
        <button className="cancelar">Cancelar</button>
        <button className="enviar">Enviar Solicitud</button>
      </div>
    </div>
  );
}

export default AgregarSolicitud;
