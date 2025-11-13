module.exports = (sequelize, DataTypes) => {
  const Carrito = sequelize.define(
    "Carrito",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      tableName: "Carrito",
      timestamps: false,
    }
  );

  return Carrito;
};
