const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "sistec653@gmail.com",
    pass: "umlj vqec eatz uipf",
  },
});

// Función genérica para enviar correos
const enviarCorreo = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: "sistec653@gmail.com",
      to,
      subject,
      html,
    });
    console.log(`📧 Correo enviado a ${to}`);
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
  }
};

// MÉTODOS

// 📨 Bienvenida al registrarse
const enviarCorreoRegistro = async (usuario) => {
  const html = `
    <h1>¡Bienvenido, ${usuario.nombre}!</h1>
    <p>Gracias por registrarte en SISTEC.</p>
    <p>Ahora puedes acceder a nuestros servicios.</p>
  `;

  await enviarCorreo({
    to: usuario.correo,
    subject: "Bienvenido a SISTEC 🎉",
    html,
  });
};

// 🛠 Notificación de tarea asignada
const enviarCorreoTarea = async ({ correo, nombre, tituloTarea }) => {
  const html = `
    <h2>Hola ${nombre},</h2>
    <p>Se te ha asignado una nueva tarea: <strong>${tituloTarea}</strong>.</p>
    <p>Por favor, revísala lo antes posible.</p>
  `;

  await enviarCorreo({
    to: correo,
    subject: "Nueva tarea asignada 🧩",
    html,
  });
};

// 🔄 Restablecer contraseña (con link)
const enviarCorreoResetPassword = async ({ correo, nombre, token }) => {
  const html = `
    <h2>Hola ${nombre},</h2>
    <p>Recibimos una solicitud para restablecer tu contraseña.</p>
    <p>
      <a href="http://localhost:5173/reset-password/${token}">
        Haz clic aquí para cambiar tu contraseña
      </a>
    </p>
    <p>Si no solicitaste esto, puedes ignorar este mensaje.</p>
  `;

  await enviarCorreo({
    to: correo,
    subject: "Restablecimiento de contraseña 🔒",
    html,
  });
};

// Exportar todos los métodos
module.exports = {
  enviarCorreoRegistro,
  enviarCorreoTarea,
  enviarCorreoResetPassword,
};
