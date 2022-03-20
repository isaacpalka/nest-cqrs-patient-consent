import { MigrationInterface, QueryRunner } from 'typeorm';

export class Patient1647826828392 implements MigrationInterface {
  name = 'Patient1647826828392';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`patients\` (\`patient_id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`date_created\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`patient_id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`patients\``);
  }
}
