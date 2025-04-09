import React from "react";
import { Button, Input, Label, FormGroup, Row, Col, Form } from "reactstrap";
import "./RegistrarTecnico.css";

const RegistrarTecnico = () => {
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
                <Input id="nombre" name="nombre" placeholder="Nombres" type="text" />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="apellido">Apellido</Label>
                <Input id="apellido" name="apellido" placeholder="Apellidos" type="text" />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup>
            <Label for="telefono">Teléfono</Label>
            <Input id="telefono" name="telefono" placeholder="Número de Teléfono" type="text" />
          </FormGroup>

          <FormGroup>
            <Label for="area">Área</Label>
            <Input id="area" name="area" type="select">
              <option>Seleccione una área</option>
              <option>Soporte</option>
              <option>Redes</option>
              <option>Software</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="rol">Rol</Label>
            <Input id="rol" name="rol" type="select">
              <option>Seleccione un rol</option>
              <option>Técnico</option>
              <option>Administrador</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="correo">Correo Electrónico</Label>
            <Input id="correo" name="correo" placeholder="correo@ejemplo.com" type="email" />
          </FormGroup>

          <FormGroup>
            <Label for="contrasena">Contraseña</Label>
            <Input id="contrasena" name="contrasena" placeholder="Contraseña" type="password" />
          </FormGroup>
        </Form>
      </div>

      <div className="tecnico__botones">
        <Button className="tecnico__cancelar">Cancelar</Button>
        <Button className="tecnico__guardar">Guardar Técnico</Button>
      </div>
    </div>
  );
};

export default RegistrarTecnico;
