import { createBrowserRouter } from 'react-router-dom';
import App from './App'; 
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import About from './components/About';


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
      }
    ]
  }
]);

export default router;
