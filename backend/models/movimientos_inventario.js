module.exports = (sequelize, DataTypes) => {
  const MovimientoInventario = sequelize.define(
    "MovimientoInventario",
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
      tipo_movimiento: { type: DataTypes.STRING, allowNull: false },
      cantidad: { type: DataTypes.INTEGER, allowNull: false },
      fecha: { type: DataTypes.DATE, allowNull: false },
      cod_producto_general: { type: DataTypes.STRING, allowNull: false },
      precio_unitario: { type: DataTypes.DOUBLE, allowNull: false },
    },
    {
      tableName: "movimientos_inventario",
      timestamps: false,
    }
  );

  return MovimientoInventario;
};
