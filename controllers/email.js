// Variable donde se importa el modulo email
// let Email = require("../models/email");
let moment = require("moment");
let path = require("path");
let Utilities = require('../utils/utilities');


/* ********** START - Funcion hello - prueba ********** */
const hello = (req, res) => {
  let params = req.body;
  // res.status(200).send({ message: ".... Hola mundo!" })
  let templateEmailToSend = 'templates/correo-concepto-rehabilitacion.html';
  Utilities.readHTMLFile(templateEmailToSend).then((responseDataHtmlFileBodyEmail) => {

    // let urlLogo = 'http://meddylex-001-site2.itempurl.com/assets/images/imgs/Logokustodyahorizontal.png';
    // let urlImage3 = 'http://meddylex-001-site2.itempurl.com/assets/images/imgs/img3.png';
    // // let urlLogo = path.join(__dirname, '..', 'templates/images/img1.png');
    // // let replacementsHTML = {
    // //   urlLogo: urlLogo,
    // //   urlImg3: urlImage3,
    // // };

    // let urlFileLetter = path.join(__dirname, '..', 'templates/files/Carta-concepto-rehabilitacion-19082022.pdf');
    // let urlFileCRHB = path.join(__dirname, '..', 'templates/files/Concepto-rehabilitacion-19082022.pdf');

    // let filesToSend = [
    //   {
    //       filename: 'Carta-concepto-rehabilitacion-19082022.pdf',
    //       path: urlFileLetter,
    //   },
    //   {
    //       filename: 'Concepto-rehabilitacion-19082022.pdf',
    //       path: urlFileCRHB,
    //   },
    // ];


    let templateEmailLetterConcept = 'templates/carta-concepto-rehabilitacion-1.html';
    let templateEmailConceptCRHB = 'templates/Concepto-rehabilitacion.html';
    // let templateEmailConceptCRHB = 'templates/concepto-rehabilitacion-1.html';
    /* Utilities.readHTMLFile(templateEmailConceptCRHB).then((respString) => {


      let segundoNombre = 'Luna';
      let segundoApellido = 'Rodriguez';
      let EsFarmacologico = true;
      let EsFonoaudiologia = true;
      let EsQuirurgico = true;
      let EsTerapiaFisica = true;
      let EsTerapiaOcupacional = true;
      let EsOtrosTratamientos = true;
      let PlazoCorto = 2;
      let PlazoMediano = 3;

      let dataRehabilitationConcept = {
        dataPatient: {
          tCodigoCorto: "87B2A61", 
          FechaEmision: "31/08/2022", // 2022-08-31T09:22:04.27
          primerNombre: "Martha", 
          // segundoNombre: "Luna", 
          tagSegundoNombre: (segundoNombre) ? '<p class="data-section">' + segundoNombre + '</p>' : '<p class="empty-data">No registra dato</p>',
          primerApellido: "Pimiento", 
          // segundoApellido: "", 
          tagSegundoApellido: (segundoApellido) ? '<p class="data-section">' + segundoApellido + '</p>' : '<p class="empty-data">No registra dato</p>',
          tipoDocumento: "Cédula De Ciudadanía", 
          numeroDocumento: "63324967", 
          fechaNacimiento: "11 feb. 1966", // 1966-02-11T00:00:00
          genero: "Femenino",
          edad: "56 años",
          email: "juankmm@hotmail.com", 
          direccion: "CL 94 11 A 65 APTO 703 BRR CHICO", 
          telefono: "6218692", 
          nombrePais: "Colombia", 
          nombreDepartamento: "Antioquia", 
          nombreMunicipio: "Medellin", 
        },
        dataEPS: {
          numeroIdentificacionEps: "800112806",
          eps: "FONDO DE PASIVO SOCIAL DE FERROCARRILES NACIONALES DE COLOMBIA", 
          regimenAfiliacion: "Contributivo", 
          tipoAfiliacion: "Cotizante",
        },
        dataARL: {
          numeroIdentificacionArl: "860002183",
          arl: "Seguros de Vida Colpatria S.A", 
          regimenAfiliacion: "Contributivo", 
          tipoAfiliacion: "Cotizante",
        },
        dataAFP: {
          numeroIdentificacionAfp: "860007379",
          afp: "Caja de Auxilios y Prestaciones de la Asociación Colombiana de Aviadores Civiles Acdac, Caxdac", 
          regimenAfiliacion: "Contributivo", 
          tipoAfiliacion: "Cotizante",
        },
        
        tagListCie: "",
        
        tagListSequel: "",
        
        ResumenHistoriaClinica: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos non sapiente quos ipsam voluptas aperiam libero obcaecati eaque qui hic aspernatur alias a odit sint, voluptatum placeat optio nihil rem?",
      };


      let DiagnosticosConcepto = [
        { "id": 18, "Cie10Id": 42, "tCIE10": "A065", "tDescripcion": "Absceso amebiano del pulmón test 1", "Etiologia": null, "nombreEtiologia": null, "FechaIncapacidad": null },
        { "id": 19, "Cie10Id": 43, "tCIE10": "A066", "tDescripcion": "Absceso amebiano del pulmón test 2", "Etiologia": null, "nombreEtiologia": null, "FechaIncapacidad": null },
        { "id": 20, "Cie10Id": 44, "tCIE10": "A067", "tDescripcion": "Absceso amebiano del pulmón test 3", "Etiologia": null, "nombreEtiologia": null, "FechaIncapacidad": null },
        { "id": 21, "Cie10Id": 45, "tCIE10": "A068", "tDescripcion": "Absceso amebiano del pulmón test 4", "Etiologia": null, "nombreEtiologia": null, "FechaIncapacidad": null },
      ];

      let SecuelasConcepto = [
        { "Id": 9, "Tipo": 3597, "nombreSecuela": "Anatómica", "pronosticoId": 3600, "nombrePronostico": "Regular", "Descripcion": "qwertyasdfgh" },
        { "Id": 9, "Tipo": 3597, "nombreSecuela": "Anatómica", "pronosticoId": 3600, "nombrePronostico": "Regular", "Descripcion": "qwertyasdfgh" },
      ];

      let tagListCie = "";
      for (const cie of DiagnosticosConcepto) {
        tagListCie += `
        <tr>
            <td style="margin: 0; padding: 0; vertical-align: top;">
                <label class="label-section">Código diagnóstico: </label>
                <p class="data-section">${ cie.tCIE10 }</p>
            </td>
            <td style="margin: 0; padding: 0; vertical-align: top; width: 350px;">
                <label class="label-section">Nombre diagnóstico:</label>
                <p class="data-section">${ cie.tDescripcion }</p>
            </td>
            <td style="margin: 0; padding: 0; vertical-align: top;">
                <label class="label-section">Fecha diagnóstico: </label>
                <!-- <p class="data-section">Contributivo</p> -->
                <p class="empty-data">No registra dato</p>
            </td>
            <td style="margin: 0; padding: 0; vertical-align: top;">
                <label class="label-section">Etiología:</label>
                <!-- <p class="data-section">Cotizante</p> -->
                <p class="empty-data">No registra dato</p>
            </td>
        </tr>`;
      }

      let tagListSequels = "";
      for (const sequel of SecuelasConcepto) {
        tagListSequels += `
        <tr>
            <td style="margin: 0; padding: 0; vertical-align: top; width: 80.98px;">
                <label class="label-section">Tipo de secuela: </label>
                <p class="data-section">${ sequel.nombreSecuela }</p>
            </td>
            <td style="margin: 0; padding: 0; vertical-align: top; width: 380px;">
                <label class="label-section">Descripción:</label>
                <p style="font-family: 'Raleway'; text-align: justify; font-size: 4pt;">
                    ${sequel.Descripcion }
                </p>
            </td>
            <td style="margin: 0; padding: 0; vertical-align: top; width: 66px; text-align: center;">
                <label class="label-section">Pronostico: </label>
                <p class="data-section">${ sequel.nombrePronostico }</p>
                <!-- <p class="empty-data">No registra dato</p> -->
            </td>
        </tr>`;
      }

      let tagEsFarmacologico = (EsFarmacologico) ? `<p class="data-section">
        <i class="fas fa-caret-right" style="font-size: 3pt; position: absolute; margin: 3px 0px;"></i>&nbsp;&nbsp;
        <span>Farmacológico</span>
      </p>` : '';
      
      let tagEsFonoaudiologia = (EsFonoaudiologia) ? `<p class="data-section">
        <i class="fas fa-caret-right" style="font-size: 3pt; position: absolute; margin: 3px 0px;"></i>&nbsp;&nbsp;
        <span>Fonoaudiologia</span>
      </p>` : '';
      
      let tagEsQuirurgico = (EsQuirurgico) ? `<p class="data-section">
        <i class="fas fa-caret-right" style="font-size: 3pt; position: absolute; margin: 3px 0px;"></i>&nbsp;&nbsp;
        <span>Quirúrgico</span>
      </p>` : '';
      
      let tagEsTerapiaFisica = (EsTerapiaFisica) ? `<p class="data-section">
        <i class="fas fa-caret-right" style="font-size: 3pt; position: absolute; margin: 3px 0px;"></i>&nbsp;&nbsp;
        <span>Terapia física</span>
      </p>` : '';
      
      let tagEsTerapiaOcupacional = (EsTerapiaOcupacional) ? `<p class="data-section">
        <i class="fas fa-caret-right" style="font-size: 3pt; position: absolute; margin: 3px 0px;"></i>&nbsp;&nbsp;
        <span>Terapia ocupacional</span>
      </p>` : '';
      
      let tagEsOtrosTratamientos = (EsOtrosTratamientos) ? `<p class="data-section">
        <i class="fas fa-caret-right" style="font-size: 3pt; position: absolute; margin: 3px 0px;"></i>&nbsp;&nbsp;
        <span>Otros tratamientos</span>
      </p>` : '';

      Utilities.generateQR('https://www.youtube.com/watch?v=HQnX9lp8S2Y&ab_channel=Fassastatica').then((resp) => {
        if (resp) {
          let qrcode = resp;

          let urlFirma = "http://localhost:4200/assets/images/imgs/firmMedicoConceptoCRHB.png";
          let stringHTML = respString;
          let replacementsHTML = {
            tCodigoCorto: "87B2A61", 
            FechaEmision: "31/08/2022", // 2022-08-31T09:22:04.27
            primerNombre: "Martha", 
            // segundoNombre: "Luna", 
            tagSegundoNombre: (segundoNombre) ? '<p class="data-section">' + segundoNombre + '</p>' : '<p class="empty-data">No registra dato</p>',
            primerApellido: "Pimiento", 
            // segundoApellido: "", 
            tagSegundoApellido: (segundoApellido) ? '<p class="data-section">' + segundoApellido + '</p>' : '<p class="empty-data">No registra dato</p>',
            tipoDocumento: "Cédula De Ciudadanía", 
            numeroDocumento: "63324967", 
            fechaNacimiento: "11 feb. 1966", // 1966-02-11T00:00:00
            genero: "Femenino",
            edad: "56 años",
            email: "juankmm@hotmail.com", 
            direccion: "CL 94 11 A 65 APTO 703 BRR CHICO", 
            telefono: "6218692", 
            nombrePais: "Colombia", 
            nombreDepartamento: "Antioquia", 
            nombreMunicipio: "Medellin", 
    
            numeroIdentificacionEps: "800112806",
            eps: "FONDO DE PASIVO SOCIAL DE FERROCARRILES NACIONALES DE COLOMBIA", 
            regimenAfiliacion: "Contributivo", 
            tipoAfiliacion: "Cotizante",
    
            numeroIdentificacionArl: "860002183",
            arl: "Seguros de Vida Colpatria S.A", 
            regimenAfiliacion: "Contributivo", 
            tipoAfiliacion: "Cotizante",
    
            numeroIdentificacionAfp: "860007379",
            afp: "Caja de Auxilios y Prestaciones de la Asociación Colombiana de Aviadores Civiles Acdac, Caxdac", 
            regimenAfiliacion: "Contributivo", 
            tipoAfiliacion: "Cotizante",
    
            tagListCie: tagListCie,
            tagListSequels: tagListSequels,
            
            ResumenHistoriaClinica: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos non sapiente quos ipsam voluptas aperiam libero obcaecati eaque qui hic aspernatur alias a odit sint, voluptatum placeat optio nihil rem?",
    
            tagEsFarmacologico: tagEsFarmacologico,
    
            tagEsFonoaudiologia: tagEsFonoaudiologia,
    
            tagEsQuirurgico: tagEsQuirurgico,
    
            tagEsTerapiaFisica: tagEsTerapiaFisica,
    
            tagEsTerapiaOcupacional: tagEsTerapiaOcupacional,
    
            tagEsOtrosTratamientos: tagEsOtrosTratamientos,
            DescripcionOtrosTratamientos: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit porro commodi qui inventore, fuga, vero, iure animi veritatis necessitatibus accusantium quis sit consequuntur asperiores beatae accusamus voluptatum maxime perspiciatis perferendis.",
            nombreFinalidadTratamientos: "Curativo",
            PlazoCorto: (PlazoCorto == 1) ? 'Bueno' : (PlazoCorto == 2) ? 'Regular' : 'Malo',
            PlazoMediano: (PlazoMediano == 1) ? 'Bueno' : (PlazoMediano == 2) ? 'Regular' : 'Malo',
            nombreConcepto: "Favorable",
            textoConcepto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A quam dolores, reprehenderit quia ad voluptatum, illum soluta accusamus facere ipsum similique quos quisquam doloremque asperiores? Repellat vitae labore sapiente unde?",
    
            medicoPrimerNombre: "German",
            medicoSegundoNombre: "Enrique",
            medicoPrimerApellido: "Diaz",
            medicoSegundoApellido: "Rodriguez",
            medicoTipoIdentificacion: "Cédula De Ciudadanía",
            medicoNumeroDocumento: "1111122222",
            medicoEmail: "gpinilladev@gmail.com",
            medicoNumeroRegistro: "1111122222",
            medicoNumeroRegistro: "1111122222",
            qrcode: qrcode,
            firma: urlFirma,
    
          };
          Utilities.replaceDataTempHtml(stringHTML, replacementsHTML).then((responseReplace) => {
            Utilities.htmlToPdf(responseReplace).then((respPdf) => {
              console.log('respPdf: ', respPdf);
              res.status(200).send({ response: 'Its OK!' });
            });
          });

        }
      });
      

    }); */

    const urlQRCodeValidConcept = 'https://www.youtube.com/watch?v=HQnX9lp8S2Y&ab_channel=Fassastatica';
    const promGenerateQRCodeURL = Utilities.generateQR(urlQRCodeValidConcept);
    const promLetterConcept = Utilities.readHTMLFile(templateEmailLetterConcept);
    const promMedicalConcept = Utilities.readHTMLFile(templateEmailConceptCRHB);
    
    Promise.allSettled([
        promGenerateQRCodeURL, 
        promMedicalConcept, 
        promLetterConcept
      ]).then((responseList) => {
      // console.log('responseList: ', responseList);
      let replaceHtmlTempMedicalConcept = '';
      let replaceHtmlTempLetterConcept = '';
      let qrcode = '';
      if (responseList[0]['status'] === 'fulfilled' ) {
        console.log("Primera promesa - Generacion QR Code url validacion concepto");
        qrcode = responseList[0]['value'];

        if (responseList[1]['status'] === 'fulfilled' ) {
          console.log("Segunda promesa - Lectura archivo concepto");
          let segundoNombre = 'Luna';
          let segundoApellido = 'Rodriguez';
          let EsFarmacologico = true;
          let EsFonoaudiologia = true;
          let EsQuirurgico = true;
          let EsTerapiaFisica = true;
          let EsTerapiaOcupacional = true;
          let EsOtrosTratamientos = true;
          let PlazoCorto = 2;
          let PlazoMediano = 3;
  
          let dataRehabilitationConcept = {
            dataPatient: {
              tCodigoCorto: "87B2A61", 
              FechaEmision: "31/08/2022", // 2022-08-31T09:22:04.27
              primerNombre: "Martha", 
              // segundoNombre: "Luna", 
              tagSegundoNombre: (segundoNombre) ? '<p class="data-section">' + segundoNombre + '</p>' : '<p class="empty-data">No registra dato</p>',
              primerApellido: "Pimiento", 
              // segundoApellido: "", 
              tagSegundoApellido: (segundoApellido) ? '<p class="data-section">' + segundoApellido + '</p>' : '<p class="empty-data">No registra dato</p>',
              tipoDocumento: "Cédula De Ciudadanía", 
              numeroDocumento: "63324967", 
              fechaNacimiento: "11 feb. 1966", // 1966-02-11T00:00:00
              genero: "Femenino",
              edad: "56 años",
              email: "juankmm@hotmail.com", 
              direccion: "CL 94 11 A 65 APTO 703 BRR CHICO", 
              telefono: "6218692", 
              nombrePais: "Colombia", 
              nombreDepartamento: "Antioquia", 
              nombreMunicipio: "Medellin", 
            },
            dataEPS: {
              numeroIdentificacionEps: "800112806",
              eps: "FONDO DE PASIVO SOCIAL DE FERROCARRILES NACIONALES DE COLOMBIA", 
              regimenAfiliacion: "Contributivo", 
              tipoAfiliacion: "Cotizante",
            },
            dataARL: {
              numeroIdentificacionArl: "860002183",
              arl: "Seguros de Vida Colpatria S.A", 
              regimenAfiliacion: "Contributivo", 
              tipoAfiliacion: "Cotizante",
            },
            dataAFP: {
              numeroIdentificacionAfp: "860007379",
              afp: "Caja de Auxilios y Prestaciones de la Asociación Colombiana de Aviadores Civiles Acdac, Caxdac", 
              regimenAfiliacion: "Contributivo", 
              tipoAfiliacion: "Cotizante",
            },
            
            tagListCie: "",
            
            tagListSequel: "",
            
            ResumenHistoriaClinica: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos non sapiente quos ipsam voluptas aperiam libero obcaecati eaque qui hic aspernatur alias a odit sint, voluptatum placeat optio nihil rem?",
          };
  
          let DiagnosticosConcepto = [
            { "id": 18, "Cie10Id": 42, "tCIE10": "A065", "tDescripcion": "Absceso amebiano del pulmón test 1", "Etiologia": null, "nombreEtiologia": null, "FechaIncapacidad": null },
            { "id": 19, "Cie10Id": 43, "tCIE10": "A066", "tDescripcion": "Absceso amebiano del pulmón test 2", "Etiologia": null, "nombreEtiologia": null, "FechaIncapacidad": null },
            { "id": 20, "Cie10Id": 44, "tCIE10": "A067", "tDescripcion": "Absceso amebiano del pulmón test 3", "Etiologia": null, "nombreEtiologia": null, "FechaIncapacidad": null },
            { "id": 21, "Cie10Id": 45, "tCIE10": "A068", "tDescripcion": "Absceso amebiano del pulmón test 4", "Etiologia": null, "nombreEtiologia": null, "FechaIncapacidad": null },
          ];
  
          let SecuelasConcepto = [
            { "Id": 9, "Tipo": 3597, "nombreSecuela": "Anatómica", "pronosticoId": 3600, "nombrePronostico": "Regular", "Descripcion": "qwertyasdfgh" },
            { "Id": 9, "Tipo": 3597, "nombreSecuela": "Anatómica", "pronosticoId": 3600, "nombrePronostico": "Regular", "Descripcion": "qwertyasdfgh" },
          ];
  
          let tagListCie = "";
          for (const cie of DiagnosticosConcepto) {
            tagListCie += `
            <tr>
                <td style="margin: 0; padding: 0; vertical-align: top;">
                    <label class="label-section">Código diagnóstico: </label>
                    <p class="data-section">${ cie.tCIE10 }</p>
                </td>
                <td style="margin: 0; padding: 0; vertical-align: top; width: 350px;">
                    <label class="label-section">Nombre diagnóstico:</label>
                    <p class="data-section">${ cie.tDescripcion }</p>
                </td>
                <td style="margin: 0; padding: 0; vertical-align: top;">
                    <label class="label-section">Fecha diagnóstico: </label>
                    <!-- <p class="data-section">Contributivo</p> -->
                    <p class="empty-data">No registra dato</p>
                </td>
                <td style="margin: 0; padding: 0; vertical-align: top;">
                    <label class="label-section">Etiología:</label>
                    <!-- <p class="data-section">Cotizante</p> -->
                    <p class="empty-data">No registra dato</p>
                </td>
            </tr>`;
          }
  
          let tagListSequels = "";
          for (const sequel of SecuelasConcepto) {
            tagListSequels += `
            <tr>
                <td style="margin: 0; padding: 0; vertical-align: top; width: 80.98px;">
                    <label class="label-section">Tipo de secuela: </label>
                    <p class="data-section">${ sequel.nombreSecuela }</p>
                </td>
                <td style="margin: 0; padding: 0; vertical-align: top; width: 380px;">
                    <label class="label-section">Descripción:</label>
                    <p style="font-family: 'Raleway'; text-align: justify; font-size: 4pt;">
                        ${sequel.Descripcion }
                    </p>
                </td>
                <td style="margin: 0; padding: 0; vertical-align: top; width: 66px; text-align: center;">
                    <label class="label-section">Pronostico: </label>
                    <p class="data-section">${ sequel.nombrePronostico }</p>
                    <!-- <p class="empty-data">No registra dato</p> -->
                </td>
            </tr>`;
          }
  
          let tagEsFarmacologico = (EsFarmacologico) ? `<p class="data-section">
            <i class="fas fa-caret-right" style="font-size: 3pt; position: absolute; margin: 3px 0px;"></i>&nbsp;&nbsp;
            <span>Farmacológico</span>
          </p>` : '';
          
          let tagEsFonoaudiologia = (EsFonoaudiologia) ? `<p class="data-section">
            <i class="fas fa-caret-right" style="font-size: 3pt; position: absolute; margin: 3px 0px;"></i>&nbsp;&nbsp;
            <span>Fonoaudiologia</span>
          </p>` : '';
          
          let tagEsQuirurgico = (EsQuirurgico) ? `<p class="data-section">
            <i class="fas fa-caret-right" style="font-size: 3pt; position: absolute; margin: 3px 0px;"></i>&nbsp;&nbsp;
            <span>Quirúrgico</span>
          </p>` : '';
          
          let tagEsTerapiaFisica = (EsTerapiaFisica) ? `<p class="data-section">
            <i class="fas fa-caret-right" style="font-size: 3pt; position: absolute; margin: 3px 0px;"></i>&nbsp;&nbsp;
            <span>Terapia física</span>
          </p>` : '';
          
          let tagEsTerapiaOcupacional = (EsTerapiaOcupacional) ? `<p class="data-section">
            <i class="fas fa-caret-right" style="font-size: 3pt; position: absolute; margin: 3px 0px;"></i>&nbsp;&nbsp;
            <span>Terapia ocupacional</span>
          </p>` : '';
          
          let tagEsOtrosTratamientos = (EsOtrosTratamientos) ? `<p class="data-section">
            <i class="fas fa-caret-right" style="font-size: 3pt; position: absolute; margin: 3px 0px;"></i>&nbsp;&nbsp;
            <span>Otros tratamientos</span>
          </p>` : '';
          let urlFirma = "http://localhost:4200/assets/images/imgs/firmMedicoConceptoCRHB.png";
          let stringConceptHTML = responseList[1]['value'];
          let replacementsConceptHTML = {
            tCodigoCorto: "87B2A61", 
            FechaEmision: "31/08/2022", // 2022-08-31T09:22:04.27
            primerNombre: "Martha", 
            // segundoNombre: "Luna", 
            tagSegundoNombre: (segundoNombre) ? '<p class="data-section">' + segundoNombre + '</p>' : '<p class="empty-data">No registra dato</p>',
            primerApellido: "Pimiento", 
            // segundoApellido: "", 
            tagSegundoApellido: (segundoApellido) ? '<p class="data-section">' + segundoApellido + '</p>' : '<p class="empty-data">No registra dato</p>',
            tipoDocumento: "Cédula De Ciudadanía", 
            numeroDocumento: "63324967", 
            fechaNacimiento: "11 feb. 1966", // 1966-02-11T00:00:00
            genero: "Femenino",
            edad: "56 años",
            email: "juankmm@hotmail.com", 
            direccion: "CL 94 11 A 65 APTO 703 BRR CHICO", 
            telefono: "6218692", 
            nombrePais: "Colombia", 
            nombreDepartamento: "Antioquia", 
            nombreMunicipio: "Medellin", 
    
            numeroIdentificacionEps: "800112806",
            eps: "FONDO DE PASIVO SOCIAL DE FERROCARRILES NACIONALES DE COLOMBIA", 
            regimenAfiliacion: "Contributivo", 
            tipoAfiliacion: "Cotizante",
    
            numeroIdentificacionArl: "860002183",
            arl: "Seguros de Vida Colpatria S.A", 
            regimenAfiliacion: "Contributivo", 
            tipoAfiliacion: "Cotizante",
    
            numeroIdentificacionAfp: "860007379",
            afp: "Caja de Auxilios y Prestaciones de la Asociación Colombiana de Aviadores Civiles Acdac, Caxdac", 
            regimenAfiliacion: "Contributivo", 
            tipoAfiliacion: "Cotizante",
    
            tagListCie: tagListCie,
            tagListSequels: tagListSequels,
            
            ResumenHistoriaClinica: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos non sapiente quos ipsam voluptas aperiam libero obcaecati eaque qui hic aspernatur alias a odit sint, voluptatum placeat optio nihil rem?",
    
            tagEsFarmacologico: tagEsFarmacologico,
    
            tagEsFonoaudiologia: tagEsFonoaudiologia,
    
            tagEsQuirurgico: tagEsQuirurgico,
    
            tagEsTerapiaFisica: tagEsTerapiaFisica,
    
            tagEsTerapiaOcupacional: tagEsTerapiaOcupacional,
    
            tagEsOtrosTratamientos: tagEsOtrosTratamientos,
            DescripcionOtrosTratamientos: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit porro commodi qui inventore, fuga, vero, iure animi veritatis necessitatibus accusantium quis sit consequuntur asperiores beatae accusamus voluptatum maxime perspiciatis perferendis.",
            nombreFinalidadTratamientos: "Curativo",
            PlazoCorto: (PlazoCorto == 1) ? 'Bueno' : (PlazoCorto == 2) ? 'Regular' : 'Malo',
            PlazoMediano: (PlazoMediano == 1) ? 'Bueno' : (PlazoMediano == 2) ? 'Regular' : 'Malo',
            nombreConcepto: "Favorable",
            textoConcepto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A quam dolores, reprehenderit quia ad voluptatum, illum soluta accusamus facere ipsum similique quos quisquam doloremque asperiores? Repellat vitae labore sapiente unde?",
    
            medicoPrimerNombre: "German",
            medicoSegundoNombre: "Enrique",
            medicoPrimerApellido: "Diaz",
            medicoSegundoApellido: "Rodriguez",
            medicoTipoIdentificacion: "Cédula De Ciudadanía",
            medicoNumeroDocumento: "1111122222",
            medicoEmail: "gpinilladev@gmail.com",
            medicoNumeroRegistro: "1111122222",
            medicoNumeroRegistro: "1111122222",
            qrcode: qrcode,
            firma: urlFirma,
    
          };
          replaceHtmlTempMedicalConcept = Utilities.replaceDataTempHtml(stringConceptHTML, replacementsConceptHTML);
          // Utilities.replaceDataTempHtml(stringHTML, replacementsHTML).then((responseReplace) => {
          //   Utilities.htmlToPdf(responseReplace).then((respPdf) => {
          //     console.log('respPdf: ', respPdf);
          //     res.status(200).send({ response: 'Its OK!' });
          //   });
          // });
        } else {
          
        }
  
        if (responseList[2]['status'] === 'fulfilled' ) {
          console.log("Tercera promesa - Lectura carta concepto");
          let segundoNombre = 'Luna';
          let segundoApellido = 'Rodriguez';
          let EsFarmacologico = true;
          let EsFonoaudiologia = true;
          let EsQuirurgico = true;
          let EsTerapiaFisica = true;
          let EsTerapiaOcupacional = true;
          let EsOtrosTratamientos = true;
          let PlazoCorto = 2;
          let PlazoMediano = 3;
  
          let dataRehabilitationConcept = {
            dataPatient: {
              tCodigoCorto: "87B2A61", 
              FechaEmision: "31/08/2022", // 2022-08-31T09:22:04.27
              primerNombre: "Martha", 
              // segundoNombre: "Luna", 
              tagSegundoNombre: (segundoNombre) ? '<p class="data-section">' + segundoNombre + '</p>' : '<p class="empty-data">No registra dato</p>',
              primerApellido: "Pimiento", 
              // segundoApellido: "", 
              tagSegundoApellido: (segundoApellido) ? '<p class="data-section">' + segundoApellido + '</p>' : '<p class="empty-data">No registra dato</p>',
              tipoDocumento: "Cédula De Ciudadanía", 
              numeroDocumento: "63324967", 
              fechaNacimiento: "11 feb. 1966", // 1966-02-11T00:00:00
              genero: "Femenino",
              edad: "56 años",
              email: "juankmm@hotmail.com", 
              direccion: "CL 94 11 A 65 APTO 703 BRR CHICO", 
              telefono: "6218692", 
              nombrePais: "Colombia", 
              nombreDepartamento: "Antioquia", 
              nombreMunicipio: "Medellin", 
            },
            dataEPS: {
              numeroIdentificacionEps: "800112806",
              eps: "FONDO DE PASIVO SOCIAL DE FERROCARRILES NACIONALES DE COLOMBIA", 
              regimenAfiliacion: "Contributivo", 
              tipoAfiliacion: "Cotizante",
            },
            dataARL: {
              numeroIdentificacionArl: "860002183",
              arl: "Seguros de Vida Colpatria S.A", 
              regimenAfiliacion: "Contributivo", 
              tipoAfiliacion: "Cotizante",
            },
            dataAFP: {
              numeroIdentificacionAfp: "860007379",
              afp: "Caja de Auxilios y Prestaciones de la Asociación Colombiana de Aviadores Civiles Acdac, Caxdac", 
              regimenAfiliacion: "Contributivo", 
              tipoAfiliacion: "Cotizante",
            },
            
            tagListCie: "",
            
            tagListSequel: "",
            
            ResumenHistoriaClinica: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos non sapiente quos ipsam voluptas aperiam libero obcaecati eaque qui hic aspernatur alias a odit sint, voluptatum placeat optio nihil rem?",
          };
  
  
          let DiagnosticosConcepto = [
            { "id": 18, "Cie10Id": 42, "tCIE10": "A065", "tDescripcion": "Absceso amebiano del pulmón test 1", "Etiologia": null, "nombreEtiologia": null, "FechaIncapacidad": null },
            { "id": 19, "Cie10Id": 43, "tCIE10": "A066", "tDescripcion": "Absceso amebiano del pulmón test 2", "Etiologia": null, "nombreEtiologia": null, "FechaIncapacidad": null },
            { "id": 20, "Cie10Id": 44, "tCIE10": "A067", "tDescripcion": "Absceso amebiano del pulmón test 3", "Etiologia": null, "nombreEtiologia": null, "FechaIncapacidad": null },
            { "id": 21, "Cie10Id": 45, "tCIE10": "A068", "tDescripcion": "Absceso amebiano del pulmón test 4", "Etiologia": null, "nombreEtiologia": null, "FechaIncapacidad": null },
          ];
  
          let SecuelasConcepto = [
            { "Id": 9, "Tipo": 3597, "nombreSecuela": "Anatómica", "pronosticoId": 3600, "nombrePronostico": "Regular", "Descripcion": "qwertyasdfgh" },
            { "Id": 9, "Tipo": 3597, "nombreSecuela": "Anatómica", "pronosticoId": 3600, "nombrePronostico": "Regular", "Descripcion": "qwertyasdfgh" },
          ];
  
          let tagListCie = "";
          for (const cie of DiagnosticosConcepto) {
            tagListCie += `
            <tr>
                <td style="margin: 0; padding: 0; vertical-align: top;">
                    <label class="label-section">Código diagnóstico: </label>
                    <p class="data-section">${ cie.tCIE10 }</p>
                </td>
                <td style="margin: 0; padding: 0; vertical-align: top; width: 350px;">
                    <label class="label-section">Nombre diagnóstico:</label>
                    <p class="data-section">${ cie.tDescripcion }</p>
                </td>
                <td style="margin: 0; padding: 0; vertical-align: top;">
                    <label class="label-section">Fecha diagnóstico: </label>
                    <!-- <p class="data-section">Contributivo</p> -->
                    <p class="empty-data">No registra dato</p>
                </td>
                <td style="margin: 0; padding: 0; vertical-align: top;">
                    <label class="label-section">Etiología:</label>
                    <!-- <p class="data-section">Cotizante</p> -->
                    <p class="empty-data">No registra dato</p>
                </td>
            </tr>`;
          }
  
          let tagListSequels = "";
          for (const sequel of SecuelasConcepto) {
            tagListSequels += `
            <tr>
                <td style="margin: 0; padding: 0; vertical-align: top; width: 80.98px;">
                    <label class="label-section">Tipo de secuela: </label>
                    <p class="data-section">${ sequel.nombreSecuela }</p>
                </td>
                <td style="margin: 0; padding: 0; vertical-align: top; width: 380px;">
                    <label class="label-section">Descripción:</label>
                    <p style="font-family: 'Raleway'; text-align: justify; font-size: 4pt;">
                        ${sequel.Descripcion }
                    </p>
                </td>
                <td style="margin: 0; padding: 0; vertical-align: top; width: 66px; text-align: center;">
                    <label class="label-section">Pronostico: </label>
                    <p class="data-section">${ sequel.nombrePronostico }</p>
                    <!-- <p class="empty-data">No registra dato</p> -->
                </td>
            </tr>`;
          }
  
          let tagEsFarmacologico = (EsFarmacologico) ? `<p class="data-section">
            <i class="fas fa-caret-right" style="font-size: 3pt; position: absolute; margin: 3px 0px;"></i>&nbsp;&nbsp;
            <span>Farmacológico</span>
          </p>` : '';
          
          let tagEsFonoaudiologia = (EsFonoaudiologia) ? `<p class="data-section">
            <i class="fas fa-caret-right" style="font-size: 3pt; position: absolute; margin: 3px 0px;"></i>&nbsp;&nbsp;
            <span>Fonoaudiologia</span>
          </p>` : '';
          
          let tagEsQuirurgico = (EsQuirurgico) ? `<p class="data-section">
            <i class="fas fa-caret-right" style="font-size: 3pt; position: absolute; margin: 3px 0px;"></i>&nbsp;&nbsp;
            <span>Quirúrgico</span>
          </p>` : '';
          
          let tagEsTerapiaFisica = (EsTerapiaFisica) ? `<p class="data-section">
            <i class="fas fa-caret-right" style="font-size: 3pt; position: absolute; margin: 3px 0px;"></i>&nbsp;&nbsp;
            <span>Terapia física</span>
          </p>` : '';
          
          let tagEsTerapiaOcupacional = (EsTerapiaOcupacional) ? `<p class="data-section">
            <i class="fas fa-caret-right" style="font-size: 3pt; position: absolute; margin: 3px 0px;"></i>&nbsp;&nbsp;
            <span>Terapia ocupacional</span>
          </p>` : '';
          
          let tagEsOtrosTratamientos = (EsOtrosTratamientos) ? `<p class="data-section">
            <i class="fas fa-caret-right" style="font-size: 3pt; position: absolute; margin: 3px 0px;"></i>&nbsp;&nbsp;
            <span>Otros tratamientos</span>
          </p>` : '';
          let urlFirma = "http://localhost:4200/assets/images/imgs/firmMedicoConceptoCRHB.png";
          let stringLetterHTML = responseList[2]['value'];
          let replacementsLetterHTML = {
            tCodigoCorto: "87B2A61", 
            FechaEmision: "31/08/2022", // 2022-08-31T09:22:04.27
            primerNombre: "Martha", 
            // segundoNombre: "Luna", 
            tagSegundoNombre: (segundoNombre) ? '<p class="data-section">' + segundoNombre + '</p>' : '<p class="empty-data">No registra dato</p>',
            primerApellido: "Pimiento", 
            // segundoApellido: "", 
            tagSegundoApellido: (segundoApellido) ? '<p class="data-section">' + segundoApellido + '</p>' : '<p class="empty-data">No registra dato</p>',
            tipoDocumento: "Cédula De Ciudadanía", 
            numeroDocumento: "63324967", 
            fechaNacimiento: "11 feb. 1966", // 1966-02-11T00:00:00
            genero: "Femenino",
            edad: "56 años",
            email: "juankmm@hotmail.com", 
            direccion: "CL 94 11 A 65 APTO 703 BRR CHICO", 
            telefono: "6218692", 
            nombrePais: "Colombia", 
            nombreDepartamento: "Antioquia", 
            nombreMunicipio: "Medellin", 
    
            numeroIdentificacionEps: "800112806",
            eps: "FONDO DE PASIVO SOCIAL DE FERROCARRILES NACIONALES DE COLOMBIA", 
            regimenAfiliacion: "Contributivo", 
            tipoAfiliacion: "Cotizante",
    
            numeroIdentificacionArl: "860002183",
            arl: "Seguros de Vida Colpatria S.A", 
            regimenAfiliacion: "Contributivo", 
            tipoAfiliacion: "Cotizante",
    
            numeroIdentificacionAfp: "860007379",
            afp: "Caja de Auxilios y Prestaciones de la Asociación Colombiana de Aviadores Civiles Acdac, Caxdac", 
            regimenAfiliacion: "Contributivo", 
            tipoAfiliacion: "Cotizante",
    
            tagListCie: tagListCie,
            tagListSequels: tagListSequels,
            
            ResumenHistoriaClinica: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos non sapiente quos ipsam voluptas aperiam libero obcaecati eaque qui hic aspernatur alias a odit sint, voluptatum placeat optio nihil rem?",
    
            tagEsFarmacologico: tagEsFarmacologico,
    
            tagEsFonoaudiologia: tagEsFonoaudiologia,
    
            tagEsQuirurgico: tagEsQuirurgico,
    
            tagEsTerapiaFisica: tagEsTerapiaFisica,
    
            tagEsTerapiaOcupacional: tagEsTerapiaOcupacional,
    
            tagEsOtrosTratamientos: tagEsOtrosTratamientos,
            DescripcionOtrosTratamientos: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit porro commodi qui inventore, fuga, vero, iure animi veritatis necessitatibus accusantium quis sit consequuntur asperiores beatae accusamus voluptatum maxime perspiciatis perferendis.",
            nombreFinalidadTratamientos: "Curativo",
            PlazoCorto: (PlazoCorto == 1) ? 'Bueno' : (PlazoCorto == 2) ? 'Regular' : 'Malo',
            PlazoMediano: (PlazoMediano == 1) ? 'Bueno' : (PlazoMediano == 2) ? 'Regular' : 'Malo',
            nombreConcepto: "Favorable",
            textoConcepto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A quam dolores, reprehenderit quia ad voluptatum, illum soluta accusamus facere ipsum similique quos quisquam doloremque asperiores? Repellat vitae labore sapiente unde?",
    
            medicoPrimerNombre: "German",
            medicoSegundoNombre: "Enrique",
            medicoPrimerApellido: "Diaz",
            medicoSegundoApellido: "Rodriguez",
            medicoTipoIdentificacion: "Cédula De Ciudadanía",
            medicoNumeroDocumento: "1111122222",
            medicoEmail: "gpinilladev@gmail.com",
            medicoNumeroRegistro: "1111122222",
            medicoNumeroRegistro: "1111122222",
            qrcode: qrcode,
            firma: urlFirma,
    
          };

          replaceHtmlTempLetterConcept = Utilities.replaceDataTempHtml(stringLetterHTML, replacementsLetterHTML);
          
        } else {
          
        }

        let collectionFilesAttachment = [];
        Promise.allSettled([replaceHtmlTempMedicalConcept, replaceHtmlTempLetterConcept]).then((respListReplace) => {

          let primerNombre = 'Martha';
          let primerApellido = 'Pimiento';
          let numeroDocumento = "63324967";
          const dateNow  = Utilities.getDateNowValueOf();
          const dateNowFormated  = Utilities.getDateNow('DD-MM-YYYY');
          const codigoConcepto = "87B2A61";
          const nameFileMedicalConcept = 'concepto-de-rehabilitacion-_' + dateNowFormated + '_-_' + codigoConcepto + '.pdf';
          const nameFileLetterConcept = 'carta-concepto-de-rehabilitacion-_' + dateNowFormated + '_-_' + codigoConcepto + '.pdf';

          const promConvPDFMedicalConcept =  Utilities.htmlToPdf(respListReplace[0]['value'], nameFileMedicalConcept);
          const promConvPDFLetterConcept =  Utilities.htmlToPdf(respListReplace[1]['value'], nameFileLetterConcept);
          Promise.allSettled([promConvPDFMedicalConcept, promConvPDFLetterConcept]).then((respListFiles) => {
            // console.log('respListFiles: ', respListFiles);

            const urlFileLetter = path.join(__dirname, '..', 'templates/files/' + nameFileLetterConcept + '.pdf');
            const urlFileCRHB = path.join(__dirname, '..', 'templates/files/' + nameFileMedicalConcept + '.pdf');

            collectionFilesAttachment.push({ 'filename': nameFileLetterConcept, 'path': urlFileLetter, 'pathFile': respListFiles[1]['value'] });
            collectionFilesAttachment.push({ 'filename': nameFileMedicalConcept, 'path': urlFileCRHB, 'pathFile': respListFiles[0]['value'] });
            console.log('collectionFilesAttachment: ', collectionFilesAttachment);

            let stringHTML = responseDataHtmlFileBodyEmail;
            let textBodyEmail = null;
            let replacementsHTML = null;
            // let filesToSend = null;
            let dataInfoMail = {
              from: 'Kustodya App <meddylex.development@gmail.com>',
              to: 'gpinilladev@gmail.com',
              // to: 'gpinilladev@gmail.com, juan.mendez@proyectatsp.com, jjalmonacid@yahoo.com',
              subject: 'Notificación Concepto de rehabilitación ' + codigoConcepto + ' - ' + primerNombre + ' ' + primerApellido + ' C.C. ' + numeroDocumento,
            };
            Utilities.sendEmail(stringHTML, textBodyEmail, replacementsHTML, dataInfoMail, collectionFilesAttachment).then((respSendMail) => {
              console.log("🚀 ~ file: email.js ~ line 799 ~ Utilities.sendEmail ~ respSendMail", respSendMail)
              let trackSendMail = respSendMail;
              if (!trackSendMail['state']) {
                res.status(500).send({ error: trackSendMail['data'] });
              } else {
                res.status(200).send({ response: trackSendMail['data'] });
              }
            });


          });
        });


      } else {

      }

    });
    
    
  });


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
      let urlLogo = path.join(__dirname, '..', 'templates/images/KustodyYmeddylex.png');
      let urlPhotoProfileDoctor = path.join(__dirname, '..', 'templates/images/person_2.jpeg');
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
/* ********** START - Funcion hello - sendMailReportIncapacitiesByDateRange ********** */
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
      Utilities.fnJsonToExcelFile(respReport, pathFileSave, nameFileSave, headingColumnNames).then((respFile) => {


        if(respFile) {

          let stringHTML = responseData;
          let textBodyEmail = null;
          let replacementsHTML = {
            urlLogo: urlLogo,
            urlPhotoProfileDoctor: urlPhotoProfileDoctor,
            startDate: Utilities.getDateFormat(startDate),
            endDate: Utilities.getDateFormat(endDate),
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
/* *********** END - Funcion hello - sendMailReportIncapacitiesByDateRange *********** */
/* ********** START - Funcion hello - getDataReport ********** */
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
/* *********** END - Funcion hello - getDataReport *********** */
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