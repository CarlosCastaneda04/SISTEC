import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import './App.css';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="layout">
            <Navbar />
      <main className="main-content">
        <Outlet /> {/* Aquí se cargarán las paginas */}
      </main>
      <Footer />
    </div>
  );
}

export default App;


