import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const logout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
    window.location.reload(); // fuerza actualización visual de la navbar
  };

  const renderLinksPorRol = () => {
    if (!usuario) {
      return (
        <>
          <Link to="/login">Inicio de Sesión</Link>
          <Link to="/registro">Registro</Link>
          <Link to="/acerca">Acerca de</Link>
        </>
      );
    }

    switch (usuario.rol_id) {
      case 1: // Cliente
        return (
          <>
            <span className="nav-user">👤 {usuario.nombre}</span>
            <Link to="/misSolicitudes">Mis Solicitudes</Link>
            <Link to="/clienteService">Servicios</Link>
            <button onClick={logout}>Cerrar Sesión</button>
          </>
        );
      case 2: // Técnico
        return (
          <>
            <span className="nav-user">🔧 {usuario.nombre}</span>
            <Link to="/empleado-tecnico">Tareas asignadas</Link>
            <button onClick={logout}>Cerrar Sesión</button>
          </>
        );
      case 3: // Administrador
        return (
          <>
            <span className="nav-user">🛠️ {usuario.nombre}</span>
            <Link to="/dashboard-admin">Dashboard</Link>
            <Link to="/usuarios">Gestión de Usuarios</Link>
            <Link to="/inventario">Inventario</Link>

            <Link to="/registrar-compra">Compra</Link>
            <Link to="/recomendaciones-compra">Toma de decision</Link>
            <button onClick={logout}>Cerrar Sesión</button>
          </>
        );
      default:
        return <button onClick={logout}>Cerrar Sesión</button>;
    }
  };

  return (
    <nav className="navbar">
      <img
        src="/src/assets/sistec-logo.png"
        alt="Logo SISTEC"
        className="nav-logo"
      />
      <div className="nav-links">{renderLinksPorRol()}</div>
    </nav>
  );
}

export default Navbar;
