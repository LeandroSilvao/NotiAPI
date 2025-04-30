import { MigrationInterface, QueryRunner } from "typeorm";

export class AddClientIdAndSecretAtUser1745980159074 implements MigrationInterface {
    name = 'AddClientIdAndSecretAtUser1745980159074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "clientId" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "clientSecret" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "clientSecret"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "clientId"`);
    }

}
