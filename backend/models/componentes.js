module.exports = (sequelize, DataTypes) => {
  const Componente = sequelize.define(
    "Componente",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      existencias: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cod_producto_especifico: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "componentes",
      timestamps: false,
    }
  );

  return Componente;
};
