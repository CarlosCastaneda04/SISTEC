const express = require("express");
const router = express.Router();
const controlador = require("../controllers/usoComponentesController");

// Técnico registra componentes usados
router.post("/", controlador.registrarUsoComponente);

module.exports = router;
