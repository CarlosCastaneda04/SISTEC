const bcrypt = require("bcrypt");
const db = require("../models");
const Usuario = db.Usuario;
const { enviarCorreoRegistro } = require("../utils/mailer");

// Registro de usuario
exports.register = async (req, res) => {
  const { nombre, apellido, telefono, correo, rol_id, password, id_area } =
    req.body;

  try {
    // Verificar si el correo ya existe
    const existe = await Usuario.findOne({ where: { correo } });
    if (existe) {
      return res.status(400).json({ mensaje: "El correo ya está registrado." });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      telefono,
      correo,
      rol_id,
      password: hashedPassword,
      id_area: id_area || null, // opcional por si no se envía
    });

    // Enviar correo de bienvenida
    await enviarCorreoRegistro(nuevoUsuario);

    return res.status(201).json({
      mensaje: "Usuario registrado con éxito",
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        correo: nuevoUsuario.correo,
        rol_id: nuevoUsuario.rol_id,
        id_area: nuevoUsuario.id_area,
      },
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return res.status(500).json({ mensaje: "Error al registrar usuario" });
  }
};

// Login
exports.login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    // Puedes retornar un token aquí si usas JWT
    res.status(200).json({ mensaje: "Inicio de sesión exitoso", usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el inicio de sesión" });
  }
};

exports.obtenerTecnicos = async (req, res) => {
  try {
    const tecnicos = await db.Usuario.findAll({
      where: { rol_id: 2 },
      attributes: ["id", "nombre", "apellido"],
    });

    const resultado = tecnicos.map((t) => ({
      id: t.id,
      nombre: `${t.nombre} ${t.apellido}`,
    }));

    res.json(resultado);
  } catch (error) {
    console.error("Error al obtener técnicos:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};
