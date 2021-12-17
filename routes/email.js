// Varaible express
let express = require("express");

// Importamos el controlador de email
let Email = require("../controllers/email");

// Creamos la api
let api = express.Router();

// Servicio POST para enviar correos
// http://localhost:3001/api/send-email 
api.post("/send-email", Email.sendEmail);

// Servicio POST para registrar actividad en envio de correos
// http://localhost:3001/api/registrar-usuario 
api.post("/track-email", Email.trackEmail);

// Exportamos el modulo
module.exports = api;