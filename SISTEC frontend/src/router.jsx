import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import About from "./components/About";
import ServiciosTecnicos from "./pages/ServiciosPage"; // asegúrate de que esta ruta coincida
import EmpleadoTecnico from "./components/EmpleadoTecnico/EmpleadoTecnico";

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
        path: "/acerca",
        element: <About />,
      },
      {
        path: "/registro",
        element: <RegisterPage />,
      },
      {
        path: "/servicios-tecnicos",
        element: <ServiciosTecnicos />,
      },
      {
        path: "/empleado-tecnico",
        element: <EmpleadoTecnico />,
      },
    ],
  },
]);

export default router;
