const db = require("../models");
const Diagnostico = db.Diagnostico;
const Solicitud = db.Solicitud;
const Asignacion = db.Asignacion;

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
