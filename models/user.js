// Importamos modulo de mongoose
let mongoose = require("mongoose");

// Creaar un esquema del usuario
let Schema = mongoose.Schema;

// Modelamos el esquema
let userSchema = Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    pass: String,
    profile: String,
    dateCreated: { type: Date, default: Date.now }
});

// Exportamos el modelo usuario
module.exports = mongoose.model("user", userSchema);