
# Reporte en Nestjs

Este repositorio se actualiza periódicamente con ejemplos y prácticas sobre la generación de reportes utilizando NestJS con la librería PDFMake. Consiste en la creación de servicios para generar reportes en formato PDF.

## Pasos para levantar el proyecto

1. Instalar las dependencias:
   ```bash
   yarn
   ```
2. Clonar el archivo `.env.template` y renombrarlo a `.env`. Actualizar las variables correspondientes.
3. Levantar(Docker) la base de datos:
   ```bash
   docker compose up -d
   ```
4. Generar el cliente de Prisma:
   ```bash
   npx prisma generate
   ```
5. Ejecutar el proyecto:
   ```bash
   yarn start:dev
   ```

## Documentación en swagger
```bash
http://localhost:3000/api
```

## Nota adicional

Actualizar el archivo `schema.prisma` con las tablas de la base de datos:
```bash
npx prisma db pull
```

## Documentación adicional
1. [Documentación de NestJS con Prisma](https://docs.nestjs.com/recipes/prisma)
2. [Documentación de PDFMake](http://pdfmake.org/#/)
3. [Google Fonts - Roboto](https://fonts.google.com/?query=roboto)
4. [Documentación de QuickChart.io](https://quickchart.io/documentation)
5. [Documentación de Chartjs](https://www.chartjs.org)
6. [Documentación de HTML to PDFMAKE](https://www.npmjs.com/package/html-to-pdfmake)
