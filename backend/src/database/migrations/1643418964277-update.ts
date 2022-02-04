import {MigrationInterface, QueryRunner} from "typeorm";

export class update1643418964277 implements MigrationInterface {
    name = 'update1643418964277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "invoice_date"`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD "invoice_date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "invoice_due"`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD "invoice_due" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "invoice_due"`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD "invoice_due" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "invoice_date"`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD "invoice_date" TIMESTAMP NOT NULL`);
    }

}
