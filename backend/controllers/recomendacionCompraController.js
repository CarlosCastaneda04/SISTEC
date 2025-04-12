const db = require("../models");
const { Componente, Lote, LoteProveedor, MovimientoInventario, Proveedor } = db;
const { Op } = require("sequelize");

// ✅ 1. Obtener recomendaciones basadas en salidas > 10
exports.generarRecomendaciones = async (req, res) => {
  try {
    const componentes = await Componente.findAll();
    const recomendaciones = [];

    for (const comp of componentes) {
      // Total de salidas históricas desde movimiento inventario
      const result = await MovimientoInventario.findAll({
        where: {
          id_componente: comp.id,
          tipo_movimiento: "salida",
        },
        attributes: [
          [
            db.sequelize.fn("SUM", db.sequelize.col("cantidad")),
            "total_salidas",
          ],
        ],
        raw: true,
      });

      const totalSalidas = parseInt(result[0].total_salidas) || 0;

      // Solo si el total de salidas supera 10 se genera la recomendación
      if (totalSalidas > 10) {
        recomendaciones.push({
          id: comp.id,
          nombre: comp.nombre,
          stock: comp.existencias,
          demanda: totalSalidas + 10,
        });
      }
    }

    res.json(recomendaciones);
  } catch (error) {
    console.error("❌ Error al generar recomendaciones:", error);
    res.status(500).json({ mensaje: "Error al generar recomendaciones" });
  }
};

// ✅ 2. Ejecutar las compras sugeridas automáticamente
exports.realizarComprasSugeridas = async (req, res) => {
  try {
    const componentes = await Componente.findAll();
    const comprasRealizadas = [];

    for (const comp of componentes) {
      const result = await MovimientoInventario.findAll({
        where: {
          id_componente: comp.id,
          tipo_movimiento: "salida",
        },
        attributes: [
          [
            db.sequelize.fn("SUM", db.sequelize.col("cantidad")),
            "total_salidas",
          ],
        ],
        raw: true,
      });

      const totalSalidas = parseInt(result[0].total_salidas) || 0;

      if (totalSalidas < 10 || comp.existencias >= totalSalidas + 10) continue;

      const cantidadNecesaria = totalSalidas + 10 - comp.existencias;

      const lotes = await Lote.findAll({ where: { id_componente: comp.id } });
      if (!lotes.length) continue;

      const idsCompras = lotes.map((l) => l.id_compra);
      const compras = await LoteProveedor.findAll({
        where: { id: idsCompras },
      });

      const proveedores = await Proveedor.findAll();

      const preciosPorProveedor = {};
      for (const lote of lotes) {
        const compra = compras.find((c) => c.id === lote.id_compra);
        if (!compra) continue;

        const proveedor = proveedores.find((p) => p.id === compra.id_proveedor);
        if (!proveedor) continue;

        const id = proveedor.id;
        if (!preciosPorProveedor[id]) {
          preciosPorProveedor[id] = { proveedor, total: 0, cantidad: 0 };
        }

        preciosPorProveedor[id].total += lote.precio_unitario * lote.cantidad;
        preciosPorProveedor[id].cantidad += lote.cantidad;
      }

      const mejor = Object.values(preciosPorProveedor).sort(
        (a, b) => a.total / a.cantidad - b.total / b.cantidad
      )[0];

      if (!mejor) continue;

      const precio_unitario = mejor.total / mejor.cantidad;

      const nuevaCompra = await LoteProveedor.create({
        id_proveedor: mejor.proveedor.id,
        precio_lote: precio_unitario * cantidadNecesaria,
        fecha: new Date(),
      });

      await Lote.create({
        id_componente: comp.id,
        id_compra: nuevaCompra.id,
        precio_unitario,
        cantidad: cantidadNecesaria,
      });

      await MovimientoInventario.create({
        id_componente: comp.id,
        tipo_movimiento: "entrada",
        cantidad: cantidadNecesaria,
        fecha: new Date(),
        cod_producto_general: `COMP-${comp.id}`,
        precio_unitario,
      });

      await comp.increment("existencias", { by: cantidadNecesaria });

      comprasRealizadas.push({
        componente: comp.nombre,
        proveedor: mejor.proveedor.nombre,
        cantidad: cantidadNecesaria,
        precio_unitario,
      });
    }

    res.status(201).json({
      mensaje: "Compras sugeridas ejecutadas correctamente",
      compras: comprasRealizadas,
    });
  } catch (error) {
    console.error("❌ Error al generar compras sugeridas:", error);
    res
      .status(500)
      .json({ mensaje: "Error al ejecutar recomendaciones de compra" });
  }
};
