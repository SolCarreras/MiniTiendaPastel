const db = require("../database/models");

const carritoController = {
  // 🛍️ Mostrar el contenido del carrito
  listar: async (req, res) => {
    try {
      const carrito = await db.Carrito.findAll({
        include: [{ model: db.Producto, as: "producto" }],
      });

      // Calcular el total
      const total = carrito.reduce((sum, item) => {
        return sum + item.cantidad * item.producto.precio;
      }, 0);

      res.render("carrito/index", { carrito, total });
    } catch (error) {
      console.error("❌ Error al obtener carrito:", error);
      res.status(500).send("Error al obtener carrito");
    }
  },

  // ➕ Agregar un producto al carrito
  agregar: async (req, res) => {
    try {
      const { producto_id, cantidad } = req.body;

      // Verificar que la cantidad sea un número válido
      const cantidadNum = parseInt(cantidad);
      if (isNaN(cantidadNum) || cantidadNum <= 0) {
        console.error("⚠️ Cantidad inválida recibida:", cantidad);
        return res.status(400).send("Cantidad inválida");
      }

      // Buscar si ya existe en el carrito
      const productoExistente = await db.Carrito.findOne({
        where: { producto_id },
      });

      if (productoExistente) {
        productoExistente.cantidad += cantidadNum;
        await productoExistente.save();
      } else {
        await db.Carrito.create({ producto_id, cantidad: cantidadNum });
      }

      res.redirect("/carrito");
    } catch (error) {
      console.error("❌ Error al agregar al carrito:", error);
      res.status(500).send("Error al agregar al carrito");
    }
  },

  // 🗑️ Eliminar un producto del carrito
  eliminar: async (req, res) => {
    try {
      const { id } = req.params;
      await db.Carrito.destroy({ where: { id } });
      res.redirect("/carrito");
    } catch (error) {
      console.error("❌ Error al eliminar producto del carrito:", error);
      res.status(500).send("Error al eliminar producto del carrito");
    }
  },

  // 🚫 Vaciar todo el carrito
  vaciar: async (req, res) => {
    try {
      await db.Carrito.destroy({ where: {} }); // elimina todo
      res.redirect("/carrito");
    } catch (error) {
      console.error("❌ Error al vaciar el carrito:", error);
      res.status(500).send("Error al vaciar el carrito");
    }
  },
};

module.exports = carritoController;


