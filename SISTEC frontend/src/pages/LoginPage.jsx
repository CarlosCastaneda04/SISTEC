import Navbar from '../components/Navbar';
import Login from '../components/Login';
import Footer from '../components/Footer';

function LoginPage() {
  return (
    <div className="page-container">
      <Navbar />
      <main className="content-wrap">
        <Login />
      </main>
      <Footer />
    </div>
  );
}

export default LoginPage;
