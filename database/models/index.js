const { Sequelize, DataTypes  } = require ("sequelize");
const config = require('../config').development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions
  }
);




const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.Producto = require("./Producto")(sequelize, DataTypes);
db.Carrito = require("./Carrito")(sequelize, DataTypes);

// Relación
db.Carrito.belongsTo(db.Producto, { foreignKey: "producto_id", as: "producto" });
db.Producto.hasMany(db.Carrito, { foreignKey: "producto_id", as: "carritos" });


module.exports = db;
