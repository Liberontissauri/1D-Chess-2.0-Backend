import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersRemoveSalt1698172905457 implements MigrationInterface {
  name = 'UsersRemoveSalt1698172905457';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "salt"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "salt" character varying NOT NULL`,
    );
  }
}
