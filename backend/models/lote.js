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
        references: { model: "componentes", key: "id" },
      },
      id_compra: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "lote_proveedor", key: "id" },
      },
      precio_unitario: { type: DataTypes.INTEGER, allowNull: false },
      cantidad: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "lote",
      timestamps: false,
    }
  );

  return Lote;
};
