import { createBrowserRouter } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';

const router = createBrowserRouter([
  {
    path: '/registro',
    element: <RegisterPage />
  }
]);

export default router;
