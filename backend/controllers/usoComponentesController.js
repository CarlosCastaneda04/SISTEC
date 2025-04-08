const db = require("../models");
const UsoComponentes = db.UsoComponentes;

// Técnico registra los componentes que usó
exports.registrarUsoComponente = async (req, res) => {
  const { id_solicitud, id_componente, cant_utilizada } = req.body;

  try {
    const uso = await UsoComponentes.create({
      id_solicitud,
      id_componente,
      cant_utilizada,
    });

    res.status(201).json({ mensaje: "Uso de componente registrado", uso });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al registrar uso de componente" });
  }
};
