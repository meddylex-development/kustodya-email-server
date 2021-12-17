// Variable Mongoose
let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

// Se crea el esquema
let courseSchema = Schema({
  name: String,
  description: String,
  image: String,
  totalPrice: Number,
  buyPrice: Number,
  cupos: Number,
  idCategory: { type: Schema.ObjectId, ref: "category" },
  points: Number,
});
// Se exporta el modulo
module.exports = mongoose.model("course", courseSchema);