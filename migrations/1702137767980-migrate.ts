import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Migrate1702137767980 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("CREATE EXTENSION IF NOT EXISTS postgis;");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
