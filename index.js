// Variables de modulos
let express = require("express"); // Se importa la libreria de expres para que funcione como backend el entorno
let bodyParser = require("body-parser"); // Analiza los json y los decodifica para enviarlos y recibirlos desde back
let mongoose = require("mongoose"); // Libreria para trabajar con las base de datos mongo DB
// const nodemailer = require('nodemailer');

// Variable para puerto de conexion del backend
let port = process.env.PORT || 3001 // Procesar y enviar puertos. process nos ayuda a mantener los dos entornos tanto de prod como local:3001
// Variable de la aplicacion
let app = express();

// Se importan las rutas 
let Email = require("./routes/email");

// Conexion a DB Mongo

// Ruta de conexion que se tiene a la abase de datos 
// (bitstoredb es el nombre de la base de datos, que la crea asi no exista en mongo)
// 27017 es el puerto designado por defecto para mongo
// Se crera callback de cone
// mongoose.connect("mongodb://localhost:27017/kustodyadb",
mongoose.connect("mongodb+srv://meddylex_development:Meddylex123@cluster0.emul9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { 
        useUnifiedTopology: true, 
        useNewUrlParser: true 
    }, (error, response) => { 
    // console.log('error: ', error);
    // console.log('response: ', response);
    if (error) {
        console.log('error: ', error);
        // Es una excepcion que nos detiene 
        // el servicio si llega un error que no 
        // conocemos de mongo y no podemos controlar asi 
        // que usamos el throw para manejar y controlar el error
        throw error;
    } else {
        // console.log('response: ', response);
        console.log("Servidor DB Mongo: ON - Ejecutandose ...");
        // Escucha mediante el puerto y la conexion
        // app.listen(port, callback);
        app.listen(port, () => {
            console.log("Servidor backend funcionando en el puerto: " + port);     
        });
    }
});

// const mensajeRespuesta = () => {
//     console.log("Servidor backend funcionando en el puerto: " + port); 
// };

// listen(port, mensajeRespuesta);

// Analizar las url
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Content-Type: application/json");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
    next();
  });

// usar rutas (API)
app.use("/api", Email);

// Modulo para importar
module.exports = app;