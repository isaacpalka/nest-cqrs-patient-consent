import { MigrationInterface, QueryRunner } from 'typeorm';

export class Patient1647826828392 implements MigrationInterface {
  name = 'Patient1647826828392';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "patients" ("patient_id" character varying NOT NULL, "name" character varying NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), PRIMARY KEY ("patient_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "patients"`);
  }
}
