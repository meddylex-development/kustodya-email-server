// Importamos el modelo Categoria
let Category = require("../models/category");

// Registramos la categorya mediante el metodo registerCategory
const registerCategory = (req, res) => {
    // Obtenemos los datos del json
    let params = req.body;
    // Creamos uns nueva instancia de Categoria
    let categoty_ = new Category();
    // Guardamos los datos del request en la collecion
    categoty_.name = params.name;
    categoty_.description = params.description;
    // Gurdamos la info en MongoDB - save();
    categoty_.save((err, saveCategory) => {
        if (err) {
            res.status(500).send({ message: "Error al conectar al servidor" });
        } else {
            if (saveCategory) {
                res.status(200).send({ category: saveCategory });
            } else {
                res.status(401).send({ message: "No se pudo registrar la categoria" });
            }
        }
    });
};

// Buscar Categorias
const searchCategory = (req, res) => {
    // Obtenemos los datos del json
    let params = req.params;
    let id = params["id"];
    Category.findById({ _id:id }, (err, datosCategory) => {
        if (err) {
            res.status(500).send({ message: "Error al conectar al servidor" });
        } else {
            if (datosCategory) {
                res.status(200).send({ category: datosCategory });
            } else {
                res.status(401).send({ message: "La categoria no existe" });
            }
        }
    });
};

// Listar categorias con o sin filtro
const listCategories = (req, res) => {
    // Obtenemos los datos del json
    let params = req.params;
    let nombre = params["name"];
    Category.find({ name: new RegExp(nombre, "i") }, (err, collectionCatgories) => {
        if (err) {
            res.status(500).send({ message: "Error al conectar al servidor" });
        } else {
            if (collectionCatgories) {
                res.status(200).send({ categories: collectionCatgories });
            } else {
                res.status(401).send({ message: "No hay categorias" });
            }
        }
    });
};

// Editar Categoria
const editCategory = (req, res) => {
    // Obtenemos el id de la categoria
    let id = req.params["id"];
    // Obtenemos los datos que llegan de la api
    let params = req.body;
    // Buscar la categoria por ID y ediatarla
    Category.findByIdAndUpdate({ _id:id }, { 'name': params.name, 'description': params.description }, (err, editSuccess) => {
        if (err) {
            res.status(500).send({ message: "Error al conectar con el servidor" });
        } else {
            if (editSuccess) {
                res.status(200).send({ category: editSuccess });
            } else {
                res.status(401).send({ message: "La categoria no se pudo editar" });
            }
        }
    });
}

// Eliminar Categoria
const deleteCategory = (req, res) => {
    // Obtenemos el id de la categoria
    let id = req.params["id"];
    // Obtenemos los datos que llegan de la api
    let params = req.body;
    // Buscar la categoria por ID y ediatarla
    Category.findByIdAndDelete({ _id:id }, (err, deleteSuccess) => {
        if (err) {
            res.status(500).send({ message: "Error al conectar con el servidor" });
        } else {
            if (deleteSuccess) {
                res.status(200).send({ category: deleteSuccess });
            } else {
                res.status(401).send({ message: "La categoria no se pudo eliminar" });
            }
        }
    });
}

module.exports = {
    registerCategory,
    searchCategory,
    listCategories,
    editCategory,
    deleteCategory,
}