import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import About from "./components/About";
import ServiciosTecnicos from "./pages/ServiciosPage"; // asegúrate de que esta ruta coincida
import EmpleadoTecnico from "./components/EmpleadoTecnico/EmpleadoTecnico";
import CategoriaSeleccionada from "./components/CategoriaSeleccionada/CategoriaSeleccionada";
import TecnicosDisponibles from "./components/TecnicosDisponibles/tecnicosDisponibles";
import AsignarServicio from "./components/Tecnicos/AsignarServicio"; // asegúrate de que esta ruta coincida
import AsignacionExitosa from "./components/Tecnicos/AsignacionExitosa"; // asegúrate de que esta ruta coincida
import Diagnostico from "./components/Diagnostico";
import AgregarSolicitudPage from "./pages/AgregarSolicitudPage";
import Procesadores from "./components/Procesadores/Procesadores";
import MovimientosComponente from "./components/MovimientosComponente/MovimientosComponentes";
import VistaComponente from "./components/VistaComponente/VistaComponente";
import RegistrarTecnico from "./components/RegistrarTecnico/RegistrarTecnico";
import DashboardAdminPage from "./pages/DashboardAdminPage";
import DashboardReportesPage from "./pages/DashboardReportes";
import ServiciosEmpleado from "./components/empleado/ServiciosEmpleado";
import MisSolicitudes from "./components/MisSolicitudes";
import RegistrarUsuarios from "./components/admin/RegistrarUsuarios";
import { CambiarEstadoSolicitud } from "./components/Tecnicos/CambioEstadoSolicitud";
import { DiagnosticoSolicitud } from "./components/Tecnicos/DiagnosticoSolicitud";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/acerca",
        element: <About />,
      },
      {
        path: "/registro",
        element: <RegisterPage />,
      },
      {
        path: "/usuarios",
        element: <RegistrarUsuarios />,
      },
      {
        path: "/clienteService",
        element: <ServiciosEmpleado />,
      },
      {
        path: "/servicios-tecnicos",
        element: <ServiciosTecnicos />,
      },
      {
        path: "/diagnostico",
        element: <Diagnostico />,
      },
      {
        path: "/misSolicitudes",
        element: <MisSolicitudes />,
      },
      {
        path: "/agregar-solicitud",
        element: <AgregarSolicitudPage />,
      },
      {
        path: "/tecnicos-disponibles",
        element: <TecnicosDisponibles />,
      },
      {
        path: "/asignar-servicio/:idSolicitud",
        element: <AsignarServicio />,
      },

      {
        path: "/asignarcion-confirmada",
        element: <AsignacionExitosa />,
      },
      {
        path: "/Procesadores/:idLote",
        element: <Procesadores />,
      },
      {
        path: "/MovimientosComponente/:categoria",
        element: <MovimientosComponente />,
      },

      {
        path: "/empleado-tecnico",
        element: <EmpleadoTecnico />,
      },
      {
        path: "/categoria-seleccionada",
        element: <CategoriaSeleccionada />,
      },
      {
        path: "/inventario",
        element: <VistaComponente />,
      },
      {
        path: "/registrar-tecnico",
        element: <RegistrarTecnico />,
      },
      {
        path: "/dashboard-admin",
        element: <DashboardAdminPage />,
      },
      {
        path: "/dashboard-reportes",
        element: <DashboardReportesPage />,
      },
      {
        path: "/tecnico/solicitud/:idSolicitud/cambiar-estado",
        element: <CambiarEstadoSolicitud />,
      },
      {
        path: "/tecnico/solicitud/:idSolicitud/diagnostico",
        element: <DiagnosticoSolicitud />,
      },
    ],
  },
]);

export default router;
