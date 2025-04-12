const db = require("../models");
const UsoComponentes = db.UsoComponentes;
const Componente = db.Componente;

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

exports.obtenerComponentesUsadosPorSolicitud = async (req, res) => {
  const { id_solicitud } = req.params;

  try {
    // 1. Buscar los usos registrados de componentes en la solicitud
    const usos = await UsoComponente.findAll({
      where: { id_solicitud },
    });

    if (!usos.length) {
      return res.json([]); // No se encontraron componentes
    }

    // 2. Obtener todos los IDs de componentes
    const idsComponentes = usos.map((uso) => uso.id_componente);

    // 3. Obtener los detalles de los componentes
    const componentes = await Componente.findAll({
      where: { id: idsComponentes },
    });

    // 4. Armar el resultado uniendo componentes con cantidades usadas
    const resultado = componentes.map((comp) => {
      const uso = usos.find((u) => u.id_componente === comp.id);
      return {
        id: comp.id,
        nombre: comp.nombre,
        descripcion: comp.descripcion,
        estado: comp.estado,
        categoria: comp.categoria,
        cantidad: uso?.cant_utilizada || 0,
      };
    });

    res.json(resultado);
  } catch (error) {
    console.error("❌ Error al obtener componentes usados:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};
