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
const https = require('https')

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Variable para importar pass
let bcrypt = require("bcrypt-nodejs");
// Importamos el jwt
let jwt = require("../libs/jwt");

// Importamos la libreria para el manejo de horas fechas - tiempo
let moment = require("moment");

const readHTMLFile = (pathTmp) => {
  return new Promise((resolve, reject) => {
    let pathTemplate = path.join(__dirname, '..', pathTmp);
    fs.readFile(pathTemplate, { encoding: 'utf-8' }, function (err, html) {
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
    // Obtenemos los parametros del body del JSON lo que viene en la API
    let params = request.body;
    let templateEmailToSend = '';

    switch (params.typeMail) {
      case 1:
        templateEmailToSend = 'templates/email-alert-incapacity-04.html';
        break;
      case 2:
        templateEmailToSend = 'templates/email-alert-incapacity-05.html';
        break;
      case 3:
        templateEmailToSend = 'templates/email-alert-incapacity-06.html';
        break;
    }

    readHTMLFile(templateEmailToSend).then((responseData) => {

      let urlFile = path.join(__dirname, '..', 'templates/files/DiasAcumulados540.xlsx');
      let urlLogo = path.join(__dirname, '..', 'templates/images/KustodyYmeddylex.png');
      let urlPhotoProfileDoctor = path.join(__dirname, '..', 'templates/images/person_2.jpeg');

      let patientIncapacities = params.patientIncapacities;

      let template = handlebars.compile(responseData);
      let replacements = {
        urlLogo: urlLogo,
        urlPhotoProfileDoctor: urlPhotoProfileDoctor,
        patientname: params.patientname,
        patientEmail: params.patientEmail,
        patientDocumentNumber: params.patientDocumentNumber,
        patientDocumentType: params.patientDocumentType,
        patientPhoneNumber: "+601"+params.patientPhoneNumber,
        patientTotalIncapacities: params.patientIncapacities['totalItems'],
        doctorname: params.doctorname,
        doctorEmail: params.doctorEmail,
        doctorjobeps: params.doctorjobeps,
        doctorjobips: params.doctorjobips,
        doctorDocumentNumber: params.doctorDocumentNumber,
        doctorDocumentNumberType: params.doctorDocumentNumberType,
        doctorPhoneNumber: params.doctorPhoneNumber,
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
        fechaEmision: moment().format('DD/MM/YYYY HH:mm'),
        incapacityNumber: moment().valueOf(),
        userProgramType: params.userProgramType,
        userOcupation: params.userOcupation,
      };
      let htmlToSend = template(replacements);
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
            response.status(500).send({ error: error });
          } else {
            response.status(200).send({ response: info });
            // getDataReport('http://meddylex-001-site4.itempurl.com/API').then(resp => {
            //   fnGenerateFileReport().then(respFile => {
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

const fnGenerateFileReport = (dataXls, nameFile, columnNames) => {
  return new Promise ((resolve, reject) => {
    const data = dataXls;
    const headingColumnNames = columnNames;

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
        Object.keys(record).forEach(columnName =>{
            ws.cell(rowIndex,columnIndex++)
                .string(record[columnName])
        });
        rowIndex++;
    }); 
    wb.write('templates/files/'+nameFile+'.xlsx');
    resolve(true);
  });
};

const getDataReport = () => {
  return new Promise ((resolve, reject) => {
    fetch("http://meddylex-001-site4.itempurl.com/api/Reporte")
    .then(res => res.json())
    .then(json => {
      if (json) {
        resolve(json);
        // response.status(200).send({ response: json });
      } else {
        reject(false)
        // response.status(500).send({ response: null });
      }
    });
  })
};

const getDataReportIncapacitiesByDateRange = (startDate, endDate) => {
  return new Promise ((resolve, reject) => {
    let urlApi = "http://meddylex-001-site4.itempurl.com/api/Reporte/fechas?FechaDesde="+startDate+"&FechaHasta="+endDate;
    fetch(urlApi)
    .then(res => res.json())
    .then(json => {
      if (json) {
        resolve(json);
        // response.status(200).send({ response: json });
      } else {
        reject(false)
        // response.status(500).send({ response: null });
      }
    });
  })
};

const sendEmailReport= (request, response) => {
  // Obtenemos los parametros del body del JSON lo que viene en la API
  let params = request.body;

  readHTMLFile('templates/email-alert-incapacity-03.html').then((responseData) => {

    // let urlFile = path.join(__dirname, '..', 'templates/files/DiasAcumulados540.xlsx');
    let urlFile = path.join(__dirname, '..', 'templates/files/ArchivoReporte.xlsx');
    let urlLogo = path.join(__dirname, '..', 'templates/images/KustodyYmeddylex.png');
    let urlPhotoProfileDoctor = path.join(__dirname, '..', 'templates/images/person_2.jpeg');

    let patientIncapacities = params.patientIncapacities;

    let template = handlebars.compile(responseData);
    let replacements = {
      urlLogo: urlLogo,
      urlPhotoProfileDoctor: urlPhotoProfileDoctor,
    };
    let htmlToSend = template(replacements);
    getDataReport().then((respReport) => {

      const headingColumnNames = [
        "NUMERO_IEG",
        "DIAGNOSTICO",
        "TIPO_ID_AFILIADO",
        "NUM_ID_AFILIADO",
        "DIAS_SOLICITADOS",
        "DIAS_TOPE",
        "DIAS_EXCESO",
        "DIAS_EXCESO_PRORROGA",
        "DIAS_ACUMULADOS_PRORROGA",
        "DIAS_APROBADOS",
        "DIAS_PAGADOS",
        "VALOR_DIARIO",
        "VALOR_EXESO",
        "VALOR_EXCESO_PRORROGA",
        "IBC",
        "VALOR_PAGADO",
        "FECHA_RADICACION",
        "FECA_INICIO",
        "FECHA_FIN",
        "USUARIO_RADICACION",
        "PRORROGA",
        "AGRUPADOR_ESTADO",
        "ESTADO",
        "TIPO_ID_EMPLEADOR",
        "NUM_ID_EMPLEADOR",
        "NOMBRE_EMPLEADOR",
        "EMPRESA_VIP",
        "TIPO_COTIZANTE",
        "IPS_PRIMARIA",
        "IPS_IEG",
        "IPS_NO_ADSCRITA",
        "REGISTRO_MEDICO",
        "NOMBRE_MEDICO",
        "ESPECIALIDAD",
        "AGRUPADOR_IPS",
        "ORIGEN_IEG",
        "NOMBRE_COHORTE",
        "USUARIO_PAC",
        "MUNICIPIO",
        "DEPARTAMENTO",
        "REGIONAL",
        "NODO",
        "FECHA_INICIO_EMPLEO",
        "FECHA_NACIMIENTO",
        "EDAD",
        "GENERO",
        "RANGO_IBC",
        "GRUPO_RIESGO",
        "PLAN_ATENCION",
        "PLAN_PRESTACION",
        "DIAS_CUMULADOS",
        "REPORTE_DIAS",
        "FECHA_AUTORIZACION",
        "FECHA_PAGO",
        "NUMERO_AUTORIZACION",
        "CQX_FECHA_DECISION",
        "PROCEDIMIENTO_AUTORIZADO",
        "IPS_AUTORIZADA",
        "GENERADA_POR",
        "AGRUPADOR_DIAS1_180",
        "AGRUP_PATOLOGIA",
        "AGRUP_NNT",
        "REG_AUT",
        "PROCESADO",
        "CONSECUTIVO",
        "ARCHIVO_ENVIO",
        "CONCEPTO_REHABILIACION",
        "AGRP_ACUMULADO_PRORROGA",
        "MUNICIPIO_IPS",
        "DEPARTAMENTO_IPS",
        "REGIONAL_IPS",
        "NODO_IPS",
        "MARCA_VALOR",
        "COD_IPS_IGE",
        "COD_IPS_PRIMARIA",
        "FECHA_CONTABILIZACION",
        "ESTADO_AUTORZ",
        "ESTADO_CTA_COBRO",
        "FECHA_ENTREGADA",
        "PERIODO_SUBSIDIO",
        "TIPO_AMBITO",
        "OBS_TID_CODIGO_MED",
        "OBS_IDENTIFIC_MED",
        "OBS_NRO_CTA_COBRO",
        "OBS_TUTELA",
        "OBS_CAUSAL_NEGACION",
        "OBS_AUDITORIA_MEDLABORAL",
        "VerPresuntoDuplicado",
        "VerDuplicado",
        "Licencia",
        "IdIncapacidad",
        "Duplicado",
        "PresuntoDuplicado",
        "RoojoRegistradoEnRethusCruzado",
        "RoojoITSancionadosCruzado",
        "RoojoPersonalNoAutorizadoCruzado",
        "RoojoRegistroMedicoCruzado",
        "TipoPrograma",
        "Escolaridad",
        "RoojoTipoIdentificacionMedicoCruzado",
        "EsNumerico"
      ];

      fnGenerateFileReport(respReport,"ArchivoReporte", headingColumnNames).then((respFile) => {

        console.log('respFile: ', respFile);

        if(respFile) {
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
                    // filename: urlFile,
                    filename: 'ArchivoReporte.xlsx',
                    path: urlFile,
                },
              ],
          };
            
          transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                response.status(500).send({ error: error });
              } else {
                response.status(200).send({ response: info });
              }
          });
        }
      })

    });
      
  })    
};

