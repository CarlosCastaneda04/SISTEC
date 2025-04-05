const db = require("../models");
const Solicitud = db.Solicitud;

// Cliente crea solicitud
exports.crearSolicitud = async (req, res) => {
  const { id_usuario, descripcion, id_area } = req.body;

  try {
    const nuevaSolicitud = await Solicitud.create({
      id_usuario,
      fecha_creacion: new Date(),
      estado: "pendiente",
      descripcion,
      id_area,
    });

    res
      .status(201)
      .json({ mensaje: "Solicitud creada", solicitud: nuevaSolicitud });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear solicitud" });
  }
};
