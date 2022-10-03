const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
let moment = require("moment");
let path = require("path");
let fs = require('fs');
let nodemailer = require('nodemailer');
let QRCode = require('qrcode');
let handlebars = require('handlebars');
const pdf = require('html-pdf');
const imageToBase64 = require('image-to-base64');

const xl = require('excel4node');
const { resolve } = require('path');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Worksheet Name');

const htmlToPdf = (htmlString, fileName, formatFile = 'Letter') => {
    return new Promise((resolve, reject) => {
        // //let options = { format: 'A4' };
        // let options = { format: formatFile };
        // // Example of options with args //
        // // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };
        // let file = htmlString;
        // // let file = { content: "<h1>Welcome to html-pdf-node</h1>" };
        // // // or //
        // // let file = { url: "https://example.com" };
        // if (!file) {
        //     reject(false); 
        // throw err;
        // } else {
        //     html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        //         console.log("PDF Buffer:-", pdfBuffer);
        //         resolve(pdfBuffer);
        //     });
        // }
        const html = htmlString;
        const options = {
            format: formatFile
        }
        let pathTemplate = path.join(__dirname, '..', 'templates/files/' + fileName + '.pdf');
        pdf.create(html, options).toFile(pathTemplate, (err, res) => {
            // console.log('res: ', res);
            if (err) {
                console.log(err);
                reject(new Error(err));
            } 
            
            if (res) {
                resolve(res);
            }
        });

        


    })
};

const generateQR = (text) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(QRCode.toDataURL(text));
        } catch (err) {
            reject(err);
        }
    });
}

const replaceDataTempHtml = (stringHTML, replacementsHTML) => {
    return new Promise((resolve, reject) => {
        try {
            let template = handlebars.compile(stringHTML);
            let replacements = replacementsHTML;
            let htmlToSend = template(replacements);
            resolve(htmlToSend);
        } catch (err) {
            reject(err);
        }
    });
}

const readHTMLFile = (pathTmp) => {
    return new Promise((resolve, reject) => {
        let pathTemplate = path.join(__dirname, '..', pathTmp);
        fs.readFile(pathTemplate, { encoding: 'utf-8' }, function (err, html) {
            if (err) {
                reject(err); 
            throw err;
            } else {
                resolve(html);
            }
        });
    })
};

const convertImagetoBase64 = (file) => {
    return new Promise((resolve, reject) => {
        imageToBase64(file) // Image URL
        .then(
            (response) => {
                // console.log(response); // "iVBORw0KGgoAAAANSwCAIA..."
                if (!response) {
                    reject(new Error("Error convert image to base64!"))
                } else {
                    resolve(response);
                }
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    });
};

const getAPIRestUrl = (url_api) => {
    return new Promise((resolve, reject) => {
        let urlApi = url_api;
        fetch(urlApi)
        .then(res => res.json())
        .then(json => {
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
    return moment(timestamp).format(formatDate);
}

const sendEmail = (stringHTML, textBodyEmail, replacementsHTML, dataInfoMail, filesToSend, imgsMail = null) => {
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
        // let transporter = nodemailer.createTransport({
        //     host: 'mail5016.site4now.net',
        //     // host: 'mail.kustodya.com.co',
        //     port: 8889, 
        //     secure: false,
        //     // service: 'gmail',
        //     auth: {
        //       user: 'juan.mendez@kustodya.com.co',
        //       pass: 'Juank001@',
        //       type: 'login',
        //     },
        //     tls: {
        //         // do not fail on invalid certs
        //         rejectUnauthorized: false,
        //     },
        // });

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

            if (imgsMail) {
                mailOptions['attachments'] = [
                    {
                        filename: 'img1.jpg',
                        path: '../templates/images/img1.jpg',
                        cid: 'unique@german.test' //same cid value as in the html img src
                    }
                ];
            }

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    reject({ state: false, data: error });
                } else {
                    resolve({ state: true, data: info });
                }
            });
        }
    });
}

const fnJsonToExcelFile = (dataXls, pathFileSave, nameFile, columnNames) => {
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
        //     resolve(true);
        // } else {
        //     reject(false);
        // }
        
    });
};

module.exports = {
    htmlToPdf, 
    generateQR, 
    replaceDataTempHtml, 
    readHTMLFile, 
    convertImagetoBase64, 
    getAPIRestUrl,
    getDateNow,
    getDateNowValueOf,
    sendEmail,
    fnJsonToExcelFile,
    getDateFormat,
};