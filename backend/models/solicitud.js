module.exports = (sequelize, DataTypes) => {
  const Solicitud = sequelize.define(
    "Solicitud",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "usuario",
          key: "id",
        },
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      detalles: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      prioridad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ubicacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comentario: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_area: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "area",
          key: "id",
        },
      },
    },
    {
      tableName: "Solicitudes",
      timestamps: false,
    }
  );

  return Solicitud;
};
