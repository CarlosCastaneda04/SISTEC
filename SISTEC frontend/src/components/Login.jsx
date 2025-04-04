import { useState } from "react";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    correo: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Inicio de sesión exitoso");

        // Guardar el usuario en localStorage
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        // Aquí podrías redirigir al dashboard, por ejemplo
        // navigate('/dashboard');
      } else {
        alert(data.mensaje || "Correo o contraseña incorrectos");
      }
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img
          src="/src/assets/sistec-logo.png"
          alt="SISTEC Logo"
          className="logo"
        />

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Correo Electrónico:
            <input
              type="email"
              name="correo"
              placeholder="alguien@correo.com"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Contraseña:
            <input
              type="password"
              name="password"
              placeholder="**********"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
