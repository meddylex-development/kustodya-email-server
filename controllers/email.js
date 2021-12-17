// Variable donde se importa el modulo usuario
let Email = require("../models/email");
let nodemailer = require('nodemailer');
let fs = require('fs');
let path = require("path");
let handlebars = require('handlebars');
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Worksheet Name');
var http = require('http');

// Variable para importar pass
let bcrypt = require("bcrypt-nodejs");
// Importamos el jwt
let jwt = require("../libs/jwt");

const readHTMLFile = (pathTmp) => {
  console.log('pathTmp: ', pathTmp);
  return new Promise((resolve, reject) => {
    let pathTemplate = path.join(__dirname, '..', pathTmp);
    console.log('pathTemplate: ', pathTemplate);
    fs.readFile(pathTemplate, { encoding: 'utf-8' }, function (err, html) {
      // console.log('html: ', html);
        if (err) {
           reject(err); 
           throw err;
        }
        else {
            resolve(html);
        }
    });
  })
};

// funcion que regitra un usuario
const sendEmail= (request, response) => {
    // console.log('request: ', request);
    // console.log('response: ', response);
    // Obtenemos los parametros del body del JSON lo que viene en la API
    let params = request.body;
    console.log('params: ', params);

    readHTMLFile('templates/email-alert-incapacity-02.html').then((responseData) => {
      // console.log('responseData: ', responseData);

      let urlFile = path.join(__dirname, '..', 'templates/files/DiasAcumulados540.xlsx');
      console.log('urlFile: ', urlFile);
      let urlLogo = path.join(__dirname, '..', 'templates/images/KustodyYmeddylex.png');
      console.log('urlLogo: ', urlLogo);
      let urlPhotoProfileDoctor = path.join(__dirname, '..', 'templates/images/person_2.jpeg');
      console.log('urlPhotoProfileDoctor: ', urlPhotoProfileDoctor);

      let patientIncapacities = params.patientIncapacities;
      console.log('patientIncapacities: ', patientIncapacities);

      let template = handlebars.compile(responseData);
      let replacements = {
        urlLogo: urlLogo,
        urlPhotoProfileDoctor: urlPhotoProfileDoctor,
        patientname: params.patientname,
        patientEmail: params.patientEmail,
        patientDocumentNumber: params.patientDocumentNumber,
        patientTotalIncapacities: params.patientIncapacities['totalItems'],
        doctorname: params.doctorname,
        doctorEmail: params.doctorEmail,
        doctorjobeps: params.doctorjobeps,
        doctorjobips: params.doctorjobips,
        doctorDocumentNumber: params.doctorDocumentNumber,
        doctorMedicalRegister: params.doctorMedicalRegister,
        doctorEspeciality: params.doctorEspeciality,
        // correlationIncapacity: params.correlationIncapacity['bProrroga'],
        flagDiasDeIncapacidad: params.flagDiasDeIncapacidad,
        diasAcumuladosProrroga: params.diasAcumuladosProrroga,
        diasDeIncapacidadOtorgados: params.diasDeIncapacidadOtorgados,
        diasMaximoConsulta: params.diasMaximoConsulta,
        diasExcedidosDiferencia: (params.diasMaximoConsulta && params.diasDeIncapacidadOtorgados) ? params.diasDeIncapacidadOtorgados - params.diasMaximoConsulta : '0',
        diasDeIncapacidadOtorgadosJustificacion: params.diasDeIncapacidadOtorgadosJustificacion,
        patientDiagnostics: params.patientDiagnostics,
        patientDaysGaratedDescription: params.patientDaysGaratedDescription,
        patientConditionMedicalDescription: params.patientConditionMedicalDescription,
      };
      console.log('replacements: ', replacements);
      let htmlToSend = template(replacements);
      // console.log('htmlToSend: ', htmlToSend);
      let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465, 
          secure: true,
          // service: 'gmail',
          auth: {
            user: 'meddylex.development@gmail.com',
            pass: 'eejnoxuksuawommh'
          }
      });
        
      let mailOptions = {
          from: 'Kustodya App <meddylex.development@gmail.com>',
          to: params.email,
          subject: params.subject,
          // text: 'That was easy!'
          html : htmlToSend,
      };
        
      transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
            response.status(500).send({ error: error });
          } else {
            console.log('Email sent: ' + info.response);
            response.status(200).send({ response: info });
            // getDataReport('http://meddylex-001-site4.itempurl.com/API').then(resp => {
            //   console.log('resp: ', resp);
            //   fnGenerateXlsxFromJson().then(respFile => {
            //     console.log('respFile: ', respFile);
            //   });
            // });
            
          }
      });
    })    
};

