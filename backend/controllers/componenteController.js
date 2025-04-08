const db = require("../models");
const Componente = db.Componente;

// Crear nuevo componente
exports.crearComponente = async (req, res) => {
  try {
    const nuevo = await Componente.create(req.body);
    res
      .status(201)
      .json({ mensaje: "Componente registrado", componente: nuevo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al registrar componente" });
  }
};

// Listar todos los componentes
exports.listarComponentes = async (req, res) => {
  try {
    const componentes = await Componente.findAll();
    res.json(componentes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener componentes" });
  }
};

// Editar componente
exports.actualizarComponente = async (req, res) => {
  try {
    const id = req.params.id;
    await Componente.update(req.body, { where: { id } });
    res.json({ mensaje: "Componente actualizado" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar componente" });
  }
};
