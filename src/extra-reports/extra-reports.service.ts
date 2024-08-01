import fs from 'fs';

import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { getCommunityReport } from 'src/reports';
import { getHtmlContent } from 'src/helpers/html-to-pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from 'src/reports/sections/header.section';
import { footerSection } from 'src/reports/sections/footer.section';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}

  async getHtmlReport() {
    const html = fs.readFileSync('src/reports/html/basic-03.html', 'utf8');

    const content = getHtmlContent(html, {
      title: 'Titulo nombre',
      client: 'Norio',
    });

    const docDefinition: TDocumentDefinitions = {
      pageMargins: [40, 110, 40, 60],
      header: headerSection({
        title: 'HTML to PDFMake',
        subTitle: 'Convertir HTML a PDFMake',
      }),
      footer: footerSection,
      content: content,
    };

    var doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async getCommunity() {
    const docDefinition = getCommunityReport();

    var doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async getCustomSize() {
    var doc = this.printerService.createPdf({
      pageSize: {
        width:150,
        height:300
      },
      content: [
        {
          qr: 'https://nsg-portafolio.netlify.app/',
          fit: 100,
          alignment: 'center',
        },
        {
          text: 'Reporte con tamanho',
          fontSize: 10,
          alignment: 'center',
          margin: [0, 20],
        },
      ],
    });

    return doc;
  }
}
