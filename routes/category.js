// Variable express
let express = require("express");
// Importamos el controlador de Categorias
let Category = require("../controllers/category");

// Creamos la api para controlar las rutas
let api = express.Router();

// Rutas de la api
api.post("/categoria/registrar-categoria", Category.registerCategory);
api.get("/categoria/:id", Category.searchCategory);
// api.get("/categoria", Category.listCategories);
api.get("/categoria/:name?", Category.listCategories);
api.post("/categoria/:name?", Category.listCategories);
api.put("/categoria/editar-categoria/:id", Category.editCategory);
api.delete("/categoria/eliminar-categoria/:id", Category.deleteCategory);

// Exportamos el modulo
module.exports = api;