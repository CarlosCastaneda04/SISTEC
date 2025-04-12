import React, { useState, useEffect } from "react";
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
  const [componentes, setComponentes] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  const [componente, setComponente] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");
  const [cantidad, setCantidad] = useState("");

  const [proveedorId, setProveedorId] = useState("");
  const [precioLote, setPrecioLote] = useState("");
  const [fechaCompra, setFechaCompra] = useState("");

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [idTributario, setIdTributario] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nombreResponsable, setNombreResponsable] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/componentes")
      .then((res) => res.json())
      .then(setComponentes);

    fetch("http://localhost:3000/compras/proveedores")
      .then((res) => res.json())
      .then(setProveedores);
  }, []);

  const handleAgregar = () => {
    if (!componente || !precioUnitario || !cantidad) return;

    const compSeleccionado = componentes.find(
      (c) => c.id === parseInt(componente)
    );
    const nuevo = {
      id_componente: compSeleccionado.id,
      nombre: compSeleccionado.nombre,
      precio_unitario: parseFloat(precioUnitario),
      cantidad: parseInt(cantidad),
    };
    setLoteActual([...loteActual, nuevo]);

    setComponente("");
    setPrecioUnitario("");
    setCantidad("");
  };

  const handleConfirmarCompra = async () => {
    if (
      !nombre ||
      !direccion ||
      !idTributario ||
      !telefono ||
      !nombreResponsable ||
      !precioLote ||
      !fechaCompra ||
      loteActual.length === 0
    ) {
      alert("Completa todos los campos obligatorios y añade componentes.");
      return;
    }

    const body = {
      proveedor: {
        nombre,
        direccion,
        id_tributario: idTributario,
        telefono,
        nombre_responsable: nombreResponsable,
      },
      lote: {
        precio_lote: parseFloat(precioLote),
        fecha: fechaCompra,
      },
      componentes: loteActual,
    };

    const res = await fetch("http://localhost:3000/compras/registrar-compra", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      alert("Compra registrada correctamente");
      setLoteActual([]);
      setProveedorId("");
      setPrecioLote("");
      setFechaCompra("");
      setNombre("");
      setDireccion("");
      setIdTributario("");
      setTelefono("");
      setNombreResponsable("");
    } else {
      alert("Error al registrar la compra");
    }
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
                {componentes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
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
            <Button color="primary" onClick={handleAgregar}>
              Agregar al lote
            </Button>
          </Form>
        </Col>

        <Col md={5} className="form-box m-2">
          <h5>Datos del Proveedor</h5>
          <Form>
            <FormGroup>
              <Label>Nombre</Label>
              <Input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Dirección</Label>
              <Input
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>ID Tributario</Label>
              <Input
                value={idTributario}
                onChange={(e) => setIdTributario(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Teléfono</Label>
              <Input
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Nombre Responsable</Label>
              <Input
                value={nombreResponsable}
                onChange={(e) => setNombreResponsable(e.target.value)}
              />
            </FormGroup>
          </Form>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={5} className="form-box m-2">
          <h5>Lote del Proveedor</h5>
          <Form>
            <FormGroup>
              <Label>Precio del lote</Label>
              <Input
                type="number"
                value={precioLote}
                onChange={(e) => setPrecioLote(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Fecha</Label>
              <Input
                type="date"
                value={fechaCompra}
                onChange={(e) => setFechaCompra(e.target.value)}
              />
            </FormGroup>
            <Button color="success" onClick={handleConfirmarCompra}>
              Confirmar compra
            </Button>
          </Form>
        </Col>

        <Col md={5} className="form-box m-2">
          <h5>Lote Actual</h5>
          <Table bordered>
            <thead>
              <tr>
                <th>Componente</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
              </tr>
            </thead>
            <tbody>
              {loteActual.map((item, index) => (
                <tr key={index}>
                  <td>{item.nombre}</td>
                  <td>{item.cantidad}</td>
                  <td>${item.precio_unitario.toFixed(2)}</td>
                </tr>
              ))}
              {loteActual.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center">
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
