const express = require("express");
const router = express.Router();
const controller = require("../controllers/dashboardAdminController");

router.get("/reportes/solicitudes-por-dia", controller.solicitudesPorDia);
router.get("/solicitudes/recientes", controller.solicitudesRecientes);
router.get("/solicitudes", controller.filtrarPorCategoria);
router.get("/admin/dashboard-resumen", controller.resumenAdmin);

module.exports = router;
