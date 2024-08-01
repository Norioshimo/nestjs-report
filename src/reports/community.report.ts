import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export const getCommunityReport = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    defaultStyle: {
      fontSize: 10,
    },
    content: [
      {
        columns: [
          {
            image: 'src/assets/logo.png',
            width: 50,
          },
          {
            alignment: 'center',
            text: 'Forest admin community report\n RUT: 44.123.1233\nCambio montanha km 14\nTeléfono: 323.312.123',
          },
          {
            alignment: 'right',
            width: 140,
            layout: 'borderBlue',
            table: {
              body: [
                [
                  {
                    layout: 'noBorders',
                    table: {
                      body: [
                        ['No.', '123-456'],
                        ['Fecha', '2021-09-01'],
                        ['Version', '2024-001'],
                      ],
                    },
                  },
                ],
              ],
            },
          },
        ],
      },

      //Horizontal line
      {
        margin: [5, 5],
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 2,
            lineColor: '#3A4546',
          },
        ],
      },

      //Detalles de  cliente.
      {
        table: {
          widths: ['auto', '*', 'auto', '*'],
          body: [
            [
              {
                text: 'Datos del clietne',
                fillColor: '#5775e1',
                color: 'white',
                border: [false, false, false, false],
              },
              {},
              {},
              {},
            ],
            //Razon social
            [
              {
                text: 'Razon social',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
              },
              {
                text: 'Nombre de la empresa',
                fillColor: 'white',
              },
              {
                text: 'Dirección',
                fillColor: '#343a40',
                color: 'white',
              },
              {
                text: 'Calle falsa 123',
                fillColor: 'white',
              },
            ],
            //
            [
              {
                text: 'RUT',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
              },
              {
                text: '',
                fillColor: 'white',
              },
              {
                text: 'Teléfono',
                fillColor: '#343a40',
                color: 'white',
              },
              {
                text: '',
                fillColor: 'white',
              },
            ],
            //
            [
              {
                text: 'Giro',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
              },
              {
                text: '',
                fillColor: 'white',
              },
              {
                text: 'Condición de pago',
                fillColor: '#343a40',
                color: 'white',
              },
              {
                text: '',
                fillColor: 'white',
              },
            ],
          ],
        },
      },
    ],
  };

  return docDefinition;
};
