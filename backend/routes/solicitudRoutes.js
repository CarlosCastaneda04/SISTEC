const express = require("express");
const router = express.Router();
const controlador = require("../controllers/solicitudController");

// Cliente crea solicitud
router.post("/", controlador.crearSolicitud);
router.get("/cliente/:id_cliente", controlador.obtenerSolicitudesCliente);
router.get("/detalle/:id", controlador.obtenerSolicitudPorId);
router.get("/tecnicos-area/:idArea", controlador.obtenerTecnicosPorArea);
router.get(
  "/tecnico/:id_tecnico",
  controlador.obtenerSolicitudesAsignadasATecnico
);
router.get("/:id", controlador.obtenerSolicitudPorId);
router.put(
  "/:solicitudId/estado",
  controlador.cambiarEstadoYRegistrarComponentes
);
router.get(
  "/:idSolicitud/componentes-usados",
  controlador.obtenerComponentesUsadosPorSolicitud
);

module.exports = router;
