// Varaible express
let express = require("express");

// Importamos el controlador de email
let Email = require("../controllers/email");

// Creamos la api
let api = express.Router();

// Servicio de GET de prueba
// http://localhost:3001/api/hello
api.get("/hello", Email.hello);

// Servicio POST para enviar correos
// http://localhost:3001/api/send-email 
api.post("/send-email", Email.sendEmailAlertIncapacity);

// Servicio GET para obtener la data obtenida por el OCR
// http://localhost:3001/api/send-email-report 
api.get("/data-ocr", Email.getDataOCRTranscription);

// Servicio POST para enviar correo con reporte de afiliados con mas de 540 dias de incapacidad 
// http://localhost:3001/api/send-email-report 
api.post("/send-email-report", Email.sendEmailReportPatients540days);


// Exportamos el modulo
module.exports = api;