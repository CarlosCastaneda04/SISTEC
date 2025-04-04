import './Register.css';

function Register() {
  return (
    <div className="register-container">
      <div className="register-card">
        <img src="/src/assets/sistec-logo.png" alt="SISTEC Logo" className="logo" />

        <form className="register-form">
          <label>
            Nombre:
            <input type="text" placeholder="Nombre Apellido" />
          </label>

          <label>
            Correo Electrónico:
            <input type="email" placeholder="alguien@correo.com" />
          </label>

          <label>
            Teléfono:
            <input type="text" placeholder="6022-7231" />
          </label>

          <label>
            Contraseña:
            <input type="password" placeholder="**********" />
          </label>

          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
