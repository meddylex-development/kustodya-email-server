// Varaible express
let express = require("express");

// Importamos el controlador de usuario
let User = require("../controllers/user");

// Creamos la api
let api = express.Router();

// Servicio POST (registrar) 
// http://localhost:3001/api/registrar-usuario 
api.post("/registrar-usuario", User.userRegister);
// Servicio para el login POST (login)
// http://localhost:3001/api/sign-in 
api.post("/sign-in", User.userSignIn);

api.get("/hello", User.hello);

// Exportamos el modulo
module.exports = api;