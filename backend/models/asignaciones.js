module.exports = (sequelize, DataTypes) => {
  const Asignacion = sequelize.define(
    "Asignacion",
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
      id_tecnico: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fecha_asignacion: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fecha_fin: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      notas: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "asignaciones",
      timestamps: false,
    }
  );

  return Asignacion;
};
