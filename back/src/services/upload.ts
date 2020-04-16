import { Injectable } from '@nestjs/common';

const PDFParser = require("pdf2json");
const pdfParser = new PDFParser(this, 1);

@Injectable()
export class UploadService {
    async uploadPdf(fileBuffer: any): Promise<any> {
        return new Promise((res, rej) => {
            pdfParser.on("pdfParser_dataError", errData => rej(errData.parserError));
            pdfParser.on("pdfParser_dataReady", pdfData => {
                console.log(JSON.stringify(pdfParser.getAllFieldsTypes()));
                res(JSON.stringify(pdfParser.getAllFieldsTypes()));
            });

            pdfParser.parseBuffer(fileBuffer);
        });
    }
}
