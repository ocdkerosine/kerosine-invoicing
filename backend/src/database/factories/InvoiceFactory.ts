import Faker from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { v4 as uuidv4 } from 'uuid';
import { Invoice } from '../../api/entities/invoice.entity';

define(Invoice, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  const email = faker.internet.email(firstName, lastName);

  const invoice = new Invoice();
  invoice.id = uuidv4();
  // invoice.firstName = firstName;
  // invoice.lastName = lastName;
  invoice.clientEmail = email;
  // invoice.password = 'q1w2e3r4';
  return invoice;
});
