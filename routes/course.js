// Variable de importacion de express
let express = require("express");

// Importamos el controlador de Curso
let Course = require("../controllers/course");

// Importamos libreria para la carga de archivos multiparty
let multiparty = require("connect-multiparty");

// Importamos modulo path por medio del multiparty
let path = multiparty({ load: "./uploads/imgcurso" });

// Creamos la api para controlar las rutas
let api = express.Router();

// Rutas de las api
api.post("/curso/registrar-curso", path, Course.registerCourse);
api.get("/curso/:nombre?", Course.listCourses);

// Exportamos el modulo
module.exports = api;