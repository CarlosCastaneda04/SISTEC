import { createBrowserRouter } from 'react-router-dom';
import App from './App'; 
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import About from './components/About';
import ServiciosTecnicos from './pages/ServiciosPage'; 
import Diagnostico from './components/Diagnostico';
import AgregarSolicitudPage from './pages/AgregarSolicitudPage';
import DashboardAdminPage from './pages/DashboardAdminPage'; // importa tu página nueva





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
        path: '/dashboard-admin',
      element: <DashboardAdminPage /> 
      }
    ]
  }
]);

export default router;