// Metodo Login - Autenticacion
const trackEmail = (request, response) => {
    // Varaible para los parametros que llegan
    let params = request.body;
    // Buscamos el usuario en DB
    // User.findOne({ email: params.email }, (errFind, respFind) => {
    //     if (errFind) {
    //         response.status(500).send({ message: "Error del servidor" });
    //     } else {
    //         if (respFind) {
    //             bcrypt.compare(params.pass, respFind.pass, (errCompPass, respCompPass) => {
    //                 if (respCompPass) {
    //                     if (params.getToken) {
    //                         response.status(200).send({ jwt: jwt.createToken(respFind), user: respFind });
    //                     } else {
    //                         response.status(200).send({ user: respCompPass, message: "Sin token" });
    //                     }    
    //                 } else {
    //                     response.status(401).send({ message: "Correo ó constraseña incorrectos" });   
    //                 }
    //             });
    //         } else {
    //             response.status(400).send({ message: "Correo ó constraseña incorrectos" });
    //         }
    //     }
    // });
};

const fnGenerateXlsxFromJson = (data) => {
  console.log('data: ', data);
  return new Promise ((resolve, reject) => {
    const data = [
    {
        "name":"Shadab Shaikh",
        "email":"shadab@gmail.com",
        "mobile":"1234567890"
    }
    ]

    const headingColumnNames = [
        "Name",
        "Email",
        "Mobile",
    ]

    //Write Column Title in Excel file
    let headingColumnIndex = 1;
    headingColumnNames.forEach(heading => {
        ws.cell(1, headingColumnIndex++)
            .string(heading)
    });

    //Write Data in Excel file
    let rowIndex = 2;
    data.forEach( record => {
        let columnIndex = 1;
        Object.keys(record ).forEach(columnName =>{
            ws.cell(rowIndex,columnIndex++)
                .string(record [columnName])
        });
        rowIndex++;
    }); 
    wb.write('TeacherData.xlsx');
    resolve(true);
  });
};

const getDataReport = (url_api) => {
  return new Promise ((resolve, reject) => {

    // fetch('http://meddylex-001-site4.itempurl.com/API').then(res => {
    //   let data = res.json();
    //   console.log('data: ', data);
    //   resolve(data);
    // }).then((responseData) => {
    //   console.log('responseData: ', responseData);
    //   resolve(responseData);
    // }).catch(err => {
    //   console.log(err);
    //   reject(err);
    // });

    return new Promise((resolve, reject) => {
      // let xobj = new XMLHttpRequest();
      let urlAPI = url_api;
      // let path = '/users';
 
      let options = {
          // host: host,
          // port: port,
          path: urlAPI,
          method: 'GET',
          // encoding: null
      };
      invocarServicio(options).then(res => {
        console.log('res: ', res);
        resolve(data);
      }).then((responseData) => {
        console.log('responseData: ', responseData);
        resolve(responseData);
      }).catch(err => {
        console.log(err);
        reject(err);
      });
      // // xobj.overrideMimeType("application/json");
      // xobj.open("GET", urlAPI, true); // Reemplaza colombia-json.json con el nombre que le hayas puesto
      // xobj.onreadystatechange = function () {
      //   if (xobj.readyState == 4 && xobj.status === 200) {
      //     resolve(JSON.parse(xobj.responseText));
      //   }
      // };
      // xobj.send(null);
    })

  })
};

