const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("gestor_soporte", "sa", "1704", {
  host: "localhost",
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
  },
});

module.exports = sequelize;
