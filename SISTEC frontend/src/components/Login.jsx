import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 importante
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    correo: "",
    password: "",
  });

  const navigate = useNavigate(); // 👈 hook para redirigir

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

        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        // 🔁 Redirección automática según el rol servicios-tecnicos
        switch (data.usuario.rol_id) {
          case 1:
            navigate("/empleadoService");
            break;
          case 2:
            navigate("/empleado-tecnico");
            break;
          case 3:
            navigate("/dashboard");
            break;
          default:
            navigate("/"); // fallback
        }
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
