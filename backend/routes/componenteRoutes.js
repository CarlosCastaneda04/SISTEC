const express = require("express");
const router = express.Router();
const controlador = require("../controllers/componenteController");

router.post("/", controlador.crearComponente);
router.get("/", controlador.listarComponentes);
router.put("/:id", controlador.actualizarComponente);

module.exports = router;
