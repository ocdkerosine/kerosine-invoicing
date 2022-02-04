import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsNotEmpty, IsNotEmptyObject, IsOptional } from 'class-validator';
import { Address, Project } from '../entities';

export class CreateInvoiceDto {
  @IsNotEmptyObject()
  @Type(() => Address)
  address: Address;

  @IsNotEmpty()
  clientName: string;

  @IsNotEmpty()
  @IsEmail()
  clientEmail: string;

  @IsNotEmptyObject()
  @Type(() => Address)
  clientAdress: Address;

  @IsNotEmpty()
  invoiceDate: Date;

  @IsNotEmpty()
  invoiceDue: Date;

  @IsNotEmpty()
  paymentTerm: string;

  @IsNotEmpty()
  projectDesc: string;

  @IsArray()
  @Type(() => Project)
  projects: Project[];

  @IsOptional()
  totalPrice: number;

  @IsOptional()
  status: string;
}
