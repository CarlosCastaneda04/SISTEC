module.exports = (sequelize, DataTypes) => {
  const LoteProveedor = sequelize.define(
    "LoteProveedor",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      precio_lote: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "lote_proveedor",
      timestamps: false,
    }
  );

  return LoteProveedor;
};
