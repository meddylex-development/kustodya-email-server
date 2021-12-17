// Variable Mongoose
let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

// Se crea el esquema
let buySchema = Schema({
  idStudent: { type: Schema.ObjectId, ref: "estudiante" },
  idUser: { type: Schema.ObjectId, ref: "usuario" },
  buyDate: { type: Date, default: Date.now },
});
// Se exporta el modulo
module.exports = mongoose.model("buy", buySchema);