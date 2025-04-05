const express = require("express");
const router = express.Router();
const controlador = require("../controllers/solicitudController");

// Cliente crea solicitud
router.post("/", controlador.crearSolicitud);
router.get("/cliente/:id_cliente", controlador.obtenerSolicitudesCliente);

module.exports = router;
