import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1718965209808 implements MigrationInterface {
    name = 'InitialMigration1718965209808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "login" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "login" SET NOT NULL`);
    }

}
