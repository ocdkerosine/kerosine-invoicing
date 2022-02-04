import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Invoice } from '@/api/entities/invoice.entity';

export class CreateUsers implements Seeder {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async run(factory: Factory, _connection: Connection): Promise<void> {
    await factory(Invoice)().seedMany(2);
  }
}
