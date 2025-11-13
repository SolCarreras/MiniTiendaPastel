const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");

// Listar todos los productos
router.get("/", productoController.listar);

// Crear un producto nuevo (por formulario)
router.post("/crear", productoController.crear);

module.exports = router;
