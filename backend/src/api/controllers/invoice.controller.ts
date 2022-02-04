import { JsonController, Body, Post, HttpCode, Get, Delete, Param, Put } from 'routing-controllers';
import { CreateInvoiceDto, Response as IResponse } from '@dtos/.';
import { Service } from 'typedi';
import { ResponseSchema } from '@/decorators/ResponseSchema';
import { BaseController } from './base.controller';
import { InvoiceService } from '@services/invoice.service';
import { Invoice } from '../entities';
import { DeleteResult } from 'typeorm';

@Service()
@JsonController('/invoices')
export class InvoiceController extends BaseController {
  constructor(private invoiceService: InvoiceService) {
    super();
  }

  @Post('')
  @HttpCode(201)
  @ResponseSchema(IResponse)
  async createInvoice(@Body() body: CreateInvoiceDto): Promise<IResponse<Invoice>> {
    const invoice = await this.invoiceService.createInvoice(body);
    return this.ok(invoice, 'invoice-created');
  }

  @Get('')
  @HttpCode(200)
  @ResponseSchema(IResponse)
  async getInvoices(): Promise<IResponse<Invoice[]>> {
    const invoices = await this.invoiceService.getAllInvoices();
    return this.ok(invoices, 'invoices-retrieved');
  }

  @Put('/:id')
  @HttpCode(200)
  @ResponseSchema(IResponse)
  async editInvoice(@Param('id') invoiceId: string, @Body() body: Partial<Invoice>): Promise<IResponse<Invoice>> {
    const invoices = await this.invoiceService.updateInvoiceById(invoiceId, body);
    return this.ok(invoices, 'invoice-updated');
  }

  @Delete('/:id')
  @HttpCode(204)
  @ResponseSchema(IResponse)
  async deleteInvoice(@Param('id') invoiceId: string): Promise<IResponse<DeleteResult>> {
    const invoices = await this.invoiceService.deleteInvoiceById(invoiceId);
    return this.ok(invoices, 'invoice-deleted');
  }
}
