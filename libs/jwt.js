// Variable donde importamos el jwt
let jwt = require("jwt-simple");

// Importamos librerias para fechas
let moment = require("moment");

// Clave secreta
let secret = "bit21store"; // Clave asignada por el equipo de desarrollo

exports.createToken = function (usuario) {
    console.log('usuario: ', usuario);
    // payload es una carga util
    let payload = {
        _id: usuario._id,
        firstName: usuario.firstName,
        lastName: usuario.lastName,
        age: usuario.age,
        email: usuario.email,
        profile: usuario.profile,
        iat: moment().unix,
    };

    return jwt.encode(payload, secret);
}