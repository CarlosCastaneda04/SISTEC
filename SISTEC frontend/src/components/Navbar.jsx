import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <img src="/src/assets/sistec-logo.png" alt="Logo SISTEC" className="nav-logo" />

      <div className="nav-links">
        <Link to="/login">Inicio de Sesión</Link>
        <Link to="/registro">Registro</Link>
        <Link to="/acerca">Acerca de</Link>
      </div>
    </nav>
  );
}

export default Navbar;
