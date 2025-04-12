const express = require("express");
const router = express.Router();
const controlador = require("../controllers/recomendacionCompraController");

router.get("/generar", controlador.generarRecomendaciones);
router.post("/compras-automaticas", controlador.realizarComprasSugeridas);

module.exports = router;
