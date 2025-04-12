const db = require("../models");
const { Proveedor, LoteProveedor, Lote, MovimientoInventario, Componente } = db;

// 1. Registrar proveedor
exports.registrarProveedor = async (req, res) => {
  const { nombre, direccion, id_tributario, telefono, nombre_responsable } =
    req.body;

  try {
    const nuevo = await Proveedor.create({
      nombre,
      direccion,
      id_tributario,
      telefono,
      nombre_responsable,
    });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("❌ Error al registrar proveedor:", error);
    res.status(500).json({ mensaje: "Error al registrar proveedor" });
  }
};

// 2. Registrar lote de proveedor
exports.registrarLoteProveedor = async (req, res) => {
  const { id_proveedor, precio_lote, fecha } = req.body;

  try {
    const nuevoLote = await LoteProveedor.create({
      id_proveedor,
      precio_lote,
      fecha,
    });
    res.status(201).json(nuevoLote);
  } catch (error) {
    console.error("❌ Error al registrar lote del proveedor:", error);
    res.status(500).json({ mensaje: "Error al registrar lote del proveedor" });
  }
};

// 3. Registrar componentes comprados y movimientos
exports.registrarComponentesEnLote = async (req, res) => {
  const { id_compra, componentes } = req.body;
  // componentes = [{ id_componente, precio_unitario, cantidad }]

  try {
    for (const item of componentes) {
      // 1. Registrar lote individual
      await Lote.create({
        id_componente: item.id_componente,
        id_compra,
        precio_unitario: item.precio_unitario,
        cantidad: item.cantidad,
      });

      // 2. Aumentar existencias
      await Componente.increment("existencias", {
        by: item.cantidad,
        where: { id: item.id_componente },
      });

      // 3. Crear movimiento tipo entrada
      await MovimientoInventario.create({
        id_componente: item.id_componente,
        tipo_movimiento: "entrada",
        cantidad: item.cantidad,
        fecha: new Date(),
        cod_producto_general: `COMP-${item.id_componente}`,
        precio_unitario: item.precio_unitario,
      });
    }

    res
      .status(201)
      .json({ mensaje: "Componentes y movimientos registrados exitosamente." });
  } catch (error) {
    console.error("❌ Error al registrar componentes en lote:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

exports.obtenerProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.findAll({
      attributes: ["id", "nombre"],
      order: [["nombre", "ASC"]],
    });

    res.json(proveedores);
  } catch (error) {
    console.error("❌ Error al obtener proveedores:", error);
    res.status(500).json({ mensaje: "Error al obtener proveedores" });
  }
};

// Registro completo de compra
exports.registrarCompra = async (req, res) => {
  const { proveedor, lote, componentes } = req.body;
  // proveedor = { nombre, direccion, id_tributario, telefono, nombre_responsable }
  // lote = { precio_lote, fecha }
  // componentes = [{ id_componente, precio_unitario, cantidad }]

  const t = await db.sequelize.transaction();

  try {
    // 1. Registrar proveedor (o puedes verificar si ya existe)
    const nuevoProveedor = await Proveedor.create(proveedor, {
      transaction: t,
    });

    // 2. Registrar lote del proveedor
    const nuevoLote = await LoteProveedor.create(
      {
        id_proveedor: nuevoProveedor.id,
        precio_lote: lote.precio_lote,
        fecha: lote.fecha,
      },
      { transaction: t }
    );

    // 3. Registrar cada componente comprado
    for (const item of componentes) {
      // 3.1 Lote de componente
      await Lote.create(
        {
          id_componente: item.id_componente,
          id_compra: nuevoLote.id,
          precio_unitario: item.precio_unitario,
          cantidad: item.cantidad,
        },
        { transaction: t }
      );

      // 3.2 Incrementar stock del componente
      await Componente.increment("existencias", {
        by: item.cantidad,
        where: { id: item.id_componente },
        transaction: t,
      });

      // 3.3 Registrar movimiento de entrada
      await MovimientoInventario.create(
        {
          id_componente: item.id_componente,
          tipo_movimiento: "entrada",
          cantidad: item.cantidad,
          fecha: new Date(),
          cod_producto_general: `COMP-${item.id_componente}`,
          precio_unitario: item.precio_unitario,
        },
        { transaction: t }
      );
    }

    await t.commit();

    res.status(201).json({ mensaje: "Compra registrada exitosamente." });
  } catch (error) {
    await t.rollback();
    console.error("❌ Error al registrar compra:", error);
    res.status(500).json({ mensaje: "Error al registrar la compra" });
  }
};
