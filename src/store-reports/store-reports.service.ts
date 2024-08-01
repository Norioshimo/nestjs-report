import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import {
  getBasicChartSvgReport,
  getHelloWorlReport,
  getStatisticsReport,
  orderByIdReport,
} from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async getOrderByIdReportByOrder(orderId: number) {
    const order = await this.orders.findUnique({
      where: {
        order_id: orderId,
      },
      include: {
        customers: true,
        order_details: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`No existe el orden ${orderId}`);
    }

    console.log(JSON.stringify(order, null, 2));

    const docDefinition = orderByIdReport({ data: order as any });

    var doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async getSvgChart() {
    const docDefinition = await getBasicChartSvgReport();

    var doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async getStatistics() {
    const topCountries = await this.customers.groupBy({
      by: ['country'],
      _count: true,
      orderBy: {
        _count: {
          country: 'desc',
        },
      },
      take: 10,
    });

    const topCountriesData = topCountries.map(({ country, _count }) => ({
      country,
      customers: _count,
    }));

    const docDefinition = await getStatisticsReport({
      topCountries: topCountriesData as any,
    });

    var doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}
