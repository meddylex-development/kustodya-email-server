// Importamos el modelo de Curso
let Course = require("../models/course");

// Importamos modulo node para el control de ficheros
let fs = require("fs");

// Importamos modulo path
let path = require("path");

// Importamos la libreria para el manejo de horas fechas - tiempo
let moment = require("moment");

// Registrar curso
const registerCourse = (req, res) => {
    // Obtenemos datos del JSON
    let params = req.body;
    // Creamos nueva instancia de Courso
    let course_ = new Course();
    // Registramos producto
    if (params.name && 
        params.description && 
        // params.image && 
        params.totalPrice && 
        params.buyPrice && 
        params.cupos && 
        params.idCategory && 
        params.points) {

        // Creamos variables donde quedara la imagen cargada - c:://Usuario/Descktop/js.jpg
        console.log('req.files: ', req.files);
        let imagePath = req.files.image.path;
        console.log('imagePath: ', imagePath); // Borrar despues de probar

        // Generamos codigo consecutivo con fecha para el nombre de las imagenes
        let nameImage = moment().unix();
        console.log('nameImage: ', nameImage); // Borrar despues de probar

        // Creamos variable de la nueva ruta
        let routeServer = "./uploads/imgcurso/" + nameImage + path.extname(imagePath);
        console.log('routeServer: ', routeServer); // Borrar despues de probar

        // Guardamos la imagen a la nueva ruta
        fs.createReadStream(imagePath).pipe(fs.createWriteStream(routeServer));
        // Nombre del archivo que quedara en BD
        let bdImg = nameImage + path.extname(imagePath);

        course_.name = params.name;
        course_.description = params.description;
        course_.image = bdImg;
        course_.totalPrice = params.totalPrice;
        course_.buyPrice = params.buyPrice;
        course_.cupos = params.cupos;
        course_.idCategory = params.idCategory;
        course_.points = params.points;
        course_.save((err, saveSuccessRes) => {
            if (err) {
                res.status(500).send({ message: "Error al conectar al servidor" });
            } else {
                if (saveSuccessRes) {
                    res.status(200).send({ course: saveSuccessRes });
                } else {
                    res.status(401).send({ message: "No se pudo registrar la categoria" });
                }
            }
        });
    } else {
        res.status(401).send({ message: "No se pudo registrar la categoria" });
    }
};

// Listar cursos
const listCourses = (req, res) => {
    // Obtenemos los datos del json
    let params = req.params;
    let nombre = params["name"];
    Course.find({ name: new RegExp(nombre, "i") }).populate("idCategory").exec((err, respFindCourseSuccess) => {
        if (err) {
            res.status(500).send({ message: "Error al conectar al servidor" });
        } else {
            if (respFindCourseSuccess) {
                res.status(200).send({ cursos: respFindCourseSuccess });
            } else {
                res.status(401).send({ message: "No hay cursos" });
            }
        }
    });
};

// Exportamos el modulo con sus funciones
module.exports = {
    registerCourse,
    listCourses,
};