const db = require("../models");
const Usuario = db.Usuario;
const Solicitud = db.Solicitud;
const Asignacion = db.Asignacion;
const { enviarCorreoTarea } = require("../utils/mailer");

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

exports.obtenerSolicitudesAsignadasATecnico = async (req, res) => {
  const { id_tecnico } = req.params;

  try {
    const asignaciones = await Asignacion.findAll({
      where: { id_tecnico },
    });

    if (!asignaciones || asignaciones.length === 0) {
      return res.status(200).json([]);
    }

    const solicitudesIds = asignaciones.map((a) => a.id_solicitud);

    const solicitudes = await Solicitud.findAll({
      where: { id: solicitudesIds },
    });

    const tecnico = await Usuario.findByPk(id_tecnico);

    const resultado = solicitudes.map((s) => ({
      codigo: `SL-${String(s.id).padStart(3, "0")}`,
      solicitud: s.descripcion,
      nombre: `${tecnico?.nombre || "Técnico"} ${tecnico?.apellido || ""}`,
      estado: s.estado,
      fecha: new Date(s.fecha_creacion).toLocaleDateString(),
    }));

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener solicitudes asignadas" });
  }
};

// Crear nueva asignación

// Crear nueva asignación
exports.crearAsignacion = async (req, res) => {
  try {
    const { id_solicitud, id_tecnico, fecha_asignacion, fecha_fin, notas } =
      req.body;

    // 1. Crear asignación en DB
    const nuevaAsignacion = await db.Asignacion.create({
      id_solicitud,
      id_tecnico,
      fecha_asignacion,
      fecha_fin,
      notas,
    });

    // 2. Buscar información del técnico y solicitud
    const tecnico = await db.Usuario.findByPk(id_tecnico);
    const solicitud = await db.Solicitud.findByPk(id_solicitud);

    if (tecnico && solicitud) {
      // 3. Enviar notificación por correo
      await enviarCorreoTarea({
        correo: tecnico.correo,
        nombre: tecnico.nombre,
        tituloTarea: solicitud.descripcion,
        prioridad: solicitud.prioridad,
      });
    }

    res.status(201).json(nuevaAsignacion);
  } catch (error) {
    console.error("Error creando asignación:", error);
    res.status(500).json({ mensaje: "Error creando asignación" });
  }
};
