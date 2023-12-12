import { MigrationInterface, QueryRunner } from "typeorm"

export class Migrate1702158163692 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`

        INSERT INTO "products" ("name", "active") VALUES
            ('Soja', true),
            ('Milho', true),
            ('Algodao', true),
            ('Coffee', true),
            ('SugarCane', true);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
  }

}
