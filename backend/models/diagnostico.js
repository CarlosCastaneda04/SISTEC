module.exports = (sequelize, DataTypes) => {
  const Diagnostico = sequelize.define(
    "Diagnostico",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_solicitud: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      solucion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "diagnostico",
      timestamps: false,
    }
  );

  return Diagnostico;
};
