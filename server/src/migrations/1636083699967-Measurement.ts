import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { createdColumn, idColumn } from "jack-hermanson-ts-utils";

export class Measurement1636083699967 implements MigrationInterface {
    measurement = new Table({
        name: "measurement",
        columns: [
            idColumn,
            {
                name: "temperature",
                type: "float",
                isNullable: false,
            },
            {
                name: "humidity",
                type: "float",
                isNullable: false,
            },
            {
                name: "generated",
                type: "timestamp",
                isNullable: false,
            },
            createdColumn,
        ],
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.measurement, false);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.measurement);
    }
}
