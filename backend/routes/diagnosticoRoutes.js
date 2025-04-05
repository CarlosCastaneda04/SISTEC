const express = require("express");
const router = express.Router();
const controlador = require("../controllers/diagnosticoController");

// Técnico registra diagnóstico y cierra solicitud
router.post("/", controlador.registrarDiagnostico);
router.get("/cliente/:id_cliente", controlador.obtenerDiagnosticosCliente);

module.exports = router;
