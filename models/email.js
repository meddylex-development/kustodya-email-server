// Importamos modulo de mongoose
let mongoose = require("mongoose");

// Creaar un esquema del email
let Schema = mongoose.Schema;

// Modelamos el esquema
let emailSchema = Schema({
    email: String,
    dateCreated: Number,
    dateUpdated: Number,
});

// Exportamos el modelo email
module.exports = mongoose.model("track-email", emailSchema);