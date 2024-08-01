import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { CurrencyFormmatter, DateFormatter } from 'src/helpers';
import { footerSection } from './sections/footer.section';
import { ReportValues } from 'src/interfaces';

const logo: Content = {
  image: 'src/assets/banner.png',
  width: 30,
  height: 30,
  margin: [10, 30],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 20,
    bold: true,
    margin: [0, 30, 0, 0],
  },
  subHeader: {
    fontSize: 16,
    bold: true,
    margin: [0, 20, 0, 0],
  },
};

export const orderByIdReport = (value: ReportValues): TDocumentDefinitions => {
  const { data } = value;

  const { customers, order_details } = data;

  const subTotal = order_details.reduce(
    (acc, detail) => (acc = detail.quantity * +detail.products.price),
    0,
  );

  const total = subTotal * 1.15;

  return {
    header: logo,
    styles: styles,
    pageMargins: [40, 60, 40, 60],
    footer: footerSection,
    content: [
      {
        text: 'Recibo Ejemplo',
        style: 'header',
      },
      {
        columns: [
          {
            text: [
              '15 Montgomery Str, Suite 100,Ottawa ON K2Y 9X1, CANADA BN: 12783671823 https://devtalles.com',
            ],
          },
          {
            text: `Recibo No. ${data.order_id}\nFecha Recibo ${DateFormatter.getDDMMMMYYYY(data.order_date)}\nPagar antes de ${DateFormatter.getDDMMMMYYYY(new Date())}\n`,
            alignment: 'right',
          },
        ],
      },
      //QR
      {
        qr: 'https://nsg-portafolio.netlify.app/',
        fit: 75,
        alignment: 'right',
      },
      //Direccion del cliente
      {
        text: [
          { text: 'Cobrar a\n', style: 'subHeader' },
          `
            Razón Social: ${customers.customer_name},
            Contacto: ${customers.contact_name}
            `,
        ],
      },
      //Table del detalle de la orden
      {
        layout: 'headerLineOnly',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'DESCRIPCION', 'CANTIDAD', 'PRECIO', 'TOTAL'],

            ...order_details.map((detail) => [
              detail.order_detail_id.toString(),
              detail.products.product_name,
              detail.quantity.toString(),
              {
                text: CurrencyFormmatter.formatCurrency(+detail.products.price),
                alignment: 'right',
              },
              {
                text: CurrencyFormmatter.formatCurrency(
                  +detail.products.price * detail.quantity,
                ),
                alignment: 'rigth',
              },
            ]),
          ],
        },
      },
      //Salto de linea
      '\n\n',
      //Totales
      {
        columns: [
          { width: '*', text: '' },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  'SubTotal',
                  {
                    text: CurrencyFormmatter.formatCurrency(subTotal),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total', bold: true },
                  {
                    text: CurrencyFormmatter.formatCurrency(total),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
