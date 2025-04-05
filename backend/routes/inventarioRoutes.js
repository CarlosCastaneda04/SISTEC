const express = require("express");
const router = express.Router();
const controlador = require("../controllers/inventarioController");

router.post("/movimiento", controlador.registrarMovimiento);
router.get("/alertas", controlador.alertasStockBajo);

module.exports = router;
