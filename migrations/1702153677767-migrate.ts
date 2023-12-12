import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Migrate1702153677767 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'products',
      columns: [
        { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
        { name: 'name', type: 'varchar' },
        { name: 'active', type: 'boolean' },
        { name: 'created_at', type: 'timestamp', default: 'now()' },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }

}
