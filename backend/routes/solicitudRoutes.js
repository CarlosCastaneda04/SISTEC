const express = require("express");
const router = express.Router();
const controlador = require("../controllers/solicitudController");

// Cliente crea solicitud
router.post("/", controlador.crearSolicitud);

module.exports = router;
