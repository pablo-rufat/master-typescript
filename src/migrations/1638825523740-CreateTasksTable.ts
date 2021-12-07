import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTasksTable1638825523740 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tasks',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    default: '(UUID())',
                },
                {
                    name: 'description',
                    type: 'varchar(250)',
                    isNullable: false,
                },
                {
                    name: 'userId',
                    type: 'varchar'
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP()',
                },
                {
                    name: 'doneAt',
                    type: 'timestamp',
                    isNullable: true,
                }
            ],
        }));

        await queryRunner.createForeignKey(
          'tasks',
          new TableForeignKey({
            columnNames: ['userId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: "CASCADE"
          })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tasks');
    }

}
