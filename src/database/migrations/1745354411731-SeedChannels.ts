import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedChannels1745354411731 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "channels" (id, name, description, enable) VALUES
      ('3cc1e7d2-3286-4f2e-88fd-ad3b04dab8fb', 'Email', '', true),
      ('cc09c8be-d373-4217-b55f-4ac2115b2ea8', 'Sms', '', true),
      ('e68aa2f4-2dcf-448f-9fb3-3f3d31ddbe69', 'Whatsapp', '', false)
      ON CONFLICT (id) DO NOTHING;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "channels" WHERE id IN ('3cc1e7d2-3286-4f2e-88fd-ad3b04dab8fb', 'cc09c8be-d373-4217-b55f-4ac2115b2ea8', 'e68aa2f4-2dcf-448f-9fb3-3f3d31ddbe69');
    `);
  }
}
