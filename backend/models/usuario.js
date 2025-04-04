module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
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
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_area: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "usuario",
      timestamps: false, // desactiva campos createdAt y updatedAt
    }
  );

  return Usuario;
};
