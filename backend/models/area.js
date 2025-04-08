module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define(
    "Area",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "area",
      timestamps: false,
    }
  );

  return Area;
};
