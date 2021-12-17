// Variable donde se importa el modulo usuario
let User = require("../models/user");

// Variable para importar pass
let bcrypt = require("bcrypt-nodejs");
// Importamos el jwt
let jwt = require("../libs/jwt");

// funcion que regitra un usuario
const userRegister= (request, response) => {
    // console.log('request: ', request);
    // console.log('response: ', response);
    // Obtenemos los parametros del body del JSON (lo que viene en la API
    let params = request.body;
    // Utilizamos el modelo usuario (pero limpio)
    let user_ = new User(); // con la palabra new nos da el modelo limpio como cuando se creo (limpio)
    // Validamos el password para encriptarlo
    if (params.firstName && params.lastName && params.age && params.email && params.profile) {
        // Usamos bcrypt para encriptar el password
        bcrypt.hash(params.pass, null, null, (error, hash) => {
            // Si se encripta la contraseña 
            if (hash) {
                user_.firstName = params.firstName;
                user_.lastName = params.lastName;
                user_.age = params.age;
                user_.email = params.email;
                user_.pass = hash;
                user_.profile = params.profile;
                // Enviamso el modelo para registrar en Mongo DB
                user_.save((errorDB, saveUser) => {
                    if (errorDB) {
                        // Si hay un error
                        response.status(500).send({ err: "No se registro el usuario"});
                    } else {
                        // Si el proceso se completo
                        response.status(200).send({ user: saveUser });
                    }
                });
            } else {
                // Damos respuesta al error de encriptacion si lo hay
                response.status(400).send({ err: "No se encripto el pass y no se registro el usuario" });
            }
        });
    } else {
        // Validacion de datos del json
    }
};

// Metodo Login - Autenticacion
const userSignIn = (request, response) => {
    // Varaible para los parametros que llegan
    let params = request.body;
    // Buscamos el usuario en DB
    User.findOne({ email: params.email }, (errFind, respFind) => {
        if (errFind) {
            response.status(500).send({ message: "Error del servidor" });
        } else {
            if (respFind) {
                bcrypt.compare(params.pass, respFind.pass, (errCompPass, respCompPass) => {
                    if (respCompPass) {
                        if (params.getToken) {
                            response.status(200).send({ jwt: jwt.createToken(respFind), user: respFind });
                        } else {
                            response.status(200).send({ user: respCompPass, message: "Sin token" });
                        }    
                    } else {
                        response.status(401).send({ message: "Correo ó constraseña incorrectos" });   
                    }
                });
            } else {
                response.status(400).send({ message: "Correo ó constraseña incorrectos" });
            }
        }
    });
};

// Exportamos el modulo
module.exports = {
    userRegister,
    userSignIn,
};