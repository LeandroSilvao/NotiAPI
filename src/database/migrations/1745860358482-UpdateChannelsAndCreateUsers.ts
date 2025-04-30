import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateChannelsAndCreateUsers1745860358482 implements MigrationInterface {
    name = 'UpdateChannelsAndCreateUsers1745860358482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "channels_users" ("channelsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_df3fe25b78abfb2c00aca881b2b" PRIMARY KEY ("channelsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1650a4fda277107dc91ad79c23" ON "channels_users" ("channelsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6646a5b1fa0ffcffc01c622ef3" ON "channels_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "channels_users" ADD CONSTRAINT "FK_1650a4fda277107dc91ad79c237" FOREIGN KEY ("channelsId") REFERENCES "channels"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "channels_users" ADD CONSTRAINT "FK_6646a5b1fa0ffcffc01c622ef35" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "channels_users" DROP CONSTRAINT "FK_6646a5b1fa0ffcffc01c622ef35"`);
        await queryRunner.query(`ALTER TABLE "channels_users" DROP CONSTRAINT "FK_1650a4fda277107dc91ad79c237"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6646a5b1fa0ffcffc01c622ef3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1650a4fda277107dc91ad79c23"`);
        await queryRunner.query(`DROP TABLE "channels_users"`);
    }

}
