const db = require("../models");
const LoteProveedor = db.LoteProveedor;
const Lote = db.Lote;
const Componente = db.Componente;
const Movimiento = db.MovimientoInventario;

const generarCodigoEspecifico = async (cod_general) => {
  const ultimo = await Componente.findOne({
    where: { cod_producto_general: cod_general },
    order: [["cod_producto_especifico", "DESC"]],
  });

  return ultimo ? ultimo.cod_producto_especifico : 0;
};

const generarCodigoGeneral = (nombre) => {
  const base = nombre.trim().toUpperCase().replace(/\s+/g, "").slice(0, 5);
  const random = Math.floor(Math.random() * 900 + 100);
  return `${base}-${random}`;
};

exports.registrarCompraLote = async (req, res) => {
  const {
    id_proveedor,
    fecha,
    precio_lote,
    id_componente,
    cantidad,
    precio_unitario,
  } = req.body;

  try {
    // 1. Registrar lote_proveedor
    const loteProveedor = await LoteProveedor.create({
      id_proveedor,
      fecha,
      precio_lote,
    });

    // 2. Registrar lote
    const lote = await Lote.create({
      id_componente,
      id_compra: loteProveedor.id, // FK al lote_proveedor
      precio_unitario,
      cantidad,
    });

    // 3. Obtener componente base
    const componenteBase = await Componente.findByPk(id_componente);
    if (!componenteBase) {
      return res.status(404).json({ mensaje: "Componente base no encontrado" });
    }

    // 4. Obtener o generar código general
    let codGeneral = componenteBase.cod_producto_general;
    if (!codGeneral) {
      codGeneral = generarCodigoGeneral(componenteBase.nombre);
      await componenteBase.update({ cod_producto_general: codGeneral });
    }

    // 5. Obtener último código específico
    let ultimoCodEspecifico = await generarCodigoEspecifico(codGeneral);

    // 6. Crear nuevas piezas individuales
    for (let i = 1; i <= cantidad; i++) {
      ultimoCodEspecifico++;
      await Componente.create({
        nombre: componenteBase.nombre,
        descripcion: componenteBase.descripcion,
        estado: "disponible",
        categoria: componenteBase.categoria,
        cod_producto_general: codGeneral,
        cod_producto_especifico: ultimoCodEspecifico,
        existencias: 1,
      });
    }

    // 7. Registrar movimiento de entrada
    await Movimiento.create({
      id_componente,
      tipo_movimiento: "entrada",
      cantidad,
      fecha: new Date(),
      precio_unitario,
      cod_producto_general: codGeneral,
    });

    // 8. Actualizar existencias del componente base
    await componenteBase.update({
      existencias: componenteBase.existencias + cantidad,
    });

    res.status(201).json({
      mensaje: "Compra de lote registrada exitosamente",
      lote_proveedor: loteProveedor,
      lote,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al registrar compra de lote" });
  }
};
