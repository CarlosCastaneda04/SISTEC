const db = require("../models");
const Diagnostico = db.Diagnostico;
const Solicitud = db.Solicitud;
const Asignacion = db.Asignacion;
const Usuario = db.Usuario;

// Técnico registra diagnóstico y cierra solicitud
exports.registrarDiagnostico = async (req, res) => {
  const { id_solicitud, descripcion, solucion, fecha } = req.body;

  try {
    // Crear diagnóstico
    await Diagnostico.create({
      id_solicitud,
      descripcion,
      solucion,
      fecha,
    });

    // Cambiar estado de la solicitud a "completada"
    await Solicitud.update(
      { estado: "completada" },
      { where: { id: id_solicitud } }
    );
    await Asignacion.update(
      { notas: "Solicitud completada por técnico" },
      { where: { id_solicitud } }
    );

    res
      .status(201)
      .json({ mensaje: "Diagnóstico registrado y solicitud completada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al registrar diagnóstico" });
  }
};

exports.obtenerDiagnosticosCliente = async (req, res) => {
  const { id_cliente } = req.params;

  try {
    // Buscar todas las solicitudes del cliente
    const solicitudes = await Solicitud.findAll({
      where: { id_usuario: id_cliente },
    });

    if (!solicitudes || solicitudes.length === 0) {
      return res.status(200).json([]); // No hay solicitudes, por ende no hay diagnósticos
    }

    const solicitudesIds = solicitudes.map((s) => s.id);

    // Buscar diagnósticos que correspondan a esas solicitudes
    const diagnosticos = await Diagnostico.findAll({
      where: {
        id_solicitud: solicitudesIds,
      },
    });

    if (!diagnosticos || diagnosticos.length === 0) {
      return res.status(200).json([]); // No hay diagnósticos aún
    }

    // Buscar info del usuario para mostrar su nombre completo
    const usuario = await Usuario.findByPk(id_cliente);

    const resultado = diagnosticos.map((d) => {
      const solicitud = solicitudes.find((s) => s.id === d.id_solicitud);

      return {
        codigo: `DF-2025-${String(d.id).padStart(3, "0")}`,
        solicitud: solicitud?.descripcion || "Sin descripción",
        nombre: `${usuario?.nombre || "Usuario"} ${usuario?.apellido || ""}`,
        estado: solicitud?.estado || "Desconocido",
        fecha: new Date(d.fecha).toLocaleDateString(),
      };
    });

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener diagnósticos del cliente" });
  }
};

exports.crearDiagnostico = async (req, res) => {
  const { id_solicitud, descripcion, solucion } = req.body;

  try {
    // Validar datos requeridos
    if (!id_solicitud || !descripcion || !solucion) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios." });
    }

    // Crear el diagnóstico
    const nuevo = await Diagnostico.create({
      id_solicitud,
      descripcion,
      solucion,
      fecha: new Date(),
    });

    res.status(201).json({
      mensaje: "Diagnóstico registrado correctamente",
      diagnostico: nuevo,
    });
  } catch (error) {
    console.error("❌ Error al registrar diagnóstico:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};
