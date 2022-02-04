import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { v4 as uuidv4 } from 'uuid';
import { Invoice } from '@/api/entities/invoice.entity';

export class CreateBruce implements Seeder {
  async run(_factory: Factory, connection: Connection): Promise<void> {
    const em = connection.createEntityManager();

    const invoice = new Invoice();
    invoice.id = uuidv4();
    // invoice.firstName = 'Bruce';
    // invoice.lastName = 'Wayne';
    invoice.clientEmail = 'bruce.wayne@wayne-enterprises.com';
    // invoice.password = 'q1w2e3r4';

    await em.save(invoice);
  }
}