// funcion que regitra un usuario
const sendEmailReport= (request, response) => {
  // console.log('request: ', request);
  // console.log('response: ', response);
  // Obtenemos los parametros del body del JSON lo que viene en la API
  let params = request.body;
  console.log('params: ', params);

  readHTMLFile('templates/email-alert-incapacity-03.html').then((responseData) => {
    // console.log('responseData: ', responseData);

    let urlFile = path.join(__dirname, '..', 'templates/files/DiasAcumulados540.xlsx');
    console.log('urlFile: ', urlFile);
    let urlLogo = path.join(__dirname, '..', 'templates/images/KustodyYmeddylex.png');
    console.log('urlLogo: ', urlLogo);
    let urlPhotoProfileDoctor = path.join(__dirname, '..', 'templates/images/person_2.jpeg');
    console.log('urlPhotoProfileDoctor: ', urlPhotoProfileDoctor);

    let patientIncapacities = params.patientIncapacities;
    console.log('patientIncapacities: ', patientIncapacities);

    let template = handlebars.compile(responseData);
    let replacements = {
      urlLogo: urlLogo,
      urlPhotoProfileDoctor: urlPhotoProfileDoctor,
      patientname: params.patientname,
      patientEmail: params.patientEmail,
      patientDocumentNumber: params.patientDocumentNumber,
      patientTotalIncapacities: params.patientIncapacities['totalItems'],
      doctorname: params.doctorname,
      doctorEmail: params.doctorEmail,
      doctorjobeps: params.doctorjobeps,
      doctorjobips: params.doctorjobips,
      doctorDocumentNumber: params.doctorDocumentNumber,
      doctorMedicalRegister: params.doctorMedicalRegister,
      doctorEspeciality: params.doctorEspeciality,
      // correlationIncapacity: params.correlationIncapacity['bProrroga'],
      flagDiasDeIncapacidad: params.flagDiasDeIncapacidad,
      diasAcumuladosProrroga: params.diasAcumuladosProrroga,
      diasDeIncapacidadOtorgados: params.diasDeIncapacidadOtorgados,
      diasMaximoConsulta: params.diasMaximoConsulta,
      diasExcedidosDiferencia: (params.diasMaximoConsulta && params.diasDeIncapacidadOtorgados) ? params.diasDeIncapacidadOtorgados - params.diasMaximoConsulta : '0',
      diasDeIncapacidadOtorgadosJustificacion: params.diasDeIncapacidadOtorgadosJustificacion,
      patientDiagnostics: params.patientDiagnostics,
      patientDaysGaratedDescription: params.patientDaysGaratedDescription,
      patientConditionMedicalDescription: params.patientConditionMedicalDescription,
    };
    console.log('replacements: ', replacements);
    let htmlToSend = template(replacements);
    // console.log('htmlToSend: ', htmlToSend);
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465, 
        secure: true,
        // service: 'gmail',
        auth: {
          user: 'meddylex.development@gmail.com',
          pass: 'eejnoxuksuawommh'
        }
    });
      
    let mailOptions = {
        from: 'Kustodya App <meddylex.development@gmail.com>',
        to: params.email,
        subject: params.subject,
        // text: 'That was easy!'
        html : htmlToSend,
        attachments: [
          {   // utf-8 string as an attachment
              filename: urlFile,
              content: 'Kustodya Report'
          },
        ],
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          response.status(500).send({ error: error });
        } else {
          console.log('Email sent: ' + info.response);
          response.status(200).send({ response: info });
          // getDataReport('http://meddylex-001-site4.itempurl.com/API').then(resp => {
          //   console.log('resp: ', resp);
          //   fnGenerateXlsxFromJson().then(respFile => {
          //     console.log('respFile: ', respFile);
          //   });
          // });
          
        }
    });
  })    
};


// Exportamos el modulo
module.exports = {
    sendEmail,
    trackEmail,
    fnGenerateXlsxFromJson,
    sendEmailReport,
};