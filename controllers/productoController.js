const db = require("../database/models");

const productoController = {
  // Mostrar todos los productos
  listar: async (req, res) => {
    try {
      const productos = await db.Producto.findAll();
      res.render("productos", { productos });
    } catch (error) {
      console.error("❌ Error al listar productos:", error);
      res.status(500).send("Error al obtener productos");
    }
  },

  // Crear un nuevo producto
  crear: async (req, res) => {
    try {
      const { nombre, descripcion, precio, imagen, stock } = req.body;
      await db.Producto.create({ nombre, descripcion, precio, imagen, stock });
      res.redirect("/productos");
    } catch (error) {
      console.error("❌ Error al crear producto:", error);
      res.status(500).send("Error al crear producto");
    }
  },
};

module.exports = productoController;
