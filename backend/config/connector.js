const sql = require("mssql");
const db = require("../models");
const insertarDatosIniciales = require("../models/InitialData");  // Ajustar la ruta de la importación

// Config de conexión general (sin DB específica)
const serverConfig = {
  user: "sa",
  password: "1704",
  server: "localhost",
  database: "master", // para crear desde aquí
  options: {
    trustServerCertificate: true,
  },
};

const dbName = "gestor_soporte"; // cambia por el nombre real de tu BD

const connectToDatabase = async () => {
  try {
    // 1. Conexión inicial al servidor
    const pool = await sql.connect(serverConfig);

    // 2. Verificamos si la DB existe
    const result = await pool.request()
      .query(`IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = '${dbName}')
             BEGIN
               CREATE DATABASE [${dbName}]
             END`);

    console.log(`✅ Base de datos '${dbName}' verificada o creada.`);

    await sql.close(); // Cierra conexión con 'master'

    // 3. Conexión Sequelize a la base ya creada
    await db.sequelize.authenticate();
    console.log("🔗 Conexión con Sequelize exitosa.");

    // 4. Sincronización de modelos
    await db.sequelize.sync({ force: false });
    console.log("📦 Tablas sincronizadas correctamente.");

     // 5. Insertar los datos iniciales
     await insertarDatosIniciales();  // Inserta los datos iniciales
  } catch (error) {
    console.error("❌ Error al conectar o crear la base de datos:", error);
  }
};

module.exports = connectToDatabase;
