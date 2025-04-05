const db = require("../models");
const Usuario = db.Usuario;
const Solicitud = db.Solicitud;
const Asignacion = db.Asignacion;

//  Admin asigna técnico a una solicitud
exports.asignarTecnico = async (req, res) => {
  const { id_solicitud, id_tecnico, fecha_asignacion, fecha_fin, notas } =
    req.body;

  try {
    // Validar que la solicitud exista
    const solicitud = await Solicitud.findByPk(id_solicitud);
    if (!solicitud) {
      return res.status(404).json({ mensaje: "Solicitud no encontrada" });
    }

    // Validar que el usuario asignado sea un técnico
    const tecnico = await Usuario.findByPk(id_tecnico);
    if (!tecnico || tecnico.rol_id !== 2) {
      return res
        .status(400)
        .json({ mensaje: "El usuario seleccionado no es un técnico válido" });
    }

    // Crear asignación
    const nuevaAsignacion = await Asignacion.create({
      id_solicitud,
      id_tecnico,
      fecha_asignacion,
      fecha_fin,
      notas,
    });

    // Cambiar estado de la solicitud a "asignada"
    await solicitud.update({ estado: "asignada" });

    res.status(201).json({
      mensaje: "Técnico asignado correctamente",
      asignacion: nuevaAsignacion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al asignar técnico" });
  }
};

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