const SendMailReportIncapacitiesByDateRange = (request, response) => {
  // Obtenemos los parametros del body del JSON lo que viene en la API
  let params = request.body;

  readHTMLFile('templates/email-alert-incapacity-07.html').then((responseData) => {

    // let urlFile = path.join(__dirname, '..', 'templates/files/DiasAcumulados540.xlsx');
    let urlFile = path.join(__dirname, '..', 'templates/files/ArchivoReporteIncapacidades.xlsx');
    let urlLogo = path.join(__dirname, '..', 'templates/images/KustodyYmeddylex.png');
    let urlPhotoProfileDoctor = path.join(__dirname, '..', 'templates/images/person_2.jpeg');

    let startDate = params.startDate;
    let endDate = params.endDate;
    

    let template = handlebars.compile(responseData);
    let replacements = {
      urlLogo: urlLogo,
      urlPhotoProfileDoctor: urlPhotoProfileDoctor,
      startDate: moment(startDate).format('DD/MM/YYYY'),
      endDate: moment(endDate).format('DD/MM/YYYY'),
    };
    let htmlToSend = template(replacements);
    getDataReportIncapacitiesByDateRange(startDate, endDate).then((respReport) => {

      respReport.forEach((value, key) => {
        value['FechaElaboracion'] = String(value['FechaElaboracion']);
        value['DescripcionFicha'] = String(value['DescripcionFicha']);
        value['SituacionEncontrada'] = String(value['SituacionEncontrada']);
        value['UsuarioCreacionId'] = String(value['UsuarioCreacionId']);
        value['Descripcion'] = String(value['Descripcion']);
        value['NroIncapacidad'] = String(value['NroIncapacidad']);
        value['CodigoContable'] = String(value['CodigoContable']);
        value['NitTercero'] = String(value['NitTercero']);
        value['Debito'] = String(value['Debito']);
        value['Credito'] = String(value['Credito']);
      });

      const headingColumnNames = [
        "FechaElaboracion",
        "DescripcionFicha",
        "SituacionEncontrada",
        "UsuarioCreacionId",
        "Descripcion",
        "NroIncapacidad",
        "CodigoContable",
        "NitTercero",
        "Debito",
        "Credito",
      ];
      console.log('respReport: ', respReport);
      fnGenerateFileReport(respReport, "ArchivoReporteIncapacidades", headingColumnNames).then((respFile) => {

        console.log('respFile: ', respFile);

        if(respFile) {
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
                    // filename: urlFile,
                    filename: 'ArchivoReporte.xlsx',
                    path: urlFile,
                },
              ],
          };
            
          transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                response.status(500).send({ error: error });
              } else {
                response.status(200).send({ response: info });
              }
          });
        }
      })

    });
      
  })    
};


// Exportamos el modulo
module.exports = {
    sendEmail,
    trackEmail,
    fnGenerateFileReport,
    sendEmailReport,
    SendMailReportIncapacitiesByDateRange,
    getDataReport,
};