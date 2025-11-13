const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const db = require("./database/models");
require('dotenv').config();


// Configuración
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// Importar rutas
const productoRoutes = require("./routes/productoRoutes");
const carritoRoutes = require("./routes/carritoRoutes");
const mainRoutes = require("./routes/mainRoutes");

// Usar rutas
app.use("/productos", productoRoutes);
app.use("/carrito", carritoRoutes);
app.use("/", mainRoutes);





// Servidor
const PORT = process.env.PORT || 8000;
// Iniciar servidor
app.listen(PORT, async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Conexión con la base de datos exitosa");
    console.log(`🌸 Servidor escuchando en puerto ${PORT}`);
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
  }
});
