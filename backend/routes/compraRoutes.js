const express = require("express");
const router = express.Router();
const controlador = require("../controllers/compraController");
const recomendacionCompraController = require("../controllers/recomendacionCompraController");

router.post("/proveedor", controlador.registrarProveedor);
router.post("/lote-proveedor", controlador.registrarLoteProveedor);
router.post("/lote-componentes", controlador.registrarComponentesEnLote);
router.post("/registrar-compra", controlador.registrarCompra);

router.get("/proveedores", controlador.obtenerProveedores);
router.post(
  "/compras-automaticas",
  recomendacionCompraController.realizarComprasSugeridas
);

module.exports = router;
