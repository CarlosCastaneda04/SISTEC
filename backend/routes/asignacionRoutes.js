const express = require("express");
const router = express.Router();
const controlador = require("../controllers/asignacionController");

// Admin asigna técnico
//router.post("/", controlador.asignarTecnico);
router.post("/", controlador.crearAsignacion);
// Obtener técnicos por área de la solicitud
router.get("/tecnicos/:id_solicitud", controlador.tecnicosPorAreaSolicitud);
router.get(
  "/tecnico/:id_tecnico",
  controlador.obtenerSolicitudesAsignadasATecnico
);

module.exports = router;
