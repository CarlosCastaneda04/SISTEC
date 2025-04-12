import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "reactstrap";
import "./RecomendacionesCompra.css";

export default function RecomendacionesCompra() {
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarRecomendaciones = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/recomendaciones/generar"
        );
        const data = await res.json();

        if (Array.isArray(data)) {
          setRecomendaciones(data);
        } else {
          console.warn("Respuesta inesperada:", data);
          setRecomendaciones([]);
        }
      } catch (err) {
        console.error("Error cargando recomendaciones:", err);
        setRecomendaciones([]);
      } finally {
        setCargando(false);
      }
    };

    cargarRecomendaciones();
  }, []);

  const confirmarCompras = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/recomendaciones/compras-automaticas",
        {
          method: "POST",
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Compras realizadas exitosamente");
        setRecomendaciones([]); // limpiar después de confirmar
      } else {
        console.error("Error del servidor:", data);
        alert("Error al realizar las compras");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <Container className="modulo-compra mt-4">
      <h2 className="titulo-modulo">Recomendaciones de Compra</h2>
      <p className="subtitulo-modulo">
        Análisis basado en demanda y disponibilidad actual de componentes.
      </p>

      {cargando ? (
        <p>Cargando recomendaciones...</p>
      ) : recomendaciones.length === 0 ? (
        <p>No hay recomendaciones en este momento.</p>
      ) : (
        <>
          <Table responsive bordered className="tabla-compra">
            <thead>
              <tr>
                <th>Componente</th>
                <th>Stock Actual</th>
                <th>Demanda Estimada</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {recomendaciones.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>{item.stock}</td>
                  <td>{item.demanda}</td>
                  <td
                    style={{
                      color: item.stock < item.demanda ? "red" : "green",
                      fontWeight: "bold",
                    }}
                  >
                    {item.stock < item.demanda
                      ? "Comprar urgente"
                      : "Stock suficiente"}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="text-end mt-3">
            <Button
              color="success"
              className="btn-confirmar"
              onClick={confirmarCompras}
            >
              Confirmar compras sugeridas
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}
