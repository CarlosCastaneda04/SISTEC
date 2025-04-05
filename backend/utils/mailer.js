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

// Estilos base reutilizables
const cardStyles = `
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 25px;
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 20px auto;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const headerStyles = `
  color: #2c3e50; 
  margin: 0 0 20px 0; 
  font-size: 20px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
`;

const img_logo = `https://i.ibb.co/m56BWbZz/image-Photoroom.png`;
// MÉTODOS

// 📨 Bienvenida al registrarse
const enviarCorreoRegistro = async (usuario) => {
  const html = `
    <div style="${cardStyles}">
      <div style="text-align: center; margin-bottom: 25px;">
        <img src="${img_logo}" alt="Logo SISTEC" style="max-width: 200px; height: auto;">
      </div>
      <h2 style="${headerStyles}">¡Bienvenido a SISTEC! 🎉</h2>
      <div style="color: #4a4a4a; font-size: 14px; line-height: 1.6;">
        <p style="margin: 10px 0;"><strong>Nombre:</strong> ${
          usuario.nombre
        }</p>
        <p style="margin: 10px 0;"><strong>Correo:</strong> ${
          usuario.correo
        }</p>
        <p style="margin: 10px 0;"><strong>Fecha de registro:</strong> ${new Date().toLocaleDateString(
          "es-ES",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
        )}</p>
      </div>
      <p style="margin-top: 20px; color: #7f8c8d; font-size: 13px;">
        Este es un correo automático, por favor no responder.
      </p>
    </div>
  `;

  await enviarCorreo({
    to: usuario.correo,
    subject: "Bienvenido a SISTEC 🎉",
    html,
  });
};

// 🛠 Notificación de tarea asignada
const enviarCorreoTarea = async ({
  correo,
  nombre,
  tituloTarea,
  prioridad,
}) => {
  const html = `
    <div style="${cardStyles}">
      <div style="text-align: center; margin-bottom: 25px;">
        <img src="${img_logo}" alt="Logo SISTEC" style="max-width: 200px; height: auto;">
      </div>
      <h2 style="${headerStyles.replace(
        "#3498db",
        "#e67e22"
      )}">Nueva tarea asignada 🧩</h2>
      <div style="color: #4a4a4a; font-size: 14px; line-height: 1.6;">
        <p style="margin: 10px 0;"><strong>Responsable:</strong> ${nombre}</p>
        <p style="margin: 10px 0;"><strong>Tarea:</strong> ${tituloTarea}</p>
        <p style="margin: 10px 0;"><strong>Prioridad:</strong> 
          <span style="color: ${
            prioridad === "Alta" ? "#c0392b" : "#27ae60"
          }">${prioridad}</span>
        </p>
        <p style="margin: 10px 0;"><strong>Fecha asignación:</strong> ${new Date().toLocaleDateString()}</p>
      </div>
      <p style="margin-top: 20px; color: #7f8c8d; font-size: 13px;">
        Por favor revisar la plataforma para más detalles.
      </p>
    </div>
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
    <div style="${cardStyles}">
      <div style="text-align: center; margin-bottom: 25px;">
        <img src="${img_logo}" alt="Logo SISTEC" style="max-width: 200px; height: auto;">
      </div>
      <h2 style="${headerStyles.replace(
        "#3498db",
        "#27ae60"
      )}">Restablecer contraseña 🔒</h2>
      <div style="color: #4a4a4a; font-size: 14px; line-height: 1.6;">
        <p style="margin: 10px 0;">Hola ${nombre},</p>
        <p style="margin: 10px 0;">Haz clic en el botón para cambiar tu contraseña:</p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="http://localhost:5173/reset-password/${token}" 
             style="
                background: #3498db;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
                font-weight: bold;
                font-size: 15px;
             ">
            Cambiar contraseña
          </a>
        </div>
        <p style="margin: 10px 0; color: #e74c3c;">
          <strong>Importante:</strong> El enlace expirará en 1 hora.
        </p>
      </div>
    </div>
  `;

  await enviarCorreo({
    to: correo,
    subject: "Restablecimiento de contraseña 🔒",
    html,
  });
};

// 🚨 Alerta de stock bajo
const enviarCorreoAlertaStock = async (componente, stockActual) => {
  const html = `
    <div style="${cardStyles}">
      <div style="text-align: center; margin-bottom: 25px;">
        <img src="${img_logo}" alt="Logo SISTEC" style="max-width: 200px; height: auto;">
      </div>
      <h2 style="${headerStyles.replace(
        "#3498db",
        "#e67e22"
      )}">¡Alerta de stock bajo! ⚠️</h2>
      <div style="color: #4a4a4a; font-size: 14px; line-height: 1.6;">
        <p style="margin: 10px 0;"><strong>Componente:</strong> ${
          componente.nombre
        }</p>
        <p style="margin: 10px 0;"><strong>Código:</strong> ${
          componente.cod_producto_general
        }</p>
        <p style="margin: 10px 0;"><strong>Stock actual:</strong> 
          <span style="color: #c0392b; font-weight: bold;">${stockActual} unidades</span>
        </p>
        <p style="margin: 10px 0;"><strong>Nivel mínimo:</strong> 5 unidades</p>
        <p style="margin: 10px 0;"><strong>Última actualización:</strong> ${new Date().toLocaleDateString(
          "es-ES",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        )}</p>
      </div>
      <div style="margin-top: 25px; background: #fff3cd; padding: 15px; border-radius: 5px;">
        <p style="margin: 0; color: #856404;">
          ⚠️ Por favor realizar una nueva solicitud de compra o producción.
        </p>
      </div>
      <div style="text-align: center; margin: 25px 0;">
        <a href="http://localhost:5173/inventario" 
           style="
              background: #3498db;
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 5px;
              display: inline-block;
              font-weight: bold;
              font-size: 15px;
           ">
          Ver inventario
        </a>
      </div>
    </div>
  `;

  await enviarCorreo({
    to: "encargado@empresa.com", // Cambiar por el correo del responsable
    subject: `Alerta de stock: ${componente.nombre}`,
    html,
  });
};

module.exports = {
  enviarCorreoRegistro,
  enviarCorreoTarea,
  enviarCorreoAlertaStock,
  enviarCorreoResetPassword,
};
