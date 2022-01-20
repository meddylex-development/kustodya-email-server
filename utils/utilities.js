const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
let moment = require("moment");
let path = require("path");
let fs = require('fs');
let nodemailer = require('nodemailer');
let handlebars = require('handlebars');
const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Worksheet Name');

const readHTMLFile = (pathTmp) => {
    console.log('pathTmp: ', pathTmp);
    return new Promise((resolve, reject) => {
        let pathTemplate = path.join(__dirname, '..', pathTmp);
        console.log('pathTemplate: ', pathTemplate);
        fs.readFile(pathTemplate, { encoding: 'utf-8' }, function (err, html) {
            console.log('html: ', html);
            if (err) {
                reject(err); 
            throw err;
            } else {
                resolve(html);
            }
        });
    })
};

const getAPIRestUrl = (url_api) => {
    return new Promise((resolve, reject) => {
        let urlApi = url_api;
        fetch(urlApi)
        .then(res => res.json())
        .then(json => {
            // console.log(json);
            if (!json) {
                reject(false);
            } else {
                resolve(json)
            }
        });
    });
}

const getDateNow = (format = '') => {
    let formatDate = (format) ? format : 'DD/MM/YYYY HH:mm';
    return moment().format(formatDate);
}

const getDateNowValueOf = () => {
    return moment().valueOf();
}

const getDateFormat = (timestamp = '', format = '') => {
    // 'DD/MM/YYYY'
    // 'DD/MM/YYYY HH:mm'
    let formatDate = (format) ? format : 'DD/MM/YYYY';
    return moment(timestamp).format('DD/MM/YYYY');
}

const sendEmail = (stringHTML, textBodyEmail, replacementsHTML, dataInfoMail, filesToSend) => {
    return new Promise((resolve, reject) => {

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

        if (!dataInfoMail || dataInfoMail == '' || dataInfoMail == null) {
            let error = new Error("Ocurrio un error con las opciones de envio del email");
            reject({ state: false, data: error });
        } else {
            let mailOptions = dataInfoMail;
            if (stringHTML) {
                let template = handlebars.compile(stringHTML);
                let replacements = replacementsHTML;
                let htmlToSend = template(replacements);
                mailOptions['html'] = htmlToSend;
                mailOptions['text'] = '';
            }
    
            if (textBodyEmail) {
                mailOptions['text'] = textBodyEmail;
                mailOptions['html'] = '';
            }

            if(filesToSend) {
                mailOptions['attachments'] = filesToSend;
            }

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                    reject({ state: false, data: error });
                } else {
                    resolve({ state: true, data: info });
                }
            });
        }
    });
}

const fnJsonToExcelFile = (dataXls, pathFileSave, nameFile, columnNames) => {
    console.log('dataXls: ', dataXls);
    console.log('columnNames: ', columnNames);
    console.log('pathFileSave: ', pathFileSave);
    console.log('nameFile: ', nameFile);
    return new Promise ((resolve, reject) => {
        let writeFile = null;
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
                ws.cell(rowIndex,columnIndex++).string(record[columnName]);
            });
            rowIndex++;
        });
        wb.write(pathFileSave + nameFile);
        resolve(true);
        // writeFile = wb.write(pathFileSave + nameFile);
        // if (writeFile) {
        //     console.log("Si se guardo ese rey!🤴🏻");
        //     resolve(true);
        // } else {
        //     console.log("No se guardo ese peto!🍚");
        //     reject(false);
        // }
        
    });
};

module.exports = {
    readHTMLFile,
    getAPIRestUrl,
    getDateNow,
    getDateNowValueOf,
    sendEmail,
    fnJsonToExcelFile,
};