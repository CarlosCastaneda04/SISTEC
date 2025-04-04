const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("gestor_soporte", "sa", "slayerdek", {
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
