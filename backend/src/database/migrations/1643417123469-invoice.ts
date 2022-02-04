import {MigrationInterface, QueryRunner} from "typeorm";

export class invoice1643417123469 implements MigrationInterface {
    name = 'invoice1643417123469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."invoices_status_enum" AS ENUM('Draft', 'Pending', 'Paid')`);
        await queryRunner.query(`CREATE TABLE "invoices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "invoice_id" character varying NOT NULL, "client_name" character varying NOT NULL, "client_email" character varying NOT NULL, "invoice_date" TIMESTAMP NOT NULL, "invoice_due" TIMESTAMP NOT NULL, "payment_term" character varying NOT NULL, "project_desc" character varying NOT NULL, "total_price" integer NOT NULL DEFAULT '0', "status" "public"."invoices_status_enum" NOT NULL DEFAULT 'Pending', "address_address" character varying NOT NULL, "address_city" character varying NOT NULL, "address_post_code" character varying NOT NULL, "address_country" character varying NOT NULL, "client_adress_address" character varying NOT NULL, "client_adress_city" character varying NOT NULL, "client_adress_post_code" character varying NOT NULL, "client_adress_country" character varying NOT NULL, CONSTRAINT "UQ_a62eb88a23934fb83945c3e58af" UNIQUE ("invoice_id"), CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a62eb88a23934fb83945c3e58a" ON "invoices" ("invoice_id") `);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "quantity" integer NOT NULL DEFAULT '0', "price" integer NOT NULL DEFAULT '0', "total" integer NOT NULL DEFAULT '0', "invoice_id" uuid NOT NULL, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_8a13b2e372f2295f01db7e77456" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_8a13b2e372f2295f01db7e77456"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a62eb88a23934fb83945c3e58a"`);
        await queryRunner.query(`DROP TABLE "invoices"`);
        await queryRunner.query(`DROP TYPE "public"."invoices_status_enum"`);
    }

}
