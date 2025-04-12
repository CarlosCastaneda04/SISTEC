import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import NavbarAdmin from "./components/admin/NavbarAdmin";
import "./App.css";

function App() {
  const location = useLocation();

  const rutasAdmin = [
    "/dashboard-admin",
    "/agregar-solicitud",
    "/vista-componente",
    "/tecnicos-disponibles",
    "/recomendaciones-compra",
    "/evaluacion-tecnicos",
    "/dashboard-reportes",
  ];

  const esRutaAdmin = rutasAdmin.includes(location.pathname);

  return (
    <div className="layout">
      {<Navbar />}
      <main className="main-content">
        <Outlet /> {/* Aquí se cargarán las paginas */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
