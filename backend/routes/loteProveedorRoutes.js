const express = require("express");
const router = express.Router();
const controlador = require("../controllers/loteProveedorController");

router.post("/registrar", controlador.registrarCompraLote);

module.exports = router;
