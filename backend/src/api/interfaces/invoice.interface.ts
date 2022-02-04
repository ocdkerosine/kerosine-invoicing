import { Address, Project } from '../entities';

export interface ICreateInvoice {
  address: Address;

  clientName: string;

  clientEmail: string;

  clientAdress: Address;

  invoiceDate: Date;

  invoiceDue: Date;

  paymentTerm: string;

  projectDesc: string;

  projects: Project[];
}
