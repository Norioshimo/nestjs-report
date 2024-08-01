import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient, continents, countries } from '@prisma/client';
import { PrinterService } from '../printer/printer.service';
import {
  getCountryReport,
  getEmploymentLetterByIdReport,
  getEmploymentLetterReport,
  getHelloWorlReport,
} from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect(); 
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  prueba() {
    const docDefinition = getHelloWorlReport({
      name: 'Prueba de reporte',
    });

    var doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  employmentLetter() {
    const docDefinition = getEmploymentLetterReport();

    var doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async employmentLetterById(employeeId: number) {
    const employee = await this.employees.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      throw new NotFoundException(`El empleado con id ${employeeId} no existe`);
    }

    const docDefinition = getEmploymentLetterByIdReport({
      employerName: 'Norio Shimomoto',
      employerPosition: 'FullStack Developer',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employerCompany: 'Empresa srl',
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
    });

    var doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async getCountries( ) {
    const countries = await this.countries.findMany({
      where: {
        local_name: {
          not: null,
        },
      },
    });

    const docDefinition = getCountryReport({countries});

    return this.printerService.createPdf(docDefinition);
  }
}
