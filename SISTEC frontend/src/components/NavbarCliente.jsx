import { Link } from 'react-router-dom';
import './NavbarCliente.css';

function NavbarCliente() {
  return (
    <header className="navbar-cliente">
      <img src="/src/assets/sistec-logo.png" alt="Logo SISTEC" className="logo-navbar" />

      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><span>Nombre Cliente</span></li>
          <li><Link to="/logout">Cerrar Sesión</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default NavbarCliente;
