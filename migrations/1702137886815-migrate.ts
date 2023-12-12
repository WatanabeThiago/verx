import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Migrate1702137886815 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'properties',
      columns: [
        { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
        { name: 'name', type: 'varchar' },
        { name: 'country', type: 'varchar' },
        { name: 'state', type: 'varchar' },
        { name: 'city', type: 'varchar' },
        { name: 'line1', type: 'varchar' },
        { name: 'line2', type: 'varchar' },

        { name: 'geolocation', type: 'geography', spatialFeatureType: 'POINT' },

        { name: 'total_area', type: 'integer' },
        { name: 'agricultural_area', type: 'integer' },
        { name: 'vegetation_area', type: 'integer' },

        { name: 'created_at', type: 'timestamp', default: 'now()' },
        { name: 'updated_at', type: 'timestamp', default: 'now()' },
        { name: 'person_id', type: 'uuid' },
      ],
    }));

    await queryRunner.createForeignKey('properties', new TableForeignKey({
      columnNames: ['person_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'persons',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('properties', 'FK_properties_person_id');
    await queryRunner.dropTable('properties');
  }

}
