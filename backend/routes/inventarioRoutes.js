const express = require("express");
const router = express.Router();
const controlador = require("../controllers/inventarioController");

router.post("/movimiento", controlador.registrarMovimiento);
router.get("/recientes", controlador.obtenerComponentesRecientes);
router.get("/alertas", controlador.alertasStockBajo);
router.get("/categoria/:categoria", controlador.obtenerPorCategoria);
router.get("/lote/:idLote", controlador.obtenerComponentesPorLote);

module.exports = router;
