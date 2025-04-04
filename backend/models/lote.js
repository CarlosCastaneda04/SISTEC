module.exports = (sequelize, DataTypes) => {
  const Lote = sequelize.define(
    "Lote",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_componente: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_compra: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      precio_unitario: {
        type: DataTypes.FLOAT, // Puedes usar DECIMAL si quieres más precisión
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "lote",
      timestamps: false,
    }
  );

  return Lote;
};
