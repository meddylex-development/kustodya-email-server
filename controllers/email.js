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
      let urlPhotoProfileDoctor = path.join(__dirname, '..', 'templates/images/person_2.jpeg');
      console.log('urlPhotoProfileDoctor: ', urlPhotoProfileDoctor);
      let patientIncapacities = params.patientIncapacities;

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

    // let urlFile = path.join(__dirname, '..', 'templates/files/DiasAcumulados540.xlsx');
    let urlFile = path.join(__dirname, '..', 'templates/files/ArchivoReporte.xlsx');
    let urlLogo = path.join(__dirname, '..', 'templates/images/KustodyYmeddylex.png');
    let urlPhotoProfileDoctor = path.join(__dirname, '..', 'templates/images/person_2.jpeg');

    let patientIncapacities = params.patientIncapacities;

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

const sendMailReportIncapacitiesByDateRange = (request, response) => {
  // Obtenemos los parametros del body del JSON lo que viene en la API
  let params = request.body;

  Utilities.readHTMLFile('templates/email-alert-incapacity-07.html').then((responseData) => {

    let nameFileSave = 'ArchivoReporteIncapacidades.xlsx';
    let pathFileSave = 'templates/files/';
    // let urlFile = path.join(__dirname, '..', 'templates/files/DiasAcumulados540.xlsx');
    let urlFile = path.join(__dirname, '..', pathFileSave + nameFileSave);
    let urlLogo = path.join(__dirname, '..', 'templates/images/KustodyYmeddylex.png');
    let urlPhotoProfileDoctor = path.join(__dirname, '..', 'templates/images/person_2.jpeg');

    let startDate = params.startDate;
    let endDate = params.endDate;

    let urlApi = "http://meddylex-001-site4.itempurl.com/api/Reporte/fechas?FechaDesde="+startDate+"&FechaHasta="+endDate;
    Utilities.getAPIRestUrl(urlApi).then((respReport) => {

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
      Utilities.fnJsonToExcelFile(respReport, pathFileSave, nameFileSave, headingColumnNames).then((respFile) => {

        console.log('respFile: ', respFile);

        if(respFile) {

          let stringHTML = responseData;
          let textBodyEmail = null;
          let replacementsHTML = {
            urlLogo: urlLogo,
            urlPhotoProfileDoctor: urlPhotoProfileDoctor,
            startDate: moment(startDate).format('DD/MM/YYYY'),
            endDate: moment(endDate).format('DD/MM/YYYY'),
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

        } else {
          response.status(500).send({ error: error });
        }
      })

    });
      
  })
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

// Exportamos el modulo
module.exports = {
    hello,
    sendEmailAlertIncapacity,
    getDataOCRTranscription,
    sendEmailReportPatients540days,
    sendMailReportIncapacitiesByDateRange,
};


/*
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

  sendEmail,
  trackEmail,
  fnGenerateFileReport,
  sendEmailReport,
  SendMailReportIncapacitiesByDateRange,
  getDataReport,
*/