import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { DecodedTokenVO, Permission, RoleVO } from './DecodedToken.vo';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const requiredPermissions = this.reflector.get<Permission[]>(
      'permissions',
      context.getHandler(),
    );

    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer '))
      throw new ForbiddenException('Token ausente ou malformado');

    const token = authHeader.split(' ')[1];
    const decoded = jwt.decode(token) as any;

    if (!decoded || !decoded.role || !decoded.role.permissions)
      throw new ForbiddenException('Token inválido');

    const role = new RoleVO(
      decoded.role.id,
      decoded.role.name,
      decoded.role.permissions,
    );

    const user = new DecodedTokenVO(
      decoded.sub,
      decoded.username,
      role,
      decoded.iat,
      decoded.exp,
    );

    if (user.isExpired()) throw new ForbiddenException('Token expirado');
    if (!requiredPermissions || requiredPermissions.length === 0) return true;

    const hasAll = requiredPermissions.every((perm) =>
      user.hasPermission(perm),
    );

    if (!hasAll) throw new ForbiddenException('Permissões insuficientes');

    request.user = user;
    return true;
  }
}
