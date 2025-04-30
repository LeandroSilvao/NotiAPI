import { Actions } from 'src/entities/Actions.entity';
import { Modules } from 'src/entities/Modules.entity';
import { Permissions } from 'src/entities/Permissions.entity';
import { Role } from 'src/entities/Role.entity';
import { User } from 'src/entities/User.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedInitialData1745974006774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const actionRepo = queryRunner.manager.getRepository(Actions);
    const moduleRepo = queryRunner.manager.getRepository(Modules);
    const permissionRepo = queryRunner.manager.getRepository(Permissions);
    const roleRepo = queryRunner.manager.getRepository(Role);
    const userRepo = queryRunner.manager.getRepository(User);

    const actions = ['create', 'read', 'update', 'delete'];
    const modules = ['channels', 'users', 'notify'];

    // Cria ações
    const actionEntities = [];
    for (const name of actions) {
      let action = await actionRepo.findOneBy({ name });
      if (!action) {
        action = actionRepo.create({ name });
        await actionRepo.save(action);
      }
      actionEntities.push(action);
    }

    // Cria módulos
    const moduleEntities = [];
    for (const name of modules) {
      let mod = await moduleRepo.findOneBy({ name });
      if (!mod) {
        mod = moduleRepo.create({ name });
        await moduleRepo.save(mod);
      }
      moduleEntities.push(mod);
    }

    // Cria permissões
    const allPermissions: Permissions[] = [];
    for (const mod of moduleEntities) {
      for (const act of actionEntities) {
        let permission = await permissionRepo.findOne({
          where: { module: { id: mod.id }, action: { id: act.id } },
          relations: ['module', 'action'],
        });
        if (!permission) {
          permission = permissionRepo.create({ module: mod, action: act });
          await permissionRepo.save(permission);
        }
        allPermissions.push(permission);
      }
    }

    let adminRole = await roleRepo.findOne({
      where: { name: 'ADMIN' },
      relations: ['permissions'],
    });

    if (!adminRole) {
      adminRole = roleRepo.create({
        name: 'ADMIN',
        permissions: allPermissions,
      });
      await roleRepo.save(adminRole);
    }

    const adminEmail = 'admin@admin.com';
    const existingAdmin = await userRepo.findOneBy({ email: adminEmail });

    if (!existingAdmin) {
      const user = userRepo.create({
        name: 'Admin',
        email: adminEmail,
        enable: true,
        document: '00000000000',
        role: adminRole,
      });
      await userRepo.save(user);
      console.log(`Usuário admin criado: ${adminEmail}`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "user" WHERE email = 'admin@admin.com'`,
    );
    await queryRunner.query(`DELETE FROM "role" WHERE name = 'ADMIN'`);
    await queryRunner.query(`DELETE FROM "permissions"`);
    await queryRunner.query(`DELETE FROM "modules"`);
    await queryRunner.query(`DELETE FROM "actions"`);
  }
}
