// Variable donde se importa el modulo email
// let Email = require("../models/email");
let path = require("path");
let Utilities = require('../utils/utilities');


/* ********** START - Funcion hello - prueba ********** */
const hello = (req, res) => {
  let params = req.body;
  console.log('params: ', params);
  res.status(200).send({ message: ".... Hola mundo!" })
}
/* *********** END - Funcion hello - prueba *********** */
/* ********** START - Funcion sendEmailAlertIncapacity - Envia alertas en la generacion de incapacidades ********** */
const sendEmailAlertIncapacity = (request, response) => {
    // Obtenemos los parametros del body del JSON lo que viene en la API
    let params = request.body;
    console.log('params: ', params);
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
    Utilities.readHTMLFile(templateEmailToSend).then((responseData) => {
      // console.log('responseData: ', responseData);
      let urlLogo = path.join(__dirname, '..', 'templates/images/KustodyYmeddylex.png');
      console.log('urlLogo: ', urlLogo);
      let urlPhotoProfileDoctor = path.join(__dirname, '..', 'templates/images/person_2.jpeg');
      console.log('urlPhotoProfileDoctor: ', urlPhotoProfileDoctor);
      let patientIncapacities = params.patientIncapacities;
      console.log('patientIncapacities: ', patientIncapacities);

      let stringHTML = responseData;
      let textBodyEmail = null;
      let replacementsHTML = {
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
        fechaEmision: Utilities.getDateNow('DD/MM/YYYY HH:mm'),
        incapacityNumber: Utilities.getDateNowValueOf,
        userProgramType: params.userProgramType,
        userOcupation: params.userOcupation,
      };
      let dataInfoMail = {
        from: 'Kustodya App <meddylex.development@gmail.com>',
        to: params.email,
        subject: params.subject,
      };
      let filesToSend = null;
      Utilities.sendEmail(stringHTML, textBodyEmail, replacementsHTML, dataInfoMail, filesToSend).then((respSendMail) => {
        let trackSendMail = respSendMail;
        if (!trackSendMail['state']) {
          response.status(500).send({ error: trackSendMail['data'] });
        } else {
          response.status(200).send({ response: trackSendMail['data'] });
        }
      });
    }); 
};
/* *********** END - Funcion sendEmailAlertIncapacity - Envia alertas en la generacion de incapacidades *********** */
/* ********** START - Funcion getDataOCRTranscription - Obtiene los datos extraidos por el OCR ********** */
const getDataOCRTranscription = (request, response) => {
  let urlApi = "http://meddylex-001-site4.itempurl.com/api/Transcripcion";
  Utilities.getAPIRestUrl(urlApi).then((response) => {
    if(!response) {
      response.status(500).send({ response: null });
    } else {
      response.status(200).send({ response: json });
    }
  })
};
/* *********** END - Funcion getDataOCRTranscription - Obtiene los datos extraidos por el OCR *********** */
/* ********** START - Funcion sendEmailReportPatients540days - Reporte pacientes con mas de 540 de incapacidad ********** */
const sendEmailReportPatients540days= (request, response) => {
  let params = request.body;
  Utilities.readHTMLFile('templates/email-alert-incapacity-03.html').then((responseData) => {

    let urlFile = path.join(__dirname, '..', 'templates/files/DiasAcumulados540.xlsx');
    console.log('urlFile: ', urlFile);
    let urlLogo = path.join(__dirname, '..', 'templates/images/KustodyYmeddylex.png');
    console.log('urlLogo: ', urlLogo);
    let urlPhotoProfileDoctor = path.join(__dirname, '..', 'templates/images/person_2.jpeg');
    console.log('urlPhotoProfileDoctor: ', urlPhotoProfileDoctor);

    let patientIncapacities = params.patientIncapacities;
    console.log('patientIncapacities: ', patientIncapacities);

    let stringHTML = responseData;
    let textBodyEmail = null;
    let replacementsHTML = {
      urlLogo: urlLogo,
      urlPhotoProfileDoctor: urlPhotoProfileDoctor,
    };
    let dataInfoMail = {
      from: 'Kustodya App <meddylex.development@gmail.com>',
      to: params.email,
      subject: params.subject,
    };
    let filesToSend = [
      {
          filename: 'ArchivoReporte.xlsx',
          path: urlFile,
      },
    ];
    Utilities.sendEmail(stringHTML, textBodyEmail, replacementsHTML, dataInfoMail, filesToSend).then((respSendMail) => {
      let trackSendMail = respSendMail;
      if (!trackSendMail['state']) {
        response.status(500).send({ error: trackSendMail['data'] });
      } else {
        response.status(200).send({ response: trackSendMail['data'] });
      }
    });
  }); 
};
/* *********** END - Funcion sendEmailReportPatients540days - Reporte pacientes con mas de 540 de incapacidad *********** */

// Exportamos el modulo
module.exports = {
    hello,
    sendEmailAlertIncapacity,
    getDataOCRTranscription,
    sendEmailReportPatients540days,
};