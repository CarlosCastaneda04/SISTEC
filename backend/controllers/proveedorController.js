const db = require("../models");
const Proveedor = db.Proveedor;

// Crear nuevo proveedor
exports.crearProveedor = async (req, res) => {
  try {
    const nuevoProveedor = await Proveedor.create(req.body);
    res.status(201).json({
      mensaje: "Proveedor creado exitosamente",
      proveedor: nuevoProveedor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear proveedor" });
  }
};

// Listar todos los proveedores
exports.listarProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.findAll();
    res.json(proveedores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener proveedores" });
  }
};

// Obtener proveedor por ID
exports.obtenerProveedor = async (req, res) => {
  const { id } = req.params;
  try {
    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor) {
      return res.status(404).json({ mensaje: "Proveedor no encontrado" });
    }
    res.json(proveedor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener proveedor" });
  }
};

// Actualizar proveedor
exports.actualizarProveedor = async (req, res) => {
  const { id } = req.params;
  try {
    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor) {
      return res.status(404).json({ mensaje: "Proveedor no encontrado" });
    }

    await proveedor.update(req.body);
    res.json({ mensaje: "Proveedor actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar proveedor" });
  }
};

// Eliminar proveedor
exports.eliminarProveedor = async (req, res) => {
  const { id } = req.params;
  try {
    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor) {
      return res.status(404).json({ mensaje: "Proveedor no encontrado" });
    }

    await proveedor.destroy();
    res.json({ mensaje: "Proveedor eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar proveedor" });
  }
};
