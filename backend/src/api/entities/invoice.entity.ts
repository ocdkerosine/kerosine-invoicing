import { generateReference } from '@/utils/reference';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import { InvoiceStatus } from '../enums';
import { BaseEntity } from './base.entity';

export class Address {
  @IsNotEmpty()
  @Column()
  address: string;

  @IsNotEmpty()
  @Column()
  city: string;

  @IsNotEmpty()
  @Column()
  postCode: string;

  @IsNotEmpty()
  @Column()
  country: string;
}

@Entity()
@Unique(['invoiceId'])
export class Invoice extends BaseEntity {
  @IsNotEmpty()
  @Index()
  @Column()
  invoiceId: string;

  @IsNotEmpty()
  @Column(() => Address)
  address: Address;

  @IsNotEmpty()
  @Column()
  clientName: string;

  @IsNotEmpty()
  @Column()
  clientEmail: string;

  @IsNotEmpty()
  @Column(() => Address)
  public clientAdress: Address;

  @IsNotEmpty()
  @Column()
  public invoiceDate: string;

  @IsNotEmpty()
  @Column()
  public invoiceDue: string;

  @IsNotEmpty()
  @Column()
  public paymentTerm: string;

  @IsNotEmpty()
  @Column()
  public projectDesc: string;

  @IsNotEmpty()
  @OneToMany(() => Project, projects => projects.invoice, { cascade: true, eager: true })
  public projects: Project[];

  @IsNotEmpty()
  @Column({ default: 0 })
  public totalPrice: number;

  @IsNotEmpty()
  @Column({ type: 'enum', enum: InvoiceStatus, default: InvoiceStatus.PENDING })
  public status: InvoiceStatus;

  @BeforeInsert()
  public async hashPassword(): Promise<void> {
    if (!this.invoiceId) {
      this.invoiceId = generateReference();
    }
  }
}

@Entity()
export class Project extends BaseEntity {
  @IsNotEmpty()
  @Column()
  name: string;

  @IsNotEmpty()
  @Column({ default: 0 })
  quantity: number;

  @IsNotEmpty()
  @Column({ default: 0 })
  price: number;

  @IsOptional()
  @Column({ default: 0 })
  total: number;

  @Column()
  invoiceId: string;

  @IsNotEmpty()
  @JoinColumn()
  @ManyToOne(() => Invoice, invoice => invoice.projects, { eager: false, onDelete: 'CASCADE', nullable: true })
  public invoice: Invoice;
}
