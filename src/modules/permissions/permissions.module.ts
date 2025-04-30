import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permissions } from 'src/entities/Permissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permissions])],
  exports: [TypeOrmModule],
})
export class PermissionsModule {}
