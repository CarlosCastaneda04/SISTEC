import React, { useState } from "react";
import { Button, Input, Label, FormGroup, Row, Col, Form } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./RegistrarTecnico.css";

const RegistrarTecnico = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    correo: "",
    password: "",
    rol_id: "",
    id_area: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuardar = async () => {
    const { nombre, apellido, telefono, correo, password, rol_id, id_area } =
      formData;

    if (
      !nombre ||
      !apellido ||
      !telefono ||
      !correo ||
      !password ||
      !rol_id ||
      !id_area
    ) {
      return alert("Todos los campos son obligatorios.");
    }

    try {
      const res = await fetch("http://localhost:3000/usuarios/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          apellido,
          telefono,
          correo,
          password,
          rol_id: parseInt(rol_id),
          id_area: parseInt(id_area),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Técnico registrado correctamente");
        navigate("/"); // Cambiar si deseas redirigir a otra vista
      } else {
        alert(data.mensaje || "Error al registrar técnico");
      }
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="tecnico__container">
      <h2 className="tecnico__titulo">Registrar Nuevo Técnico</h2>
      <p className="tecnico__subtitulo">Información personal</p>

      <div className="tecnico__form-box">
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Nombres"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="apellido">Apellido</Label>
                <Input
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Apellidos"
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup>
            <Label for="telefono">Teléfono</Label>
            <Input
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Número de Teléfono"
              type="text"
            />
          </FormGroup>

          <FormGroup>
            <Label for="id_area">Área</Label>
            <Input
              id="id_area"
              name="id_area"
              value={formData.id_area}
              onChange={handleChange}
              type="select"
            >
              <option value="">Seleccione una área</option>
              <option value="1">Soporte</option>
              <option value="2">Redes</option>
              <option value="3">Software</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="rol_id">Rol</Label>
            <Input
              id="rol_id"
              name="rol_id"
              value={formData.rol_id}
              onChange={handleChange}
              type="select"
            >
              <option value="">Seleccione un rol</option>
              <option value="2">Técnico</option>
              <option value="3">Administrador</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="correo">Correo Electrónico</Label>
            <Input
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              type="email"
            />
          </FormGroup>

          <FormGroup>
            <Label for="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              type="password"
            />
          </FormGroup>
        </Form>
      </div>

      <div className="tecnico__botones">
        <Button className="tecnico__cancelar" onClick={() => navigate("/")}>
          Cancelar
        </Button>
        <Button className="tecnico__guardar" onClick={handleGuardar}>
          Guardar Técnico
        </Button>
      </div>
    </div>
  );
};

export default RegistrarTecnico;
