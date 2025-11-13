const express = require("express");
const router = express.Router();
const carritoController = require("../controllers/carritoController");

// Mostrar el carrito
router.get("/", carritoController.listar);

// Agregar producto al carrito
router.post("/agregar", carritoController.agregar);

router.post("/eliminar/:id", carritoController.eliminar);
router.post("/vaciar", carritoController.vaciar);

module.exports = router;
