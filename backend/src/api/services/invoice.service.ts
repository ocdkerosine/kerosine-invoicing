import { Service } from 'typedi';
import { Logger, LoggerService } from '@utils/logger';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Invoice, Project } from '@entities/invoice.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ICreateInvoice } from '@/api/interfaces/invoice.interface';

@Service()
export class InvoiceService {
  constructor(
    @Logger(__filename) private logger: LoggerService,
    @InjectRepository(Invoice) private invoiceRepository: Repository<Invoice>,
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  public async create(body: Partial<Invoice>): Promise<Invoice> {
    this.logger.info('ℹ️ Creating new inoivce => ', body);
    const user = await this.invoiceRepository.save(this.invoiceRepository.create(body));
    this.logger.info('✅ Invoice created');
    return user;
  }

  public async update(id: string, body: Partial<Invoice>) {
    this.logger.info('ℹ️ Updating invoice => ', body);
    await this.invoiceRepository.save({ ...body, id });
    const invoice = this.getInvoiceById(id);
    this.logger.info('✅ Invoice updated');
    return invoice;
  }

  public async createInvoice(body: ICreateInvoice): Promise<Invoice> {
    const project = [];
    let totalPrice = 0;
    body.projects.forEach(item => {
      item.total = 0;
      item.total += item.price * item.quantity;
      totalPrice += item.total;
      project.push(this.projectRepository.create(item));
    });
    const invoiceDate = new Date(body.invoiceDate).toISOString().split('T')[0];
    const invoiceDue = new Date(body.invoiceDue).toISOString().split('T')[0];
    const projects: Project[] = project;
    delete body.projects;
    const newInvoice = await this.create({ ...body, projects, totalPrice, invoiceDate, invoiceDue });
    return newInvoice;
  }

  async updateInvoiceById(id: string, body: Partial<Invoice>): Promise<Invoice> {
    this.logger.info('ℹ️ Get user by id => ', id);
    console.log(body);
    let invoice = await this.invoiceRepository.save({ id, ...body });
    invoice = await this.getInvoiceById(id);
    this.logger.info('✅ User retrieved');
    return invoice;
  }

  async deleteInvoiceById(id: string): Promise<DeleteResult> {
    this.logger.info('ℹ️ Get user by id => ', id);
    const invoice = await this.invoiceRepository.delete(id);
    this.logger.info('✅ User retrieved');
    return invoice;
  }

  async getInvoiceById(id: string): Promise<Invoice> {
    this.logger.info('ℹ️ Get user by id => ', id);
    const user = await this.invoiceRepository.findOne(id);
    this.logger.info('✅ User retrieved');
    return user;
  }

  async getAllInvoices(): Promise<Invoice[]> {
    this.logger.info('ℹ️ Get all invoices => ');
    const invoices = await this.invoiceRepository.find();
    this.logger.info('✅ Invoices retrieved');
    return invoices;
  }

  async getInvoiceByInvoiceId(invoiceId: string): Promise<Invoice> {
    this.logger.info('ℹ️ Get invoice by invoiceId => ', invoiceId);
    const user = this.invoiceRepository.findOne({ invoiceId });
    this.logger.info('✅ Invoice retrieved');
    return user;
  }
}
