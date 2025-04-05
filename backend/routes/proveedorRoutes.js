const express = require("express");
const router = express.Router();
const controlador = require("../controllers/proveedorController");

router.post("/", controlador.crearProveedor);
router.get("/", controlador.listarProveedores);
router.get("/:id", controlador.obtenerProveedor);
router.put("/:id", controlador.actualizarProveedor);
router.delete("/:id", controlador.eliminarProveedor);

module.exports = router;
