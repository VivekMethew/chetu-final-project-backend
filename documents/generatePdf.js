const fs = require('fs');
const PdfPrinter = require('pdfmake');
const fonts = {
    Courier: {
        normal: 'Courier',
        bold: 'Courier-Bold',
        italics: 'Courier-Oblique',
        bolditalics: 'Courier-BoldOblique'
    },
    Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
    },
    Times: {
        normal: 'Times-Roman',
        bold: 'Times-Bold',
        italics: 'Times-Italic',
        bolditalics: 'Times-BoldItalic'
    },
    Symbol: {
        normal: 'Symbol'
    },
    ZapfDingbats: {
        normal: 'ZapfDingbats'
    }
};

const printer = new PdfPrinter(fonts);


module.exports = {
    generatePdf: () => {
        var docDefinition = {
            content: [
                { text: 'Welcome To eShare Final Assissment ', fontSize: 25, alignment: 'center', lineHeight: 2 },
                { text: 'Hello, Sir ', fontSize: 18 },
                { text: 'I am submitted my final assissment of given time and Thanks for give me task , So i am finally done my project ', fontSize: 18 },
                { text: 'Thanks Chetu India, Noida ', fontSize: 22, alignment: 'center', lineHeight: 2 },
            ],
            defaultStyle: {
                font: 'Helvetica'
            }
        };

        var pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(fs.createWriteStream('./documents/pdf/document.pdf'));
        pdfDoc.end();
    }
}