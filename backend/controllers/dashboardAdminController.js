const db = require("../models");
const Solicitud = db.Solicitud;
const Usuario = db.Usuario;
const { Op } = require("sequelize");

// 1. 📊 Reporte de solicitudes por día de la semana
exports.solicitudesPorDia = async (req, res) => {
  try {
    const solicitudes = await Solicitud.findAll();

    const dias = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];
    const conteo = Array(7).fill(0);

    solicitudes.forEach((s) => {
      const dia = new Date(s.fecha_creacion).getDay();
      conteo[dia]++;
    });

    res.json({
      labels: dias.map((d) => d.charAt(0).toUpperCase() + d.slice(1)),
      data: conteo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener datos de la gráfica" });
  }
};

// 2. 📋 Últimas 5 solicitudes
exports.solicitudesRecientes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.findAll({
      limit: 5,
      order: [["fecha_creacion", "DESC"]],
    });

    const usuarios = await Usuario.findAll();
    const resultado = solicitudes.map((s) => {
      const usuario = usuarios.find((u) => u.id === s.id_usuario);
      return {
        codigo: `SL-${String(s.id).padStart(3, "0")}`,
        solicitud: s.descripcion,
        nombre: usuario
          ? `${usuario.nombre} ${usuario.apellido}`
          : "Desconocido",
        estado: s.estado,
        fecha: new Date(s.fecha_creacion).toLocaleDateString(),
      };
    });

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener solicitudes recientes" });
  }
};

// 3. 🔍 Filtro por categoría
exports.filtrarPorCategoria = async (req, res) => {
  const { categoria } = req.query;

  try {
    const solicitudes = await Solicitud.findAll({
      where: {
        descripcion: { [Op.like]: `%${categoria}%` },
      },
      order: [["fecha_creacion", "DESC"]],
    });

    res.json(solicitudes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al filtrar solicitudes" });
  }
};

// 4. 📊 Resumen para dashboard admin
exports.resumenAdmin = async (req, res) => {
  try {
    const total = await Solicitud.count();
    const pendientes = await Solicitud.count({
      where: { estado: "pendiente" },
    });
    const enCurso = await Solicitud.count({ where: { estado: "en curso" } });
    const asignadas = await Solicitud.count({ where: { estado: "asignado" } });

    res.json({
      total,
      pendientes,
      enCurso,
      asignadas,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener resumen administrativo" });
  }
};
