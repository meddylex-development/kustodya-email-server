// Importamos modulo de mongoose
let mongoose = require("mongoose");

// Creaar un esquema del usuario
let Schema = mongoose.Schema;

// Modelamos el esquema
let buyDetailtSchema = Schema({
    idCourse: { type: Schema.ObjectId, ref: "course" },
    idBuy: { type: Schema.ObjectId, ref: "buy" },
    quantity: Number,
    dateCreated: { type: Date, default: Date.now }
});

// Exportamos el modelo usuario
module.exports = mongoose.model("buyDetailt", buyDetailtSchema);