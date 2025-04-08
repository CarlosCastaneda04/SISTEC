module.exports = (sequelize, DataTypes) => {
  const UsoComponente = sequelize.define(
    "UsoComponente",
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
        references: { model: "Solicitudes", key: "id" },
      },
      id_componente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "componentes", key: "id" },
      },
      cant_utilizada: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "uso_componentes",
      timestamps: false,
    }
  );

  return UsoComponente;
};
