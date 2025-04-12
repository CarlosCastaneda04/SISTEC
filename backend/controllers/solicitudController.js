const db = require("../models");
const Solicitud = db.Solicitud;
const Usuario = db.Usuario;
const Asignacion = db.Asignacion;
const Componente = db.Componente;
const UsoComponente = db.UsoComponentes;
const MovimientoInventario = db.MovimientoInventario;

// Cliente crea solicitud
// Crear nueva solicitud
exports.crearSolicitud = async (req, res) => {
  const {
    id_usuario,
    descripcion,
    detalles,
    prioridad,
    id_area,
    ubicacion,
    comentario,
  } = req.body;

  // Validaciones básicas
  if (!id_usuario || !descripcion || !prioridad || !id_area || !ubicacion) {
    return res.status(400).json({ mensaje: "Faltan campos obligatorios." });
  }

  try {
    const nuevaSolicitud = await Solicitud.create({
      id_usuario,
      descripcion,
      detalles: detalles || null,
      prioridad,
      id_area,
      ubicacion,
      comentario: comentario || null,
      estado: "pendiente",
      fecha_creacion: new Date(),
    });

    return res.status(201).json({
      mensaje: "Solicitud creada con éxito",
      solicitud: nuevaSolicitud,
    });
  } catch (error) {
    console.error("Error al crear solicitud:", error);
    return res.status(500).json({ mensaje: "Error al crear solicitud" });
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

exports.obtenerSolicitudesAsignadasATecnico = async (req, res) => {
  const { id_tecnico } = req.params;

  try {
    const asignaciones = await Asignacion.findAll({
      where: { id_tecnico },
    });

    if (!asignaciones || asignaciones.length === 0) {
      return res.status(200).json([]);
    }

    const solicitudesIds = asignaciones.map((a) => a.id_solicitud);

    const solicitudes = await Solicitud.findAll({
      where: { id: solicitudesIds },
    });

    const tecnico = await Usuario.findByPk(id_tecnico);

    const resultado = solicitudes.map((s) => ({
      id: s.id, // ✅ Añadir este campo
      codigo: `SL-${String(s.id).padStart(3, "0")}`,
      solicitud: s.descripcion,
      nombre: `${tecnico?.nombre || "Técnico"} ${tecnico?.apellido || ""}`,
      estado: s.estado,
      fecha: new Date(s.fecha_creacion).toLocaleDateString(),
    }));

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener solicitudes asignadas" });
  }
};

exports.obtenerSolicitudPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const solicitud = await db.Solicitud.findByPk(id);
    if (!solicitud) {
      return res.status(404).json({ mensaje: "Solicitud no encontrada" });
    }
    res.json(solicitud);
  } catch (error) {
    console.error("Error al obtener solicitud:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// Obtener técnicos según el área
exports.obtenerTecnicosPorArea = async (req, res) => {
  const { idArea } = req.params;
  try {
    const tecnicos = await db.Usuario.findAll({
      where: {
        rol: "tecnico",
        id_area: idArea,
      },
      attributes: ["id", "nombre"],
    });

    res.json(tecnicos);
  } catch (error) {
    console.error("Error al obtener tecnicos del area:", error);
    res.status(500).json({ mensaje: "Error interno al buscar tecnicos" });
  }
};

exports.obtenerSolicitudPorId = async (req, res) => {
  try {
    const solicitud = await db.Solicitud.findByPk(req.params.id);
    if (!solicitud) {
      return res.status(404).json({ mensaje: "Solicitud no encontrada" });
    }
    res.json(solicitud);
  } catch (error) {
    console.error("Error al obtener la solicitud:", error);
    res.status(500).json({ mensaje: "Error al obtener la solicitud" });
  }
};

// Cambiar estado de la solicitud y registrar componentes utilizados
exports.cambiarEstadoYRegistrarComponentes = async (req, res) => {
  const { solicitudId } = req.params;
  const { estado, componentes } = req.body;

  try {
    // 1. Actualizar estado de la solicitud
    await Solicitud.update({ estado }, { where: { id: solicitudId } });

    // 2. Registrar componentes utilizados
    for (const comp of componentes) {
      const componenteBD = await Componente.findByPk(comp.id);

      if (!componenteBD || componenteBD.existencias <= 0) {
        return res
          .status(400)
          .json({ mensaje: `Componente no válido o sin stock: ${comp.id}` });
      }

      // ⚠️ Se asume 1 unidad utilizada por cada componente (puedes modificar según tu lógica)
      const cantidadUtilizada = 1;

      // Guardar en uso_componentes
      await UsoComponente.create({
        id_solicitud: solicitudId,
        id_componente: comp.id,
        cant_utilizada: cantidadUtilizada,
      });

      // 3. Descontar stock
      await componenteBD.decrement("existencias", { by: cantidadUtilizada });

      // 4. Crear movimiento de salida en inventario
      await MovimientoInventario.create({
        id_componente: comp.id,
        tipo_movimiento: "salida",
        cantidad: cantidadUtilizada,
        fecha: new Date(),
        cod_producto_general: `COMP-${comp.id}`,
        precio_unitario: componenteBD.precio_unitario || 0,
      });
    }

    res.json({
      mensaje: "Solicitud actualizada y componentes registrados correctamente",
    });
  } catch (error) {
    console.error("❌ Error al procesar cambios de solicitud:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};
