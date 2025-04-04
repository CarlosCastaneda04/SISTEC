const bcrypt = require("bcrypt");
const db = require("../models");
const Usuario = db.Usuario;

// Registro de usuario
exports.register = async (req, res) => {
  const { nombre, apellido, telefono, correo, rol_id, password, id_area } =
    req.body;

  try {
    const existe = await Usuario.findOne({ where: { correo } });
    if (existe) {
      return res.status(400).json({ mensaje: "El correo ya está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      telefono,
      correo,
      rol_id,
      password: hashedPassword,
      id_area,
    });

    res
      .status(201)
      .json({ mensaje: "Usuario registrado con éxito", usuario: nuevoUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al registrar usuario" });
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
