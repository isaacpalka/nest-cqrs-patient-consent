import { MigrationInterface, QueryRunner } from 'typeorm';

export class PatientConsent1648693387196 implements MigrationInterface {
  name = 'PatientConsent1648693387196';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "patient_consents" ("patient_id" character varying NOT NULL, "entity_id" character varying NOT NULL, "permissions" text array NOT NULL, PRIMARY KEY ("patient_id", "entity_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "patient_consents"`);
  }
}
