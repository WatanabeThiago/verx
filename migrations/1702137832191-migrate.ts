import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Migrate1702137832191 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
        { name: 'email', type: 'varchar' },
        { name: 'password', type: 'varchar' },
        { name: 'person_id', type: 'uuid' },
        { name: 'created_at', type: 'timestamp', default: 'now()' },
      ],
    }));

    await queryRunner.createForeignKey('users', new TableForeignKey({
      columnNames: ['person_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'persons',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'FK_users_person_id');
    await queryRunner.dropTable('users');
  }

}
