import { useState } from "react";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
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

    const body = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      telefono: formData.telefono,
      correo: formData.correo,
      password: formData.password,
      rol_id: 2, // Puedes cambiar según el rol predeterminado
      id_area: 1, // O puedes dejarlo null si no se asigna aún
    };

    try {
      const res = await fetch("http://localhost:3000/usuarios/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registro exitoso");
        console.log(data);
        // Aquí puedes redirigir, limpiar campos, etc.
      } else {
        alert(data.mensaje || "Error en el registro");
      }
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <img
          src="/src/assets/sistec-logo.png"
          alt="SISTEC Logo"
          className="logo"
        />

        <form className="register-form" onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              placeholder="Juan"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Apellido:
            <input
              type="text"
              name="apellido"
              placeholder="Pérez"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </label>

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
            Teléfono:
            <input
              type="text"
              name="telefono"
              placeholder="6022-7231"
              value={formData.telefono}
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

          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
