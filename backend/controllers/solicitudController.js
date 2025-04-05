const db = require("../models");
const Solicitud = db.Solicitud;
const Usuario = db.Usuario;

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
