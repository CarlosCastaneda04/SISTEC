const express = require("express");
const cors = require("cors");
const app = express();
const connectToDatabase = require("./config/connector");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Permitir conexiones desde frontend externo
app.use(
  cors({
    origin: "http://localhost:5173", // cambia esto si tu frontend está en otro dominio http://localhost:5173
    credentials: true,
  })
);
// Middlewares
app.use(express.json());
///app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SISTEC API",
      version: "1.0.0",
      description: "Documentación de la API de SISTEC",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"], // Asegúrate de que esta ruta esté bien
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// ✅ Esto sirve la documentación
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
app.use("/api/admin", require("./routes/dashboardAdminRoutes")); // prefijo personalizado

// Iniciar conexión a la base de datos
connectToDatabase();

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
