import Navbar from '../components/Navbar';
import Register from '../components/Register';
import Footer from '../components/Footer';

function RegisterPage() {
  return (
    <div className="page-container">
      <Navbar />
      <main className="content-wrap">
        <Register />
      </main>
      <Footer />
    </div>
  );
}

export default RegisterPage;
