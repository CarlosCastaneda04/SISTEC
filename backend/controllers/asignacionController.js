const db = require("../models");
const Usuario = db.Usuario;
const Solicitud = db.Solicitud;

// Obtener técnicos disponibles según el área de la solicitud
exports.tecnicosPorAreaSolicitud = async (req, res) => {
  const { id_solicitud } = req.params;

  try {
    const solicitud = await Solicitud.findByPk(id_solicitud);
    if (!solicitud) {
      return res.status(404).json({ mensaje: "Solicitud no encontrada" });
    }

    const tecnicos = await Usuario.findAll({
      where: {
        rol_id: 2, // técnico
        id_area: solicitud.id_area,
      },
    });

    res.json(tecnicos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al buscar técnicos" });
  }
};
