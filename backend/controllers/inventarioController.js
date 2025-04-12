const db = require("../models");
const Movimiento = db.MovimientoInventario;
const Componente = db.Componente;

const generarCodigoGeneral = (nombre) => {
  const base = nombre.trim().toUpperCase().replace(/\s+/g, "").slice(0, 5);
  const random = Math.floor(Math.random() * 900 + 100);
  return `${base}-${random}`;
};

exports.registrarMovimiento = async (req, res) => {
  const { id_componente, tipo_movimiento, cantidad, precio_unitario } =
    req.body;

  try {
    const componenteBase = await Componente.findByPk(id_componente);
    if (!componenteBase)
      return res.status(404).json({ mensaje: "Componente no encontrado" });

    // Obtener o generar el código general
    let codGeneral = componenteBase.cod_producto_general;
    if (!codGeneral) {
      codGeneral = generarCodigoGeneral(componenteBase.nombre);
      await componenteBase.update({ cod_producto_general: codGeneral });
    }

    // Obtener último código específico usado
    const ultimo = await Componente.findOne({
      where: { cod_producto_general: codGeneral },
      order: [["cod_producto_especifico", "DESC"]],
    });

    let ultimoEspecifico = ultimo ? ultimo.cod_producto_especifico : 0;

    // Solo si es entrada, se registran nuevas piezas
    if (tipo_movimiento === "entrada") {
      for (let i = 1; i <= cantidad; i++) {
        ultimoEspecifico++;

        await Componente.create({
          nombre: componenteBase.nombre,
          descripcion: componenteBase.descripcion,
          estado: "disponible",
          categoria: componenteBase.categoria,
          cod_producto_general: codGeneral,
          cod_producto_especifico: ultimoEspecifico,
          existencias: 1,
        });
      }

      // Actualizamos existencias del componente base (opcional si usas piezas individuales)
      await componenteBase.update({
        existencias: componenteBase.existencias + cantidad,
      });
    }

    // Registrar el movimiento
    await Movimiento.create({
      id_componente,
      tipo_movimiento,
      cantidad,
      fecha: new Date(),
      precio_unitario,
      cod_producto_general: codGeneral,
    });

    res
      .status(201)
      .json({ mensaje: "Movimiento registrado y piezas generadas" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al registrar movimiento" });
  }
};

exports.alertasStockBajo = async (req, res) => {
  try {
    const componentes = await Componente.findAll({
      where: {
        existencias: {
          [db.Sequelize.Op.lt]: 5,
        },
      },
    });

    // Enviar correo por cada componente con stock bajo
    componentes.forEach(async (componente) => {
      await enviarCorreoAlertaStock(componente, componente.existencias);
    });

    res.status(200).json({
      mensaje: "Alertas generadas correctamente",
      componentes: componentes.map((c) => ({
        id: c.id,
        nombre: c.nombre,
        stock: c.existencias,
      })),
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al generar alertas",
      error: error.message,
    });
  }
};

// Obtener últimos movimientos de inventario por componente
exports.obtenerComponentesRecientes = async (req, res) => {
  try {
    // Buscar los últimos 6 movimientos registrados
    const movimientos = await Movimiento.findAll({
      order: [["fecha", "DESC"]],
      limit: 6,
    });

    const componentes = await Componente.findAll();

    const resultado = movimientos.map((m) => {
      const comp = componentes.find((c) => c.id === m.id_componente);
      return {
        codigo: `DF-${m.id}`,
        nombre: comp ? comp.nombre : "Componente desconocido",
        categoria: comp ? comp.categoria : "Sin categoría",
        entradaSalida:
          m.tipo_movimiento === "entrada"
            ? `${m.cantidad}/0`
            : `0/${m.cantidad}`,
        fecha: new Date(m.fecha).toLocaleDateString("es-ES"),
      };
    });

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener componentes recientes" });
  }
};

// Obtener componentes por categoría
exports.obtenerPorCategoria = async (req, res) => {
  const categoria = decodeURIComponent(req.params.categoria);

  try {
    const componentes = await db.Componente.findAll({
      where: { categoria },
      order: [["id", "DESC"]],
    });

    const resultado = componentes.map((c) => ({
      lote: c.id, // o puedes generar un código como LOTE-001
      nombre: c.nombre,
      serie: c.cod_producto_especifico,
      estado: c.estado,
      categoria: c.categoria,
    }));

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener componentes por categoría" });
  }
};
