// Creaar un esquema del perfil
let schema = mongoose.Schema;

// Modelamos el esquema
let profleSchema = schema({
    nombre: String,
    dateCreated: { type: Date, default: Date.now }
});

// Exportamos el modelo perfil
module.exports = mongoose.model("profile", profleSchema);