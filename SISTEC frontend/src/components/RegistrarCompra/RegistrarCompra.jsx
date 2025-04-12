import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
} from "reactstrap";
import "./RegistrarCompra.css";

const RegistrarCompra = () => {
  const [loteActual, setLoteActual] = useState([]);
  const [componente, setComponente] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [fechaComponente, setFechaComponente] = useState("");

  const handleAgregar = () => {
    if (!componente || !precioUnitario || !cantidad) return;

    const nuevo = {
      codigo: `SKU-00${loteActual.length + 1}`,
      componente,
      cantidad,
      precio: precioUnitario,
    };
    setLoteActual([...loteActual, nuevo]);

    setComponente("");
    setPrecioUnitario("");
    setCantidad("");
    setFechaComponente("");
  };

  return (
    <Container className="registro-container">
      <h2 className="titulo">Registrar Compra</h2>
      <Row>
        <Col md={5} className="form-box m-2">
          <h5>Compra de componentes</h5>
          <Form>
            <FormGroup>
              <Label>Seleccione un componente</Label>
              <Input
                type="select"
                value={componente}
                onChange={(e) => setComponente(e.target.value)}
              >
                <option value="">Seleccione</option>
                <option value="MOBA">MOBA</option>
                <option value="Pantalla">Pantalla</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Precio Unitario</Label>
              <Input
                type="number"
                value={precioUnitario}
                onChange={(e) => setPrecioUnitario(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Cantidad</Label>
              <Input
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Fecha</Label>
              <Input
                type="date"
                value={fechaComponente}
                onChange={(e) => setFechaComponente(e.target.value)}
              />
            </FormGroup>
            <Button color="primary" onClick={handleAgregar}>
              Agregar al lote
            </Button>
          </Form>
        </Col>

        <Col md={5} className="form-box m-2">
          <h5>Proveedor</h5>
          <Form>
            <FormGroup>
              <Label>Nombre</Label>
              <Input />
            </FormGroup>
            <FormGroup>
              <Label>Dirección</Label>
              <Input />
            </FormGroup>
            <FormGroup>
              <Label>ID Tributario</Label>
              <Input />
            </FormGroup>
            <FormGroup>
              <Label>Teléfono</Label>
              <Input />
            </FormGroup>
          </Form>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={5} className="form-box m-2">
          <h5>Lote del Proveedor</h5>
          <Form>
            <FormGroup>
              <Label>Proveedor</Label>
              <Input type="select">
                <option value="">Seleccione</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Precio del lote</Label>
              <Input />
            </FormGroup>
            <FormGroup>
              <Label>Fecha</Label>
              <Input type="date" />
            </FormGroup>
            <Button color="primary">Confirmar compra</Button>
          </Form>
        </Col>
        <Col md={5} className="form-box m-2">
          <h5>Lote Actual</h5>
          <Table bordered>
            <thead>
              <tr>
                <th>Código</th>
                <th>Componente</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {loteActual.map((item, index) => (
                <tr key={index}>
                  <td>{item.codigo}</td>
                  <td>{item.componente}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.precio}</td>
                </tr>
              ))}
              {loteActual.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">
                    No hay componentes aún.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrarCompra;
