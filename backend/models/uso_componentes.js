module.exports = (sequelize, DataTypes) => {
  const UsoComponentes = sequelize.define(
    "UsoComponentes",
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
      id_componente: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cant_utilizada: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "uso_componentes",
      timestamps: false,
    }
  );

  return UsoComponentes;
};
