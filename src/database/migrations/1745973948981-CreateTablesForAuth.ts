import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablesForAuth1745973948981 implements MigrationInterface {
    name = 'CreateTablesForAuth1745973948981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "actions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_85780977aea9b8fa588d39976f8" UNIQUE ("name"), CONSTRAINT "PK_7bfb822f56be449c0b8adbf83cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "modules" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_8cd1abde4b70e59644c98668c06" UNIQUE ("name"), CONSTRAINT "PK_7dbefd488bd96c5bf31f0ce0c95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "moduleId" integer, "actionId" integer, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_permissions_permissions" ("roleId" integer NOT NULL, "permissionsId" integer NOT NULL, CONSTRAINT "PK_4c28565f173e03d69e674113458" PRIMARY KEY ("roleId", "permissionsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b54afeee6f270b58203c66ce13" ON "role_permissions_permissions" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2535cdb0396daf3834b7d3523b" ON "role_permissions_permissions" ("permissionsId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD "roleId" integer`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_e61928198c29bb2202922b08755" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_c598c9812a980e6b9bab24578a3" FOREIGN KEY ("actionId") REFERENCES "actions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_permissions_permissions" ADD CONSTRAINT "FK_b54afeee6f270b58203c66ce139" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_permissions_permissions" ADD CONSTRAINT "FK_2535cdb0396daf3834b7d3523b9" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_permissions_permissions" DROP CONSTRAINT "FK_2535cdb0396daf3834b7d3523b9"`);
        await queryRunner.query(`ALTER TABLE "role_permissions_permissions" DROP CONSTRAINT "FK_b54afeee6f270b58203c66ce139"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_c598c9812a980e6b9bab24578a3"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_e61928198c29bb2202922b08755"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roleId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2535cdb0396daf3834b7d3523b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b54afeee6f270b58203c66ce13"`);
        await queryRunner.query(`DROP TABLE "role_permissions_permissions"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TABLE "modules"`);
        await queryRunner.query(`DROP TABLE "actions"`);
    }

}
