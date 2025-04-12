export function DiagnosticoSolicitud({ solicitudId }) {
  const [diagnostico, setDiagnostico] = useState("");
  const [componentes, setComponentes] = useState([]);
  const [usados, setUsados] = useState([]);
  const [componenteSeleccionado, setComponenteSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    fetch("http://localhost:3000/componentes")
      .then((res) => res.json())
      .then(setComponentes);
  }, []);

  const agregarComponente = () => {
    const comp = componentes.find(
      (c) => c.id === parseInt(componenteSeleccionado)
    );
    if (comp && cantidad > 0) {
      setUsados([...usados, { ...comp, cantidad }]);
      setCantidad(1);
    }
  };

  const enviarDiagnostico = async () => {
    await fetch(`http://localhost:3000/diagnosticos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_solicitud: solicitudId,
        descripcion: diagnostico,
        componentes: usados,
      }),
    });
    alert("Diagnóstico guardado correctamente");
  };

  return (
    <Container className="mt-4">
      <h4>Diagnóstico para Solicitud #{solicitudId}</h4>

      <FormGroup>
        <Label>Descripción del Diagnóstico</Label>
        <Input
          type="textarea"
          rows={4}
          value={diagnostico}
          onChange={(e) => setDiagnostico(e.target.value)}
        />
      </FormGroup>

      <Row className="mb-3">
        <Col md={6}>
          <Label>Componente</Label>
          <Input
            type="select"
            value={componenteSeleccionado}
            onChange={(e) => setComponenteSeleccionado(e.target.value)}
          >
            <option value="">-- Seleccionar --</option>
            {componentes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </Input>
        </Col>
        <Col md={3}>
          <Label>Cantidad</Label>
          <Input
            type="number"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </Col>
        <Col md={3} className="d-flex align-items-end">
          <Button color="info" onClick={agregarComponente}>
            Agregar
          </Button>
        </Col>
      </Row>

      <Table bordered responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {usados.map((u, i) => (
            <tr key={i}>
              <td>{u.nombre}</td>
              <td>{u.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button color="primary" onClick={enviarDiagnostico}>
        Enviar Diagnóstico
      </Button>
    </Container>
  );
}
