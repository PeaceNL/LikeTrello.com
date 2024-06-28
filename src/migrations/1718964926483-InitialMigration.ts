import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1718964926483 implements MigrationInterface {
    name = 'InitialMigration1718964926483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "username" TO "email"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "email" TO "username"`);
    }

}
