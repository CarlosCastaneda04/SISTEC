import { useNavigate } from "react-router-dom";
import { FaUserTie, FaUserShield } from "react-icons/fa";
import "./RegistrarUsuarios.css";

function RegistrarUsuarios() {
  const navigate = useNavigate();

  return (
    <div className="registro-usuarios-container">
      <h2>Registro de Cuentas</h2>

      <div className="cards-container">
        {/* Card Empleado */}
        <div className="card-registro">
          <FaUserTie className="icono" />
          <h3>Registrar Empleado</h3>
          <p>
            Agrega una nueva cuenta para un técnico o colaborador del sistema.
          </p>
          <button onClick={() => navigate("/registrar-tecnico")}>
            Registrar
          </button>
        </div>

        {/* Card Administrador */}
        <div className="card-registro">
          <FaUserShield className="icono" />
          <h3>Registrar Administrador</h3>
          <p>
            Crea una cuenta con privilegios de gestión completa del sistema.
          </p>
          <button onClick={() => navigate("/registro-admin")}>Registrar</button>
        </div>
      </div>
    </div>
  );
}

export default RegistrarUsuarios;
