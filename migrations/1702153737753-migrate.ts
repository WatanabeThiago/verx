import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Migrate1702153737753 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'property_products',
      columns: [
        { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
        { name: 'property_id', type: 'uuid' },
        { name: 'product_id', type: 'int' },
        { name: 'created_at', type: 'timestamp', default: 'now()' },
      ],
      foreignKeys: [
        { columnNames: ['property_id'], referencedColumnNames: ['id'], referencedTableName: 'properties' },
        { columnNames: ['product_id'], referencedColumnNames: ['id'], referencedTableName: 'products' }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('property_products');
  }

}
