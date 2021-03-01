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
                { text: 'First paragraph', fontSize: 25, alignment: 'center' },
                'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
                {
                    columns: [{
                            // auto-sized columns have their widths based on their content
                            width: 'auto',
                            text: 'First column'
                        },
                        {
                            // star-sized columns fill the remaining space
                            // if there's more than one star-column, available width is divided equally
                            width: '*',
                            text: 'Second column'
                        },
                        {
                            // fixed width
                            width: 100,
                            text: 'Third column'
                        },
                        {
                            // % width
                            width: '20%',
                            text: 'Fourth column'
                        }
                    ],
                    // optional space between columns
                    columnGap: 10
                }
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