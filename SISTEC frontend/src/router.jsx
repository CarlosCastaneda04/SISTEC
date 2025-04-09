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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/acerca',
        element: <About />
      },
      {
        path: '/registro',
        element: <RegisterPage />
      },
      {
        path: '/servicios-tecnicos',
        element: <ServiciosTecnicos />
      },
      {
        path: '/diagnostico',
        element: <Diagnostico />
      },
      {
        path: '/agregar-solicitud',
        element: <AgregarSolicitudPage />
      },      
      {
        path: "/tecnicos-disponibles",
        element: <TecnicosDisponibles />,
      },
      {
        path: "/asignar-tecnicos",
        element: < AsignarServicio/>,
      },
      {
        path: "/asignarcion-confirmada",
        element: < AsignacionExitosa/>,
      },
    ]
  }
]);

export default router;
