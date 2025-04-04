import './Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <img src="/src/assets/sistec-logo.png" alt="SISTEC Logo" className="logo" />

        <form className="login-form">
          <label>
            Correo Electrónico:
            <input type="email" placeholder="alguien@correo.com" />
          </label>

          <label>
            Contraseña:
            <input type="password" placeholder="**********" />
          </label>

          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
