const db = require("../models");
const Solicitud = db.Solicitud;
const Usuario = db.Usuario;
const Asignacion = db.Asignacion;

// Cliente crea solicitud
// Crear nueva solicitud
exports.crearSolicitud = async (req, res) => {
  const {
    id_usuario,
    descripcion,
    detalles,
    prioridad,
    id_area,
    ubicacion,
    comentario,
  } = req.body;

  // Validaciones básicas
  if (!id_usuario || !descripcion || !prioridad || !id_area || !ubicacion) {
    return res.status(400).json({ mensaje: "Faltan campos obligatorios." });
  }

  try {
    const nuevaSolicitud = await Solicitud.create({
      id_usuario,
      descripcion,
      detalles: detalles || null,
      prioridad,
      id_area,
      ubicacion,
      comentario: comentario || null,
      estado: "pendiente",
      fecha_creacion: new Date(),
    });

    return res.status(201).json({
      mensaje: "Solicitud creada con éxito",
      solicitud: nuevaSolicitud,
    });
  } catch (error) {
    console.error("Error al crear solicitud:", error);
    return res.status(500).json({ mensaje: "Error al crear solicitud" });
  }
};

exports.obtenerSolicitudesCliente = async (req, res) => {
  const { id_cliente } = req.params;

  try {
    const solicitudes = await Solicitud.findAll({
      where: { id_usuario: id_cliente },
    });

    if (!solicitudes || solicitudes.length === 0) {
      return res.status(200).json([]);
    }

    const usuario = await Usuario.findByPk(id_cliente);

    const resultado = solicitudes.map((s) => ({
      codigo: `SL-${String(s.id).padStart(3, "0")}`,
      solicitud: s.descripcion,
      nombre: `${usuario?.nombre || "Usuario"} ${usuario?.apellido || ""}`,
      estado: s.estado,
      fecha: new Date(s.fecha_creacion).toLocaleDateString(),
    }));

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener solicitudes del cliente" });
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

exports.obtenerSolicitudPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const solicitud = await db.Solicitud.findByPk(id);
    if (!solicitud) {
      return res.status(404).json({ mensaje: "Solicitud no encontrada" });
    }
    res.json(solicitud);
  } catch (error) {
    console.error("Error al obtener solicitud:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// Obtener técnicos según el área
exports.obtenerTecnicosPorArea = async (req, res) => {
  const { idArea } = req.params;
  try {
    const tecnicos = await db.Usuario.findAll({
      where: {
        rol: "tecnico",
        id_area: idArea,
      },
      attributes: ["id", "nombre"],
    });

    res.json(tecnicos);
  } catch (error) {
    console.error("Error al obtener tecnicos del area:", error);
    res.status(500).json({ mensaje: "Error interno al buscar tecnicos" });
  }
};
