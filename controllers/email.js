// Variable donde se importa el modulo usuario
let Email = require("../models/email");
let nodemailer = require('nodemailer');

// Variable para importar pass
let bcrypt = require("bcrypt-nodejs");
// Importamos el jwt
let jwt = require("../libs/jwt");

// funcion que regitra un usuario
const sendEmail= (request, response) => {
    // console.log('request: ', request);
    // console.log('response: ', response);
    // Obtenemos los parametros del body del JSON lo que viene en la API
    let params = request.body;
    console.log('params: ', params);

    let transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        // service: 'gmail',
        auth: {
          user: '38ce556befd572',
          pass: '11108f1df482e7'
        }
    });
      
    let mailOptions = {
        from: 'meddylex.development@gmail.com',
        to: 'gepinilladev@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
    
};

// Metodo Login - Autenticacion
const trackEmail = (request, response) => {
    // Varaible para los parametros que llegan
    let params = request.body;
    // Buscamos el usuario en DB
    // User.findOne({ email: params.email }, (errFind, respFind) => {
    //     if (errFind) {
    //         response.status(500).send({ message: "Error del servidor" });
    //     } else {
    //         if (respFind) {
    //             bcrypt.compare(params.pass, respFind.pass, (errCompPass, respCompPass) => {
    //                 if (respCompPass) {
    //                     if (params.getToken) {
    //                         response.status(200).send({ jwt: jwt.createToken(respFind), user: respFind });
    //                     } else {
    //                         response.status(200).send({ user: respCompPass, message: "Sin token" });
    //                     }    
    //                 } else {
    //                     response.status(401).send({ message: "Correo ó constraseña incorrectos" });   
    //                 }
    //             });
    //         } else {
    //             response.status(400).send({ message: "Correo ó constraseña incorrectos" });
    //         }
    //     }
    // });
};

// Exportamos el modulo
module.exports = {
    sendEmail,
    trackEmail,
};