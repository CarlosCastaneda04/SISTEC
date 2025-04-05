module.exports = (sequelize, DataTypes) => {
  const Solicitud = sequelize.define(
    "Solicitud",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_area: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "Solicitudes",
      timestamps: false,
    }
  );

  return Solicitud;
};
