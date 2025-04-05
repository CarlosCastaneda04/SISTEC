const express = require("express");
const cors = require("cors");
const app = express();
const connectToDatabase = require("./config/connector");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

// Permitir conexiones desde frontend externo
app.use(
  cors({
    origin: "http://localhost:5173", // cambia esto si tu frontend está en otro dominio http://localhost:5173
    credentials: true,
  })
);
// Middlewares
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use("/usuarios", require("./routes/usuarioRoutes"));
app.use("/componentes", require("./routes/componenteRoutes"));
app.use("/inventario", require("./routes/inventarioRoutes"));
app.use("/compras", require("./routes/loteProveedorRoutes"));
app.use("/solicitudes", require("./routes/solicitudRoutes"));
app.use("/asignaciones", require("./routes/asignacionRoutes"));
app.use("/uso-componentes", require("./routes/usoComponentesRoutes"));
app.use("/diagnostico", require("./routes/diagnosticoRoutes"));

// Iniciar conexión a la base de datos
connectToDatabase();

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
